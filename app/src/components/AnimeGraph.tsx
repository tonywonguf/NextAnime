import {FitOptions, Network} from "vis-network";
import {DataSet} from "vis-data";
import {Edge, Node, nodes} from './Datafile'
import {v4 as uuidv4} from 'uuid';
import React from 'react';
import {getWeight} from "./ToolBox";
import VisButton, {GraphSizeButton} from "./VisButton";

const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

export type AnimeGraphInfo = {
    containerRef
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions?: FitOptions
    options: object
}

export class AnimeGraph {
    containerRef
    network: Network
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions: FitOptions
    options: object
    selectedParameters: object
    graphSize: number

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
    }

    refit() {
        this.network.fit(this.fitOptions);
    }

    recolor() {
        this.edges.update(this.edges.map(e => ({...e, color: randColor()})));
        console.log(this.selectedParameters);
    }

    chooseRandomNodeAndColorAdjacents() {
        const randomNodeId = this.nodes.getIds()[Math.floor(Math.random() * this.nodes.length)];

        // Color the adjacent edges and nodes
        const adjacentEdges = this.network.getConnectedEdges(randomNodeId);

        const color = "#ffffff"
        const updatedEdges = adjacentEdges.map((edgeId) => ({...this.edges.get(edgeId), color: color}));

        // Update the data sets and the network
        this.edges.update(updatedEdges);
    }

    initializeWeights(suggID, suggNode) : [Node[], Edge[]] {
        let edges: Edge[] = [];
        for (let j = 0; j < nodes.length; ++j) {
            if (j != suggID)
                edges.push(new Edge({
                    from: suggID,
                    to: j,
                    weight: getWeight(suggNode, nodes.get(j), this.selectedParameters),
                    color: randColor(),
                    id: uuidv4()
                }));
        }
        edges = edges.sort((a, b) => b.weight - a.weight).splice(0, this.graphSize-1);
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
                            color: randColor(),
                            id: uuidv4()
                        }));
                    }
                }
            )
        );
        topEdges = topEdges.sort((a, b) => b.weight - a.weight);
        return [topNodes, topEdges];
    }

    createMSTusingPrims() {
        if (this.nodes.length != 1) {
            if (this.nodes.length > 1)
                alert("Select only 1 anime!");
            else
                alert("You must select an anime before running Prim's!")
            return;
        }
        this.edges.clear();

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        const [topNodes, topEdges] = this.initializeWeights(suggID,suggNode)

        //Prim's Algorithm
        let processedNode: Set<number> = new Set<number>();
        let mstEdges: Edge[] = [];
        processedNode.add(suggNode.id);
        while (processedNode.size < topNodes.length) {
            const e: Edge = topEdges[0];
            topEdges.shift();
            if(processedNode.has(e.from) && !processedNode.has(e.to)){
                mstEdges.push(e);
                processedNode.add(e.to);
            }

        }
        this.nodes.add(topNodes.slice(1));
        this.edges.add(mstEdges);
    }

    createMSTusingKruskal() {
        if (this.nodes.length != 1) {
            if (this.nodes.length > 1)
                alert("Select only 1 anime!");
            else
                alert("You must select an anime before running Kruskal's!")
            return;
        }
        this.edges.clear();

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        const [topNodes, topEdges] = this.initializeWeights(suggID,suggNode)

        // Kruskal's Algorithm
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
        console.log(mstEdges);

        this.nodes.add(topNodes.slice(1));
        this.edges.add(mstEdges);
    }

    kruskalFind(components: Set<number>[], node: number) {
        for (const c of components)
            if (c.has(node))
                return c;
        components.push(new Set([node]));
        return components.at(-1);
    }

    suggestedAnimeList() {
        if (this.nodes.length != 1) {
            if (this.nodes.length > 1)
                alert("Select only 1 anime!");
            else
                alert("You must select an anime!")
            return;
        }
        this.edges.clear();

        let ids = this.nodes.getIds();
        let weights: Edge[] = []

        for (let j = 0; j < nodes.length; j++) {
            if (ids[0] == j) continue;
            weights.push(new Edge({
                from: ids[0],
                to: j,
                weight: getWeight(this.nodes.get(ids[0]), nodes.get(j), this.selectedParameters),
                color: randColor(),
                id: uuidv4()
            }));
        }

        let sortedWeights = weights.sort((a, b) => b.weight - a.weight)
            .splice(0, this.graphSize);

        sortedWeights = sortedWeights.map((e, i) => {
            if (i == 0) {
                const updatedNode = {...this.nodes.get(e.from), size: 50};
                this.nodes.update(updatedNode)
                return {...e, color: 'rgb(255,0,0)'};
            }
            return new Edge({...e, color: `rgb(${255},${i * (255/this.graphSize)},${i * (255/this.graphSize)})`,
                            from: sortedWeights[i - 1].to})
        });

        this.edges.add(sortedWeights);

        this.nodes.add(sortedWeights.map(e => (nodes.get(e.to) as Node)))

        let printout = sortedWeights.map((e, i) => {
            return {
                name: ((nodes.get(e.to)) as Node).label,
                weight: e.weight
            }
        });

        console.log(printout)

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
                <VisButton name="suggestedAnimeList!" func={() => this.suggestedAnimeList()}/>
                <VisButton name="clear!" func={() => this.clear()}/>
            </div>

            <div id='graph' ref={this.containerRef} className={"h-full relative flex-shrink-0 flex-grow w-8/12"}/>

        </>);
    }

}
