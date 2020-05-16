import React, { Component } from "react";
import ProfilePage from "./profilePage";
import axios from "axios";
class OtherProfile extends Component {
  _isMounted = false;
  state = {
    profileImage: null,
    adress: "",
    bio: "",
    website: "",
    firstname: "",
    lastname: "",
    email: "",
    birthday: new Date(),
    render: false,
    following: false,
  };
  componentDidMount = () => {
    if (!this._isMounted) {
      this.getUserInfo();
      this._isMounted = true;
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  getUserInfo = () => {
    axios
      .get(
        "http://localhost:8080/TestWeb/VisitProfile/otherLogin/" +
          this.props.profileUsername +
          "/myLogin/" +
          this.props.username
      )
      .then((res) => {
        console.log(res);
        const profileImage = res.data.picture;
        const adress = res.data.adress;
        const bio = res.data.bio;
        const website = res.data.website;

        const firstname = res.data.firstName;
        const lastname = res.data.lastName;
        const email = res.data.email;
        const following = res.data.following;
        const render = true;
        //input[birthday] res.data.loginInfo.info.
        this.setState({
          profileImage,
          adress,
          bio,
          website,
          firstname,
          lastname,
          email,
          render,
          following,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  setFollowing = (value) => {
    this.setState({ following: value });
  };
  render() {
    return (
      <div>
        <ProfilePage
          username={this.props.profileUsername}
          realUsername={this.props.username}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          profileImage={this.state.profileImage}
          bio={this.state.bio}
          adress={this.state.adress}
          website={this.state.website}
          following={this.state.following}
          actions={this.props.actions}
          handleInfoChange={null}
          updateProfileImage={null}
          isMyProfile={this.props.profileUsername === this.props.username}
          setFollowing={this.setFollowing}
        />
        )}
      </div>
    );
  }
}

export default OtherProfile;
