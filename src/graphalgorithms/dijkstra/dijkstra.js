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
import { solveDijkstra, color, nextstep, initialstate, getpath } from "./utils/solvedijkstra";
import { addedge, deleteedge, deletenode, resetNetwork } from "./utils/network";

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
    ],
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
        <Container style={{ marginTop: "3em" }}>
            <Grid divided="vertically">
                <Grid.Row columns={2} >
                    <Grid.Column width={6}>
                        <Segment>
                            <Toggle label="bidirectional" onChange={(val) => {
                                setbi(val);
                                if (val) {
                                    ref.current.Network.setOptions({
                                        edges: {
                                            smooth: false,
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
                            <Divider />
                            <Addedge onAddedge={(edge) => { addedge(edge, ref.current, false); }} />
                            <Divider />
                            <Deleteedge onDeleteedge={(edge) => { deleteedge(edge, ref.current); }} />
                            <Divider />
                            <Solve solving={solving} solve={(e, s) => {
                                setsolving(true);
                                console.log(e, s, bi);
                                const [path, cost] = solveDijkstra(
                                    ref.current.nodes.get(),
                                    ref.current.edges.get(),
                                    e, s, bi
                                );
                                resetNetwork(ref.current);
                                color(path, "#ff00ff", ref.current, bi);
                                setsol(path.join("->") + " cost:" + cost);
                                setsolving(false);
                            }} >Run Dijkstra</Solve>
                            <Divider />
                            <Solve
                                solving={solving}
                                time={true}
                                solve={async (start, end, t) => {
                                    setsolving(true);
                                    let state = initialstate(
                                        ref.current.nodes.get(),
                                        ref.current.edges.get(),
                                        start
                                    );
                                    while (state.unvisited.length > 1) {
                                        state = nextstep(state, ref.current.edges.get(), bi);
                                        resetNetwork(ref.current);
                                        setsol(
                                            "Visited: " +
                                            state.visited.map((n) => n.id).join(" ") +
                                            " , " +
                                            "Unvisited: " +
                                            state.unvisited.map((n) => n.id).join(" ")
                                        );
                                        color(
                                            state.visited.map((n) => n.id),
                                            "red",
                                            ref.current,
                                            bi
                                        );
                                        await sleep(t * 1000);
                                    }
                                    const [path, cost] = getpath(state.table, end);
                                    color(path, "#ff00ff", ref.current, bi);
                                    setsol(path.join("->") + " cost: " + cost);
                                    setsolving(false);
                                }}
                            >
                                Dijkstra Steps</Solve>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment>
                            <Graph
                                style={{ height: "500px", width: "100%" }}
                                graph={graph}
                                options={options}
                                ref={ref}
                            />
                        </Segment>
                        {sol && <Segment>{sol}</Segment>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Dijkstra;
