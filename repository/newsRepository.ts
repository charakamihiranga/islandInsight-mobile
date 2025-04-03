import {db} from "../config/firebaseConfig";
import { limitToLast, onValue, orderByKey, query, ref } from "@firebase/database";
import News from "../model/News";

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

export function getAllNews(): Promise<News[]> {
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
