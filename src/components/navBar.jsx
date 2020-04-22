import React, { Component } from "react";
import "./css/navBar.css";
import "./fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class NavBar extends Component {
  state = {
    dropdownOpen: false,
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
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
                    className="nav-item"
                  >
                    {child}
                  </li>
                );
              })}
              <li className="nav-item ">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle
                    className="dropdown mx-4"
                    outline
                    color="primary"
                  >
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
