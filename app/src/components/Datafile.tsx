import animedata from "../data/animedata.json"

export type NodeInfo = {
    id?: number;
    label?: string[];
    tags?: string[];
    popScore?: number;
    mediaType?: string;
    episodes?: number;
    year?: number;
    chapters?: number;
    image?: string;
    trendScore?: number;
    staff?: string[];
    studios?: string[];
}
export class Node {
    id?: number;
    label?: string[];
    tags?: string[];
    popScore?: number;
    mediaType?: string;
    episodes?: number;
    year?: number;
    chapters?: number;
    image?: string;
    trendScore?: number;
    staff?: string[];
    studios?: string[];

    constructor(info: {
        id?: number;
        label?: string[];
        tags?: string[];
        popScore?: number;
        mediaType?: string;
        episodes?: number;
        year?: number;
        chapters?: number;
        image?: string;
        trendScore?: number;
        staff?: string[];
        studios?: string[];

    }) {
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

        /*this.id = NodeInfo[0];
        this.label = NodeInfo[1]["english"];
        this.tags = NodeInfo[2];
        this.popScore = NodeInfo[3];
        this.mediaType = NodeInfo[4];
        this.episodes = NodeInfo[5];
        this.year = NodeInfo[6];
        this.chapters = NodeInfo[7]
        this.image = NodeInfo[8]["medium"];
        this.trendScore = NodeInfo[9];
        for(let x in NodeInfo[10]["nodes"]){
            if(!this.staff.includes(x["name"]["full"])) {
                this.staff.append(x["name"]["full"]);
            }
        }
        for(let x in NodeInfo[11]["nodes"]){
            if(!this.studios.include(x["name"])){
                this.studios.append(x["name"]["full"]);
            }
        }*/
    }
}

function findData({SideBar}){
    let nodes = [];
    let edges = [];

    const searching = SideBar.searchString;

    for(let i = 0; i < animedata.length; i++){
        const item = animedata[i];

    }

}

let Nodes = [];
console.log(animedata.length);
console.log(animedata[0][0])

for(let index = 0; index < 1; index++){
    //const nodeInfo: NodeInfo = animedata[index];
    const id : number = animedata[index][0];
    //console.log(id);

    let node = new Node(
        {
            id : id
            /*label : nodeInfo[1]["english"],
            tags : nodeInfo[2],
            popScore : nodeInfo[3],
            mediaType : nodeInfo[4],
            episodes : nodeInfo[5],
            year : nodeInfo[6],
            chapters : nodeInfo[7],
            image : nodeInfo[8]["medium"],
            trendScore : nodeInfo[9],
            staff : nodeInfo[10]["nodes"],
            studios : nodeInfo[11]["nodes"]*/

        }
    );
    Nodes.push(node);
}