import React, { useState } from "react";
import { Container, Button } from "semantic-ui-react";

const Solve = (props) => {
    // const [start, setstart] = useState("1");
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
            <Button
                disabled={!time || props.solving}
                color="green" loading={props.solving}
                onClick={(e) => !props.solving && props.solve(time)}>
                {props.children}</Button>
        </Container>
    );
};
export default Solve;