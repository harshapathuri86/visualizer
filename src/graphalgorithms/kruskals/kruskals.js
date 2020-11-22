import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Table, Segment, Label } from "semantic-ui-react";
import Addedge from "./addedge";
import Addnode from "./node";
import Deleteedge from "./deleteedge";
import Deletenode from "./delete"
import Solve from "./solve";
import "./kruskals.css";
// import remaining files
import { solvePrims, UnionFind } from "./solvekrushkal";
import { addedge, deleteedge, deletenode, resetNetwork } from "./network";
import { PriorityQueue, Node } from './priorityqueue';

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const graph = {
    nodes: [
        { id: "2", label: "2" },
        { id: "3", label: "3" },
        { id: "1", label: "1" },
        { id: "4", label: "4" },
        { id: "5", label: "5" },
    ],
    edges: [
        { from: "1", to: "2", label: "6" },
        { from: "1", to: "4", label: "1" },
        { from: "2", to: "4", label: "2" },
        { from: "2", to: "5", label: "1" },
        { from: "3", to: "2", label: "5" },
        { from: "4", to: "5", label: "1" },
        { from: "5", to: "3", label: "5" },
        { from: "5", to: "2", label: "2" },
    ]
};

function Kruskals() {
    const ref = useRef();
    const [sol, setsol] = useState("");
    const [solving, setsolving] = useState(false);
    let ColorArray = [];
    for (let i = 0; i < 8; i++) ColorArray.push('white');
    ColorArray[7] = 'pink';
    const [V, setV] = useState("");
    var Valarray = [];
    const options = {
        interaction: { hover: true },
        manipulation: {
            enabled: true,
            addNode: false,
            addEdge: false,
            editEdge: true,
            deleteNode: true,
            deleteEdge: true,
        },
        layout: {
            hierarchical: false,
        },
        edges: {
            color: "#000000",
            smooth: true,
            width: 1,
            arrows: { to: { enabled: false } },
        },
        // height: "100%",
    };

    return (
        <Container style={{ marginTop: "3em" }} inverted="true" bgcolor='red'>
            <Grid padded celled container doubling width='100hw'>
                <Grid.Row stackable="true" columns={3} divided="true">
                    <Grid.Column mobile={16} computer={4}>
                        <Addnode onAddnode={(node) => {
                            ref.current.nodes.add(node);
                            console.log(ref.current);
                        }} />
                        <Divider />
                        <Deletenode onDeletenode={(id) => { deletenode(id, ref.current); }} />

                    </Grid.Column>
                    <Grid.Column mobile={16} computer={6} >
                        <Addedge onAddedge={(edge) => { addedge(edge, ref.current, false); }} />
                        <Divider />
                        <Deleteedge onDeleteedge={(edge) => {
                            deleteedge(edge, ref.current);
                        }} />
                        {/* <Divider /> */}
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16}>
                        <Solve solving={solving} solve={(start) => {
                            setsolving(true);
                            resetNetwork(ref.current);
                            solvePrims(
                                ref.current.nodes.get(),
                                ref.current.edges.get(),
                                ref.current, 0
                            );
                            setsolving(false);
                        }} >Kruskals</Solve>
                        <Divider />
                        <Solve
                            solving={solving}
                            time={true}
                            solve={async (t) => {
                                setsolving(true);
                                // console.log("EDGES", ref.current.edges, ref.current.edges.get());
                                setV(1);
                                resetNetwork(ref.current);
                                await sleep(t * 1000)
                                const nodes = ref.current.nodes.get()
                                const edges = ref.current.edges.get()
                                const network = ref.current
                                let edgeQueue = new PriorityQueue()
                                console.log(edges)
                                for (let node in edges) {
                                    edgeQueue.enqueue(new Node([edges[node].from, edges[node].to, edges[node].id], parseInt(edges[node].label)));
                                }
                                let node_ids = []
                                for (let node in nodes) {
                                    console.log(nodes[node])
                                    node_ids.push(nodes[node].id)
                                }
                                let uf = new UnionFind(node_ids);
                                setV(2)
                                await sleep(t * 1000)
                                // Loop until either we explore all nodes or queue is empty
                                while (edgeQueue.values.length >= 1) {
                                    // Get the edge data using destructuring
                                    let nextEdge = edgeQueue.dequeue();
                                    //console.log(nextEdge)
                                    let nodes_pq = nextEdge.value
                                    //console.log(nodes_pq)
                                    console.log(uf)
                                    setV(3)
                                    network.edges.update({
                                        id: nodes_pq[2],
                                        from: nodes_pq[0],
                                        to: nodes_pq[1],
                                        color: "red",
                                        width: 3,
                                    })
                                    await sleep(t * 1000)
                                    network.edges.update({
                                        id: nodes_pq[2],
                                        from: nodes_pq[0],
                                        to: nodes_pq[1],
                                        color: "black",
                                        width: 1,
                                    })
                                    if (!uf.connected(nodes_pq[0], nodes_pq[1])) {
                                        console.log("Entered")
                                        setV(4)
                                        await sleep(t * 1000)
                                        network.edges.update({
                                            id: nodes_pq[2],
                                            from: nodes_pq[0],
                                            to: nodes_pq[1],
                                            color: "blue",
                                            width: 3,
                                        })
                                        network.nodes.update({
                                            id: nodes_pq[0],
                                            label: nodes_pq[0],
                                            color: "green"
                                        })
                                        network.nodes.update({
                                            id: nodes_pq[1],
                                            label: nodes_pq[1],
                                            color: "green"
                                        })
                                        setV(5)
                                        await sleep(t * 1000)
                                        uf.union(parseInt(nodes_pq[0]), parseInt(nodes_pq[1]));
                                        console.log(uf)
                                        setV(6)
                                        await sleep(t * 1000)
                                    }
                                }
                                setsolving(false);
                                setV(7)
                                await sleep(t * 1000)
                            }
                            }
                        >Kruskals steps</Solve>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} >
                    <Grid.Column computer={8} mobile={16}>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.19.1/vis-network.min.css"></link>
                        <Graph
                            style={{ height: "80vh" }}
                            graph={graph}
                            options={options}
                            ref={ref}
                        />
                        {sol && <Segment style={{ height: "10vh" }} color='green' inverted>{sol}</Segment>}
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                        <Table.Row size='small'><Table.Cell><Label ribbon color='green'>PSEUDO CODE</Label></Table.Cell></Table.Row>
                        <Table size='small' >
                            <Table.Body >
                                <Table.Row textAlign='left'><Table.Cell height='5' bgcolor={ColorArray[(V + 7) % 8]} >
                                    <pre>{"BEGIN"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 6) % 8]} >
                                    <pre>{"setsDisjoint = new Disjoint(nodes)"}</pre>
                                    <pre>{"queue = new PriorityQueue(edges)"}</pre>
                                    <pre>{"MST = []"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 5) % 8]} >
                                    <pre>{"while queue ≠ ∅"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 4) % 8]} >
                                    <pre>{"\tU = queue.min()"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 3) % 8]} >
                                    <pre>{"\tif(!setsDisjoint.notConnected(U.from,U.to))\n"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 2) % 8]} >
                                    <pre>{"\t\tMST.push(U)"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 1) % 8]} >
                                    <pre>{"\t\tsetsDisjoint.union(U.from,U.to)"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V) % 8]} ><pre>{"END"}</pre> </Table.Cell></Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container >
    );
}

export default Kruskals;
