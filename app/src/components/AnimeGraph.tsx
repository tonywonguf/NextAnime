import {Network, FitOptions} from "vis-network";
import {DataSet} from "vis-data";
import React, {useRef, createRef, RefObject} from 'react';

const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

export type AnimeGraphInfo = {
    containerRef
    network: Network
    nodes: DataSet<any>
    edges: DataSet<any>
    fitOptions?: FitOptions
    options: object
}

export class AnimeGraph {
    containerRef
    network: Network
    nodes: DataSet<any>
    edges: DataSet<any>
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

        this.network = new Network(this.containerRef.current, {nodes: this.nodes, edges: this.edges}, this.options)
    }

    recolor() {
        this.edges.update(this.edges.map(e => ({...e, color: randColor()})));
    }

    refit() {
        this.network.fit(this.fitOptions);
    }

    display() {
        return (
            <div className={"w-8/12 h-full p-1"}>
                <div className={"bg-[#2c2f33] rounded flex h-full relative"}>
                    <div className={"absolute z-10"}>

                        <button className={"btn"}
                                onClick={this.recolor.bind(this)}>
                            Recolor!
                        </button>

                        <button className={"btn"}
                                onClick={() => this.network.fit(this.fitOptions)}>
                            Refit!
                        </button>

                    </div>

                    <div ref={this.containerRef} className={"flex"}></div>

                </div>
            </div>
        )
    }

}
