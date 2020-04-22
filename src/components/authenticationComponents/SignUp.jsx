import React, { Component } from "react";
import "../css/util.css";
import "../css/main.css";
import DatePicker from "react-date-picker";
import FormContainer from "./formContainer";

class SignUpPage extends Component {
  render() {
    return (
      <FormContainer onSubmit={this.props.onSubmit}>
        <span className="login-form-title p-b-43">Create a new account.</span>
        {/* /////////////////////////////////////// */}

        <div className="row">
          <div className="col">
            <div className="form-group ">
              <label htmlFor="inputFirstName">First Name</label>
              <input
                id="inputFirstName"
                type="text"
                className={this.props.classesInput.firstname}
                value={this.props.input.firstname}
                onChange={(event) =>
                  this.props.onInputChanged(event, "firstname")
                }
                onFocus={() => this.props.onFocus("firstname")}
              />
              <div className="invalid-feedback">
                Please enter your first name.
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////// */}
          <div className="col">
            <div className="form-group ">
              <label htmlFor="inputLastName">Last Name</label>
              <input
                id="inputLastName"
                type="text"
                className={this.props.classesInput.lastname}
                value={this.props.input.lastname}
                onChange={(event) =>
                  this.props.onInputChanged(event, "lastname")
                }
                onFocus={() => this.props.onFocus("lastname")}
              />
              <div className="invalid-feedback">
                Please enter your last name.
              </div>
            </div>
          </div>
        </div>

        {/* /////////////////////////////////////// */}
        <div className="form-group ">
          <label htmlFor="inputLogin">Username:</label>
          <input
            type="text"
            className={this.props.classesInput.login}
            id="inputLogin"
            value={this.props.input.login}
            onChange={(event) => this.props.onInputChanged(event, "login")}
            onFocus={() => this.props.onFocus("login")}
          />
          <div className="invalid-feedback">Please enter a valid Login.</div>
        </div>

        {/* /////////////////////////////////////// */}

        <div className="form-group ">
          <label htmlFor="inputEmail">Email:</label>
          <input
            type="text"
            className={this.props.classesInput.email}
            id="inputEmail"
            value={this.props.input.email}
            onChange={(event) => this.props.onInputChanged(event, "email")}
            onFocus={() => this.props.onFocus("email")}
          />
          <div className="invalid-feedback">Please enter a valid Email.</div>
        </div>

        {/* /////////////////////////////////////// */}

        <div className="form-group ">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className={this.props.classesInput.password}
            id="inputPassword"
            value={this.props.input.password}
            onChange={(event) => this.props.onInputChanged(event, "password")}
            onFocus={() => this.props.onFocus("password")}
          />
          <div className="invalid-feedback">Please enter a password</div>
        </div>
        {/* /////////////////////////////////////// */}
        <div className="row justify-content-start form-group">
          <div className="col-3 py-0">
            <label htmlFor="inputDate" className="mt-2">
              Birthday
            </label>
          </div>

          <div className="col-5">
            <DatePicker
              className="picker"
              value={this.props.input.birthday}
              onChange={this.props.onDateChange}
              maxDate={new Date()}
            >
              {" "}
            </DatePicker>
          </div>
        </div>
        {/* /////////////////////////////////////// */}
        <button type="submit" className="btn btn-lg btn-primary w-100 mt-4">
          Sign Up
        </button>

        {/* //////////////////////////////////// */}

        <div className="text-center pt-3">
          <button
            type="button"
            className="btn btn-link txt1"
            onClick={() => this.props.onClick(true)}
          >
            Sign in.
          </button>
        </div>
      </FormContainer>
    );
  }
}
export default SignUpPage;
