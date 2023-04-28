import SideBar from "./SideBar";
import React, {useLayoutEffect, useRef} from "react";
import {AnimeGraph} from "./AnimeGraph";
import {Network} from "vis-network"
import {DataSet} from "vis-data"
import {Edge, Node} from './Datafile'

//graph options
const options = {
    layout: {
        hierarchical: false
    },
    nodes: {
        font: {
            color: '#80848e',
            face: 'monospace'
        },
        shape: 'image',
        image: 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg',
        labelHighlightBold: false,
        size: 50
    },
    edges: {
        color: "#000000",
        width: 10,
    },
    physics: {
        repulsion: {
            nodeDistance: 400,
            springLength: 10,
            avoidOverlap: 0.2,
            damping: 0.015
        },
        maxVelocity: 200,
        minVelocity: 10,
        solver: 'repulsion'
    },
    interaction: {
        selectable: true,
        selectConnectedEdges: false
    },
    height: '100%'
};
//the entire application
export default function NextAnime() {
    let containerRef = useRef<HTMLDivElement>(null);
    let animeGraph = new AnimeGraph(
        {
            containerRef: containerRef,
            nodes: new DataSet<Node>(),
            edges: new DataSet<Edge>(),
            options: options
        }
    );
    //sets the visual effects for the graph based on its container, the nodes, edges, and the defined options
    useLayoutEffect(() => {
        animeGraph.network = new Network(containerRef.current, {
            nodes: animeGraph.nodes,
            edges: animeGraph.edges
        }, options)
    }, []);

    return (
        <main className="h-screen w-screen flex flex-row overflow-y-hidden overflow-x-hidden bg-[#2c2f33]">

            {/* Example Graph */}
            {animeGraph.display()}

            <SideBar animeGraph={animeGraph}/>

            <div id="time"
                 className={"z-20 absolute bottom-0 left-0 rounded m-[1vh] p-[1vh] text-white font-mono text-[2vh]"}>
                Run an algorithm for timing!
            </div>
        </main>
    );
}