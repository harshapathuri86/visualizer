import React, { useState } from "react"
import { Input, Button, Container } from "semantic-ui-react";

const Deleteedge = (props) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [w, setW] = useState("");
    return (
        <Container>
            <Input
    value={from}
    onChange={(e) => setFrom(e.target.value)}
    placeholder="From"
    />
            <Input
    value={to}
    onChange={(e) => setTo(e.target.value)}
    placeholder="To"
    />
            <Input
    value={w}
    onChange={(e) => setW(e.target.value)}
    placeholder="Capacity"
    type="number"
    />
            <Button
                disabled={!from || !to | !w | w < 0}
                onClick={() => {
                    const edge = {
                        from: from,
                        to: to,
                        label: w,
                    };
                    props.onDeleteedge(edge);
                }}
            >
                Delete Edge
        </Button>
        </Container>
    );
};
export default Deleteedge;