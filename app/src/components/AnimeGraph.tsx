import {Network, FitOptions} from "vis-network";
import {DataSet} from "vis-data";
import {nodes, Node, Edge} from './Datafile'
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

export type AnimeGraphInfo = {
    containerRef
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions?: FitOptions
    options: object
}

function visButton(name, func: Function) {
    return (
        <button className={"btn"}
                onClick={func.bind(this)}>
            {name}
        </button>
    );
}

export class AnimeGraph {
    containerRef
    network: Network
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions: FitOptions
    options: object

    constructor(info : AnimeGraphInfo) {
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

    recolor() {
        this.edges.update(this.edges.map(e => ({...e, color: randColor()})));
    }

    refit() {
        this.network.fit(this.fitOptions);
    }

    chooseRandomNodeAndColorAdjacents() {
        const randomNodeId = this.nodes.getIds()[Math.floor(Math.random() * this.nodes.length)];
        console.log(this.nodes.get(randomNodeId).label);
        // Color the adjacent edges and nodes
        const adjacentEdges = this.network.getConnectedEdges(randomNodeId);
        const color = "#ffffff"
        const updatedEdges = adjacentEdges.map((edgeId) => ({ ...this.edges.get(edgeId), color: color }));

        // Update the data sets and the network
        this.edges.update(updatedEdges);
        // this.network.redraw();
    }

    createMSTusingPrims() {
        if (this.nodes.length <= 1) return;

    }

    createMSTusingKruskal() {
        if (this.nodes.length <= 1) return;

    }

    getWeight(a : Node, b : Node) {
        const interTags = a.tags.filter(tag => b.tags.includes(tag));
        const arrayA = a.studios.map(info => info.name)
        const arrayB = b.studios.map(info => info.name)
        const interStudios = arrayA.filter(studio => arrayB.includes(studio));
        return interTags.length*2 + interStudios.length*5;
    }

    suggestedAnimeList() {
        if (this.nodes.length != 1 || this.edges.length > 0) return;
        let ids = this.nodes.getIds();
        let weights : Edge[] = []

        for (let i = 0; i < ids.length; i++) {
            // if (this.nodes.length == 1)
                for (let j = 0; j < nodes.length; j++) {
                    if (ids[i] == j) continue;
                    weights.push(new Edge({
                        from: ids[i],
                        to: j,
                        weight: this.getWeight(this.nodes.get(ids[i]), nodes.get(j)),
                        color: randColor(),
                        id: uuidv4()
                    }));
                }
            // else
            //     for (let j = i+1; j < ids.length; j++)
            //         weights.push(new Edge({
            //                         from: ids[i],
            //                         to: ids[j],
            //                         weight: this.getWeight(nodes.get(ids[i]), nodes.get(ids[j])),
            //                         color: randColor(),
            //                         id: uuidv4()}))
        }
        weights.sort((a, b) => a.weight - b.weight)
        let sortedWeights = weights.splice(0,Math.max(50,ids.length));
        sortedWeights = sortedWeights.map((e,i) => {
            if (i == 0) {
                const updatedNode = {...this.nodes.get(e.from), size:100};
                this.nodes.update(updatedNode)
                return e;
            }
            return new Edge({...e,from: sortedWeights[i-1].to})}
        );
        this.edges.add(sortedWeights);
        if (this.nodes.length == 1)
            this.nodes.add(sortedWeights.map(e => (nodes.get(e.to) as Node)))
        console.log(this.nodes.get())
        console.log(this.edges.get())
    }

    display() {
        return (<>
            <div className={"absolute z-10 w-0 h-0"}>
                {/* Visualization Buttons*/}
                {visButton("Refit!", () => this.refit())}
                {visButton("Recolor!", () => this.recolor())}
                {visButton("Poop!", () => this.chooseRandomNodeAndColorAdjacents())}
                {visButton("primsMST!", () => this.createMSTusingPrims())}
                {visButton("kruskalMST!", () => this.createMSTusingKruskal())}
                {visButton("suggestedAnimeList!", () => this.suggestedAnimeList())}
                {visButton("clear!", () => {this.nodes.clear(); this.edges.clear()})}
            </div>

            <div id='graph' ref={this.containerRef} className={"h-full relative flex-shrink-0 flex-grow w-8/12"}/>

            </>);
    }

}
