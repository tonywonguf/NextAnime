import {FitOptions, Network} from "vis-network";
import {DataSet} from "vis-data";
import {Edge, Node, nodes} from './Datafile'
import {v4 as uuidv4} from 'uuid';
import React from 'react';
import {getWeight} from "./ToolBox";
import VisButton, {GraphSizeButton} from "./VisButton";

//function for randomizing color strings
const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

export type AnimeGraphInfo = {
    containerRef
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions?: FitOptions
    options: object
}

//entire graph info
export class AnimeGraph {
    containerRef
    network: Network
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions: FitOptions
    options: object
    selectedParameters: object
    graphSize: number

    //uses passed in info to initialize graph
    constructor(info: AnimeGraphInfo) {
        this.containerRef = info.containerRef;
        this.nodes = info.nodes;
        this.edges = info.edges;
        this.options = info.options;
        this.fitOptions = {
            animation: {
                duration: 750,
                easingFunction: "linear"
            }
        }
        this.graphSize = 50;
    }

    refit() {
        this.network.fit(this.fitOptions);
    }

    //recolors all the existing edges with a random color
    //time: O(E), goes through all edges
    //space: O(1), doesnt augment space
    recolor() {
        this.edges.update(this.edges.map(e => ({...e, color: randColor()})));
    }

    //recolors adjacents of a random node
    //time: O(E), checks edgeList for node and updates adjacents
    //space: O(1), does not occupy space XD

