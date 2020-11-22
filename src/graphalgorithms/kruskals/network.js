export function resetNetwork(network) {
    network.nodes.forEach((node) => {
        network.nodes.update({
            id: node.id,
            label: node.id,
            color: null,
        });
    });
    network.edges.forEach((edge) => {
        network.edges.update({
            ...edge,
            color: null,
            width: null,
        });
    });
}
export function resetNetwork_nodes(network) {
    network.nodes.forEach((node) => {
        network.nodes.update({
            id: node.id,
            label: node.id,
            color: null,
        });
    });
}

export function addedge(edge, network, bi = false) {
    let a = 0, b = 0;
    network.nodes.forEach((node) => {
        if (node.id === edge.from) a = 1;
        if (node.id === edge.to) b = 1;
    });
    if (a === 1 && b === 1) {
        network.edges.add(edge);
    }
    else {
        if (!a && !b) alert("both nodes " + edge.from + ", " + edge.to + " not found in the graph");
        else if (!a)
            alert("node " + edge.from + " not found in the graph");
        else if (!b) alert("node " + edge.to + " not found in the graph");
    }
    return;
}

export function deleteedge(edge, network, bi) {
    let bool = 0;
    network.edges.forEach((ed) => {
        if (ed.from === edge.from && ed.to === edge.to && ed.label === edge.label) {
            network.edges.remove(ed);
            bool = 1;
        }
        else if (bi && (ed.to === edge.from && ed.to === edge.from && ed.label === edge.label)) {
            network.edges.remove(ed);
            bool = 1;
        }
    });
    if (bool) return;
    if (bi) {
        alert("No edge in between" + edge.from + " to " + edge.to + " with weight " + edge.label);
    }
    else {
        alert("No edge from " + edge.from + " to " + edge.to + " with weight " + edge.label);
    }
    return;
}

export function deletenode(id, network) {
    network.edges.forEach((ed) => {
        if (ed.from === id || ed.to === id) {
            network.edges.remove(ed);
        }
    });
    let a = network.nodes.remove({ id: id });
    console.log(a.length);
    if (a.length === 0) {
        alert("node " + id + " does not exist");
    }
}