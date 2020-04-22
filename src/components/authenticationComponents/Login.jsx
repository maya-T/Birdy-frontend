import React, { Component } from "react";
import FormContainer from "./formContainer";
import "../css/util.css";
import "../css/main.css";

class Login extends Component {
  render() {
    return (
      <FormContainer onSubmit={this.props.onSubmit}>
        <span className="login-form-title p-b-43">Login to continue.</span>
        {/* /////////////////////////////////////// */}
        <div className="form-group my-5">
          <label htmlFor="inputLogin">Username:</label>
          <input
            className={this.props.classesInput.login}
            id="inputLogin"
            value={this.props.input.login}
            onChange={(event) => this.props.onInputChanged(event, "login")}
            onFocus={() => this.props.onFocus("login")}
          />
          <div className="invalid-feedback">Please enter a valid Login.</div>
        </div>
        {/* /////////////////////////////////////// */}
        <div className="form-group mt-5">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className={this.props.classesInput.password}
            id="inputPassword"
            value={this.props.input.password}
            onChange={(event) => this.props.onInputChanged(event, "password")}
            onFocus={() => this.props.onFocus("password")}
          />
          <div className="invalid-feedback">Please enter a valid Password.</div>
        </div>
        {/* /////////////////////////////////////// */}
        <div className="justify-content-end flex-sb-m w-full p-t-3 p-b-32">
          <div>
            <button type="button" className="btn btn-link txt1">
              Forgot Password ?
            </button>
          </div>
        </div>
        {/* /////////////////////////////////////// */}
        <button type="submit" className="btn btn-lg btn-primary w-100">
          Login.
        </button>

        {/* //////////////////////////////////// */}

        <div className="text-center p-t-46 p-b-20">
          <button
            type="button"
            className="btn btn-link txt1"
            onClick={() => this.props.onClick(false)}
          >
            Sign up for Birdy.
          </button>
        </div>
      </FormContainer>
    );
  }
}
export default Login;
