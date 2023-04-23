import animedata from "../data/animedata.json";
import SideBar from "./SideBar";

let nodes = [];
export type NodeInfo = {
    id?
    label?
    tags?
    popScore?
    mediaType?
    episodes?
    year?
    chapters?
    image?
    trendScore?
    staff?
    studios?
}
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
    trendScore?
    staff?
    studios?

    constructor(info : NodeInfo) {
        this.id = info.id;
        this.label = info.label;
        this.tags = info.tags;
        this.popScore = info.popScore;
        this.mediaType = info.mediaType;
        this.episodes = info.episodes;
        this.year = info.year;
        this.chapters = info.chapters;
        this.image = info.image;
        this.trendScore = info.trendScore;
        this.staff = info.staff;
        this.studios = info.studios;
    }
}

export function initNodes() {
    //let nodes : Node[] = [];
    for(let i = 0; i < animedata.length; i++){
        let node : Node = new Node({
            id: animedata[i][0],
            label: animedata[i][1]["english"]??animedata[i][1]["native"],
            tags: animedata[i][2],
            popScore: animedata[i][3],
            mediaType: animedata[i][4],
            episodes: animedata[i][5],
            year: animedata[i][6],
            chapters: animedata[i][7],
            image: animedata[i][8]["medium"],
            trendScore: animedata[i][9],
            staff: animedata[i][10]["nodes"],
            studios: animedata[i][11]["nodes"]
        });
        nodes.push(node);
    }
}

initNodes();

export {nodes};