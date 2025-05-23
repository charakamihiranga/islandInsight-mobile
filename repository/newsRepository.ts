import {db} from "../config/firebaseConfig";
import { limitToLast, onValue, orderByKey, query, ref, get } from "@firebase/database";
import News from "../model/News";
import {CategorizedNews} from "../model/CategorizedNews";

const NEWS_API_KEY='NEWS_API_KEY';
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

export async function getNewsById(newsId: number): Promise<News | null> {
    try {
        const newsItemRef = ref(db, `news/${newsId}`);
        const snapshot = await get(newsItemRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            return new News(
                newsId,
                data.agency,
                data.agencyLogoLink,
                data.date,
                data.imgLink,
                data.link,
                data.postContent,
                data.time,
                data.title
            );
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching news with ID ${newsId}:`, error);
        return null;
    }
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

export async function getTechNews(): Promise<CategorizedNews[]> {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=technology&apiKey=${NEWS_API_KEY}`
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
        console.error("Error fetching tech news:", error);
        return [];
    }
}

export async function getSportNews(): Promise<CategorizedNews[]> {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=sport&apiKey=${NEWS_API_KEY}`
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
        console.error("Error fetching sport news:", error);
        return [];
    }
}