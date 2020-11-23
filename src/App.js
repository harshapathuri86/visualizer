import React from 'react';
import Index from './utils/index'
import { Route } from 'react-router-dom';
import Dijkstra from './graphalgorithms/dijkstra/dijkstra';
import Prims from './graphalgorithms/prims/prims';
import Dfs from './graphalgorithms/dfs/dfs';
import Bfs from './graphalgorithms/bfs/bfs';
import BubbleSort from './sortingalgorithms/bubblesort/sort';
import SelectionSort from './sortingalgorithms/selectionsort/sort';
import InsertionSort from './sortingalgorithms/insertionsort/sort';
import MergeSort from './sortingalgorithms/mergesort/sort';
import QuickSort from './sortingalgorithms/quicksort/sort';
import QuickSort3 from './sortingalgorithms/quicksort3/sort';
import HeapSort from './sortingalgorithms/heapsort/sort';
import ShellSort from './sortingalgorithms/shellsort/sort';
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
      <Route path="/bubblesort" component={BubbleSort} />
      <Route path="/selectionsort" component={SelectionSort} />
      <Route path="/insertionsort" component={InsertionSort} />
      <Route path="/mergesort" component={MergeSort} />
      <Route path="/quicksort" component={QuickSort} />
      <Route path="/quicksort3" component={QuickSort3} />
      <Route path="/shellsort" component={ShellSort} />
      <Route path="/heapsort" component={HeapSort} />

    </>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
