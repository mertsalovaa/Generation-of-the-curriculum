import React from "react";
import { API_URL } from "../../App";

export default class TeacherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teacher: {} };
  }

  componentDidMount() {
    fetch(
      `${API_URL}/get-data-teacher?email=${localStorage.getItem("teacher")}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ teacher: data });
      });
  }

  render() {
    localStorage.setItem("teacher", this.props.match.params.email);
    const { teacher } = this.state;
    return <div>Teacher {teacher.cooperativeEmail}</div>;
  }
}
