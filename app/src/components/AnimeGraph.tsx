import {FitOptions, Network} from "vis-network";
import {DataSet} from "vis-data";
import {Edge, Node, nodes} from './Datafile'
import {v4 as uuidv4} from 'uuid';
import React from 'react';
import {getWeight} from "./ToolBox";
import VisButton from "./VisButton";

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
        this.selectedParameters = {
            Title: true,
            Genre: false,
            Studio: false,
            Year: false,
            Episodes: false
        };
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

    initializeWeights(nodes, ids, weights) {
        //if (nodes.length != 1 || this.edges.length > 0) return;

        for (let i = 0; i < ids.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                if (ids[i] == j) continue;
                weights.push(new Edge({
                    from: ids[i],
                    to: j,
                    weight: getWeight(nodes.get(ids[i]), nodes.get(j), this.selectedParameters),
                    color: randColor(),
                    id: uuidv4()
                }));
            }
        }
        weights.sort((a, b) => b.weight - a.weight)
    }

    createMSTusingPrims() {
        if (this.nodes.length != 1 || this.edges.length > 0) return;
        let ids = this.nodes.getIds();
        let weights: Edge[] = []

    }

    createMSTusingKruskal() {

    }

    suggestedAnimeList() {
        if (this.nodes.length != 1 || this.edges.length > 0) return;

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
                            .splice(0, 50);

        sortedWeights = sortedWeights.map((e, i) => {
                if (i == 0) {
                    const updatedNode = {...this.nodes.get(e.from), size: 100};
                    this.nodes.update(updatedNode)
                    return {...e, color:'rgb(255,0,0)'};
                }
                return new Edge({...e,color:`rgb(${255},${i*5.1},${i*5.1})` , from: sortedWeights[i - 1].to})
            });

        this.edges.add(sortedWeights);

        this.nodes.add(sortedWeights.map(e => (nodes.get(e.to) as Node)))

        console.log(sortedWeights);
    }

    clear() {
        this.nodes.clear();
        this.edges.clear();
    }

    display() {
        return (<>
            <div className={"absolute z-10 w-0 h-0"}>
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
