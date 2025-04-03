import {db} from "../config/firebaseConfig";
import { limitToLast, onValue, orderByKey, query, ref } from "@firebase/database";
import News from "../model/News";
import {CategorizedNews} from "../model/CategorizedNews";

const NEWS_API_KEY='newsAPI';
const newsRef =  ref(db, "news");
export function getLatestNews(): Promise<News[]>{
    return new Promise((resolve, reject) => {
        const getLatestQuery = query(newsRef, orderByKey(), limitToLast(2));
        onValue(
            getLatestQuery,
            (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const newsArray = Object.entries(data).map( ([key, value]: [string, any]) =>
                        new News(
                            parseInt(key),
                            value.agency,
                            value.agencyLogoLink,
                            value.date,
                            value.imgLink,
                            value.link,
                            value.postContent,
                            value.time,
                            value.title
                        )
                    );
                    resolve(newsArray);
                } else {
                    resolve([]);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function getAllLocalNews(): Promise<News[]> {
    return new Promise((resolve, reject) => {
        onValue(
            newsRef,
            (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const newsArray = Object.entries(data).map(([key, value]: [string, any]) =>
                        new News(
                            parseInt(key),
                            value.agency,
                            value.agencyLogoLink,
                            value.date,
                            value.imgLink,
                            value.link,
                            value.postContent,
                            value.time,
                            value.title
                        )
                    );
                    resolve(newsArray);
                } else {
                    resolve([]);
                }
            },
            (error) => {
                reject(error);
            },
            { onlyOnce: true }
        );
    });
}

export async function getBusinessNews(): Promise<CategorizedNews[]> {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=business&apiKey=${NEWS_API_KEY}`
        );
        const data = await response.json();

        if (data.status === "ok" && Array.isArray(data.articles)) {
            return data.articles.map(
                (article: any) =>
                    new CategorizedNews(
                        article.author || "Unknown",
                        article.title || "No Title",
                        article.description || "No Description",
                        article.url || "#",
                        article.urlToImage || "",
                        article.publishedAt || "",
                        article.content || "No Content"
                    )
            );
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching business news:", error);
        return [];
    }
}

