import animeData from "../data/animedata.json";

export class Node {
    id?
    label?
    tags?
    popScore?
    mediaType?
    episodes?
    year?
    chapters?
    image?
    imageMedium?
    imageLarge?
    trendScore?
    staff?
    studios?

    constructor(info : Node) {
        this.id = info.id;
        this.label = info.label;
        this.tags = info.tags;
        this.popScore = info.popScore;
        this.mediaType = info.mediaType;
        this.episodes = info.episodes;
        this.year = info.year;
        this.chapters = info.chapters;
        this.image = info.image;
        this.imageMedium = info.imageMedium;
        this.imageLarge = info.imageLarge;
        this.trendScore = info.trendScore;
        this.staff = info.staff;
        this.studios = info.studios;
    }
}

export const nodes = [];
// @ts-ignore
for(let i = 0; i < animeData.length; i++){
    nodes.push(
    new Node({
        id: animeData[i][0],
        label: animeData[i][1]["english"],
        tags: animeData[i][2],
        popScore: animeData[i][3],
        mediaType: animeData[i][4],
        episodes: animeData[i][5],
        year: animeData[i][6],
        chapters: animeData[i][7],
        image: animeData[i][8]["medium"],
        imageMedium: animeData[i][8]["medium"],
        imageLarge: animeData[i][8]["large"],
        trendScore: animeData[i][9],
        staff: animeData[i][10]["nodes"],
        studios: animeData[i][11]["nodes"]
    }));
}
export const edges = [];

