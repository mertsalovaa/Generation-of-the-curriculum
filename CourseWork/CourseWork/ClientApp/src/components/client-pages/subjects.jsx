import React from "react";
import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../App";

class SubjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { group: [] };
  }

  componentDidMount() {
    fetch(
      `${API_URL}/get-subject-by-email?email=${localStorage.getItem("email")}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ group: data });
      });
  }

  render() {
    const { group } = this.state;
    return (
      <div>
        <Table className="w-75 m-auto" striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Назва</th>
              <th>Тип</th>
              <th>Кредити</th>
              <th>Лекції</th>
              <th>Лабораторні</th>
              <th>Практичні</th>
            </tr>
          </thead>
          <tbody>
            {group.map((item) => (
              <tr key={item.id}>
                <td>–</td>
                <td>
                  <CustLink
                    className="w-100"
                    to={`/client/subject-info/${item.name}`}
                  >
                    {item.name}
                  </CustLink>
                </td>
                <td>{item.formOfControl}</td>
                <td>{item.credits}</td>
                <td>{item.lectures}</td>
                <td>{item.labworks}</td>
                <td>{item.practical}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default SubjectsPage;

const CustLink = styled(Link)`
  text-decoration: none !important;
  color: black;

  &:hover {
    color: black;
  }
`;
