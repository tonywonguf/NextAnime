import {FitOptions, Network} from "vis-network";
import {DataSet} from "vis-data";
import {Edge, Node, nodes} from './Datafile'
import {v4 as uuidv4} from 'uuid';
import React from 'react';
import {getWeight} from "./ToolBox";
import VisButton, {GraphSizeButton} from "./VisButton";
import {Id} from "vis-data/declarations/data-interface";

//function for randomizing color strings
const randColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

export type AnimeGraphInfo = {
    containerRef
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions?: FitOptions
    options: object
}

//entire graph info
export class AnimeGraph {
    containerRef
    network: Network
    nodes: DataSet<Node>
    edges: DataSet<Edge>
    fitOptions: FitOptions
    options: object
    selectedParameters: object
    graphSize: number

    //uses passed in info to initialize graph
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
        this.graphSize = 50;
    }

    refit() {
        this.network.fit(this.fitOptions);
    }

    //recolors all the existing edges with a random color
    //time: O(E), goes through all edges
    //space: O(1), doesnt augment space
    recolor() {
        this.edges.update(this.edges.map(e => ({...e, color: randColor()})));
    }

    //recolors adjacents of a random node
    //time: O(E), checks edgeList for node and updates adjacents
    //space: O(1), does not occupy space XD
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    longestPath(n: Id): number {

        const Q: {id: Id, d: number}[] = [{id: n, d: 0}];
        const V: Set<Id> = new Set<Id>();
        V.add(n)

        let depth = 0;
        while (Q.length > 0) {
            const front = Q.shift();
            this.network.getConnectedNodes(front.id).forEach(id => {
                if (!V.has(id)) {
                    depth = front.d+1;
                    Q.push({id, d: depth})
                    V.add(id)
                }
            })
        }

        return depth;
    }

    hideShowSidebar() {
        const buttons = document.getElementById("buttons");
        buttons.classList.toggle('invisible');
    }

    async bfsAnimation() {
        this.hideShowSidebar();

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        const colorDivisor = this.longestPath(suggID);

        // Set all edges to gray
        this.edges.update(this.edges.map(e => ({...e, color: '#2c2f33'})));
        await this.delay(450);

        // BFS (with edge color updates)
        const Q: (Node | null)[] = [suggNode, null];
        const V: Set<Node> = new Set<Node>();
        V.add(suggNode);

        let depth = 0;
        while (Q.length > 0) {
            const N: Node = Q.shift()

            if (N == null) {
                depth++;
                if (Q.length > 0) {
                    Q.push(null);
                    await this.delay(85-20*(Math.log2(this.graphSize/25)));
                }
                continue;
            }

            // Get neighbors (ignore direction, treat as undirected)
            const neighbors: Node[] = [];
            this.edges.forEach(e => {
                if (e.from == N.id) { // @ts-ignore
                    neighbors.push(nodes.get(e.to));
                }
                if (e.to == N.id) { // @ts-ignore
                    neighbors.push(nodes.get(e.from));
                }
            });
            const updatedNodes = []
            for (const n of neighbors) {
                if (!V.has(n)) {
                    Q.push(n);
                    V.add(n);


                    this.edges.forEach(e => {
                        if (e.from == n.id && e.to == N.id || e.from == N.id && e.to == n.id) {
                            const c = depth*255/colorDivisor;
                            updatedNodes.push({...e, color: `rgb(${255},${c},${c})`, width: 25})
                        }
                    });
                }
            }
            this.edges.update(updatedNodes);
        }
        this.hideShowSidebar();
    }

    /*
    async dfsAnimation() {
        this.hideShowSidebar();

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        const colorDivisor = this.longestPath(suggID);

        // Set all edges to gray
        this.edges.update(this.edges.map(e => ({...e, color: '#2c2f33'})));
        await this.delay(450);

        // DFS (with edge color updates)
        const S: {node: Node,d: number}[] = [{node: suggNode, d: 0}];
        const V: Set<Node> = new Set<Node>();
        V.add(suggNode);

        while (S.length > 0) {
            const N: {node: Node,d: number} = S.pop();

            // Get neighbors (ignore direction, treat as undirected)
            const neighbors: {node: Node, d: number}[] = [];
            this.edges.forEach(e => {
                if (e.from == N.node.id) { // @ts-ignore
                    neighbors.push({node: nodes.get(e.to), d: N.d+1});
                }
                if (e.to == N.node.id) { // @ts-ignore
                    neighbors.push({node: nodes.get(e.from), d: N.d+1});
                }
            });

            for (const n of neighbors) {
                if (!V.has(n.node)) {
                    V.add(n.node);
                    S.push({node: n.node, d: N.d+1});

                    this.edges.forEach(e => {
                        if (e.from == S.at(-1).node.id && e.to == N.node.id || e.from == N.node.id && e.to == S.at(-1).node.id) {
                            const c = N.d*255/colorDivisor;
                            const updatedNode = {...e, color: `rgb(${255},${c},${c})`, width: 15}
                            this.edges.update(updatedNode);
                        }
                    });

                    await this.delay(85-20*(Math.log2(this.graphSize/25)));
                }
            }
        }

        this.hideShowSidebar();
    }
    */

    /**
     * // TODO: comments!
     * // FIXME: fuck me
     *
     * @param start - Node that designates start of path
     * @param end - Node that designates end of path
     * @returns {Edge[]} The list of edges from a start node to an end node
     * @throws
     * @deprecated click
     * @inheritDoc the
     * @callback brown
     * @private text
     * @protected while
     * @public holding
     * @readonly down
     * @static CTRL
     * @template
     * @see {@link http://github.com}
     * @see {@link https://www.pornhub.com} <-- look how epic this is written!
     * @time O(nodes + grpahSize^2)
     * @space O(nodes + graphSize^2)
     */
    edgePath(start: Node, end: Node): Edge[] {
        const pathNodes: Id[] = [start.id];
        const visited: Set<Id> = new Set<Id>();
        let currID: Id = start.id;
        while (currID != end.id) {
            visited.add(currID);
            // @ts-ignore
            const unvisitedNeighbors: Id[] = this.network.getConnectedNodes(currID).filter(n => !visited.has(n));
            if (unvisitedNeighbors.length == 0) { // Back-track
                pathNodes.pop();
                currID = pathNodes.at(-1);
            } else { // Go deeper
                pathNodes.push(unvisitedNeighbors[0]);
                currID = unvisitedNeighbors[0];
            }
        }

        const pathEdges: Edge[] = [];
        for (let i = 0; i < pathNodes.length - 1; ++i) {
            const n_id1 = pathNodes[i],
                n_id2 = pathNodes[i + 1];
            this.edges.forEach(e => {
                if (e.from == n_id1 && e.to == n_id2 || e.from == n_id2 && e.to == n_id1)
                    pathEdges.push(e);
            });
        }
        return pathEdges;
    }

    /**
     * // FIXME: this shit takes way too long on 400 graph size pls fix
     */
    async dfsAnimation() {
        this.hideShowSidebar();

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        const colorDivisor = this.longestPath(suggID);

        // DFS (with edge color updates)
        const stack: Node[] = [suggNode];
        const visited: Set<Node> = new Set<Node>();
        while (stack.length > 0) {
            const N: Node = stack.pop();

            if (!visited.has(N)) {
                visited.add(N);

                // Animation
                this.edges.update(this.edges.map(e => ({...e, color: '#808080'})));
                const path: Edge[] = this.edgePath(suggNode, N);
                path.forEach((e, i) => {
                    const c = i*200/colorDivisor;
                    const updatedEdge = {...e, color: `rgb(${200},${c},${c})`, width: 15}
                    this.edges.update(updatedEdge)
                });
                await this.delay(85-20*(Math.log2(this.graphSize/25)));

                this.network.getConnectedNodes(N.id).map(n_id => this.nodes.get(n_id)).forEach(n => {
                        // @ts-ignore
                        if (!visited.has(n)) {
                            // @ts-ignore
                            stack.push(n);
                        }
                    }
                );
            }
        }
        this.edges.update(this.edges.map(e => ({...e, color: '#808080'})));
        this.hideShowSidebar();
    }

    //time: O(nodes*getWeight() + graphSize^2)
    //iterates through all nodes making weights,
    //iterates through graphSize making all edges (and sorts)
    //space: O(nodes + graphSize^2)
    initializeWeights(suggID, suggNode): [Node[], Edge[]] {
        let edges: Edge[] = [];

        //makes outward edges using suggNode
        for (let j = 0; j < nodes.length; ++j) {
            if (j != suggID)
                edges.push(new Edge({
                    from: suggID,
                    to: j,
                    weight: getWeight(suggNode, nodes.get(j), this.selectedParameters),
                    color: 'rbg(127, 0, 255)',
                    id: uuidv4()
                }));
        }

        edges = edges.sort((a, b) => b.weight - a.weight).splice(0, this.graphSize - 1);
        // Get the top nodes
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
                            color: 'rgb(200,73,255)',
                            id: uuidv4()
                        }));
                    }
                }
            )
        );
        topEdges = topEdges.sort((a, b) => b.weight - a.weight);
        return [topNodes, topEdges];
    }

    setTime(algorithm: string, time: number) {
        const element = document.getElementById('time');

        time /= 1000;
        element.textContent = algorithm + " ran in " + (time < 0.001 ? '<0.001 sec' : `${time.toFixed(3)} sec`);
    }

    async createMSTusingPrims() {
        if (this.nodes.length == 0) {
            alert("You must select an anime!")
            return;
        }

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        this.edges.clear();
        this.nodes.clear();
        this.nodes.add(suggNode);

        const [topNodes, topEdges] = this.initializeWeights(suggID, suggNode)

        //Prim's Algorithm
        //time: O(Edges^2), go through edges until done :D
        //space: O(graphSize), as many nodes as graphSize
        const timeStart = performance.now();
        let processedNode: Set<Id> = new Set<Id>();
        let mstEdges: Edge[] = [];
        processedNode.add(suggNode.id);
        while (processedNode.size < topNodes.length) {
            const e: Edge = topEdges[0];
            topEdges.shift();
            if (processedNode.has(e.from) && !processedNode.has(e.to)) {
                mstEdges.push(e);
                processedNode.add(e.to);
            }

        }
        const timeEnd = performance.now();
        await this.setTime("Prim's",timeEnd - timeStart);

        this.nodes.update(topNodes.slice(1));
        this.edges.add(mstEdges);
    }

    //time: O(nodes + graphSize^2), same as initWeights
    //space: O(nodes + graphSize^2), same as initWeights
    async createMSTusingKruskal() {
        if (this.nodes.length == 0) {
            alert("You must select an anime!")
            return;
        }

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        this.edges.clear();
        this.nodes.clear();
        this.nodes.add(suggNode);

        const [topNodes, topEdges] = this.initializeWeights(suggID, suggNode)

        // Kruskal's Algorithm
        // time: O(Edges log(Edges))
        // space: O(graphSize)
        const timeStart = performance.now();
        let addedNode: Set<Id> = new Set<Id>();
        let mstEdges: Edge[] = [];
        let components: Set<number>[] = topNodes.map(n => new Set([n.id]));
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
        const timeEnd = performance.now();
        await this.setTime("Kruskal's", timeEnd - timeStart);

        this.nodes.update(topNodes.slice(1));
        this.edges.add(mstEdges);
    }

    //time: O(log(Edges)) checks through sorted edges if contains node
    //space: O(1) adds to end
    kruskalFind(components: Set<Id>[], node: number) {
        for (const c of components)
            if (c.has(node))
                return c;
        return null;
    }

    //time: O(nodes)
    //space: O(edges)
    suggestedAnimeList() {
        if (this.nodes.length == 0) {
            alert("You must select an anime!")
            return;
        }

        const suggID = this.nodes.getIds()[0],
            suggNode: Node = nodes.get(suggID);

        this.edges.clear();
        this.nodes.clear();
        this.nodes.add(suggNode);

        let weights: Edge[] = []

        for (let j = 0; j < nodes.length; j++) {
            if (suggID == j) continue;
            weights.push(new Edge({
                from: suggID,
                to: j,
                weight: getWeight(suggNode, nodes.get(j), this.selectedParameters),
                color: randColor(),
                id: uuidv4()
            }));
        }

        let sortedWeights = weights.sort((a, b) => b.weight - a.weight)
            .splice(0, this.graphSize);

        sortedWeights = sortedWeights.map((e, i) => {
            if (i == 0) {
                const updatedNode = {...suggNode, size: 80, fixed: true};
                this.nodes.update(updatedNode)
                return {...e, color: `rgb(127, 0, 255)`};
            }
            return new Edge({
                ...e, color: `rgb(${127 + i * (127 / this.graphSize)}, ${i * (255 / this.graphSize)}, ${255})`,
                from: sortedWeights[i - 1].to
            })
        });

        this.edges.add(sortedWeights);
        this.nodes.add(sortedWeights.map(e => (nodes.get(e.to) as Node)))
    }

    clear() {
        this.nodes.clear();
        this.edges.clear();
    }

    display() {
        return (<>
                <div id={"buttons"} className={"absolute z-10 w-0 h-0"}>
                    <GraphSizeButton animeGraph={this}/>
                    {/* Visualization Buttons*/}
                    <VisButton name="Refit!" func={() => this.refit()}/>
                    <VisButton name="Recolor!" func={() => this.recolor()}/>
                    <VisButton name="primsMST!" func={() => this.createMSTusingPrims()}/>
                    <VisButton name="kruskalMST!" func={() => this.createMSTusingKruskal()}/>
                    <VisButton name="BFS!" func={() => this.bfsAnimation()}/>
                    <VisButton name="DFS!" func={() => this.dfsAnimation()}/>
                    <VisButton name="suggestedAnimeList!" func={() => this.suggestedAnimeList()}/>
                    <VisButton name="clear!" func={() => this.clear()}/>
                </div>

                <div id='graph' ref={this.containerRef} className={"h-full relative flex-shrink-0 flex-grow w-8/12"}/>
            </>
        );
    }
}
