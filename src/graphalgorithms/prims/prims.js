import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Table, Segment, Label } from "semantic-ui-react";
import Addedge from "./addedge";
import Addnode from "./addnode";
import Deleteedge from "./deleteedge";
import Deletenode from "./deletenode"
import Solve from "./solvecontrols";
import "./prims.css";
import { solvePrims, getconnectededges, findIndex } from "./solveprims";
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

function Prims() {
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
    };

    return (
        <Container style={{ marginTop: "3em" }} inverted="true" bgcolor='red'>
            <Grid padded celled container doubling width='100hw'>
                <Grid.Row stackable="true" columns={3} divided="true">
                    <Grid.Column mobile={16} computer={4}>
                        <Addnode onAddnode={(node) => ref.current.nodes.add(node)} />
                        <Divider />
                        <Deletenode onDeletenode={(id) => { deletenode(id, ref.current); }} />

                    </Grid.Column>
                    <Grid.Column mobile={16} computer={6} >
                        <Addedge onAddedge={(edge) => { addedge(edge, ref.current, false); }} />
                        <Divider />
                        <Deleteedge onDeleteedge={(edge) => {
                            deleteedge(edge, ref.current);
                        }} />
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16}>
                        <Solve solving={solving} solve={(start) => {
                            setsolving(true);
                            resetNetwork(ref.current);
                            solvePrims(
                                ref.current.nodes.get(),
                                ref.current.edges.get(),
                                start, ref.current
                            );
                            setsolving(false);
                        }} >Run Prims</Solve>
                        <Divider />
                        <Solve
                            solving={solving}
                            time={true}
                            solve={async (start, t) => {
                                setsolving(true);
                                setV(1);
                                resetNetwork(ref.current);
                                let PQ = new PriorityQueue();
                                const state = ref.current.nodes.map((node) => {
                                    return {
                                        id: node.id,
                                        distance: node.id === start ? 0 : Infinity,
                                        previous: node.id === start ? start : null,
                                        edge: null,
                                    };
                                });
                                PQ.enqueue(new Node(start, 0));
                                setsol(
                                    "Heap : " + PQ.values.map((n) => n.value.toString() + "{" + n.distance.toString() + "}").join("<-")
                                );
                                await sleep(t * 1000);
                                setV(2);
                                await sleep(t * 1000);
                                let node;
                                // console.log("start", start);
                                while (PQ.values.length >= 1) {
                                    setV(3);
                                    const nextnode = PQ.dequeue();
                                    console.log("dequeue", nextnode);
                                    setsol(
                                        "U = " + nextnode.value + " Heap : " + PQ.values.map((n) => n.value.toString() + "{" + n.distance.toString() + "}").join("<-")
                                    );
                                    ref.current.nodes.update({
                                        id: nextnode.value.toString(),
                                        label: nextnode.value.toString(),
                                        color: "#ffa500",
                                    });
                                    await sleep(t * 1000);
                                    setV(4);
                                    const connectededges = getconnectededges(nextnode.value, ref.current.edges.get());
                                    console.log(connectededges);
                                    for (const ed of connectededges) {
                                        if (ed.from === nextnode.value) node = ed.to;
                                        else node = ed.from;
                                        const ind = findIndex(node, state);
                                        // let E = ref.current.edges.get();
                                        // console.log("E", E);
                                        // setV(4);
                                        let color = ed.color;
                                        ref.current.edges.update({
                                            ...ed,
                                            width: 4,
                                            color: "#ffa500",
                                        });
                                        console.log("values state nxtnode node ed", state[ind], nextnode, node, ed);
                                        setV(4);
                                        await sleep(t * 1000);
                                        let dist = parseInt(ed.label);
                                        if (PQ.has(node) && state[ind].distance > dist) {
                                            setV(5);
                                            state[ind].previous = nextnode.value;
                                            state[ind].distance = dist;
                                            ref.current.edges.update({
                                                ...state[ind].edge,
                                                width: null,
                                                color: null,
                                            });
                                            console.log("replace", node, dist);
                                            PQ.replace(node, dist);
                                            ref.current.edges.update({
                                                ...ed,
                                                width: 2,
                                                color: "#00ff00",
                                            });
                                            state[ind].edge = ed;
                                            setsol(
                                                "U = " + nextnode.value + " Heap : " + PQ.values.map((n) => n.value.toString() + "{" + n.distance.toString() + "}").join("<-")
                                            );
                                            await sleep(t * 1000);
                                        }
                                        else if (state[ind].previous === null) {
                                            setV(6);
                                            console.log("enqueue", node);
                                            PQ.enqueue(new Node(node, dist));
                                            state[ind].previous = nextnode.value;
                                            state[ind].distance = dist;
                                            state[ind].edge = ed;
                                            ref.current.edges.update({
                                                ...ed,
                                                width: 2,
                                                color: "#00ff00",
                                            });
                                            setsol(
                                                "U = " + nextnode.value + " Heap : " + PQ.values.map((n) => n.value.toString() + "{" + n.distance.toString() + "}").join("<-")
                                            );
                                            await sleep(t * 1000);
                                        }
                                        else {
                                            ref.current.edges.update({
                                                ...ed,
                                                width: 2,
                                                color,
                                            });
                                        }
                                    }
                                    ref.current.nodes.update({
                                        id: nextnode.value.toString(),
                                        label: nextnode.value.toString(),
                                        color: "#00ff00",
                                    });
                                    setV(2);
                                    await sleep(t * 1000);
                                }
                                setV(7);
                                setsolving(false);
                            }}
                        >
                            Prims Steps</Solve>
                        <Divider />
                        <Segment style={{ height: "10vh" }} >
                            {sol}
                        </Segment>
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
                                    <pre>{"d(v[i])=∞,previous(v[i])=NULL\nfor i=1,3,4 ... n\n"}</pre>
                                    <pre>{"\td(v[root])=∞,prevoius(v[root])=v[root]"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 5) % 8]} >
                                    <pre>{"while queue ≠ ∅"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 4) % 8]} >
                                    <pre>{"\tU = queue.min()"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 3) % 8]} >
                                    <pre>{"\tfor all (U,V) ∈ EDGES E\n"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 2) % 8]} >
                                    <pre>{"\t\tif V ∈ queue AND d(V) > l(U,V)"}</pre>
                                    <pre>{"\t\t\td(V) = l(U,V), parent(V)=U"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 1) % 8]} >
                                    <pre>{"\t\tElse if parent(V) == NULL"}</pre>
                                    <pre>{"\t\t\td(V) = l(U,V), parent(V)=U\n\t\t\tqueue.insert(V,d(V))"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V) % 8]} ><pre>{"End"}</pre> </Table.Cell></Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container >
    );
}

export default Prims;
