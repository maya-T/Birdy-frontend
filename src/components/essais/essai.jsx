// before using formContainer

import React, { Component } from "react";
import axios from "axios";
import "../css/util.css";
import "../css/main.css";

class LoginPage extends Component {
  state = {
    input: {
      login: "",
      password: "",
    },
    classesInput: {
      login: "form-control form-control-lg txt2",
      password: "form-control form-control-lg txt2",
    },
  };

  handleInputChanged = (event, name) => {
    const value = event.target.value;
    const input = { ...this.state.input };
    input[name] = value;
    this.setState({ input });
  };
  handlePasswordChanged = (event) => {
    const password = event.target.value;
    this.setState({ password });
  };
  handleSubmit = (event) => {
    console.log("hello");
    let check = true;
    let classesInput = { ...this.state.classesInput };
    Object.keys(this.state.input).forEach((name) => {
      console.log(name, this.state.input[name]);
      if (this.state.input[name] === "") {
        let classesInputName = this.state.classesInput[name].repeat(1);
        classesInputName = classesInputName.concat(" is-invalid");
        classesInput[name] = classesInputName;
        check = false;
      }
    });
    if (!check) {
      this.setState({ classesInput });
    } else {
      axios
        .post("http://localhost:8080/TestWeb/Login", {
          login: this.state.input.login,
          password: this.state.input.password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    event.preventDefault();
  };

  validate(name) {
    let classesInput = { ...this.state.classesInput };
    let classesInputName = this.state.classesInput[name].repeat(1);
    classesInputName = classesInputName.replace("is-invalid", "");
    classesInput[name] = classesInputName;
    return classesInput;
  }
  handleFocus = (name) => {
    this.setState({ classesInput: this.validate(name) });
  };

  render() {
    return (
      <div className="limiter">
        <div className="container-login">
          <div className="wrap-login">
            <form
              className="login-form px-5 padding-login"
              onSubmit={this.handleSubmit}
            >
              <span className="login-form-title p-b-43">
                Login to continue.
              </span>
              {/* /////////////////////////////////////// */}
              <div className="form-group my-5">
                <label htmlFor="inputLogin">Username:</label>
                <input
                  className={this.state.classesInput.login}
                  id="inputLogin"
                  value={this.state.input.login}
                  onChange={(event) => this.handleInputChanged(event, "login")}
                  onFocus={() => this.handleFocus("login")}
                />
                <div className="invalid-feedback">
                  Please enter a valid Login.
                </div>
              </div>
              {/* /////////////////////////////////////// */}
              <div className="form-group mt-5">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  className={this.state.classesInput.password}
                  id="inputPassword"
                  value={this.state.input.password}
                  onChange={(event) =>
                    this.handleInputChanged(event, "password")
                  }
                  onFocus={() => this.handleFocus("password")}
                />
                <div className="invalid-feedback">
                  Please enter a valid Password.
                </div>
              </div>
              {/* /////////////////////////////////////// */}
              <div className="justify-content-end flex-sb-m w-full p-t-3 p-b-32">
                <div>
                  <a href="#" className="txt1">
                    Forgot Password ?
                  </a>
                </div>
              </div>
              {/* /////////////////////////////////////// */}
              <button type="submit" className="btn btn-lg btn-primary w-100">
                Login
              </button>

              {/* //////////////////////////////////// */}

              <div className="text-center p-t-46 p-b-20">
                <a href="#" className="txt1">
                  Sign up for Birdy now
                </a>
              </div>
            </form>

            <div className="login-more"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;

class LoginPage extends Component {
  state = {
    input: {
      firstname: "",
      lastname: "",
      email: "",
      login: "",
      password: "",
      birthday: new Date(),
    },
    classesInput: {
      firstname: "form-control form-control-md txt2",
      lastname: "form-control form-control-md txt2",
      email: "form-control form-control-md txt2",
      login: "form-control form-control-md txt2",
      password: "form-control form-control-md txt2",
    },
  };
  onDateChange = (date) => {
    const input = { ...this.state.input };
    input["birthday"] = date;
    this.setState({ input });
  };
  handleInputChanged = (event, name) => {
    const value = event.target.value;
    const input = { ...this.state.input };
    input[name] = value;
    this.setState({ input });
  };
  handleSubmit = (event) => {
    console.log("hello");
    let check = true;
    let classesInput = { ...this.state.classesInput };
    Object.keys(this.state.input).forEach((name) => {
      console.log(name, this.state.input[name]);
      if (this.state.input[name] === "" || this.state.input[name] === null) {
        let classesInputName = this.state.classesInput[name].repeat(1);
        classesInputName = classesInputName.concat(" is-invalid");
        classesInput[name] = classesInputName;
        check = false;
      }
    });
    if (!check) {
      this.setState({ classesInput });
    } else {
      axios
        .post("http://localhost:8080/TestWeb/SignUp", {
          firstname: this.state.input.firstname,
          lastname: this.state.input.lastname,
          email: this.state.input.email,
          login: this.state.input.login,
          password: this.state.input.password,
          //birthday: this.state.input.birthday,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    event.preventDefault();
  };

  validate(name) {
    let classesInput = { ...this.state.classesInput };
    let classesInputName = this.state.classesInput[name].repeat(1);
    classesInputName = classesInputName.replace("is-invalid", "");
    classesInput[name] = classesInputName;
    return classesInput;
  }
  invalidate(name) {
    let classesInput = { ...this.state.classesInput };
    let classesInputName = this.state.classesInput[name].repeat(1);
    classesInputName = classesInputName.concat(" is-invalid");
    classesInput[name] = classesInputName;
    return classesInput;
  }
  handleFocus = (name) => {
    this.setState({ classesInput: this.validate(name) });
  };

  render() {
    return (
      <div className="limiter">
        <div className="container-login">
          <div className="wrap-login">
            <form
              className="login-form px-5 padding-signup"
              onSubmit={this.handleSubmit}
            >
              <span className="login-form-title p-b-43">
                Create a new account.
              </span>
              {/* /////////////////////////////////////// */}

              <div className="row">
                <div className="col">
                  <div className="form-group ">
                    <label htmlFor="inputFirstName">First Name</label>
                    <input
                      id="inputFirstName"
                      type="text"
                      className={this.state.classesInput.firstname}
                      value={this.state.input.firstname}
                      onChange={(event) =>
                        this.handleInputChanged(event, "firstname")
                      }
                      onFocus={() => this.handleFocus("firstname")}
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
                      className={this.state.classesInput.lastname}
                      value={this.state.input.lastname}
                      onChange={(event) =>
                        this.handleInputChanged(event, "lastname")
                      }
                      onFocus={() => this.handleFocus("lastname")}
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
                  className={this.state.classesInput.login}
                  id="inputLogin"
                  value={this.state.input.login}
                  onChange={(event) => this.handleInputChanged(event, "login")}
                  onFocus={() => this.handleFocus("login")}
                />
                <div className="invalid-feedback">
                  Please enter a valid Login.
                </div>
              </div>

              {/* /////////////////////////////////////// */}

              <div className="form-group ">
                <label htmlFor="inputEmail">Email:</label>
                <input
                  type="text"
                  className={this.state.classesInput.email}
                  id="inputEmail"
                  value={this.state.input.email}
                  onChange={(event) => this.handleInputChanged(event, "email")}
                  onFocus={() => this.handleFocus("email")}
                />
                <div className="invalid-feedback">
                  Please enter a valid Email.
                </div>
              </div>

              {/* /////////////////////////////////////// */}

              <div className="form-group ">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  className={this.state.classesInput.password}
                  id="inputPassword"
                  value={this.state.input.password}
                  onChange={(event) =>
                    this.handleInputChanged(event, "password")
                  }
                  onFocus={() => this.handleFocus("password")}
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
                    value={this.state.input.birthday}
                    onChange={this.onDateChange}
                    maxDate={new Date()}
                  >
                    {" "}
                  </DatePicker>
                </div>
              </div>
              {/* /////////////////////////////////////// */}
              <button
                type="submit"
                className="btn btn-lg btn-primary w-100 mt-4"
              >
                Sign Up
              </button>

              {/* //////////////////////////////////// */}

              <div className="text-center pt-3">
                <a href="#" className="txt1">
                  Sign in
                </a>
              </div>
            </form>

            <div className="login-more"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
