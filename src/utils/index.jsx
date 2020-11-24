import React from "react";
import { NavLink } from "react-router-dom";
import "./bootstrap.min.css";
import './index.css';
import { Icon } from 'semantic-ui-react';
export default class IndexTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <a href='https://github.com/harsha-p/visualizer'>
                    <Icon name='github' size='huge' style={{ position: 'absolute', right: 0 }} />
                </a>
                <div class="ui grid stackable container" style={{ marginTop: 10 }}>
                    <div class="three wide column" >
                        <NavLink to="/binarysearch">
                            <p class="link">
                                Binary Search
                            </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/dijkstra">
                            <p class="link">
                                Dijkstra's algorithm
                            </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/prims">
                            <p class="link">
                                Prim's algorithm
                            </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/dfs">
                            <p class="link">
                                Depth First Search
                            </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/bfs">
                            <p class="link">
                                Breadth First Search
                            </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/krushkal">
                            <p class="link">
                                Krushkal's algorithm
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/binarysearchtree">
                            <p class="link">
                                Binary Search Tree
                            </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/bubblesort">
                            <p class="link">
                                Bubble Sort
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/selectionsort">
                            <p class="link">
                                Selection Sort
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/insertionsort">
                            <p class="link">
                                Insertion Sort
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/mergesort">
                            <p class="link">
                                Merge Sort
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/quicksort">
                            <p class="link">
                                Quick Sort
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/quicksort3">
                            <p class="link">
                                Quick Sort3
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/shellsort">
                            <p class="link">
                                Shell Sort
                        </p>
                        </NavLink>
                    </div>
                    <div class="three wide column">
                        <NavLink to="/heapsort">
                            <p class="link">
                                Heap Sort
                        </p>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}


