import React, { Component } from "react";
import MessageCard from "../feedComponents/messageCard";
import PostMessage from "../feedComponents/postField";
import axios from "axios";
import "../css/card.css";
import { Route, Link } from "react-router-dom";
class Feed extends Component {
  state = {
    post: "",
    image: null,
  };

  handlePostSubmit = (event) => {
    const { post, image } = this.state;

    if (post !== "" || image != null) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("login", this.props.username);
      formData.append("content", post);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:8080/TestWeb/MyMessages", formData, config)
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.props.getMessages();
          this.setState({ post: "", image: null });
        });
    }
    event.preventDefault();
  };
  handlePostChange = (event) => {
    const post = event.target.value;
    this.setState({
      post,
    });
  };
  handleFileChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      image: event.target.files[0],
    });
  };
  render() {
    return (
      <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
        <div className="feed p-2">
          <PostMessage
            post={this.state.post}
            onPostChange={this.handlePostChange}
            onFileChange={this.handleFileChange}
            onSubmit={this.handlePostSubmit}
            image={this.state.image}
          />

          {this.props.messages !== null &&
            this.props.messages.length > 0 &&
            this.props.messages.map((message) => {
              const author = this.props.authors[message.author_id];
              return (
                <MessageCard
                  key={message._id}
                  _id={message._id}
                  firstname={author.firstName}
                  lastname={author.lastName}
                  username={author.login}
                  content={message.text}
                  image={message.image}
                  liked={message.liked === 1}
                  date={message.date}
                  onDeleteMessage={this.props.onDeleteMessage}
                >
                  <Link className="link" to={"/visitProfile/" + author.login}>
                    {" "}
                    {author.login}
                  </Link>
                </MessageCard>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Feed;
