import React, { Component } from "react";
import ProfileCard from "./profileCard";
import SideCard from "./sideCard";
import Feed from "../feedComponents/feed";
import FriendsCard from "./friendsCard";
import axios from "axios";
class ProfilePage extends Component {
  state = {
    messagesNum: 1,
    followersNum: 0,
    followingNum: 0,
    messages: null,
    authors: null,
  };

  componentDidMount = () => {
    this.getMessages();
  };
  getMessages = () => {
    axios
      .get(
        "http://localhost:8080/TestWeb/MyMessages/login/" + this.props.username
      )
      .then((res) => {
        console.log(res);
        const messages = res.data.messages;
        const authors = res.data.authors;
        const messagesNum = messages.length;
        this.setState({ messages, authors, messagesNum });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateNumbers = (followersNum, followingNum) => {
    this.setState({ followersNum, followingNum });
  };

  render() {
    return (
      <div className="row m-4">
        <div className="col-8 p-0">
          <ProfileCard
            username={this.props.username}
            firstname={this.props.firstname}
            lastname={this.props.lastname}
            messagesNum={this.state.messagesNum}
            followersNum={this.state.followersNum}
            followingNum={this.state.followingNum}
            profileImage={this.props.profileImage}
            updateProfileImage={this.props.updateProfileImage}
          ></ProfileCard>
          <div className="row mx-0 my-3" style={{ width: "inherit" }}>
            <div className="col-4 pl-0 ">
              <SideCard
                username={this.props.username}
                bio={this.props.bio}
                adress={this.props.adress}
                website={this.props.website}
              ></SideCard>
              <FriendsCard
                username={this.props.username}
                updateNumbers={this.updateNumbers}
              ></FriendsCard>
            </div>
            <div className="col-8 border rounded p-0">
              <Feed
                getMessages={this.getMessages}
                messages={this.state.messages}
                authors={this.state.authors}
                username={this.props.username}
              ></Feed>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
