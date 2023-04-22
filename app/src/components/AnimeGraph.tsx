import {FitOptions, Network} from "vis-network";
import Graph from "react-graph-vis";

const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

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
    id: number
    label: string
    image: string
    description?: string
    tags?: string[]
    edgeNodes?: Node[]
    shape?: string

    constructor(info: NodeInfo) {
        this.id = info.id;
        this.label = info.label;
        this.image = info.image;
        this.description = "default value"
        this.tags = [];
        this.edgeNodes = [];
        this.shape = "image"
    }

    // DFS for edges [given depth] (0 gets current)
    // returns Set<Edge>
    getEdges(depth: number, edges: Set<Edge> = new Set<Edge>()): Set<Edge> {
        if (depth > 0) { // Add edges
            this.edgeNodes.forEach((child: Node) => {
                edges.add({from: this.id, to: child.id})
                child.getEdges(depth - 1, edges);
            });
        }
        return edges;
    }
}

export type AnimeGraphInfo = {
    graphKey: string
    network: Network
    nodes: Node[]
    edges: Edge[]
    setNodes: (nodes) => void;
    setEdges: (edges) => void;
    setNetwork: (network) => void;
    fitOptions?: FitOptions
    options: object
}

export class AnimeGraph {
    graphKey: string
    network: Network
    nodes: Node[]
    edges: Edge[]
    setNodes: (nodes) => void;
    setEdges: (edges) => void;
    setNetwork: (network) => void;
    fitOptions: FitOptions
    options: object

    constructor(info: AnimeGraphInfo) {
        this.network = info.network;
        this.nodes = info.nodes;
        this.edges = info.edges
        this.setNodes = info.setNodes;
        this.setEdges = info.setEdges;
        this.setNetwork = info.setNetwork;
        this.fitOptions = {
            animation: {
                duration: 750,
                easingFunction: "linear"
            }
        }
        this.options = info.options;

        this.edges.forEach((edge: Edge) => {
            this.nodes[edge.from].edgeNodes.push(this.nodes[edge.to]);
            this.nodes[edge.to].edgeNodes.push(this.nodes[edge.from]);
        })
    }

    recolor() {
        this.edges = this.edges.map(e => ({...e, color: randColor()}));
        this.setEdges(this.edges);
    }

    refit() {
        this.network.fit(this.fitOptions);
    }

    display() {
        return (
            <Graph
                key={this.graphKey}
                graph={{nodes: this.nodes, edges: this.edges}}
                options={this.options}
                getNetwork={newNetwork => this.setNetwork(newNetwork)}
            />
        )
    }
}