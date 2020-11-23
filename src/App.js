import React from 'react';
import Index from './utils/index'
import { Route } from 'react-router-dom';
import Dijkstra from './graphalgorithms/dijkstra/dijkstra';
import Prims from './graphalgorithms/prims/prims';
import Dfs from './graphalgorithms/dfs/dfs';
import Bfs from './graphalgorithms/bfs/bfs';
import Bubblesort from './sortingalgorithms/bubblesort/sort';
import Insertionsort from './sortingalgorithms/insertionsort/sort';
import binarysearchtree from './graphalgorithms/Binarytree/BinaryTree';
import binarySearch from "./binarySearch/binarySearch";
import './App.css';
import Kruskals from './graphalgorithms/kruskals/kruskals';

export default function App() {
  return (
    <>
      <Route exact path="/" component={Index} />
      <Route path="/dijkstra" component={Dijkstra} />
      <Route path="/prims" component={Prims} />
      <Route path="/dfs" component={Dfs} />
      <Route path="/bfs" component={Bfs} />
      <Route path="/binarysearch" component={binarySearch} />
      <Route path="/binarysearchtree" component={binarysearchtree} />
      <Route path="/krushkal" component={Kruskals} />
      <Route path="/bubblesort" component={Bubblesort} />
      <Route path="/insertionsort" component={Insertionsort} />
    </>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
