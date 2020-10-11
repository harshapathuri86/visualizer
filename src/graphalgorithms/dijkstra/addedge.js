import React, { useState } from "react"
import { Input, Button, Container } from "semantic-ui-react";

const Addedge = (props) => {
    const [From, setfrom] = useState("");
    const [To, setto] = useState("");
    const [W, setw] = useState("");
    return (
        <Container>
            <Input value={From} onChange={(e) => setfrom(e.target.value)} placeholder="From" ></Input>
            <Input value={To} onChange={(e) => setto(e.target.value)} placeholder="To" ></Input>
            <Input value={W} onChange={(e) => setw(e.target.value)} placeholder="Weight" type="number" ></Input>
            <Button disabled={!From || !To | !W}
                Onclick={() => {
                    const edge = {
                        from: From,
                        to: To,
                        label: W,
                    };
                    props.onAdd(edge);
                }
                }
            >Add Edge</Button>
        </Container>
    );
};
export default Addedge;