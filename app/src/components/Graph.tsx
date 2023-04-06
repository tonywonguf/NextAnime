import Graph from "react-graph-vis";
import {v4 as uuidv4} from 'uuid';
import {useState} from "react";

class Node{
    private id: number;
    private title: string;
    private shape: "image";
    private image: string;
    private popScore: number;
    private episodes: number;
    private year: number;
    private staff: [];
    private studio: [];

    constructor() {
    }
}
export default class AnimeGraph<T> {
    private nodes: Map<T, Set<T>>;

    constructor() {
        this.nodes = new Map();
    }

    newNode(node: T): void {
        if (!this.nodes.has(node)) {
            this.nodes.set(node, new Set());
        }
    }

    insertEdge(node1: T, node2: T): void {
        if (!this.nodes.has(node1)) {
            this.nodes.set(node1, new Set());
        }
        if (!this.nodes.has(node2)) {
            this.nodes.set(node2, new Set());
        }
        this.nodes.get(node1)?.add(node2);
        this.nodes.get(node2)?.add(node1);
    }

    getNeighbors(node: T): Set<T> {
        return this.nodes.get(node) || new Set();
    }
}
