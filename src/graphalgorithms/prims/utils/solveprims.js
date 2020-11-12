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

export function getconnectededges(id, edges) {
    let connectededges = [];
    for (var j = 0; j < edges.length; j++) {
        let edge = edges[j];
        if (edge.from === id) {
            if (connectededges.includes(edge)) continue;
            connectededges.push(edge);
        }
        else if (edge.to === id) {
            if (connectededges.includes(edge)) continue;
            connectededges.push(edge);
        }
    }
    return connectededges;
}

export function solvePrims(nodes, edges, start, network) {
    let PQ = new PriorityQueue();
    const state = network.nodes.map((node) => {
        return {
            id: node.id,
            distance: node.id === start ? 0 : Infinity,
            previous: node.id === start ? start : null,
            edge: null,
        };
    });
    PQ.enqueue(new Node(start, 0));
    let node;
    while (PQ.values.length >= 1) {
        const nextnode = PQ.dequeue();
        network.nodes.update({
            id: nextnode.value.toString(),
            label: nextnode.value.toString(),
            color: "#ffa500",
        });
        const connectededges = getconnectededges(nextnode.value, network.edges.get());
        // console.log(connectednodes);
        for (const ed of connectededges) {
            if (ed.from === nextnode.value) node = ed.to;
            else node = ed.from;
            let ind = findIndex(node, state);
            let lol = 0;
            let color = ed.color;
            network.edges.update({
                ...ed,
                width: 4,
                color: "#ffa500",
            });
            let dist = parseInt(ed.label);
            if (PQ.has(node) && state[ind].distance > dist) {
                lol = 1;
                state[ind].previous = nextnode.value;
                state[ind].distance = dist;
                network.edges.update({
                    ...state[ind].edge,
                    width: null,
                    color: null,
                });
                PQ.replace(node, dist);
                network.edges.update({
                    ...ed,
                    width: 2,
                    color: "#00ff00",
                });
                state[ind].edge = ed;
            }
            else if (state[ind].previous === null) {
                lol = 1;
                PQ.enqueue(new Node(node, dist));
                state[ind].previous = nextnode.value;
                state[ind].distance = dist;
                state[ind].edge = ed;
                network.edges.update({
                    ...ed,
                    width: 2,
                    color: "#00ff00",
                });
            }
            else {
                network.edges.update({
                    ...ed,
                    width: 2,
                    color,
                });
            }
        }
        network.nodes.update({
            id: nextnode.value.toString(),
            label: nextnode.value.toString(),
            color: "#00ff00",
        });
    }
}
