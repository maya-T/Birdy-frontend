import React, { Component } from "react";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
class FriendsCard extends Component {
  state = {
    following: null,
    followers: null,
  };
  componentDidMount() {
    this.getFriends();
  }
  getFriends = () => {
    axios
      .get("http://localhost:8080/TestWeb/Friends/login/" + this.props.username)
      .then((res) => {
        const followers = res.data.followers;
        const following = res.data.following;
        console.log(following, followers);
        this.setState({ followers, following });
        this.props.updateNumbers(followers.length, following.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  deleteFollower = (username) => {
    console.log(username);
    axios
      .delete(
        "http://localhost:8080/TestWeb/Friends/follower/" +
          username +
          "/followed/" +
          this.props.username
      )
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  deleteFollowing = (username) => {
    console.log(username);

    axios
      .delete(
        "http://localhost:8080/TestWeb/Friends/follower/" +
          this.state.username +
          "/followed/" +
          username
      )
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        this.getFriends();
      });
  };
  render() {
    return (
      <div>
        <div className="card my-2">
          <div className="card-header">Followers</div>
          <ul
            className="list-group"
            style={{ maxHeight: "25rem", overflow: "auto" }}
          >
            {this.state.followers !== null &&
              this.state.followers.map((follower) => {
                return (
                  <li className="list-group-item  justify-content-between align-items-center">
                    <div className="row">
                      <div className="col-10">
                        {follower.fname + " " + follower.lname}
                      </div>
                      <div className="col-2 p-0">
                        {this.props.isMyProfile && (
                          <span
                            className="btn badge badge-primary badge-pill"
                            onClick={() => this.deleteFollower(follower.login)}
                          >
                            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="card my-2">
          <div className="card-header">Following</div>
          <ul
            className="list-group"
            style={{ maxHeight: "25rem", overflow: "auto" }}
          >
            {this.state.following !== null &&
              this.state.following.map((followed) => {
                return (
                  <li className="list-group-item ">
                    <div className="row">
                      <div className="col-10">
                        {followed.fname + " " + followed.lname}
                      </div>
                      <div className="col-2 p-0">
                        {this.props.isMyProfile && (
                          <span
                            className="btn badge badge-primary badge-pill"
                            onClick={() => this.deleteFollowing(followed.login)}
                          >
                            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default FriendsCard;
