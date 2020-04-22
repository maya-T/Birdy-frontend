import React, { Component } from "react";
import PostMessage from "../feedComponents/postField";
import axios from "axios";
class Post extends Component {
  state = {
    post: "",
    file: null,
    username: "maya@",
  };

  handlePostSubmit = (event) => {
    console.log(this.state.post);
    const { username, post, file } = this.state;

    if (post !== "" || file != null) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("login", username);
      formData.append("content", post);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:8080/TestWeb/NewPostPicture", formData, config)
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
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
      file: event.target.files[0],
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <PostMessage
            post={this.state.post}
            image={this.state.file}
            onPostChange={this.handlePostChange}
            onSubmit={this.handlePostSubmit}
            onFileChange={this.handleFileChange}
          />
        </div>
      </div>
    );
  }
}

export default Post;
