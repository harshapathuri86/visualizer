import React, { useState } from "react";
import { Input, Button, Container } from "semantic-ui-react";

const Addnode = (props) => {
    const [node, setnode] = useState();
    return (
        <Container>
            <Input onChange={(e) => setnode(e.target.value)} placeholder="node" ></Input>
            <Button disabled={!node} onClick={() => {
                 const Node = {
                    id: node,
                    label: node,
                };
                try {
                    props.onAddnode(Node);
                }
                catch (e) {
                    alert(e.message);
                }
            }} color="green" >Add node</Button>
        </Container>
    );
};
export default Addnode;