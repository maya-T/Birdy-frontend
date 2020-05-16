import React, { Component } from "react";
//import SockJS from "sockjs-client";
class Chat extends Component {
  constructor(props) {
    super(props);

    // const sock = new SockJS("ws://localhost:8080/TestWeb/EndPoint");

    const socket = new WebSocket(
      "ws://localhost:8080/TestWeb/EndPoint?username=maya@"
    );
    socket.onopen = () => {
      console.log("connection open");
    };
    socket.onclose = () => {
      console.log("close");
    };
    this.state = {
      actions: socket,
      messages: [],
      text: "",
    };
  }
  componentDidMount = () => {
    this.state.actions.onmessage = (e) => {
      console.log("message", e.data);
      this.setState({
        messages: [...this.state.messages, e.data],
      });
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let text = this.state.text;
    console.log(text);
    this.state.actions.send(text);
  };
  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="input">Message</label>
            <input
              type="text"
              ref="input"
              className="form-control"
              id="input"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <ul className="list-group">
          {this.state.messages.map((msg) => {
            return <li className="list-group-item">{msg}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Chat;
