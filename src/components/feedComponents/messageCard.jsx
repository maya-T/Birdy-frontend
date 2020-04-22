import React, { Component } from "react";
import "../fontawesome";
import "../css/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "reactstrap";
import CommentCard from "./commentCard";
import PostComment from "./commentField";
import axios from "axios";

class MessageCard extends Component {
  state = {
    comment: "",
    isOpen: false,
    comments: null,
    authors: null,
    liked: this.props.liked,
  };
  handleCommentChange = (event) => {
    const comment = event.target.value;
    this.setState({ comment });
  };
  handleCommentSubmit = (event) => {
    if (this.state.comment !== "") {
      axios
        .post("http://localhost:8080/TestWeb/Comment", {
          _id: this.props._id,
          login: this.props.username,
          comment: this.state.comment,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.getComments();
        });
    }
    event.preventDefault();
  };
  getComments = () => {
    axios
      .get("http://localhost:8080/TestWeb/Comment/_id/" + this.props._id)
      .then((res) => {
        console.log(res);
        const comments = res.data.comments;
        const authors = res.data.comment_authors;
        this.setState({ comments, authors });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleLike = (event) => {
    if (!this.state.liked) {
      axios
        .post("http://localhost:8080/TestWeb/Like", {
          _id: this.props._id,
          login: this.props.username,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .delete(
          "http://localhost:8080/TestWeb/Like/_id/" +
            this.props._id +
            "/login/" +
            this.props.username
        )
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.setState({ liked: !this.state.liked });
    event.preventDefault();
  };

  handleCommentClick = (event) => {
    if (!this.state.isOpen) this.getComments();
    this.setState({ isOpen: !this.state.isOpen });
    event.preventDefault();
  };
  render() {
    return (
      <div className="my-3">
        <div className="card w-100" id={this.props._id}>
          <div className="card-body pb-2">
            <h5 className="card-title">
              <a href="#">
                {this.props.firstname + " " + this.props.lastname} {}
              </a>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {this.props.username}
            </h6>
            <p className="card-text">{this.props.content}</p>
            {this.props.image !== null && this.props.image !== "none" && (
              <img
                className="card-img-top"
                src={`data:image/png;base64,` + this.props.image}
              />
            )}
            <hr />
            <button
              className="btn btn-link card-link"
              onClick={this.handleLike}
            >
              {this.state.liked && (
                <FontAwesomeIcon
                  icon={["fas", "heart"]}
                  className="full-heart"
                ></FontAwesomeIcon>
              )}
              {!this.state.liked && (
                <FontAwesomeIcon
                  icon={["far", "heart"]}
                  className="empty-heart"
                ></FontAwesomeIcon>
              )}
            </button>
            <button
              className="btn btn-link card-link"
              onClick={this.handleCommentClick}
            >
              {this.state.isOpen && (
                <FontAwesomeIcon icon={["fas", "comment"]}></FontAwesomeIcon>
              )}
              {!this.state.isOpen && (
                <FontAwesomeIcon icon={["far", "comment"]}></FontAwesomeIcon>
              )}
            </button>
          </div>
          <div>
            <Collapse isOpen={this.state.isOpen}>
              {this.state.comments != null &&
                this.state.comments.length > 0 &&
                this.state.comments.map((comment) => {
                  const comment_author = this.state.authors[
                    comment.comment_author_id
                  ];
                  return (
                    <CommentCard
                      key={comment._idC}
                      messageUsername={this.props.username}
                      _idC={comment._idC}
                      firstname={comment_author.firstName}
                      lastname={comment_author.lastName}
                      username={comment_author.login}
                      content={comment.content}
                    />
                  );
                })}
              <PostComment
                onChange={this.handleCommentChange}
                onSubmit={this.handleCommentSubmit}
              />
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageCard;
