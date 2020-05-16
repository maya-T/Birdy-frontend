import React, { Component } from "react";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Feed from "../feedComponents/feed";

class Search extends Component {
  state = {
    filter: "",
    messages: null,
    authors: null,
  };
  handleChange = (e) => {
    this.setState({ filter: e.target.value });
  };
  searchMessages = () => {
    if (this.state.filter !== "") {
      axios
        .post("http://localhost:8080/TestWeb/Search", {
          filter: this.state.filter,
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
    }
  };
  render() {
    return (
      <div
        style={{
          maxHeight: "100vh",
          overflow: "auto",
          backgroundColor: "#f0f0f0",
        }}
        className="rounded"
      >
        <form className="form-inline pl-2 my-2">
          <input
            placeholder="Search..."
            type="text"
            value={this.state.filter}
            onChange={this.handleChange}
            className="border rounded px-2"
            style={{ height: "38px", width: "80%" }}
          />
          <button
            className="btn btn-primary mx-2"
            onClick={this.searchMessages}
          >
            <FontAwesomeIcon icon={["fas", "search"]}></FontAwesomeIcon>
          </button>
        </form>
        {this.messages !== null && this.authors !== null && (
          <Feed
            messages={this.state.messages}
            authors={this.state.authors}
            username={this.props.realUsername}
            realUsername={this.props.realUsername}
            isMyProfile={false}
          ></Feed>
        )}
      </div>
    );
  }
}

export default Search;
