import React, { Component } from "react";
import "../css/main.css";
import connect from "../images/connect.png";

class FormContainer extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-6 col-lg-6 img-more-container">
            <img
              className="mx-auto img-fluid img-more d-block"
              src={connect}
            ></img>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 container-form">
            <form className="px-5 padding-login" onSubmit={this.props.onSubmit}>
              {this.props.children}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default FormContainer;
