import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PostComment extends Component {
  render() {
    return (
      <div className="card w-100 new-comment-card">
        <div className="card-body py-3 pr-2">
          <h6 className="card-title">Add a comment !</h6>
          <form className="h-100" onSubmit={this.props.onSubmit}>
            <div className="card-text">
              <div className="row align-items-center w-100">
                <div className="col-11 ">
                  <textarea
                    rows="2"
                    className="comment-field w-100 p-3"
                    value={this.props.comment}
                    onChange={this.props.onChange}
                  ></textarea>
                </div>
                <div className="col-1 p-0">
                  <button
                    type="submit"
                    className="btn btn-primary p-0 rounded-circle comment-button"
                  >
                    <FontAwesomeIcon
                      className="comment-icon"
                      icon={["fas", "paper-plane"]}
                    ></FontAwesomeIcon>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostComment;
