import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import { Container, Grid, Divider, Segment, Header as SHeader, Table, Button, Label } from "semantic-ui-react";
import Addedge from "./addedge";
import Deleteedge from "./delete"
import Addnode from "./node";
import Solve from "./solve";
import "./dijkstra.css";

// import remaining files

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

function Dijkstra() {
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
        <Container >
            <Grid divide="vertically">
            </Grid>
        </Container>
    );
}