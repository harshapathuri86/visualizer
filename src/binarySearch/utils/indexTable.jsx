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
            <div className="container mt-10">
                <center>
                    <div className="row mt-10">
                        <div className="col-sm-2 col-10">
                            <NavLink to="/binary-search">
                                <p className="text-dark thumb-title">
                                    Binary Search
                                </p>
                            </NavLink>
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}
