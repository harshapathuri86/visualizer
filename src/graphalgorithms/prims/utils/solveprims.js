import { PriorityQueue, Node } from './priorityqueue';

export function findIndex(id, table) {
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === id) {
            return i;
        }
    }
}

export function getconnectednodes(id, edges) {
    let connectednodes = [];
    for (var j = 0; j < edges.length; j++) {
        let edge = edges[j];
        if (edge.from === id) {
            console.log("check", connectednodes, connectednodes.includes(edge.to), edge.from, edge.to);
            if (connectednodes.includes(edge.to)) continue;
            connectednodes.push(edge.to);
        }
        else if (edge.to === id) {
            console.log("check", connectednodes, connectednodes.includes(edge.from), edge.from, edge.to);
            if (connectednodes.includes(edge.from)) continue;
            connectednodes.push(edge.from);
        }
    }
    console.log("connected nodes", id, connectednodes);
    return connectednodes;
}

export function solvePrims(nodes, edges, start, network) {
    let PQ = new PriorityQueue();
    PQ.enqueue(new Node(start, 0));
    const state = nodes.map((node) => {
        return {
            id: node.id,
            distance: node.id === start ? 0 : Infinity,
            previous: node.id === start ? start : null,
            edge: null,
        };
    });
    while (PQ.values.length >= 1) {
        const nextnode = PQ.dequeue();
        console.log("dequeue", nextnode);
        const connectednodes = getconnectednodes(nextnode.value, edges);
        console.log(connectednodes);
        for (const node of connectednodes) {
            const ind = findIndex(node.id, state);
            network.edges.forEach((ed) => {
                const val = (((ed.to === node.id && ed.from === nextnode.value) || (ed.from === node.id && ed.to === nextnode.value)));
                // console.log("values", ed, node, nextnode, state[ind], val)
                if (val) {
                    network.edges.update({
                        ...ed,
                        width: 2,
                        color: "#ff0000",
                    });
                    // console.log(PQ.has(node));
                    // console.log("check prev null,has", state[ind], node, state[ind].previous === null, PQ.has(node));
                    if (PQ.has(node.id) && state[ind].distance > node.distance) {
                        state[ind].previous = nextnode.value;
                        state[ind].distance = node.distance;
                        // network.edges.update({
                        //     ...state[ind].edge,
                        //     width: 10,
                        //     color: "#000000",
                        // });
                        console.log("replace", node, node.distance);
                        PQ.replace(node, node.distance);
                        network.edges.update({
                            ...ed,
                            width: 2,
                            color: "#00ff00",
                        });
                        state[ind].edge = ed;
                    }
                    else if (state[ind].previous === null) {
                        console.log("enqueue", node);
                        PQ.enqueue(new Node(node.id, node.distance));
                        state[ind].previous = nextnode.value;
                        state[ind].distance = node.distance;
                        state[ind].edge = ed;
                        network.edges.update({
                            ...ed,
                            width: 2,
                            color: "#00ff00",
                        });
                    }
                }
            });
        }
    }
    color(state, "#00ff00", network);
}

export function color(state, color, network) {
    console.log("color", state);
    state.forEach((node) => {
        network.edges.forEach((ed) => {
            const val = (((ed.to === node.id && ed.from === node.previous) || (ed.from === node.id && ed.to === node.previous)) && node.distance.toString() === ed.label);
            // console.log("values", ed, node, nextnode, state[ind], val)
            if (val) {
                network.edges.update({
                    ...ed,
                    color,
                    // width: 2,
                });
            }
        });
    });
}