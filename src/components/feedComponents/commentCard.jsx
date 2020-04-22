import React, { Component } from "react";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/card.css";

class CommentCard extends Component {
  state = {
    liked: false,
  };
  render() {
    return (
      <div className="card w-100 no-border-radius" id={this.props._idC}>
        <div className="px-3 pt-3 pb-1 card-body ">
          <div className="py-3 container-fluid m-auto comment-container">
            <h5 className="card-title comment-title">
              <a href="#">{this.props.firstname + " " + this.props.lastname}</a>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted comment-subtitle">
              {this.state.username} Replying to {this.props.messageUsername}
            </h6>
            <p className="card-text comment-text">{this.props.content} </p>
          </div>

          <button className="btn btn-link card-link heart">
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
        </div>
      </div>
    );
  }
}

export default CommentCard;
