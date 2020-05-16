import React, { Component } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import axios from "axios";

class Auth extends Component {
  state = {
    willLogin: true,
    classesInput: {
      firstname: "form-control form-control-md txt2",
      lastname: "form-control form-control-md txt2",
      email: "form-control form-control-md txt2",
      login: "form-control form-control-md txt2",
      password: "form-control form-control-md txt2",
    },
  };

  handleForm = (value) => {
    this.setState({ willLogin: value });
  };
  handleLoginSubmit = (event) => {
    console.log("hello");
    let check = true;
    let classesInput = { ...this.state.classesInput };
    if (this.props.input["login"] === "") {
      let classesInputName = this.state.classesInput["login"].repeat(1);
      classesInputName = classesInputName.concat(" is-invalid");
      classesInput["login"] = classesInputName;
      check = false;
    }
    if (this.props.input["password"] === "") {
      let classesInputName = this.state.classesInput["password"].repeat(1);
      classesInputName = classesInputName.concat(" is-invalid");
      classesInput["password"] = classesInputName;
      check = false;
    }
    if (false) {
      //!check
      this.setState({ classesInput });
    } else {
      axios
        .post("http://localhost:8080/TestWeb/Login", {
          login: this.props.input.login,
          password: this.props.input.password,
          // login: "@khaled",
          // password: "khaled",
        })
        .then((res) => {
          const sessionKey = res.data.loginInfo.key;
          const profileImage = res.data.loginInfo.info.picture;
          const bio = res.data.loginInfo.info.bio;
          const adress = res.data.loginInfo.info.adress;
          const website = res.data.loginInfo.info.website;
          const input = { ...this.props.input };
          input.firstname = res.data.loginInfo.info.firstName;
          input.lastname = res.data.loginInfo.info.lastName;
          input.email = res.data.loginInfo.info.email;
          //input[birthday] res.data.loginInfo.info.
          this.props.handleConnected(
            input,
            sessionKey,
            profileImage,
            adress,
            bio,
            website,
            true
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    event.preventDefault();
  };
  handleSignUpSubmit = (event) => {
    console.log("hello");
    let check = true;
    let classesInput = { ...this.state.classesInput };
    Object.keys(this.props.input).forEach((name) => {
      console.log(name, this.props.input[name]);
      if (this.props.input[name] === "" || this.props.input[name] === null) {
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
          firstname: this.props.input.firstname,
          lastname: this.props.input.lastname,
          email: this.props.input.email,
          login: this.props.input.login,
          password: this.props.input.password,
          birthday: this.props.input.birthday,
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
  handleInputChanged = (event, name) => {
    const value = event.target.value;
    const input = { ...this.props.input };
    input[name] = value;
    this.props.handleInputChange(input);
  };
  handleDateChange = (date) => {
    const input = { ...this.props.input };
    input["birthday"] = date;
    this.props.handleInputChange(input);
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
      <React.Fragment>
        {this.state.willLogin && (
          <Login
            input={this.props.input}
            classesInput={this.state.classesInput}
            onInputChanged={this.handleInputChanged}
            onFocus={this.handleFocus}
            onSubmit={this.handleLoginSubmit}
            onClick={this.handleForm}
          ></Login>
        )}

        {!this.state.willLogin && (
          <SignUp
            input={this.props.input}
            classesInput={this.state.classesInput}
            onInputChanged={this.handleInputChanged}
            onFocus={this.handleFocus}
            onSubmit={this.handleSignUpSubmit}
            onClick={this.handleForm}
          ></SignUp>
        )}
      </React.Fragment>
    );
  }
}

export default Auth;
