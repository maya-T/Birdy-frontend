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
          <div class="card-header">Followers</div>
          <ul
            class="list-group"
            style={{ maxHeight: "25rem", overflow: "auto" }}
          >
            {this.state.followers !== null &&
              this.state.followers.map((follower) => {
                return (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {follower.fname + " " + follower.lname}
                    <span
                      class="btn badge badge-primary badge-pill"
                      onClick={() => this.deleteFollower(follower.login)}
                    >
                      <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="card my-2">
          <div class="card-header">Following</div>
          <ul
            class="list-group"
            style={{ maxHeight: "25rem", overflow: "auto" }}
          >
            {this.state.following !== null &&
              this.state.following.map((followed) => {
                return (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {followed.fname + " " + followed.lname}
                    <span
                      class="btn badge badge-primary badge-pill"
                      onClick={() => this.deleteFollowing(followed.login)}
                    >
                      <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                    </span>
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
