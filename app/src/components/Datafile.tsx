import animeData from "../data/animedata.json";
import {DataSet} from 'vis-data'

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

    constructor(info: Node) {
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

export class Edge {
    from?
    to?
    id?
    color?
    weight?

    constructor(info: Edge) {
        this.from = info.from
        this.to = info.to
        this.id = info.id
        this.color = info.color
        this.weight = info.weight
    }
}


export const nodes: DataSet<Node> = new DataSet<Node>();
// @ts-ignore
for (let i = 0; i < animeData.length; i++) {

    nodes.add(
        new Node({
            id: i,
            label: (animeData[i][1]["english"] ?? animeData[i][1]["romaji"]).trim(),
            titles: animeData[i][1],
            tags: animeData[i][2],
            mediaType: animeData[i][3],
            episodes: animeData[i][4],
            seasonYear: animeData[i][5],
            chapters: animeData[i][6],
            image: animeData[i][7]["large"],
            imageMedium: animeData[i][7]["medium"],
            imageLarge: animeData[i][7]["large"],
            studios: animeData[i][8]["nodes"],
            isAdult: animeData[i][9]
        }));
    // turns the picture into a cat if it's BAD BAD!
    if (nodes.get(i).isAdult) {
        nodes.get(i)["image"] = 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg';
        nodes.get(i)["imageLarge"] = 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg';
    }
}

export const edges: DataSet<Edge> = new DataSet<Edge>();

