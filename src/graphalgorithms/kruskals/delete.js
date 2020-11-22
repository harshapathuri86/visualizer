import React from "react";
import { useState } from "react";
import { Container, Input, Button } from "semantic-ui-react";

const Deletenode = (props) => {
    const [id, setid] = useState("");
    return (
        <Container>
            <Input value={id} placeholder="node" onChange={(e) => setid(e.target.value)}></Input>
            <Button color='red' disabled={!id} onClick={() => {
                try {
                    props.onDeletenode(id);
                }
                catch (e) {
                    alert(e.message);
                }
            }} >Delete node</Button>
        </Container>
    );
};
export default Deletenode;