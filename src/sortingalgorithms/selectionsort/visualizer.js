import React, { Component } from 'react';
import './../style.css';
import SortChart from './../utils/SortChart/index';
import VisualizerControls from './../utils/VisualizerControls/index';
import { Segment, Input, Grid, Divider } from "semantic-ui-react";

class Visualizer extends Component {
  state = {
    trace: [],
    traceStep: -1,
    originalArray: [],
    array: [],
    groupA: [],
    groupB: [],
    groupC: [],
    groupD: [],
    value: -1,
    sortedIndices: [],
    timeoutIds: [],
    colour1: "null",
    colour2: "null",
    speed: 1,
  };

  componentDidUpdate(prevProps) {
    console.log("did update", prevProps);
    if (prevProps.array !== this.props.array) {
      this.reset(this.props.array);
    }
    if (prevProps.trace !== this.props.trace) {
      this.clearTimeouts();
      this.setState({ trace: this.props.trace });
    }
  }

  reset = (array) => {
    this.setState({
      array,
      trace: [],
      traceStep: -1,
      groupA: [],
      groupB: [],
      groupC: [],
      groupD: [],
      value: -1,
      sortedIndices: [],
      originalArray: [...array]
    });
  };

  clearTimeouts = () => {
    this.state.timeoutIds.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    this.setState({ timeoutIds: [] });
  };

  changeVisualState = (visualState) => {
    this.setState({
      array: visualState.array,
      groupA: visualState.groupA,
      groupB: visualState.groupB,
      groupC: visualState.groupC,
      groupD: visualState.groupD,
      value: visualState.value,
      sortedIndices: visualState.sortedIndices
    });
    if (visualState.value !== -1) {
      console.log("iam here")
      if (Number(visualState.value) === 0) {
        this.setState({ colour1: "pink", colour2: "" });
      }
      else {
        this.setState({ colour1: "", colour2: "grey" });
      }
    }
  };

  changespeed = (input) => {
    const playing = this.state.timeoutIds.length > 0;
    this.pause();
    const speed = Number(input);
    if (speed > 0) {
      this.setState({ speed }, () => {
        if (playing) this.continue();
      });
    }
    else {
      let speed = 0.25;
      this.setState({ speed }, () => {
        if (playing) this.continue();
      });
    }
  };

  run = (trace) => {
    const timeoutIds = [];
    const timer = 500 / this.state.speed; // timer for each step

    trace.forEach((item, i) => {
      let timeoutId = setTimeout(
        (item) => {
          this.setState(
            (prevState) => ({
              traceStep: prevState.traceStep + 1
            }),
            this.changeVisualState(item)
          );
        },
        i * timer,
        item
      );

      timeoutIds.push(timeoutId);
    });

    let timeoutId = setTimeout(
      this.clearTimeouts,
      trace.length * timer
    );
    timeoutIds.push(timeoutId);

    this.setState({ timeoutIds });
  };

  pause = () => {
    this.clearTimeouts();
  };

  continue = () => {
    const trace = this.state.trace.slice(this.state.traceStep);
    this.run(trace);
  };

  stepForward = () => {
    const trace = this.state.trace;
    const step = this.state.traceStep;
    if (step < trace.length - 1) {
      const item = trace[step + 1];
      this.setState(
        { traceStep: step + 1 },
        this.changeVisualState(item)
      );
    }
  };

  stepBackward = () => {
    const trace = this.state.trace;
    const step = this.state.traceStep;
    if (step > 0) {
      const item = trace[step - 1];
      this.setState(
        { traceStep: step - 1 },
        this.changeVisualState(item)
      );
    }
  };

  render() {
    return (
      <div className="SortVisualizer">
        <Grid>
          <Grid.Row>
            <VisualizerControls
              onPlay={
                this.state.traceStep === -1
                  ? this.run.bind(this, this.state.trace)
                  : this.continue.bind(this)
              }
              onPause={this.pause.bind(this)}
              onForward={this.stepForward.bind(this)}
              onBackward={this.stepBackward.bind(this)}
              playing={this.state.timeoutIds.length > 0}
            />
            <Divider />
            <Input value={this.state.speed} icon='time' label='Speed' size='small' labelPosition='left' type={"number"} step="0.25" onChange={(e) => {
              this.changespeed(e.target.value);
            }} />
          </Grid.Row>
        </Grid>
        <Segment>

          <SortChart
            numbers={this.state.array}
            maxNum={Math.max(...this.state.array)}
            groupA={this.state.groupA}
            groupB={this.state.groupB}
            groupC={this.state.groupC}
            groupD={this.state.groupD}
            sortedIndices={this.state.sortedIndices}
          />
        </Segment>
        <Segment>
          <pre>{"iterate left_index = 0 to N-1 by incrementing 1 at a time"}</pre>
          <pre>{"\titerate right_index = i+1 to N-1-left_index 1 at a time"}</pre>
          <pre className={this.state.colour1}> {"\t\tif(nums[j] < nums[minIndex])"}</pre>
          <pre className={this.state.colour2}>{"\t\t\tswap(nums, i, minIndex);"}</pre>
        </Segment>
      </div >
    );
  }
}

export default Visualizer;
