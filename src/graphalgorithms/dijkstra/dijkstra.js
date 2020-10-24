import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Segment, Radio } from "semantic-ui-react";
import Addedge from "./addedge";
import Addnode from "./node";
import Deleteedge from "./deleteedge";
import Deletenode from "./delete"
import Solve from "./solve";
import "./dijkstra.css";

// import remaining files
import { solveDijkstra, color, getconnectednodes, findIndex, getpath } from "./utils/dijkstrapq";
import { addedge, deleteedge, deletenode, resetNetwork } from "./utils/network";
import { PriorityQueue, Node } from './utils/priorityqueue';

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const graph = {
    nodes: [
        { id: "A", label: "A" },
        { id: "B", label: "B" },
        { id: "C", label: "C" },
        { id: "D", label: "D" },
        { id: "E", label: "E" },
    ],
    edges: [
        { from: "A", to: "B", label: "6" },
        { from: "A", to: "D", label: "1" },
        { from: "B", to: "D", label: "2" },
        { from: "B", to: "E", label: "1" },
        { from: "D", to: "E", label: "1" },
        { from: "E", to: "B", label: "2" },
        { from: "C", to: "B", label: "5" },
        { from: "E", to: "C", label: "5" },
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


function Dijkstra() {
    console.log("in dijstra");
    const ref = useRef();
    const [sol, setsol] = useState("");
    const [bi, setbi] = useState(false);
    const [solving, setsolving] = useState(false);
    const options = {
        layout: {
            hierarchical: false,
        },
        edges: {
            color: "#000000",
            smooth: true,
        },
        height: "100%",
    };
    return (
        <Container style={{ marginTop: "3em" }}  >
            <Grid padded celled >
                <Grid.Row columns={3} divided >
                    <Grid.Column width={4}>
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
                    <Grid.Column width={6}>
                        <Addedge onAddedge={(edge) => { addedge(edge, ref.current, false); }} />
                        <Divider />
                        <Deleteedge onDeleteedge={(edge) => {
                            deleteedge(edge, ref.current, bi);
                        }} />
                        {/* <Divider /> */}
                    </Grid.Column>
                    <Grid.Column >
                        <Solve solving={solving} solve={(start, end) => {
                            setsolving(true);
                            console.log(start, end, bi);
                            const [path, cost] = solveDijkstra(
                                ref.current.nodes.get(),
                                ref.current.edges.get(),
                                start, end, bi, ref.current
                            );
                            resetNetwork(ref.current);
                            color(path, "#00ff00", ref.current, bi);
                            if (cost !== Infinity)
                                setsol(path.join("->") + " cost:" + cost);
                            else {
                                setsol("No path exists from " + start + " to " + end);
                                resetNetwork(ref.current);
                            }
                            setsolving(false);
                        }} >Run Dijkstra</Solve>
                        <Divider />
                        <Solve
                            solving={solving}
                            time={true}
                            solve={async (start, end, t) => {
                                setsolving(true);
                                resetNetwork(ref.current);
                                let PQ = new PriorityQueue();
                                // let state = initialstate(nodes, edges, start, PQ, network);

                                // console.log("network", network);
                                PQ.enqueue(new Node(start, 0));
                                // console.log("edges", edges);
                                const state = ref.current.nodes.map((node) => {
                                    return {
                                        id: node.id,
                                        distance: node.id === start ? 0 : Infinity,
                                        previous: null,
                                    };
                                });
                                // console.log("edgesdup", edgesdup);
                                console.log("state", state);
                                // await sleep(3 * 1000);
                                while (PQ.values.length >= 1) {
                                    let lol = 0;
                                    console.log("pq values", PQ.values);
                                    const nextnode = PQ.dequeue();
                                    const connectednodes = getconnectednodes(nextnode.value, ref.current.edges.get(), bi);
                                    connectednodes.forEach((node) => {
                                        const ind = findIndex(node.id, state);
                                        if (state[ind].distance > node.distance + nextnode.distance) {
                                            lol = 1;
                                            state[ind].previous = nextnode.value;
                                            state[ind].distance = node.distance + nextnode.distance;
                                            ref.current.edges.forEach(async (ed, t) => {
                                                const val = (ed.to === node.id && ed.from === nextnode.value && node.distance.toString() === ed.label);
                                                console.log("values", ed, node, nextnode, state[ind], val)
                                                let sum = node.distance + nextnode.distance;
                                                if (val) {
                                                    ref.current.edges.update({
                                                        ...ed,
                                                        // label: sum.toString(),
                                                        width: 2,
                                                        color: "#ff0000",
                                                    });
                                                    console.log("lol:)", sum);
                                                    // state[ind].distance  = sum;
                                                    node.distance = sum;
                                                }
                                            });
                                            PQ.enqueue(new Node(state[ind].id, state[ind].distance));
                                            setsol(
                                                "PRIORITY QUEUE " + PQ.values.map((n) => n.value).join(" ")
                                            );
                                            console.log("time", t);
                                        }

                                    });
                                    if (lol === 1) { lol = 0; await sleep(t * 1000); }
                                }
                                const [path, cost] = getpath(state, end);
                                color(path, "#00ff00", ref.current, bi);
                                if (cost !== Infinity)
                                    setsol(path.join("->") + " cost:" + cost);
                                else {
                                    setsol("No path exists from " + start + " to " + end);
                                    resetNetwork(ref.current);
                                }
                                setsolving(false);
                            }}
                        >
                            Dijkstra Steps</Solve>
                        {/* <Divider /> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} >
                    <Grid.Column width={10}>
                        {sol && <Segment>{sol}</Segment>}
                        <Graph
                            style={{ height: "500px", width: "100%" }}
                            graph={graph}
                            options={options}
                            ref={ref}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container >
    );
}

export default Dijkstra;
