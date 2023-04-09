import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout } from "./components/Layout";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";

import "./custom.css";
import { Home } from "./components/Home";
import React from "react";
import { Login } from "./components/Login";
import { GenerateAbiturient } from "./components/Generate-abiturient";

export default class App extends React.Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/fetch-data" component={FetchData} />
          <Route path="/generate-abiturient" component={GenerateAbiturient} />
        </Layout>
      </Router>
    );
  }
}