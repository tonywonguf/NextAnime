import animeData from "../data/animedata.json";
import {DataSet} from 'vis-data'
import {v4 as uuidv4} from 'uuid';
import {removeDiacritics, catImages, getWeight} from "./ToolBox";

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
        const defaultImage = catImages[Math.floor(catImages.length*Math.random())];
        nodes.get(i).image = defaultImage;
        nodes.get(i).imageMedium = defaultImage;
        nodes.get(i).imageLarge = defaultImage;
    }

    nodes.get(i).titles.english = removeDiacritics(nodes.get(i).titles.english);
    nodes.get(i).titles.romaji = removeDiacritics(nodes.get(i).titles.romaji);
}
/*
let edgeList = {};
function generateToggleVariations(): Array<{[key: string]: boolean}> {
    const initial = {Title: true, Genre: true, Studio: true, Year: true, Episodes: true};
    const result = [initial];

    for (let i = 0; i < 5; i++) {
        const size = result.length;
        for (let j = 0; j < size; j++) {
            const current = result[j];
            const toggled = {...current, [Object.keys(current)[i]]: !current[Object.keys(current)[i]]};
            result.push(toggled);
        }
    }

    return result;
}

const useParameters = generateToggleVariations();

function initEdgeList(){
    nodes.forEach(node => {
        edgeList[node.id] = {};
        useParameters.forEach(pList => {

            let edges: Edge[] = [];
            for (let j = 0; j < nodes.length; ++j) {
                if (j != node.id)
                    edges.push(new Edge({
                        from: node.id,
                        to: j,
                        weight: getWeight(node, nodes.get(j), pList),
                        color: 'FFFFFF',
                        id: uuidv4()
                    }));
            }
            edges = edges.sort((a, b) => b.weight - a.weight).splice(0, 399);
            // Get the top 50 nodes
            // @ts-ignore
            const topNodes: Node[] = [suggNode, ...edges.map(e => nodes.get(e.to))];

            let topEdges: Edge[] = [];
            topNodes.forEach(n1 =>
                topNodes.forEach(n2 => {
                        if (n1 != n2) {
                            const n1_id = n1.id,
                                n2_id = n2.id;
                            topEdges.push(new Edge({
                                from: n1_id,
                                to: n2_id,
                                weight: getWeight(n1, n2, this.selectedParameters),
                                color: 'FFFFFF',
                                id: uuidv4()
                            }));
                        }
                    }
                )
            );
            topEdges = topEdges.sort((a, b) => b.weight - a.weight);

            edgeList[node.id][pList] = {topEdges};
        })
    });
}*/

export const edges: DataSet<Edge> = new DataSet<Edge>();

