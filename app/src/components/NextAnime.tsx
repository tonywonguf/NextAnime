import SideBar from "./SideBar";
import React, {useLayoutEffect, useRef} from "react";
import {AnimeGraph} from "./AnimeGraph";
import {Network} from "vis-network"
import {DataSet} from "vis-data"
import {nodes} from "./Datafile"
import {v4 as uuidv4} from 'uuid'

const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

const graphSize = 100;
const initialNodes = nodes.slice(0,graphSize);
let initialEdges: DataSet<any> = new DataSet<any>();
for (let i = 0; i < 2*graphSize; i++) {
    let randomIndexInNode1 = i%graphSize;
    let randomIndexInNode2 = Math.floor(Math.random()*graphSize);
    while (randomIndexInNode2 == randomIndexInNode1)
        randomIndexInNode2 = Math.floor(Math.random()*graphSize);
    initialEdges.add({
        "from": nodes[randomIndexInNode1].id,
        "to": nodes[randomIndexInNode2].id,
        "color": randColor(),
        "id": uuidv4()
    })
}

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
        selectable: false,
        selectConnectedEdges: false
    },
    height: '100%'
};

export default function NextAnime() {
    let containerRef = useRef<HTMLDivElement>(null);
    // let nodesDataSet = new DataSet(nodes)
    let nodesDataSet = new DataSet(initialNodes)
    // let edgesDataSet = new DataSet(initialEdges)
    let animeGraph = new AnimeGraph(
        {
            containerRef: containerRef,
            nodes: nodesDataSet,
            edges: initialEdges,
            options: options
        });

    useLayoutEffect(() => {
        animeGraph.network = new Network(containerRef.current, {nodes: nodesDataSet, edges: initialEdges}, options)
    }, []);

    return (
        <div className="min-h-screen flex flex-col h-screen bg-[#2c2f33]">

            {/* Example Graph */}
            <main className="flex overflow-y-hidden h-full">

                {animeGraph.display()}

                <SideBar/>

            </main>
        </div>
    );
}