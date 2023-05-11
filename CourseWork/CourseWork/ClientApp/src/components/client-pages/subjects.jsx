import React from "react";
import { Table } from "react-bootstrap";

class SubjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { group: [] };
  }

  componentDidMount() {
    fetch(
      `https://localhost:44308/api/User/get-subject-by-email?email=${localStorage.getItem(
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
              <th>Назва</th>
              {/* <th>Опис</th> */}
              <th>Тип</th>
              <th>Кредити</th>
              <th>Лекції</th>
              <th>Лабораторні</th>
              <th>Практичні</th>
            </tr>
          </thead>
          <tbody>
            {group.map((item) => 
                <tr key={item.id}>
                  <td>–</td>
                  <td>{item.name}</td>
                  <td>{item.formOfControl}</td>
                  <td>{item.credits}</td>
                  <td>{item.lectures}</td>
                  <td>{item.labworks}</td>
                  <td>{item.practical}</td>
                </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default SubjectsPage;
