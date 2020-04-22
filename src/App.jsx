import React, { Component } from "react";
import Auth from "./components/authenticationComponents/authentication";
import Main from "./components/main";
import "./App.css";
class App extends Component {
  state = {
    online: false,
    sessionKey: "",
    profileImage: null,
    adress: "",
    bio: "",
    website: "",
    input: {
      firstname: "",
      lastname: "",
      email: "",
      login: "",
      password: "",
      birthday: new Date(),
    },
  };

  handleInputChange = (input) => {
    this.setState({ input });
  };
  handleConnected = (
    input,
    sessionKey,
    profileImage,
    adress,
    bio,
    website,
    login
  ) => {
    const online = true;
    console.log(input, sessionKey, profileImage, adress, bio, website, login);
    if (login) {
      this.setState({
        online,
        input,
        sessionKey,
        profileImage,
        adress,
        bio,
        website,
      });
    } else {
      this.setState({ online });
    }
  };
  updateProfileImage = (profileImage) => {
    this.setState({ profileImage });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.online && (
          <Auth
            input={this.state.input}
            handleInputChange={this.handleInputChange}
            handleConnected={this.handleConnected}
          />
        )}

        {this.state.online && (
          <Main
            username={this.state.input.login}
            firstname={this.state.input.firstname}
            lastname={this.state.input.lastname}
            profileImage={this.state.profileImage}
            bio={this.state.bio}
            adress={this.state.adress}
            website={this.state.website}
            updateProfileImage={this.updateProfileImage}
          />
        )}
      </React.Fragment>
    );
  }
}

export default App;
