import SideBar from "./SideBar";
import React, {useLayoutEffect, useRef} from "react";
import {AnimeGraph} from "./AnimeGraph";
import {Network} from "vis-network"
import {DataSet} from "vis-data"
import {Edge, Node} from './Datafile'

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
        labelHighlightBold: false
    },
    edges: {
        color: "#000000",
        width: 3,
        length: 100
    },
    physics: {
        forceAtlas2Based: {
            gravitationalConstant: -100,
            centralGravity: 0.02,
            springLength: 200
        },
        maxVelocity: 50,
        solver: 'forceAtlas2Based'
    },
    interaction: {
        selectable: true,
        selectConnectedEdges: false
    },
    height: '100%'
};

export default function NextAnime() {
    let containerRef = useRef<HTMLDivElement>(null);
    let animeGraph = new AnimeGraph(
        {
            containerRef: containerRef,
            nodes: new DataSet<Node>(),
            edges: new DataSet<Edge>(),
            options: options
        });

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