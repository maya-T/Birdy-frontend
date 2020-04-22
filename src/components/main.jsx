import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import NavBar from "./navBar";
import ProfilePage from "./profileComponents/profilePage";
import HomePage from "./homeComponents/home";
class Main extends Component {
  state = {};
  render() {
    return (
      <HashRouter>
        <div>
          <NavBar>
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
            <NavLink className="nav-link" to="/Notifications">
              Notifications
            </NavLink>
          </NavBar>

          <div className="">
            <Route path="/home">
              <HomePage username={this.props.username} />
            </Route>
            <Route path="/profile">
              <ProfilePage
                username={this.props.username}
                firstname={this.props.firstname}
                lastname={this.props.lastname}
                profileImage={this.props.profileImage}
                bio={this.props.bio}
                adress={this.props.adress}
                website={this.props.website}
                updateProfileImage={this.props.updateProfileImage}
              />
            </Route>
            <Route path="/contact" component={HomePage} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
