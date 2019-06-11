import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      username: "",
      message: ""
    };
  }

  lookupSummoner = (name) => {
    axios.get(`/api/${name}`)
      .then(res => {
        console.log(res.data);
        let summoner = res.data;
        this.setState({
          isLoaded: true,
          username: summoner.name,
          level: summoner.summonerLevel
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    axios.get(`/api`)
      .then(res => {
        console.log(res);
        let summoner = res.data;
        this.setState({
          isLoaded: true,
          username: summoner.name,
          level: summoner.summonerLevel
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    this.lookupSummoner(this.state.username);
  };

  render() {
    const { error, isLoaded, username, level, message } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {/* <p>Username: {username}</p>
        <p>Summoner Level: {level}</p> */}
          <p>
            Your summoner level is {this.state.level}
          </p>
          <form className="form">
            <input
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username"
            />
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
          <p>{message}</p>
        </div>
      );
    }
  }
}

export default App;