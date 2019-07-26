import React, { Component } from "react";
import logo from "./logo.svg";
import Movies from "./containers/movies";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Movies />
            </div>
        );
    }
}

export default App;
