import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter,
  useParams,
  Link,
  Redirect,
} from "react-router-dom";
import NavBar from "../navBar";
import ProfilePage from "../profileComponents/profilePage";
import HomePage from "../homeComponents/home";
import OtherProfile from "../profileComponents/otherProfile";
class Main extends Component {
  state = {
    notifs: [],
  };
  render() {
    return (
      <HashRouter>
        <div>
          <NavBar>
            <Link
              style={{ display: "none" }}
              className="nav-link"
              to="/"
            ></Link>
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </NavBar>

          <div className="">
            <Route
              path="/"
              component={() => {
                return <Redirect to="/home" />;
              }}
            ></Route>
            <Route
              path={"/visitProfile/" + this.props.username}
              component={() => {
                return <Redirect to="/profile" />;
              }}
            ></Route>
            <Route path="/home">
              <HomePage username={this.props.username} />
            </Route>
            <Route
              path="/visitProfile/:login"
              component={() => {
                let { login } = useParams();
                return (
                  <OtherProfile
                    username={this.props.username}
                    profileUsername={login}
                  ></OtherProfile>
                );
              }}
            ></Route>
            <Route path="/profile">
              <ProfilePage
                username={this.props.username}
                realUsername="maya@"
                firstname={this.props.firstname}
                lastname={this.props.lastname}
                profileImage={this.props.profileImage}
                bio={this.props.bio}
                adress={this.props.adress}
                website={this.props.website}
                updateProfileImage={this.props.updateProfileImage}
                handleInfoChange={this.props.handleInfoChange}
                isMyProfile={true}
              />
            </Route>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
