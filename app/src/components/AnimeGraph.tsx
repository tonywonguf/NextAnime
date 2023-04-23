import {Network, FitOptions} from "vis-network";
import {DataSet} from "vis-data";
import React from 'react';

const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

export type AnimeGraphInfo = {
    containerRef
    nodes: DataSet<any>
    edges: DataSet<any>
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
    nodes: DataSet<any>
    edges: DataSet<any>
    fitOptions: FitOptions
    options: object
//hello
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

    display() {
        return (
            <div className={"flex h-full relative w-8/12 h-full"}>

                {/* Visualization Buttons*/}
                <div className={"absolute z-10"}>
                    {visButton("Refit!", () => this.refit())}
                    {visButton("Recolor!", () => this.recolor())}
                    {visButton("Poop!", () => this.chooseRandomNodeAndColorAdjacents())}
                </div>

                {/* reference to the actual graph */}
                <div ref={this.containerRef} className={"flex"}></div>

            </div>
        );
    }

}
