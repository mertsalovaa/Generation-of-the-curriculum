import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  // componentDidMount() {
  //   axios.get("https://localhost:44308/api/User/get").then(response => {
  //     console.log(response.data);  
  //     this.setState({
  //       users: response.data,
  //       loading: false
  //     });
  //   });
  // }

  static renderForecastsTable(users) {
    console.log(users);
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>


        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.users);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('https://localhost:44308/api/User/get');
    const data = await response.json();
    console.log(data);
    this.setState({ users: data, loading: false });
  }
}
