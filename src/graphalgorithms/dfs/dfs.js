import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Segment, Radio, Table, Label } from "semantic-ui-react";
import Addedge from "./addedge";
import Addnode from "./node";
import Deleteedge from "./deleteedge";
import Deletenode from "./delete"
import Solve from "./solve";
import { addedge, deleteedge, deletenode, resetNetwork } from "./network";
import './dfs.css';
import Navbar from '../../utils/Navbar';

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


export function findIndex(id, table) {
    console.log("id t", id, table);
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === id) {
            return i;
        }
    }
}


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


function Dfs() {
    const ref = useRef();
    const [bi, setbi] = useState(false);
    const [sol, setsol] = useState("");
    const [solving, setsolving] = useState(false);
    let ColorArray = [];
    let path = "";
    const [Path, setpath] = useState("");
    for (let i = 0; i < 8; i++) ColorArray.push('white');
    ColorArray[7] = 'pink';
    const [V, setV] = useState("");
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
        },
    };

    return (
        <Container fluid >
            <Navbar text="Depth First Search" />
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
                        <Solve
                            solving={solving}
                            time={true}
                            solve=
                            {async (start, t) => {
                                setV(1);
                                console.log("TIME", t);
                                setsolving(true);
                                resetNetwork(ref.current);
                                let Arr = [];
                                let state = ref.current.nodes.map((node) => {
                                    return {
                                        id: node.id,
                                        isvisited: node.id === start ? true : false,
                                    };
                                });
                                Arr.push(start);
                                path = "Order of visited nodes : " + start.toString() + " ";
                                setpath(path);
                                setsol(
                                    " Stack : " + Arr.map((n) => n.toString()).join(" <- ")
                                );
                                await sleep(t * 1000);
                                while (Arr.length >= 1) {
                                    setV(2);
                                    await sleep(t * 1000);
                                    const nextnode = Arr.pop();
                                    ref.current.nodes.update({
                                        id: nextnode,
                                        color: "orange",
                                    });
                                    setV(3);
                                    setsol(
                                        " Stack : " + Arr.reverse().slice().map((n) => n.toString()).join(" <- ")
                                    );
                                    await sleep(t * 1000);
                                    let connectededges = getconnectededges(nextnode, ref.current.edges.get(), bi);
                                    for (const ed of connectededges) {
                                        setV(4);
                                        await sleep(t * 1000);
                                        let ind = -1;
                                        if (ed.from === nextnode) {
                                            ind = findIndex(ed.to, state);
                                        }
                                        else if (bi & ed.to === nextnode) {
                                            ind = findIndex(ed.from, state)
                                        }
                                        ref.current.nodes.update({
                                            id: state[ind].id,
                                            color: "red",
                                        });
                                        ref.current.edges.update({
                                            ...ed,
                                            color: "red",
                                        });
                                        setV(5);
                                        await sleep(t * 1000);
                                        if (state[ind].isvisited === false) {
                                            state[ind].isvisited = true;
                                            ref.current.nodes.update({
                                                id: state[ind].id,
                                                color: "yellow",
                                            });
                                            Arr.push(state[ind].id);
                                            path = path + state[ind].id + " ";
                                            setpath(path);
                                            setV(6);
                                            setsol(
                                                " Stack : " + Arr.reverse().slice().map((n) => n.toString()).join(" <- ")
                                            );
                                            await sleep(t * 1000);
                                        }
                                        else {
                                            ref.current.nodes.update({
                                                id: state[ind].id,
                                                color: "green",
                                            });
                                        }
                                        ref.current.edges.update({
                                            ...ed,
                                            color: null,
                                        });
                                    }
                                    ref.current.nodes.update({
                                        id: nextnode,
                                        color: "green",
                                    });
                                }

                                setV(2);
                                await sleep(t * 1000);
                                setV(7);
                                setsolving(false);
                            }
                            }
                        > dfs steps
                    </Solve>
                        <Segment style={{ height: "15vh" }} >
                            {sol}
                            <pre>{'\n'}{Path}</pre>
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
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                        <Table.Row size='small'><Table.Cell><Label ribbon color='green'>PSEUDO CODE</Label></Table.Cell></Table.Row>
                        <Table size='small' >
                            <Table.Body >
                                <Table.Row textAlign='left'><Table.Cell height='5' bgcolor={ColorArray[(V + 7) % 8]} >
                                    <pre>{"BEGIN"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 6) % 8]} >
                                    <pre>{"Stack S:{}"}</pre>
                                    <pre>{"for each vertex V ∈ vertices"}</pre>
                                    <pre>{"\tvisited[V] = false"}</pre>
                                    <pre>{"visited[A] = true, (A : start node)"}</pre>
                                    <pre>{"push A into S"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 5) % 8]} >
                                    <pre>{"While Stack S ≠ ∅ (empty)"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 4) % 8]} >
                                    <pre>{"\tU = pop node from S"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 3) % 8]} >
                                    <pre>{"\tfor each neighbour V of U"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 2) % 8]} >
                                    <pre>{"\t\tif(visited[V]==false)"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 1) % 8]} >
                                    <pre>{"\t\t\tvisited[V] = true"}</pre>
                                    <pre>{"\t\t\tpush V into S"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V) % 8]} >
                                    <pre>{"End"}</pre>
                                </Table.Cell></Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container >
    );
}

export default Dfs;