    delay(ms: number = 1000) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    rgbToHex(r: number, g: number, b: number): string {
        const componentToHex = (c: number): string => {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    async bfsAnimation() {
        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        // Set all edges to gray
        this.edges.update(this.edges.map(e => ({...e, color: '#2c2f33'})));
        await this.delay();

        // BFS (with edge color updates)
        const Q: (Node | null)[] = [suggNode, null];
        const V: Set<Node> = new Set<Node>();
        V.add(suggNode);

        let depth = 0;
        while (Q.length > 0) {
            if (Q.at(0) != null) {
                const N: Node = Q.at(0);
                Q.shift();

                // Get neighbors (ignore direction, treat as undirected)
                const neighbors: Node[] = [];
                this.edges.forEach(e => {
                    if (e.from == N.id) { // @ts-ignore
                        neighbors.push(nodes.get(e.to));
                    }
                    if (e.to == N.id) { // @ts-ignore
                        neighbors.push(nodes.get(e.from));
                    }
                });

                for (const n of neighbors) {
                    if (!V.has(n)) {
                        Q.push(n);
                        V.add(n);

                        this.edges.forEach(e => {
                            if (e.from == n.id && e.to == N.id || e.from == N.id && e.to == n.id) {
                                const c = Math.round(255 * Math.pow(8 / 12, depth));
                                this.edges.update([{
                                    ...e,
                                    color: this.rgbToHex(255, 255 - c, 255 - c)
                                }]);
                            }
                        });
                    }
                }
            } else {
                Q.shift();
                ++depth;
                if (Q.length > 0)
                    Q.push(null);
                await this.delay();
            }
        }
    }

    chooseRandomNodeAndColorAdjacents() {
        // Color the adjacent edges and nodes
        // Edges recolored
        // Update the data sets and the network
        this.edges.update(this.network.getConnectedEdges(this.nodes.getIds()[Math.floor(Math.random() * this.nodes.length)]).map((edgeId) => ({
            ...this.edges.get(edgeId),
            color: '#ffffff'
        })))
    }

    //time: O(nodes*getWeight() + graphSize^2)
    //iterates through all nodes making weights,
    //iterates through graphSize making all edges (and sorts)
    //space: O(nodes + graphSize^2)
    initializeWeights(suggID, suggNode): [Node[], Edge[]] {
        let edges: Edge[] = [];

        //makes outward edges using suggNode
        for (let j = 0; j < nodes.length; ++j) {
            if (j != suggID)
                edges.push(new Edge({
                    from: suggID,
                    to: j,
                    weight: getWeight(suggNode, nodes.get(j), this.selectedParameters),
                    color: 'rbg(127, 0, 255)',
                    id: uuidv4()
                }));
        }

        edges = edges.sort((a, b) => b.weight - a.weight).splice(0, this.graphSize - 1);
        // Get the top nodes
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
                            color: 'rgb(200,73,255)',
                            id: uuidv4()
                        }));
                    }
                }
            )
        );
        topEdges = topEdges.sort((a, b) => b.weight - a.weight);
        return [topNodes, topEdges];
    }

    //time: O(nodes + graphSize^2), same as initWeights
    //space: O(nodes + graphSize^2), same as initWeights
    setTime(time: number) {
        document.getElementById('time').textContent = (time / 1000).toFixed(3) + ' sec';
    }

    createMSTusingPrims() {
        if (this.nodes.length == 0) {
            alert("You must select an anime!")
            return;
        }

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        this.edges.clear();
        this.nodes.clear();
        this.nodes.add(suggNode);

        const [topNodes, topEdges] = this.initializeWeights(suggID, suggNode)

        //Prim's Algorithm
        //time: O(Edges^2), go through edges until done :D
        //space: O(graphSize), as many nodes as graphSize
        const timeStart = performance.now();
        let processedNode: Set<number> = new Set<number>();
        let mstEdges: Edge[] = [];
        processedNode.add(suggNode.id);
        while (processedNode.size < topNodes.length) {
            const e: Edge = topEdges[0];
            topEdges.shift();
            if (processedNode.has(e.from) && !processedNode.has(e.to)) {
                mstEdges.push(e);
                processedNode.add(e.to);
            }

        }
        const timeEnd = performance.now();
        this.setTime(timeEnd - timeStart);

        this.nodes.add(topNodes.splice(1))
        this.edges.add(mstEdges)

        console.log(mstEdges);
    }

    //time: O(nodes + graphSize^2), same as initWeights
    //space: O(nodes + graphSize^2), same as initWeights
    createMSTusingKruskal() {
        if (this.nodes.length == 0) {
            alert("You must select an anime!")
            return;
        }

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        this.edges.clear();
        this.nodes.clear();
        this.nodes.add(suggNode);

        const [topNodes, topEdges] = this.initializeWeights(suggID, suggNode)

        // Kruskal's Algorithm
        // time: O(Edges log(Edges))
        // space: O(graphSize)
        const timeStart = performance.now();
        let addedNode: Set<number> = new Set<number>();
        let mstEdges: Edge[] = [];
        let components: Set<number>[] = [];
        while (addedNode.size < topNodes.length) {
            const currEdge: Edge = topEdges[0];
            topEdges.shift();

            let c1 = this.kruskalFind(components, currEdge.from),
                c2 = this.kruskalFind(components, currEdge.to);
            if (c1 != c2) {
                c2.forEach(n => c1.add(n));
                components = components.filter(c => c != c2);
                mstEdges.push(currEdge);
            }

            addedNode.add(currEdge.from);
            addedNode.add(currEdge.to);
        }
        const timeEnd = performance.now();
        this.setTime(timeEnd - timeStart);

        this.nodes.add(topNodes.slice(1));
        this.edges.add(mstEdges);
    }

    //time: O(log(Edges)) checks through sorted edges if contains node
    //space: O(1) adds to end
    kruskalFind(components: Set<number>[], node: number) {
        for (const c of components)
            if (c.has(node))
                return c;
        components.push(new Set([node]));
        return components.at(-1);
    }

    //time: O(nodes)
    //space: O(edges)
    suggestedAnimeList() {
        if (this.nodes.length == 0) {
            alert("You must select an anime!")
            return;
        }

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        this.edges.clear();
        this.nodes.clear();
        this.nodes.add(suggNode);

        let weights: Edge[] = []

        for (let j = 0; j < nodes.length; j++) {
            if (suggID == j) continue;
            weights.push(new Edge({
                from: suggID,
                to: j,
                weight: getWeight(suggNode, nodes.get(j), this.selectedParameters),
                color: randColor(),
                id: uuidv4()
            }));
        }

        let sortedWeights = weights.sort((a, b) => b.weight - a.weight)
            .splice(0, this.graphSize);

        sortedWeights = sortedWeights.map((e, i) => {
            if (i == 0) {
                const updatedNode = {...suggNode, size: 80, fixed: true};
                this.nodes.update(updatedNode)
                return {...e, color: `rgb(127, 0, 255)`};
            }
            return new Edge({
                ...e, color: `rgb(${127 + i * (127 / this.graphSize)}, ${i * (255 / this.graphSize)}, ${255})`,
                from: sortedWeights[i - 1].to
            })
        });

        this.edges.add(sortedWeights);
        this.nodes.add(sortedWeights.map(e => (nodes.get(e.to) as Node)))
    }

    clear() {
        this.nodes.clear();
        this.edges.clear();
    }

    display() {
        return (<>
            <div className={"absolute z-10 w-0 h-0"}>
                <GraphSizeButton animeGraph={this}/>
                {/* Visualization Buttons*/}
                <VisButton name="Refit!" func={() => this.refit()}/>
                <VisButton name="Recolor!" func={() => this.recolor()}/>
                <VisButton name="Poop!" func={() => this.chooseRandomNodeAndColorAdjacents()}/>
                <VisButton name="primsMST!" func={() => this.createMSTusingPrims()}/>
                <VisButton name="kruskalMST!" func={() => this.createMSTusingKruskal()}/>
                <VisButton name="BFS Animation!" func={() => this.bfsAnimation()}/>
                <VisButton name="suggestedAnimeList!" func={() => this.suggestedAnimeList()}/>
                <VisButton name="clear!" func={() => this.clear()}/>
            </div>

            <div id='graph' ref={this.containerRef} className={"h-full relative flex-shrink-0 flex-grow w-8/12"}/>
        </>);
    }

}
