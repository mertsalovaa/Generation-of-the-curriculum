import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout } from "./components/Layout";

import "./custom.css";
import { Home } from "./components/Home";
import React from "react";
import { Login } from "./components/Login";
import { GenerateAbiturient } from "./components/Generate-abiturient";
import Profile from "./components/Profile";
import ClassmatesPage from "./components/client-pages/classmates";
import SubjectsPage from "./components/client-pages/subjects";
import SubjectInfo from "./components/client-pages/subject-info";
import TeacherInfo from "./components/client-pages/teacher";

export const API_URL = "https://localhost:44308/api/User";

export default class App extends React.Component {
  static displayName = App.name;
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/generate-abiturient" component={GenerateAbiturient} />
          <Route path="/client/classmates" component={ClassmatesPage} />
          <Route path="/client/subjects" component={SubjectsPage} />
          <Route path="/client/subject-info/:name" component={SubjectInfo} />
          <Route path="/client/teacher-info/:email" component={TeacherInfo} />
        </Layout>
      </Router>
    );
  }
}
