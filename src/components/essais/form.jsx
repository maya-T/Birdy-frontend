import React, { Component } from "react";
import axios from "axios";
import "../css/Login.css";
class Login extends Component {
  state = {
    login: "mayatouzari@gmail.com",
    password: "hiiii",
  };
  render() {
    return (
      <div
        style={{
          width: "30%",
          marginTop: "8rem",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
        className="container-fluid border mx-auto px-5 "
      >
        <form onSubmit={this.handleSubmit}>
          <span className="form-title pb-5">Login to continue</span>
          <div className="form-group">
            <label htmlFor="exampleInputLogin1"> Email address</label>
            <input
              className="form-control"
              id="exampleInputLogin1"
              aria-describedby="emailHelp"
              value={this.state.login}
              onChange={this.handleLoginChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={this.state.password}
              onChange={this.handlePasswordChanged}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
  handleLoginChanged = (event) => {
    const login = event.target.value;
    this.setState({ login });
  };
  handlePasswordChanged = (event) => {
    const password = event.target.value;
    this.setState({ password });
  };
  handleSubmit = (event) => {
    axios
      .post("http://localhost:8080/TestWeb/Login", {
        login: this.state.login,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  };
}

export default Login;
