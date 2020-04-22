import React, { Component } from "react";
import axios from "axios";
import MessageCard from "../feedComponents/messageCard";
class Message extends Component {
  state = {
    messages: null,
    authors: null,
    username: "maya@",
  };

  getMessages = () => {
    axios
      .post("http://localhost:8080/TestWeb/ShowFeed", {
        login: this.state.username,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.messages);
        console.log(res.data.authors);
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
      <div className="col-6 feed">
        <button onClick={this.getMessages}>get</button>
        {this.state.messages !== null &&
          this.state.messages.length > 0 &&
          this.state.messages.map((message) => {
            const author = this.state.authors[message.author_id];
            return (
              <div>
                <MessageCard
                  key={message._id}
                  _id={message._id}
                  firstname={author.firstName}
                  lastname={author.lastName}
                  username={author.login}
                  content={message.text}
                  liked={message.liked === 1}
                  date={message.date}
                />
                <img src={`data:image/png;base64,` + message.image}></img>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Message;
