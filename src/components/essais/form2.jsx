import React, { Component } from "react";
//import axios from "axios";
import "../css/util.css";
import "../css/main.css";

class LoginPage extends Component {
  state = {
    input: {
      login: "",
      password: "",
    },
    classesInput: {
      login: "input100 ",
      password: "input100 ",
    },
    classesParent: {
      login: "wrap-input100 form-control",
      password: "wrap-input100 form-control",
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
    let classesParent = { ...this.state.classesParents };
    Object.keys(this.state.input).forEach((name) => {
      if (this.state.input[name] === "") {
        console.log(name, this.state.input[name]);
        let classesParentName = this.state.classesParent[name].repeat(1);
        classesParentName = classesParentName.concat(" is-invalid");
        classesParent[name] = classesParentName;
        check = false;
      }
    });
    if (!check) {
      this.setState({ classesParent });
    } else {
      //   axios
      //     .post("http://localhost:8080/TestWeb/Login", {
      //       login: this.state.input.login,
      //       password: this.state.input.password,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    }
    event.preventDefault();
  };
  handleOnBlur = (name) => {
    let classesInputName = this.state.classesInput[name].repeat(1);
    if (this.state.input[name] !== "") {
      classesInputName = classesInputName.concat(" has-val");
    } else {
      classesInputName = classesInputName.replace("has-val", "");
    }
    let classesInput = { ...this.state.classesInput };
    classesInput[name] = classesInputName;
    this.setState({ classesInput });
  };
  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form"
              onSubmit={this.handleSubmit}
            >
              <span className="login100-form-title p-b-43">
                Login to continue
              </span>

              {/* <div
                className={this.state.classesParent.login}
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className={this.state.classesInput.login}
                  type="text"
                  name="email"
                  value={this.state.input.login}
                  onChange={(event) => this.handleInputChanged(event, "login")}
                  onBlur={() => this.handleOnBlur("login")}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Email</span>
              </div>

              <div
                className={this.state.classesParent.password}
                data-validate="Password is required"
              >
                <input
                  className={this.state.classesInput.password}
                  type="password"
                  name="pass"
                  value={this.state.input.password}
                  onChange={(event) =>
                    this.handleInputChanged(event, "password")
                  }
                  onBlur={() => this.handleOnBlur("password")}
                />
                <div class="invalid-feedback">Please provide a login</div>
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>
              </div>

              <div className="justify-content-end flex-sb-m w-full p-t-3 p-b-32">
                <div>
                  <a href="#" className="txt1">
                    Forgot Password ?
                  </a>
                </div>
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="btn btn-primary login">
                  Login
                </button>
              </div>

              <div className="text-center p-t-46 p-b-20">
                <a href="#" className="txt1">
                  Sign up for Birdy
                </a>
              </div> */}
            </form>

            <div
              className="login100-more"
              style={{ backgroundImage: "./images/bg-01.jpg" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
