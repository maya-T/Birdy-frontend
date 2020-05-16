import React, { Component } from "react";
import "./css/navBar.css";
import "./fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class NavBar extends Component {
  state = {
    showOptions: false,
    showNotifications: false,
  };
  toggle = (field) => {
    if (field === "options") {
      this.setState({ showOptions: !this.state.showOptions });
    } else {
      this.setState({ showNotifications: !this.state.showNotifications });
      if (
        this.state.showNotifications &&
        this.props.notifications.unseen.length > 0
      ) {
        this.setNotificationsToSeen();
      }
    }
  };
  setNotificationsToSeen = () => {
    axios
      .delete(
        "http://localhost:8080/TestWeb/Notifications/login/" +
          this.props.username
      )
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        this.props.setNotificationsToSeen();
      });
  };
  render() {
    return (
      <nav className="navbar sticky-top" style={{ backgroundColor: "#71AFFF" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <div className="row text-align-center">
              <div className="col">
                <FontAwesomeIcon
                  icon={["fas", "feather"]}
                  size="2x"
                  color="#fff"
                />
              </div>
              <div className="col brand">Birdy</div>
            </div>
          </a>

          <div className="justify-content-end">
            <ul className="nav nav-pills align-items-center">
              {this.props.children.map((child) => {
                return (
                  <li
                    key={this.props.children.indexOf(child)}
                    className="nav-item mr-2"
                  >
                    {child}
                  </li>
                );
              })}
              <li className="nav-item mr-4">
                <Dropdown
                  isOpen={this.state.showNotifications}
                  toggle={() => this.toggle("notifications")}
                >
                  <DropdownToggle className="dropdown " outline color="primary">
                    <FontAwesomeIcon icon={["fas", "bell"]} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    {this.props.notifications !== null &&
                      this.props.notifications !== undefined &&
                      this.props.notifications.unseen.length > 0 &&
                      this.props.notifications.unseen.map((notif) => {
                        return (
                          <div>
                            <DropdownItem>{notif}</DropdownItem>
                            <DropdownItem divider />
                          </div>
                        );
                      })}
                    {this.props.notifications !== null &&
                      this.props.notifications !== undefined &&
                      this.props.notifications.seen.length > 0 &&
                      this.props.notifications.seen.map((notif) => {
                        return (
                          <div>
                            <DropdownItem>{notif}</DropdownItem>
                            <DropdownItem divider />
                          </div>
                        );
                      })}
                  </DropdownMenu>
                </Dropdown>
                <span className="badge badge-pill badge-danger">
                  {this.props.notifications.unseen.length > 0 &&
                    this.props.notifications.unseen.length}
                </span>
              </li>
              <li className="nav-item ">
                <Dropdown
                  isOpen={this.state.showOptions}
                  toggle={() => this.toggle("options")}
                >
                  <DropdownToggle className="dropdown" outline color="primary">
                    <FontAwesomeIcon icon={["fas", "angle-down"]} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Log out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
// class NavBar extends Component {
//   state = {
//     dropdownOpen: false,
//   };
//   toggle = () => {
//     this.setState({ dropdownOpen: !this.state.dropdownOpen });
//   };
//   render() {
//     return (
//       <div
//         className="container-fluid py-3 px-5"
//         style={{ backgroundColor: "#71AFFF" }}
//       >
//         <ul class="nav nav-pills justify-content-end align-items-center">
//           <li class="justify-self-start">hi </li>
//           {this.props.children.map((child) => {
//             return <li class="nav-item">{child}</li>;
//           })}

//           <li class="nav-item ">
//             <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//               <DropdownToggle className="dropdown mx-4" outline color="primary">
//                 <FontAwesomeIcon icon={["fas", "angle-down"]} />
//               </DropdownToggle>
//               <DropdownMenu right>
//                 {/* <DropdownItem header>Header</DropdownItem> */}
//                 <DropdownItem>Settings</DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>Log out</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default NavBar;
