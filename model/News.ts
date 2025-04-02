export default class News {
    id: number;
    agency: string;
    agencyLogoLink: string;
    date: string;
    imgLink: string;
    link: string;
    postContent: string;
    time: string;
    title: string;

    constructor(
        id: number,
        agency: string,
        agencyLogoLink: string,
        date: string,
        imgLink: string,
        link: string,
        postContent: string,
        time: string,
        title: string
    ) {
        this.id = id;
        this.agency = agency;
        this.agencyLogoLink = agencyLogoLink;
        this.date = date;
        this.imgLink = imgLink;
        this.link = link;
        this.postContent = postContent;
        this.time = time;
        this.title = title;
    }
}