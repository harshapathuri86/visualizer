import React, { useState } from "react";
import { Container, Input, Button } from "semantic-ui-react";

const Solve = (props) => {
    const [start, setstart] = useState("1");
    // const [end, setend] = useState("5");
    const [time, settime] = useState(0.5);
    return (
        <Container>
            {
                props.time && (
                    <>
                        <input
    value={time}
    min={0.5} max={5} step={0.5}
    placeholder="s" type="range"
    onChange={(e) => settime(e.target.value)}/>
                        <span className="mr-3" >{time} s</span>
                    </>
                )
            }
            <Input value={start} placeholder="Start" onChange={(e) => setstart(e.target.value)}/>
            {/* <Input value={end} placeholder="End" onChange={(e) => setend(e.target.value)}></Input> */}
            <Button
                disabled={!start || !time || props.solving}
                color="green" loading={props.solving}
                onClick={(e) => !props.solving && props.solve(start, time)}>
                {props.children}</Button>
        </Container>
    );
};
export default Solve;