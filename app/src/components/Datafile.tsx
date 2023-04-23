import animeData from "../data/animedata.json";

export class Node {
    id?
    label?
    titles?
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
    isAdult?

    constructor(info : Node) {
        this.id = info.id;
        this.label = info.label;
        this.titles = info.titles;
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
        this.isAdult = info.isAdult;
    }
}

export const nodes = [];
// @ts-ignore
for(let i = 0; i < animeData.length; i++){

    nodes.push(
    new Node({
        id: animeData[i][0],
        label: animeData[i][1]["english"]??animeData[i][1]["romaji"],
        titles: animeData[i][1],
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
        studios: animeData[i][11]["nodes"],
        isAdult: animeData[i][12]
    }));
    // turns the picture into a cat if it's BAD BAD!
    if(nodes.at(-1).isAdult){
        nodes.at(-1)["image"] = 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg';
        nodes.at(-1)["imageLarge"] = 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg';
        console.log(nodes.at(-1)["label"]) // print out the BAD BAD images
    }
}
export const edges = [];

