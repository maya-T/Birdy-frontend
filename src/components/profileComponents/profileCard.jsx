import React, { Component } from "react";
import "../css/profileCard.css";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import noImage from "../images/noImage.png";
import image2base64 from "image-to-base64";

class ProfileCard extends Component {
  state = {
    show: false,
  };

  handleImageChange = (event) => {
    if (event.target.files !== null && event.target.files !== undefined) {
      const file = event.target.files[0];
      image2base64(URL.createObjectURL(file))
        .then((response) => {
          this.props.updateProfileImage(response);
          this.changeImage(file);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  changeImage = (imageData) => {
    if (imageData !== null) {
      const formData = new FormData();
      formData.append("image", imageData);
      formData.append("login", this.props.username);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:8080/TestWeb/UpdateInfo", formData, config)
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("null");
    }
  };
  handleFollow = () => {
    axios
      .post("http://localhost:8080/TestWeb/Friends", {
        follower: this.props.realUsername,
        followed: this.props.username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        this.props.setFollowing(true);
      });
    this.props.actions.send(this.props.username);
  };
  handleUnfollow = () => {
    axios
      .delete(
        "http://localhost:8080/TestWeb/Friends/follower/" +
          this.props.realUsername +
          "/followed/" +
          this.props.username
      )
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        this.props.setFollowing(false);
      });
  };
  render() {
    return (
      <div className="twPc-div p-0">
        <a className="twPc-bg twPc-block">
          {!this.props.isMyProfile && !this.props.following && (
            <button
              className="follow btn btn-primary"
              onClick={this.handleFollow}
            >
              Follow
            </button>
          )}
          {!this.props.isMyProfile && this.props.following && (
            <button
              className="follow btn btn-primary"
              onClick={this.handleUnfollow}
            >
              Unfollow
            </button>
          )}
        </a>

        <div>
          <div className="row pl-4">
            <div className=" col-3 ">
              <div className="twPc-avatarLink  p-0">
                <label htmlFor="file" className="p-0 m-0">
                  <div
                    className="btn p-0"
                    onMouseEnter={this.handleShow}
                    onMouseLeave={this.handleHide}
                    style={{ position: "absolute" }}
                  >
                    {this.props.profileImage !== "none" && (
                      <img
                        src={"data:image/png;base64," + this.props.profileImage}
                        className="twPc-avatarImg"
                      />
                    )}
                    {this.props.profileImage === "none" && (
                      <img src={noImage} className="twPc-avatarImg" />
                    )}
                    {this.state.show && this.props.isMyProfile && (
                      <div className="inputFile">
                        <FontAwesomeIcon
                          icon={["fas", "edit"]}
                          style={{ margin: "3.9rem" }}
                        />
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="file"
                  type="file"
                  className="input-file"
                  onChange={this.handleImageChange}
                  disabled={!this.props.isMyProfile}
                />
              </div>
            </div>

            <div className="twPc-divUser col-4">
              <div>
                <h5>{this.props.firstname + " " + this.props.lastname}</h5>
              </div>
              <span>
                <h5 className="username">
                  <span>{this.props.username}</span>
                </h5>
              </span>
            </div>
          </div>
          <div className="twPc-divStats mb-2">
            <div className="row ">
              <div className="col-4">
                <h5>
                  <span className="twPc-StatLabel twPc-block">Posts</span>
                  <span className="twPc-StatValue">
                    {this.props.messagesNum}
                  </span>
                </h5>
              </div>
              <div className="col-4">
                <h5>
                  <span className="twPc-StatLabel twPc-block">Following</span>
                  <span className="twPc-StatValue">
                    {this.props.followingNum}
                  </span>
                </h5>
              </div>
              <div className="col-4">
                <h5>
                  <span className="twPc-StatLabel twPc-block">Followers</span>
                  <span className="twPc-StatValue">
                    {this.props.followersNum}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
