import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Segment, Radio, Table, Label } from "semantic-ui-react";
import Addedge from "./addedge";
import Addnode from "./node";
import Deleteedge from "./deleteedge";
import Deletenode from "./delete"
import Solve from "./solve";
import { addedge, deleteedge, deletenode, resetNetwork } from "./network";
import "./bfs.css";
// import remaining files


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
        // { from: "1", to: "2", label: "-10" },
        // { from: "2", to: "3", label: "-10" },
        // { from: "3", to: "4", label: "-10" },
        // { from: "4", to: "5", label: "-10" },
        // { from: "5", to: "1", label: "-10" },
        { from: "1", to: "2", },
        { from: "1", to: "4", },
        { from: "2", to: "4", },
        { from: "2", to: "5", },
        { from: "4", to: "5", },
        { from: "5", to: "2", },
        { from: "3", to: "2", },
        { from: "5", to: "3", },
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
            ></Radio>
        </div>
    )
};


function Bfs() {
    // console.log("in dijstra");
    const ref = useRef();
    let Valarray = [];
    const [sol, setsol] = useState("");
    const [bi, setbi] = useState(false);
    const [solving, setsolving] = useState(false);
    let ColorArray = [];
    for (let i = 0; i < 8; i++) ColorArray.push('white');
    ColorArray[7] = 'pink';
    const [V, setV] = useState("");
    const options = {
        autoResize: true,
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
            randomSeed: undefined,
            improvedLayout: true,
            hierarchical: {
                enabled: false,
                // enabled: true,
                levelSeparation: 150,
                nodeSpacing: 150,
                treeSpacing: 200,
                // blockShifting: true,
                edgeMinimization: true,
                parentCentralization: false,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: "directed",   // hubsize, directed
                shakeTowards: "roots",
            }

        },
        edges: {
            color: "#000000",
            smooth: {
                // type: "cubicBezier",
                // forceDirection: 'vertical',
                // roundness: 0.25
            },
        },
        // height: "100%",
    };

    return (
        <Container style={{ marginTop: "3em" }} inverted bgcolor='red'>
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
                        <Divider />
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16}>
                        <Solve
                            solving={solving}
                            time={true}
                            solve=
                            {async (start, t) => {
                                console.log("TIME", t);
                                setsolving(true);
                                setV(1);
                                resetNetwork(ref.current);
                                let Arr = [];
                                let state = ref.current.nodes.map((node) => {
                                    return {
                                        id: node.id,
                                        isvisited: node.id === start ? true : false,
                                        distance: node.id === start ? 0 : "-",
                                    };
                                });
                                for (let i = 0; i < state.length; i++) {
                                    ref.current.nodes.update({
                                        id: state[i].id,
                                        label: state[i].id + ":" + state[i].distance,
                                    });
                                }
                                Arr.push(start);
                                Valarray = Arr;
                                setsol(
                                    "QUEUE : " + Valarray.map((n) => n.toString() + " ").join("<-")
                                );
                                await sleep(t * 1000);
                                setV(2);
                                await sleep(t * 1000);
                                while (Arr.length >= 1) {
                                    console.log("while");
                                    const nextnode = Arr[0];
                                    ref.current.nodes.update({
                                        id: nextnode,
                                        color: "orange",
                                    });
                                    Arr.shift();
                                    Valarray = Arr;
                                    setsol(
                                        "QUEUE : " + Valarray.map((n) => n.toString() + " ").join("<-")
                                    );
                                    setV(3);
                                    await sleep(t * 1000);
                                    // for (let i = 0; i < state.length; i++) {
                                    //     if (state[i].id === nextnode) {
                                    //         state[i].visited = 1;
                                    //     }
                                    // }
                                    let connectededges = getconnectededges(nextnode, ref.current.edges.get(), bi);

                                    for (const ed of connectededges) {
                                        ref.current.edges.update(
                                            {
                                                ...ed,
                                                color: "orange",
                                                width: 2,
                                            }
                                        )
                                        let ind = -1;
                                        if (ed.from === nextnode) {
                                            ind = findIndex(ed.to, state);
                                        }
                                        else if (bi & ed.to === nextnode) {
                                            ind = findIndex(ed.from, state)
                                        }
                                        setV(4);
                                        Valarray = Arr;
                                        setsol(
                                            "QUEUE : " + Valarray.map((n) => n.toString() + " ").join("<-")
                                        );
                                        await sleep(t * 1000);
                                        setV(5);
                                        await sleep(t * 1000);
                                        if (state[ind].isvisited === false) {
                                            state[ind].isvisited = true;
                                            state[ind].distance = state[findIndex(nextnode, state)].distance + 1;
                                            Arr.push(state[ind].id);
                                            // ref.current.edges.update(
                                            //     {
                                            //         ...ed,
                                            //         color: "green",
                                            //         width: 2,
                                            //     }
                                            // )
                                            ref.current.nodes.update({
                                                id: state[ind].id,
                                                label: state[ind].id + ":" + state[ind].distance,
                                                color: "yellow",
                                            })
                                            setV(6);
                                            Valarray = Arr;
                                            setsol(
                                                "QUEUE : " + Valarray.map((n) => n.toString() + " ").join("<-")
                                            );
                                            await sleep(t * 1000);
                                        }
                                        // else {
                                        ref.current.edges.update(
                                            {
                                                ...ed,
                                                color: null,
                                                width: 1,
                                            }
                                        )
                                        // }
                                    }
                                    ref.current.nodes.update({
                                        id: nextnode,
                                        color: null,
                                    });
                                    setV(2);
                                    await sleep(t * 1000);
                                }
                                setV(7);
                                setsolving(false);
                            }
                            }
                        > bfs steps
                    </Solve>
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
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                        <Table.Row size='small'><Table.Cell><Label ribbon color='green'>PSEUDO CODE</Label></Table.Cell></Table.Row>
                        <Table size='small' >
                            <Table.Body >
                                <Table.Row textAlign='left'><Table.Cell height='5' bgcolor={ColorArray[(V + 7) % 8]} >
                                    <pre>{"BEGIN"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 6) % 8]} >
                                    <pre>{"for each vertex V ∈ vertices"}</pre>
                                    <pre>{"\texplored[V] = false,d[V] = ∞"}</pre>
                                    <pre>{"explored[S] = true,d[S] = 0 [S : start node]"}</pre>
                                    <pre>{"Insert Start to Q"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 5) % 8]} >
                                    <pre>{"While queue Q ≠ ∅ (empty)"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 4) % 8]} >
                                    <pre>{"\tU = remove node from the front of Q"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 3) % 8]} >
                                    <pre>{"\tfor each V adjacent to U"}</pre>
                                </Table.Cell></Table.Row>
                                <Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 2) % 8]} >
                                    <pre>{"\t\tif explored[V] ≠ true"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V + 1) % 8]} >
                                    <pre>{"\t\t\texplored[v] = true"}</pre>
                                    <pre>{"\t\t\td[V] = d[U] + 1"}</pre>
                                    <pre>{"\t\t\tInsert V to the end of Q"}</pre>
                                </Table.Cell></Table.Row>
                                < Table.Row textAlign='left'><Table.Cell bgcolor={ColorArray[(V) % 8]} >
                                    <pre>{"END"}</pre>
                                </Table.Cell></Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container >
    );
}

export default Bfs;
