import React, { useState } from "react";
import { Input, Button, Container } from "semantic-ui-react";

const Findnode = (props) => {
    const [node, setnode] = useState();
    return (
        <Container>
            <Input onChange={(e) => setnode(e.target.value)} placeholder="Node" ></Input>
            <Button disabled={!node} onClick={() => {
                 const Node = {
                    id: node,
                    label: node,
                };
                try {
                    props.onFind(Node);
                }
                catch (e) {
                    alert(e.message);
                }
            }} color="green" >{props.children}</Button>
        </Container>
    );
};
export default Findnode;