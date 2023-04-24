import animeData from "../data/animedata.json";

export class Node {
    id?
    label?
    titles?
    tags?
    mediaType?
    episodes?
    seasonYear?
    chapters?
    image?
    imageMedium?
    imageLarge?
    studios?
    isAdult?

    constructor(info : Node) {
        this.id = info.id;
        this.label = info.label;
        this.titles = info.titles;
        this.tags = info.tags;
        this.mediaType = info.mediaType;
        this.episodes = info.episodes;
        this.seasonYear = info.seasonYear;
        this.chapters = info.chapters;
        this.image = info.image;
        this.imageMedium = info.imageMedium;
        this.imageLarge = info.imageLarge;
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
        mediaType: animeData[i][3],
        episodes: animeData[i][4],
        seasonYear: animeData[i][5],
        chapters: animeData[i][6],
        image: animeData[i][7]["medium"],
        imageMedium: animeData[i][7]["medium"],
        imageLarge: animeData[i][7]["large"],
        studios: animeData[i][8]["nodes"],
        isAdult: animeData[i][9]
    }));
    // turns the picture into a cat if it's BAD BAD!
    if(nodes.at(-1).isAdult){
        nodes.at(-1)["image"] = 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg';
        nodes.at(-1)["imageLarge"] = 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg';
        console.log(nodes.at(-1)["label"]) // print out the BAD BAD images
    }
}
export const edges = [];

