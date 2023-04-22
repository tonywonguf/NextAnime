import animedata from "../data/animedata.json"

export type NodeInfo = {
    id?: any;
    label?: any;
    tags?: any;
    popScore?: any;
    mediaType?: any;
    episodes?: any;
    year?: any;
    chapters?: any;
    image?: any;
    trendScore?: any;
    staff?: any;
    studios?: any;
}
export class Node {
    id?: any;
    label?: any;
    tags?: any;
    popScore?: any;
    mediaType?: any;
    episodes?: any;
    year?: any;
    chapters?: any;
    image?: any;
    trendScore?: any;
    staff?: any;
    studios?: any;

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

export function poop() {
    let nodes : Node[] = [];
    let node : Node = new Node({
        id: animedata[0][0],
        label: animedata[0][1],
        tags: animedata[0][2],
        popScore: animedata[0][3],
        mediaType: animedata[0][4],
        episodes: animedata[0][5],
        year: animedata[0][6],
        chapters: animedata[0][7],
        image: animedata[0][8],
        trendScore: animedata[0][9],
        staff: animedata[0][10],
        studios: animedata[0][11]
    });
    nodes.push(node);
    console.log(node);
}
