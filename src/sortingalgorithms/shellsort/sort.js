import React, { Component } from "react";
import { Input, Icon, Container, Button } from "semantic-ui-react";
import ShellSort from './ShellSort';
import Visualizer from "./../visualizer";

class Sort extends Component {
    state = {
        array: [],
        arraySize: 20,
        trace: [],
    };
    componentDidMount() // options changed 
    {
        this.randomize();
    }
    randomize = () => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max)) + 1;
        }
        const array = Array(this.state.arraySize)
            .fill(0)
            .map(() => getRandomInt(this.state.arraySize * 5));
        this.setState(
            {
                array,
                trace: []
            },
            this.createTrace
        );
    };
    changesize = (size) => {
        size = Number(size);
        size = size > 100 ? 100 : size;
        size = size < 0 ? 0 : size;
        this.setState({ arraySize: size }, this.randomize);
    };
    createTrace = () => {
        const numbers = [...this.state.array];
        const trace = ShellSort(numbers);
        this.setState({ trace });
    };
    render() {
        return <Container>
            <Button color="green" onClick={() => {
                this.randomize();
                this.createTrace();
            }}>
                <Icon name='random' color="black" />Random
                    </Button>
            <Input value={this.state.arraySize} label="Number of bars" labelPosition='left' type={"number"} onChange={(e) => {
                this.changesize(e.target.value);
                this.randomize();
                this.createTrace();
            }} />
            <Visualizer
                array={this.state.array}
                trace={this.state.trace}
            />
        </Container>;
    }
}
export default Sort;
