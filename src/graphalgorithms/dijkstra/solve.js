import React, { useState } from "react";
import { Container, Input, Button } from "semantic-ui-react";

const Solve = (props) => {
    const [start, setstart] = useState("A");
    const [end, setend] = useState("C");
    const [time, settime] = useState(1);
    return (
        <Container>
            {
                props.time && (
                    <>
                        <input
                            value={time}
                            min={1} max={10} step={1}
                            placeholder="s" type="range"
                            onChange={(e) => settime(e.target.value)}></input>
                        <span className="mr-3" >{time} s</span>
                    </>
                )
            }
            <Input value={start} placeholder="Start" onChange={(e) => setstart(e.target.value)}></Input>
            <Input value={end} placeholder="End" onChange={(e) => setend(e.target.value)}></Input>
            <Button
                disabled={!start || !end || !time || props.solving}
                color="green" loading={props.solving}
                onClick={(e) => !props.solving && props.solve(start, end, time)}>
                {props.children}</Button>
        </Container>
    );
};
export default Solve;