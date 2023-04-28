import animeData from "../data/animedata.json";
import {DataSet} from 'vis-data'
import {catImages, removeDiacritics} from "./ToolBox";

export class Node {
    id?
    label?
    titles?
    tags?
    episodes?
    seasonYear?
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
        this.episodes = info.episodes;
        this.seasonYear = info.seasonYear;
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

// init nodes using animedata.json
/**
 * @time: O(nodes)
 * @space: O(nodes)
 */
// @ts-ignore
for (let i = 0; i < animeData.length; i++) {
    nodes.add(
        new Node({
            id: i,
            label: (animeData[i][1]["english"] ?? animeData[i][1]["romaji"]).trim(),
            titles: animeData[i][1],
            tags: animeData[i][2],
            episodes: animeData[i][3],
            seasonYear: animeData[i][4],
            image: animeData[i][5]["large"],
            imageMedium: animeData[i][5]["medium"],
            imageLarge: animeData[i][5]["large"],
            studios: animeData[i][6]["nodes"],
            isAdult: animeData[i][7]
        })
    );

    // turns the picture into a cat if it's BAD BAD!
    if (nodes.get(i).isAdult) {
        const defaultImage = catImages[Math.floor(catImages.length * Math.random())];
        nodes.get(i).image = defaultImage;
        nodes.get(i).imageMedium = defaultImage;
        nodes.get(i).imageLarge = defaultImage;
    }
    // maps O(1)
    nodes.get(i).titles.english = removeDiacritics(nodes.get(i).titles.english);
    nodes.get(i).titles.romaji = removeDiacritics(nodes.get(i).titles.romaji);
}