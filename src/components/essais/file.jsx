import React, { Component } from "react";
import axios from "axios";

class File extends Component {
  state = {
    file: null,
    src: null,
    image: null,
  };

  handleChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      file: event.target.files[0],
    });
  };
  handleSubmit = (event) => {
    const formData = new FormData();
    formData.append("image", this.state.file);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8080/TestWeb/Image", formData, config)
      .then((response) => {
        console.log("The file is successfully uploaded");
      })
      .catch((error) => {});
    event.preventDefault();
  };
  handleSubmit2 = (event) => {
    axios
      .get("http://localhost:8080/TestWeb/Image")
      .then((response) => {
        console.log(response);
        const image = response.data;
        console.log("helloooo");
        console.log("image" + image);
        const src = `data:${response.headers[
          "content-type"
        ].toLowerCase()};base64,`;
        console.log(src);
        this.setState({ src, image });
      })
      .catch((error) => {});
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="file" onChange={this.handleChange} />
            {/* <img src={this.state.file} /> */}
          </div>
          <button type="submit">submit</button>
        </form>
        <button className="btn btn-primary" onClick={this.handleSubmit2}>
          get image
        </button>
        <img src={this.state.src + this.state.image}></img>
      </div>
    );
  }
}

export default File;
