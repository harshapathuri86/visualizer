export function settable(nodes, start, INF) {
    const table = nodes.map((node) => {
        return {
            id: node.id,
            distance: node.id === start ? 0 : INF,
            previous: null,
        };
    });
    return table;
}

export function initialstate(nodes, edges, start) {
    const INF = generateINF(edges);
    // console.log(INF);
    // console.log("settable", settable(nodes, start, INF));
    return {
        visited: [],
        unvisited: [...nodes],
        table: settable(nodes, start, INF),
    };
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
    let prev = table[findIndex(end, table)];
    let cost = prev.distance;
    while (prev != null) {
        path.push(prev.id);
        prev = table[findIndex(prev.previous, table)];
    }
    return [path.reverse(), cost];
}
export function generateINF(edges) {
    return (
        edges.reduce((carry, current) => {
            return carry.label
                ? parseInt(carry.label) + parseInt(current.label)
                : carry + parseInt(current.label);
        }) + 1
    );
}

export function getpathcost(table, end) {
    const [path, cost] = getpath(table, end);
    return [path, cost];
}

export function findnextnode(table, unvisited) {
    return unvisited.reduce((accum, curr) => {
        const a = table[findIndex(curr.id, table)];
        const b = table[findIndex(accum.id, table)];
        return a.distance < b.distance ? a : b;
    });
}

export function getconnectednodes(id, edges, bi) {
    let connectednodes = [];
    edges.forEach((edge) => {
        // console.log("in get node", edge, id);
        if (edge.from === id) {
            connectednodes.push({
                id: edge.to,
                distance: parseInt(edge.label),
            });
        } else if (bi && edge.to === id) {
            connectednodes.push({
                id: edge.from,
                distance: parseInt(edge.label),
            });
        }
    });
    // console.log("connected nodes", id, connectednodes);
    return connectednodes;
}

export function nextstep(prevstep, edges, bi) {
    // let nextnode = findnextnode(state.table, state.unvisited);
    // console.log("next node");
    // console.log(nextnode);
    // state.visited.push(nextnode);
    // state.unvisited.splice(findIndex(nextnode.id, state.table), 1);
    // let connectednodes = getconnectednodes(nextnode.id, edges, bi);
    // connectednodes.forEach((node) => {
    //     const ind = findIndex(node.id, state.table);
    //     if (state.table[ind].distance > node.distance + nextnode.distance) {
    //         state.table[ind].distance = node.distance + nextnode.distance;
    //         state.table[ind].previous = nextnode;
    //     }
    // });
    let { table, visited, unvisited } = prevstep;
    let nextnode = findnextnode(table, unvisited);
    // console.log("next node", nextnode);
    visited.push(nextnode);
    // console.log("visited", visited);
    unvisited.splice(findIndex(nextnode.id, unvisited), 1);
    const connectednodes = getconnectednodes(nextnode.id, edges, bi);
    connectednodes.forEach((node) => {
        // console.log("co node", node);
        const ind = findIndex(node.id, table);
        if (table[ind].distance > nextnode.distance + node.distance) {
            table[ind].distance = nextnode.distance + node.distance;
            table[ind].previous = nextnode.id;
        }
    });
    // console.log("next step", table, visited, unvisited);
    return { table, visited, unvisited };
}

export function solveDijkstra(nodes, edges, start, end, bi) {
    // console.log(nodes);
    // console.log(edges);
    // console.log(start, end, bi);
    let state = initialstate(nodes, edges, start);
    // console.log(state);
    // console.log("starting");
    while (state.unvisited.length) {
        state = nextstep(state, edges, bi);
        // console.log("loop");
        // console.log(state);
    }
    return getpathcost(state.table, end);
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
            });
        }
    });
}