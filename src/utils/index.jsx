import React from "react";
import { NavLink } from "react-router-dom";

import "./bootstrap.min.css";

export default class IndexTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container mt-2" >
                <div className="row mt-2">
                    <div className="col-sm-4 col-6">
                        <NavLink to="/binarysearch">
                            <p className="text-dark thumb-title">
                                Binary Search
                            </p>
                        </NavLink>
                    </div>
                    <div className="col-sm-4 col-6">
                        <NavLink to="/dijkstra">
                            <p className="text-dark thumb-title">
                                Dijkstra
                            </p>
                        </NavLink>
                    </div>
                    <div className="col-sm-4 col-6">
                        <NavLink to="/prims">
                            <p className="text-dark thumb-title">
                                Prims
                            </p>
                        </NavLink>
                    </div>
                    <div className="col-sm-4 col-6">
                        <NavLink to="/dfs">
                            <p className="text-dark thumb-title">
                                Dfs
                            </p>
                        </NavLink>
                    </div>
                    <div className="col-sm-4 col-6">
                        <NavLink to="/bfs">
                            <p className="text-dark thumb-title">
                                Bfs
                            </p>
                        </NavLink>
                    </div>
                    <div className="col-sm-4 col-6">
                        <NavLink to="/krushkal">
                            <p className="text-dark thumb-title">
                                krushkal
                        </p>
                        </NavLink>
                    </div>
                    <div className="col-sm-4 col-6">
                        <NavLink to="/binarysearchtree">
                            <p className="text-dark thumb-title">
                                Binary Search Tree
                            </p>
                        </NavLink>
                    </div>
                </div>
                <div className="col-sm-4 col-6">
                    <NavLink to="/bubblesort">
                        <p className="text-dark thumb-title">
                            Bubble Sort
                        </p>
                    </NavLink>
                </div>
                <div className="col-sm-4 col-6">
                    <NavLink to="/insertionsort">
                        <p className="text-dark thumb-title">
                            Insertion Sort
                        </p>
                    </NavLink>
                </div>
            </div>
        );
    }
}
