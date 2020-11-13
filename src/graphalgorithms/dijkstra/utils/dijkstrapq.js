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

export function getconnectededges(id, edges, bi) {
    let connectededges = [];
    for (var j = 0; j < edges.length; j++) {
        let edge = edges[j];
        if (edge.from === id) {
            // if (connectededges.includes(edge)) continue;
            connectededges.push(edge);
        }
        else if (edge.to === id && bi) {
            // if (connectededges.includes(edge)) continue;
            connectededges.push(edge);
        }
    }
    return connectededges;
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

export function solveDijkstra(start, bi, network) {
    let PQ = new PriorityQueue();
    const state = network.nodes.map((node) => {
        return {
            id: node.id,
            distance: node.id === start ? 0 : Infinity,
            previous: node.id === start ? -1 : null,
            edge: null,
        };
    });
    for (let i = 0; i < state.length; i++) {
        network.nodes.update({
            id: state[i].id,
            label: state[i].id + ":" + state[i].distance,
        });
    }
    PQ.enqueue(new Node(start, 0));
    let node;
    while (PQ.values.length >= 1) {
        const nextnode = PQ.dequeue();
        network.nodes.update({
            id: nextnode.value,
            color: "orange",
        });
        const connectededges = getconnectededges(nextnode.value, network.edges.get(), bi);
        for (const ed of connectededges) {
            if (ed.from === nextnode.value) node = ed.to;
            else node = ed.from;
            network.edges.update({
                ...ed,
                color: "orange",
                width: 4,
            });
            const ind = findIndex(node, state);
            let dist = parseInt(ed.label) + nextnode.distance;
            console.log("includes", node, PQ.has(node));
            if (PQ.has(node) && state[ind].distance > dist) {
                state[ind].previous = nextnode.value;
                state[ind].distance = dist;
                network.edges.update({
                    ...state[ind].edge,
                    width: 2,
                    color: "black",
                });
                state[ind].edge = ed;
                network.edges.update({
                    ...ed,
                    width: 3,
                    color: "green",
                });
                network.nodes.update({
                    id: state[ind].id,
                    label: state[ind].id + ":" + state[ind].distance,
                });
                PQ.replace(node, dist);
            }
            else if (state[ind].previous == null) {
                state[ind].previous = nextnode.value;
                state[ind].distance = dist;
                state[ind].edge = ed;
                network.edges.update({
                    ...ed,
                    width: 3,
                    color: "green",
                });
                network.nodes.update({
                    id: state[ind].id,
                    label: state[ind].id + ":" + state[ind].distance,
                });
                console.log("else if");
                PQ.enqueue(new Node(state[ind].id, state[ind].distance));
            }
            else {
                network.edges.update({
                    ...ed,
                    // label: sum.toString(),
                    width: 2,
                    color: "black",
                });
            }
        }
        network.nodes.update({
            id: nextnode.value,
            color: null,
        });
    }
    console.log("state", state);
}