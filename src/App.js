import React from 'react';
import Index from './utils/index'
import { Route } from 'react-router-dom';
import Dijkstra from './graphalgorithms/dijkstra/dijkstra';
// import Search from './searchingalorithms/searchingvisualiser'
// import Sort from './sortingalgorithms/sortingvisualiser'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div >
         <h6>Algorithm Visualizer you can see this in every page</h6>
        <Route exact path="/" component={Index} />
         <Route path="/sort" component={Sort} />
         <Route path="/search" component={Search} />
        <Route path="/dijkstra" component={Dijkstra} />
      </div>
    );
  }
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
