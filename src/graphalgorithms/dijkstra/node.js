import React, { useState } from "react";
import { Input, Button, Container } from "semantic-ui-react";

const Addnode = (pros) => {
    const [node, setnode] = useState();
    return (
        <Container>
            <Input value="node" onChange={(e) => setnode(e.target.value)} placeholder="node" ></Input>
            <Button disabled={!node} onClick={() => {
                const node = {
                    id: node,
                    label: node,
                };
                try {
                    props.onAdd(node);
                }
                catch (e) {
                    alert(e.message);
                }
            }} >Add node</Button>
        </Container>
    );
};
export default Addnode;