import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Segment, Radio, Table, Label } from "semantic-ui-react";
import Addedge from "./addedge";
import Addnode from "./addnode";
import Deleteedge from "./deleteedge";
import Deletenode from "./deletenode"
import Solve from "./solvecontrols";
import "./dijkstra.css";
import { solveDijkstra, getconnectededges, findIndex } from "./solvedijkstra";
import { addedge, deleteedge, deletenode, resetNetwork } from "./network";
import { PriorityQueue, Node } from './priorityqueue';
import Navbar from '../../utils/Navbar';
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
        { from: "4", to: "5", label: "1" },
        { from: "5", to: "2", label: "2" },
        { from: "3", to: "2", label: "5" },
        { from: "5", to: "3", label: "5" },
    ]
};

const Toggle = (props) => {
    return (
        <div>
            <Radio
                onChange={(e, s) => {
                    props.onChange(s.checked);
                }}
                toggle
                label="bidirectional"
            />
        </div>
    )
};


function Dijkstra() {
    const ref = useRef();
    const [sol, setsol] = useState("");
    const [bi, setbi] = useState(false);
    const [solving, setsolving] = useState(false);
    let ColorArray = [];
    for (let i = 0; i < 8; i++) ColorArray.push('white');
    ColorArray[7] = 'pink';
    const [V, setV] = useState("");
    const options = {
        interaction: { hover: true },
        manipulation: {
            enabled: true,
            // initiallyActive: true,
            addNode: false,
            addEdge: false,
            // editNode: true,
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
        },
    };

    return (
        <Container fluid >
            <Navbar text="Dijkstra's algorithm" />
            <Grid padded celled container doubling width='100hw'>
                <Grid.Row stackable columns={3} divided >
                    <Grid.Column mobile={16} computer={4}>
                        <Toggle label="bidirectional" onChange={(val) => {
                            setbi(val);
                            if (val) {
                                ref.current.Network.setOptions({
                                    edges: {
                                        smooth: true,
                                        arrows: { to: { enabled: false } },
                                    },
                                });
                            } else {
                                ref.current.Network.setOptions({
                                    edges: {
                                        smooth: true,
                                        arrows: { to: { enabled: true } },
                                    },
                                });
                            }
                        }} />
                        <Divider />
                        <Addnode onAddnode={(node) => ref.current.nodes.add(node)} />
                        <Divider />
                        <Deletenode onDeletenode={(id) => { deletenode(id, ref.current); }} />

                    </Grid.Column>
                    <Grid.Column mobile={16} computer={6} >
                        <Addedge onAddedge={(edge) => { addedge(edge, ref.current, false); }} />
                        <Divider />
                        <Deleteedge onDeleteedge={(edge) => {
                            deleteedge(edge, ref.current, bi);
                        }} />
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16}>
                        <Solve solving={solving} solve={(start) => {
                            setsolving(true);
                            console.log(start, bi);
                            resetNetwork(ref.current);
                            solveDijkstra(
                                start, bi, ref.current
                            );
                            setsolving(false);
                        }} >Run Dijkstra</Solve>
                        <Divider />
                        <Solve
                            solving={solving}
                            time={true}
                            solve={async (start, t) => {
                                console.log("TIME", t);
                                setsolving(true);
                                setV(1);
                                resetNetwork(ref.current);
                                let PQ = new PriorityQueue();
                                const state = ref.current.nodes.map((node) => {
                                    return {
                                        id: node.id,
                                        distance: node.id === start ? 0 : Infinity,
                                        previous: node.id === start ? -1 : null,
                                        edge: null,
                                    };
                                });
                                for (let i = 0; i < state.length; i++) {
                                    ref.current.nodes.update({
                                        id: state[i].id,
                                        label: state[i].id + ":" + state[i].distance,
                                    });
                                }
                                PQ.enqueue(new Node(start, 0));
                                setsol(
                                    "Heap : " + PQ.values.map((n) => n.value.toString() + "{" + n.distance.toString() + "}").join("<-")
                                );
                                await sleep(t * 1000);
                                let node;
                                setV(2);
                                while (PQ.values.length >= 1) {
                                    console.log("while");
                                    await sleep(t * 1000);
                                    setV(3);
                                    const nextnode = PQ.dequeue();
                                    ref.current.nodes.update({
                                        id: nextnode.value,
                                        color: "orange",
                                    });
                                    setsol(
                                        "U = " + nextnode.value + " Heap : " + PQ.values.map((n) => n.value.toString() + "{ " + n.distance.toString() + " } ").join("<-")
                                    );
                                    await sleep(t * 1000);
                                    const connectededges = getconnectededges(nextnode.value, ref.current.edges.get(), bi);
                                    for (const ed of connectededges) {
                                        if (ed.from === nextnode.value) node = ed.to;
                                        else node = ed.from;
                                        ref.current.edges.update({
                                            ...ed,
                                            color: "orange",
                                            width: 4,
                                        });
                                        const ind = findIndex(node, state);
                                        setV(4);
                                        console.log("for each");
                                        await sleep(t * 1000);
                                        let dist = parseInt(ed.label) + nextnode.distance;
                                        console.log("includes", node.id, PQ.has(node));
                                        if (PQ.has(node) && state[ind].distance > dist) {
                                            setV(5);
                                            state[ind].previous = nextnode.value;
                                            state[ind].distance = dist;
                                            ref.current.edges.update({
                                                ...state[ind].edge,
                                                width: 2,
                                                color: "black",
                                            });
                                            state[ind].edge = ed;
                                            ref.current.edges.update({
                                                ...ed,
                                                width: 3,
                                                color: "green",
                                            });
                                            ref.current.nodes.update({
                                                id: state[ind].id,
                                                label: state[ind].id + ":" + state[ind].distance,
                                            });
                                            console.log("if");
                                            PQ.replace(node, dist);
                                            console.log("pq values", PQ.values);
                                            setsol(
                                                "U = " + nextnode.value + " Heap : " + PQ.values.map((n) => n.value.toString() + "{" + n.distance.toString() + "}").join("<-")
                                            );
                                            await sleep(t * 1000);
                                        }
                                        else if (state[ind].previous === null) {
                                            setV(6);
                                            state[ind].previous = nextnode.value;
                                            state[ind].distance = dist;
                                            ref.current.edges.update({
                                                ...ed,
                                                width: 3,
                                                color: "green",
                                            });
                                            ref.current.nodes.update({
                                                id: state[ind].id,
                                                label: state[ind].id + ":" + state[ind].distance,
                                            });
                                            console.log("else if");
                                            PQ.enqueue(new Node(state[ind].id, state[ind].distance));
                                            setsol(
                                                "U = " + nextnode.value + " Heap : " + PQ.values.map((n) => n.value.toString() + "{" + n.distance.toString() + "}").join("<-")
                                            );
                                            await sleep(t * 1000);
                                        }
                                        else {
                                            ref.current.edges.update({
                                                ...ed,
                                                width: 2,
                                                color: "black",
                                            });
                                        }
                                    }
                                    ref.current.nodes.update({
                                        id: nextnode.value,
                                        color: null,
                                    });
                                    setV(2);
                                }
                                setV(7);
                                setsolving(false);
                            }}
                        >
                            Dijkstra Steps</Solve>
                        <Divider />
                        <Segment style={{ height: "10vh" }} >
                            {sol}
                        </Segment>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} >
                    <Grid.Column computer={8} mobile={16}>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.19.1/vis-network.min.css" />
                        <Graph
                            style={{ height: "80vh" }}
                            graph={graph}
                            options={options}
                            ref={ref}
                        />
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                        <Table.Row size='small'><Table.Cell><Label ribbon color='green'>PSEUDO CODE</Label></Table.Cell></Table.Row>
                        <Table size='small' >
                            <Table.Body >
                                <Table.Row textAlign='left'><Table.Cell height='5' bgcolor={ColorArray[(V + 7) % 8]} >
                                    <pre>{"BEGIN"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 6) % 8]} >
                                    <pre>{"d(v[1])=0\nfor i=2,3,4 ... n"}</pre>
                                    <pre>{"\td(v[i])=∞,prevoius(v[i])=NULL"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 5) % 8]} >
                                    <pre>{"while queue Q≠ ∅"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 4) % 8]} >
                                    <pre>{"\tU = Q.min()"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 3) % 8]} >
                                    <pre>{"\tfor all (U,V) ∈ EDGES E\n\t\tdist = d(U) + l(U,V)"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 2) % 8]} >
                                    <pre>{"\t\tif V ∈ Q AND d(V) > dist"}</pre>
                                    <pre>{"\t\t\td(V) = dist, previous(V)=U"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 1) % 8]} >
                                    <pre>{"\t\tElse if previous(V) == NULL"}</pre>
                                    <pre>{"\t\t\td(V) = dist, previous(V)=U\n\t\tQ.insert(V,dist)"}</pre>
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

export default Dijkstra;
