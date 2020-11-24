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
    colour3: "null",
    colour4: "null",
    colour5: "null",
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
        this.setState({ colour1: "green", colour2: "", colour3: "", colour4: "", colour5: "" });
      }
      else if (Number(visualState) === 1) {
        this.setState({ colour1: "", colour2: "green", colour3: "", colour4: "", colour5: "" });
      }
      else if (Number(visualState) === 2) {
        this.setState({ colour1: "", colour2: "", colour3: "green", colour4: "", colour5: "" });
      }
      else if (Number(visualState) === 3) {
        this.setState({ colour1: "", colour2: "", colour3: "", colour4: "green", colour5: "" });
      }
      else {
        this.setState({ colour1: "", colour2: "", colour3: "", colour4: "", colour5: "green" });
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
          <pre>{"QUICK SORT USING 3- WAY PARTITION\n"}</pre>
          <pre className={this.state.colour2}> {" swap(array, start, end)"}</pre>
          <pre className={this.state.colour4}> {" swap(array, j, k);"}</pre>
          <pre className={this.state.colour5}> {"\tpivot_elements = i - start;\n \ti = i- 1;\n\tj = j - 1;\n\n\twhile (i >= start)\n \t{\n\t\tswap(array, i, j);\n\t\ti = i - 1;\n\t\tj = j -  1;\n\t}"}</pre>
        </Segment>
        <Segment>
          <pre>{" Iterate left_index = 0 to N by incrementing 1 at a time"}</pre>
          <pre className={this.state.colour1}> {"\tpiviot = rand(start,end)"}</pre>
          <pre className={this.state.colour2}> {" \tswapping"}</pre>
          <pre className={this.state.colour3}> {"\t\t[pivotStart, pivotEnd] = partition(array, start, end"}</pre>
          <pre className={this.state.colour4}> {"\t\tMove the elements less than piviot to to lesser list "}</pre>
          <pre className={this.state.colour5}> {"\t\tMove pivot_elements to center"}</pre>
          <pre>{" \trecursiveQuickSort3(array, start, pivotStart) \n\trecursiveQuickSort3(array, pivotEnd, end)\n\trecursiveQuickSort3(nums, 0, nums.length)"}</pre>
        </Segment>
      </div >
    );
  }
}

export default Visualizer;
