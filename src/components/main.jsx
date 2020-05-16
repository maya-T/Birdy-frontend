import React, { Component } from "react";
import axios from "axios";
import {
  Route,
  NavLink,
  HashRouter,
  useParams,
  Link,
  Redirect,
} from "react-router-dom";
import NavBar from "./navBar";
import ProfilePage from "./profileComponents/profilePage";
import HomePage from "./homeComponents/home";
import OtherProfile from "./profileComponents/otherProfile";
class Main extends Component {
  constructor(props) {
    super(props);
    const socket = new WebSocket(
      "ws://localhost:8080/TestWeb/EndPoint?username=" + this.props.username
    );
    socket.onopen = () => {
      console.log("connection open");
    };
    socket.onclose = () => {
      console.log("close");
    };
    this.state = {
      actions: socket,
      notifs: {
        unseen: [],
        seen: [],
      },
    };
  }
  componentDidMount = () => {
    this.state.actions.onmessage = (e) => {
      let obj = JSON.parse(e.data);
      console.log("obj", obj);
      if (obj.followed === this.props.username) {
        const unseen = [...this.state.notifs.unseen, obj.username];
        const notifs = { ...this.state.notifs };
        notifs.unseen = unseen;
        this.setState({
          notifs,
        });
      }
    };
    this.getNotifications();
  };

  getNotifications = () => {
    axios
      .get(
        "http://localhost:8080/TestWeb/Notifications/login/" +
          this.props.username
      )
      .then((res) => {
        const notifs = {
          seen: res.data.seen,
          unseen: res.data.unseen,
        };
        this.setState({ notifs });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setNotificationsToSeen = () => {
    const notifs = {
      seen: [...this.state.notifs.seen, ...this.state.notifs.unseen],
      unseen: [],
    };
    this.setState({ notifs });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <NavBar
            username={this.props.username}
            notifications={this.state.notifs}
            actions={this.state.actions}
            setNotificationsToSeen={this.setNotificationsToSeen}
          >
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
              exact
              match={true}
              component={() => <Redirect to="/home" />}
            ></Route>
            <Route
              path="/home"
              exact
              match={true}
              render={() => <HomePage username={this.props.username} />}
            ></Route>

            <Route
              path={"/visitProfile/" + this.props.username}
              exact
              component={() => <Redirect to="/profile" />}
            ></Route>

            <Route
              path="/visitProfile/:login"
              exact
              component={() => {
                let { login } = useParams();
                return (
                  <OtherProfile
                    username={this.props.username}
                    profileUsername={login}
                    actions={this.state.actions}
                  ></OtherProfile>
                );
              }}
            ></Route>
            <Route
              path="/profile"
              render={() => (
                <ProfilePage
                  username={this.props.username}
                  realUsername={this.props.username}
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
              )}
            ></Route>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
