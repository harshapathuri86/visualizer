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
            <div className="container mt-2">
                <center>
                    <div className="row mt-2">
                        <div className="col-sm-4 col-6">
                            <NavLink to="/search">
                                <p className="text-dark thumb-title">
                                    Search
                                </p>
                            </NavLink>
                        </div>
                        <div className="col-sm-4 col-6">
                            <NavLink to="/sort">
                                <p className="text-dark thumb-title">
                                    Sort
                                </p>
                            </NavLink>
                        </div>
                        <div className="col-sm-4 col-6">
                            <NavLink to="/graph">
                                <p className="text-dark thumb-title">
                                    Graph
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
                    </div>
                </center>
            </div>
        );
    }
}
