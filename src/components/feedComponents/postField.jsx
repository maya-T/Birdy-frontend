import React, { Component } from "react";
import "../css/card.css";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PostMessage extends Component {
  render() {
    return (
      <div className="card w-100 mt-2">
        <div className="card-body pb-2 ">
          <form className="h-100" onSubmit={this.props.onSubmit}>
            <h5 className="card-title">What's On Your Mind ?</h5>
            <p className="card-text card-post m-0">
              <textarea
                cols="10"
                className="post-field w-100 h-100"
                value={this.props.post}
                onChange={this.props.onPostChange}
              ></textarea>
            </p>
            <div></div>
            {this.props.image !== null && (
              <img
                className="card-img-top"
                src={URL.createObjectURL(this.props.image)}
              />
            )}

            <hr className="dark" />

            <div className="row pt-3 pb-2">
              <div className="col-1 p-0 mx-3">
                <label htmlFor="file" className="p-0 m-0">
                  <div
                    className="btn-primary btn-lg"
                    style={{ height: "48px" }}
                  >
                    <FontAwesomeIcon icon={["fas", "camera"]}></FontAwesomeIcon>
                  </div>
                </label>

                <input
                  id="file"
                  type="file"
                  className="input-file"
                  onChange={this.props.onFileChange}
                />
              </div>
              <div className="col-2 p-0">
                <button type="submit" className="btn btn-primary btn-lg">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostMessage;
