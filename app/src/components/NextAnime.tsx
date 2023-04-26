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
        width: 3,
        length: 20
    },
    physics: {
        forceAtlas2Based: {
            gravitationalConstant: -200,
            centralGravity: 0.03,
            springLength: 150,
            avoidOverlap: 1,
            theta: 0.8
        },
        barnesHut: {
            gravitationalConstant: -50000,
            centralGravity: 0.8,
            springLength: 200,
            springConstant: 0.3,
            damping: 0.3,
            avoidOverlap: 0.2,
            theta: 0.8
        },
        maxVelocity: 50,
        solver: 'barnesHut'
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
        });
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
        </main>
    );
}