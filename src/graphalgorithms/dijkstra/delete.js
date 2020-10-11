import React from "react";
import { useState } from "react";
import { Container, Input, Button } from "semantic-ui-react";

const Deleteedge = (props) => {
    const [id, setid] = useState("");
    return (
        <Container>
            <Input value={id} placeholder="node" onChange={(e) => setid(e.target.value)}></Input>
            <Button disabled={!id} color="red" onClick={() => {
                try {
                    props.onDelete(id);
                }
                catch (e) {
                    alert(e.message);
                }
            }} >Delete</Button>
        </Container>
    );
};
export default Deleteedge;