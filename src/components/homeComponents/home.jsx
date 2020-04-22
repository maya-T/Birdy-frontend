import React, { Component } from "react";
import Feed from "../feedComponents/feed";
import axios from "axios";
class HomePage extends Component {
  state = {
    messages: null,
    authors: null,
  };
  componentDidMount = () => {
    this.getMessages();
  };
  getMessages = () => {
    axios
      .post("http://localhost:8080/TestWeb/ShowFeed", {
        login: this.props.username,
      })
      .then((res) => {
        console.log(res);
        const messages = res.data.messages;
        const authors = res.data.authors;
        this.setState({ messages, authors });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-6">
            <Feed
              getMessages={this.getMessages}
              messages={this.state.messages}
              authors={this.state.authors}
              username={this.state.username}
            ></Feed>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
