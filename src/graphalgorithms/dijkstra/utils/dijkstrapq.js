import { PriorityQueue, Node } from './priorityqueue';

export function initialstate(nodes, start, PQ, network) {
    // [...edges].forEach((edge) => {
    //     edge.label = "Infinity"
    // });
    network.edges.forEach((edge) => {
        network.edges.update({
            lable: Infinity,
        });
    });
    PQ.enqueue(new Node(start, 0));
    const table = nodes.map((node) => {
        return {
            id: node.id,
            distance: node.id === start ? 0 : Infinity,
            previous: null,
        };
    });
    return table;
}

export function findIndex(id, table) {
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === id) {
            return i;
        }
    }
}

export function getpath(table, end) {
    let path = [];
    console.log("table end", table, end);
    let prev = table[findIndex(end, table)];
    let cost = Infinity;
    if (prev != null) cost = prev.distance;
    while (prev != null) {
        console.log("prev", prev);
        path.push(prev.id);
        prev = table[findIndex(prev.previous, table)];
    }
    return [path.reverse(), cost];
}


export function getconnectednodes(id, edges, bi) {
    let connectednodes = [];
    for (var j = 0; j < edges.length; j++) {
        let edge = edges[j];
        if (edge.from === id) {
            connectednodes.push({
                id: edge.to,
                distance: parseInt(edges[j].label),
            });
        } else if (bi && edge.to === id) {
            connectednodes.push({
                id: edge.from,
                distance: parseInt(edges[j].label),
            });
        }
    }
    console.log("connected nodes", id, connectednodes);
    return connectednodes;
}

export function nextstep(state, edges, bi, nextnode, PQ) {
    // let nextnode = findnextnode(state.table, state.unvisited);
    const connectednodes = getconnectednodes(nextnode.value, edges, bi);
    connectednodes.forEach((node) => {
        const ind = findIndex(node.id, state);
        if (state[ind].distance >= node.distance + nextnode.distance) {
            state[ind].distance = node.distance + nextnode.distance;
            state[ind].previous = nextnode.value;
            console.log("state ind", state[ind]);
            PQ.enqueue(new Node(state[ind].id, state[ind].distance));
        }
    });
    return state;

}

export function solveDijkstra(nodes, edges, start, end, bi, network) {
    let PQ = new PriorityQueue();
    // let state = initialstate(nodes, edges, start, PQ, network);

    // console.log("network", network);
    PQ.enqueue(new Node(start, 0));
    // console.log("edges", edges);
    const state = nodes.map((node) => {
        return {
            id: node.id,
            distance: node.id === start ? 0 : Infinity,
            previous: null,
        };
    });
    // console.log("edgesdup", edgesdup);
    console.log("state", state);
    while (PQ.values.length >= 1) {
        console.log("pq values", PQ.values);
        const nextnode = PQ.dequeue();
        const connectednodes = getconnectednodes(nextnode.value, edges, bi);
        connectednodes.forEach((node) => {
            const ind = findIndex(node.id, state);
            if (state[ind].distance > node.distance + nextnode.distance) {
                state[ind].previous = nextnode.value;
                state[ind].distance = node.distance + nextnode.distance;
                network.edges.forEach((ed) => {
                    const val = (ed.to === node.id && ed.from === nextnode.value && node.distance.toString() === ed.label);
                    console.log("values", ed, node, nextnode, state[ind], val)
                    let sum = node.distance + nextnode.distance;
                    if (val) {
                        network.edges.update({
                            ...ed,
                            // label: sum.toString(),
                            width: 2,
                            color: "#ff0000",
                        });
                        console.log("lol:)", sum);
                        // state[ind].distance  = sum;
                        node.distance = sum;
                    }
                });
                PQ.enqueue(new Node(state[ind].id, state[ind].distance));
            }
        });
    }
    return getpath(state, end);
}

export function color(path, color, network, bi) {
    console.log("path", path);
    const finalpath = path.join("->");
    console.log("final path", finalpath);
    path.forEach((id) => {
        network.nodes.update({
            id: id,
            label: id,
            color,
        });
    });
    network.edges.forEach((edge) => {
        if (finalpath.includes(edge.from + "->" + edge.to) || (bi && finalpath.includes(edge.to + "->" + edge.from))) {
            network.edges.update({
                ...edge,
                color,
                width: 2,
            });
        }
    });
}