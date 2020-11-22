import { PriorityQueue, Node } from './priorityqueue';

export function findIndex(id, table) {
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === id) {
            return i;
        }
    }
}

export function getconnectededges(id, edges, bi) {
    let connectededges = [];
    for (let j = 0; j < edges.length; j++) {
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