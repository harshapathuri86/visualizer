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

export function addedge(edge, network, bi = false) {
    // console.log("add addedge");
    // let old = null;
    // network.edges.forEach((ed) => {
    //     if (bi) {
    //         if (
    //             (ed.from === edge.from && ed.to === edge.to) ||
    //             (ed.to === edge.from && ed.from === edge.to)
    //         ) {
    //             old = ed;
    //         }
    //     } else {
    //         if (ed.from === edge.from && ed.to === edge.to) {
    //             old = ed;
    //         }
    //     }
    // });
    // if (!old) {
    //     network.edges.add(edge);
    // } else {
    //     network.edges.remove(old);
    //     network.edges.add({ ...edge, color: "#7d5ab5" });
    // }
    network.edges.add(edge);
}

export function deleteedge(edge, network) {
    console.log("in deleteedge");
    network.edges.forEach((ed) => {
        if (ed.from === edge.from && ed.to === edge.to && ed.label === edge.label) {
            try {
                network.edges.remove(ed);
            }
            catch (e) {
                alert(e);
                alert("edge doesnot exist");
            }
        }
    });
}

export function deletenode(id, network) {
    console.log("in delete node");
    network.edges.forEach((ed) => {
        if (ed.from === id || ed.to === id) {
            network.edges.remove(ed);
        }
    });
    network.nodes.remove({ id: id });
}
