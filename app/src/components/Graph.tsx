import {Network, FitOptions} from "vis-network";

const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

const fitOptions: FitOptions = {
    animation: {
        duration: 750,
        easingFunction: "linear"
    }
}

export type NodeInfo = {
    id: number,
    label: string,
    image: string,
    description?: string,
    tags?: string[]
}

export type Edge = {
    from: number,
    to: number,
    color?: string,
    id?: string
}

export class Node {
    static defaultProps = {
        description: "default value",
        tags: [],
        shape: "image",
        edgeNodes: []
    }
    id: number
    label: string
    image: string
    description?: string
    tags?: string[]
    edgeNodes: Node[]
    shape: string

    constructor(info: NodeInfo) {
        this.id = info.id;
        this.label = info.label;
        this.image = info.image;
        this.description = info.description;
        this.tags = info.tags;
        this.edgeNodes = Node.defaultProps.edgeNodes;
        this.shape = Node.defaultProps.shape;
    }
}

export type AnimeGraphInfo = {
    network: Network
    nodes: Node[]
    edges: Edge[]
}

export class AnimeGraph {
    network: Network
    nodes: Node[]
    edges: Edge[]

    constructor(info : AnimeGraphInfo) {
        this.network = info.network;
        this.nodes = info.nodes;
        this.edges = info.edges
    }

    recolor() {
        this.edges = this.edges.map(e => ({...e, color: randColor()}));
        console.log(this.edges);
    }

    refit() {
        const fitOptions: FitOptions = {
            animation: {
                duration: 750,
                easingFunction: "linear"
            }
        }
        this.network.fit(fitOptions);
    }


}
