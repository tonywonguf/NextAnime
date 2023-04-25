import {FitOptions, Network} from "vis-network";
import {DataSet} from "vis-data";
import {Edge, Node, nodes} from './Datafile'
import {v4 as uuidv4} from 'uuid';
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
            Genre: false,
            Studio: false,
            Year: false,
            Episodes: false,
            Chapters: false,
            MediaType: false
        };
    }

    recolor() {
        this.edges.update(this.edges.map(e => ({...e, color: randColor()})));
        console.log(this.selectedParameters);
    }

    refit() {
        this.network.fit(this.fitOptions);
    }

    chooseRandomNodeAndColorAdjacents() {
        const randomNodeId = this.nodes.getIds()[Math.floor(Math.random() * this.nodes.length)];
        //console.log(this.nodes.get(randomNodeId).label);
        // Color the adjacent edges and nodes
        const adjacentEdges = this.network.getConnectedEdges(randomNodeId);
        const color = "#ffffff"
        const updatedEdges = adjacentEdges.map((edgeId) => ({...this.edges.get(edgeId), color: color}));

        // Update the data sets and the network
        this.edges.update(updatedEdges);
        // this.network.redraw();
    }
    getWeight(a: Node, b: Node) {
        const similarTitle = 5/this.levenshteinDistance(a.label, b.label) + (b.label.indexOf(a.label)!==-1 ? 41 : 0) + (a.label.indexOf(b.label)!==-1 ? 41 : 0);

        const interTags = a.tags.filter(tag => b.tags.includes(tag));

        const arrayA = a.studios.map(info => info.name)
        const arrayB = b.studios.map(info => info.name)
        const interStudios = arrayA.filter(studio => arrayB.includes(studio));

        const similarYear = Math.abs(a.seasonYear-b.seasonYear) < 3 ? 7: Math.abs(a.seasonYear - b.seasonYear) < 7 ? 3 : 1;

        const similarEpisodes = Math.abs(a.episodes-b.episodes) < 12 ? 7: Math.abs(a.episodes - b.episodes) < 50 ? 3 : 1;

        const similarChapters = Math.abs(a.chapters-b.chapters) < 25 ? 7: Math.abs(a.chapters - b.chapters) < 50 ? 3 : 1;

        const sameMediaType = (a.mediaType == b.mediaType) ? 1 : 0

        return (
            this.selectedParameters["Title"] && similarTitle
            + (this.selectedParameters["Genre"] && (interTags.length+1)*(interTags.length+2)/2))
            + (this.selectedParameters["Studio"] && (interStudios.length)*(interStudios.length+1)/2)
            + (this.selectedParameters["Year"] && similarYear)
            + (this.selectedParameters["Episodes"] && similarEpisodes)
            + (this.selectedParameters["Chapters"] && similarChapters)
            + (this.selectedParameters["MediaType"] && sameMediaType);
    }
    initializeWeights(nodes, ids, weights) {
        //if (nodes.length != 1 || this.edges.length > 0) return;

        for (let i = 0; i < ids.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                if (ids[i] == j) continue;
                weights.push(new Edge({
                    from: ids[i],
                    to: j,
                    weight: this.getWeight(nodes.get(ids[i]), nodes.get(j)),
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
        if (this.nodes.length <= 1) return;

        let ids = this.nodes.getIds();
        let weights: Edge[] = [];
        //init weights
        for (let i = 0; i < ids.length; i++) {
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
        }
        weights.sort((a, b) => b.weight - a.weight)
    }

    jaroWinklerDistance(s1: string, s2: string, p: number = 0.3): number {
        // Calculate Jaro distance
        const len1 = s1.length;
        const len2 = s2.length;
        const windowSize = Math.floor(Math.max(len1, len2) / 2) - 1;

        const matches: boolean[] = new Array(len2).fill(false);
        let matchesCount = 0;

        for (let i = 0; i < len1; i++) {
            const start = Math.max(0, i - windowSize);
            const end = Math.min(len2 - 1, i + windowSize);

            for (let j = start; j <= end; j++) {
                if (!matches[j] && s1[i] === s2[j]) {
                    matches[j] = true;
                    matchesCount++;
                    break;
                }
            }
        }

        const jaro = matchesCount === 0 ? 0 : (
            (matchesCount / len1 + matchesCount / len2 + (matchesCount - (windowSize + 1) * (matchesCount / len2 - matchesCount / len1)) / matchesCount) / 3
        );

        // Calculate Jaro-Winkler distance
        let prefixLength = 0;
        while (prefixLength < 4 && prefixLength < len1 && prefixLength < len2 && s1[prefixLength] === s2[prefixLength]) {
            prefixLength++;
        }

        return jaro + prefixLength * p * (1 - jaro);
    }

    levenshteinDistance(string1, string2){
        let distances: number[][] = new Array(string1.length);
        for (let i = 0; i < string1.length; i++) {
            distances[i] = new Array(string2.length).fill(0);
        }

        for(let i = 1; i < string1.length; i++) {
            distances[i][0] = i;
        }

        for(let j = 1; j < string2.length; j++) {
            distances[0][j] = j;
        }

        for(let j = 1; j < string2.length; j++) {
            for(let i = 1; i < string1.length; i++) {
                let substCost;
                if(string1[i]===string2[j]){
                    substCost=0;
                }
                else{
                    substCost=1;
                }
                distances[i][j] = Math.min(distances[i-1][j]+1, distances[i][j-1]+1, distances[i-1][j-1]+substCost)
            }
        }
        return distances[string1.length-1][string2.length-1];
    }

    suggestedAnimeList() {
        if (this.nodes.length != 1 || this.edges.length > 0) return;

        let ids = this.nodes.getIds();
        let weights: Edge[] = []

        for (let i = 0; i < ids.length; i++) {
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
        }
        weights.sort((a, b) => b.weight - a.weight)
        let sortedWeights = weights.splice(0, Math.max(50, ids.length));
        sortedWeights = sortedWeights.map((e, i) => {
                if (i == 0) {
                    const updatedNode = {...this.nodes.get(e.from), size: 100};
                    this.nodes.update(updatedNode)
                    return {...e, color:'rgb(255,255,255)'};
                }
                return new Edge({...e,color:`rgb(${255-i*5},${255-i*5},${255-i*5})` , from: sortedWeights[i - 1].to})
            });

        this.edges.add(sortedWeights);

        this.nodes.add(sortedWeights.map(e => (nodes.get(e.to) as Node)))

        console.log(weights);
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
                {visButton("clear!", () => {
                    this.nodes.clear();
                    this.edges.clear()
                })}
            </div>

            <div id='graph' ref={this.containerRef} className={"h-full relative flex-shrink-0 flex-grow w-8/12"}/>

        </>);
    }

}
