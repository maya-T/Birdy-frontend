import React, { Component } from "react";
//import Feed from "../feedComponents/feed";
import Feed from "../feedComponents/feed";
import Search from "./search";
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
        <div className="row justify-content-end">
          <div className="col-6">
            <Feed
              messages={this.state.messages}
              getMessages={this.getMessages}
              authors={this.state.authors}
              username={this.props.username}
              realUsername={this.props.username}
              isMyProfile={true}
            ></Feed>
          </div>
          <div className="col-4">
            <Search realUsername={this.props.username}></Search>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
