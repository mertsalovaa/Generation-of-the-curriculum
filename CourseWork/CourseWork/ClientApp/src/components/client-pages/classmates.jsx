import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { API_URL } from "../../App";

class ClassmatesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { group: [] };
  }

  componentDidMount() {
    fetch(
      `${API_URL}/get-classmates-by-email?email=${localStorage.getItem(
        "email"
      )}`
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
              <th>Прізвище</th>
              <th>Ім'я</th>
              <th>По-батькові</th>
              <th>Кооперативна пошта</th>
            </tr>
          </thead>
          <tbody>
            {group.map((item) => 
                <tr key={item.id}>
                  <td>–</td>
                  <td>{item.lastName}</td>
                  <td>{item.firstName}</td>
                  <td>{item.middleName}</td>
                  <td>{item.cooperativeEmail}</td>
                </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default ClassmatesPage;