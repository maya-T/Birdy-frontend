import React, { Component } from "react";
import axios from "axios";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class SideCard extends Component {
  state = {
    editBio: false,
    editAdress: false,
    editWebsite: false,
    bio: this.props.bio,
    adress: this.props.adress,
    website: this.props.website,
  };
  handleEdit = (field) => {
    if (field === "bio") {
      this.setState({ editBio: true });
    } else if (field === "adress") {
      this.setState({ editAdress: true });
    } else if (field === "website") {
      this.setState({ editWebsite: true });
    }
  };
  handleChange = (event, field) => {
    if (field === "bio") {
      this.setState({ bio: event.target.value });
    } else if (field === "adress") {
      this.setState({ adress: event.target.value });
    } else if (field === "website") {
      this.setState({ website: event.target.value });
    }
  };
  handleSubmit = (field) => {
    console.log(this.state[field]);
    if (field != "") {
      axios
        .get(
          "http://localhost:8080/TestWeb/UpdateInfo/field/" +
            field +
            "/login/" +
            this.props.username +
            "/content/" +
            this.state[field]
        )
        .then((res) => {
          console.log(res);
          //this.setState({ messages, authors, messagesNum });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  handleClick = () => {
    console.log("hiii");
  };
  render() {
    return (
      <div>
        <div className="card mb-2 p-1">
          <div className="card-body">
            <h5 className="card-title">Intro</h5>
            {this.state.editBio && (
              <div>
                <textarea
                  placeholder="Write a bio"
                  className="w-100 border rounded"
                  style={{ border: "none" }}
                  onChange={(event) => this.handleChange(event, "bio")}
                ></textarea>
                <button
                  className="card-link btn btn-primary btn-sm w-100"
                  onClick={() => this.handleSubmit("bio")}
                >
                  Save
                </button>
              </div>
            )}
            {!this.state.editBio && (
              <div>
                <p className="card-text">{this.props.bio}</p>
                <button
                  className="card-link btn btn-secondary btn-sm w-100"
                  onClick={() => this.handleEdit("bio")}
                >
                  Edit Bio
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="card">
            <div className="card-body p-3">
              <div className="card-text mb-2" style={{ color: "#6c757d" }}>
                <div className="row mb-2">
                  <div className="col-2 p-auto mr-2">
                    <FontAwesomeIcon icon={["fas", "home"]} />
                  </div>
                  {!this.state.editAdress && (
                    <div className="col-10 row p-0">
                      <div className="col-10 px-0 m-0">
                        {this.state.adress !== "" &&
                          this.state.adress !== undefined && (
                            <p>Lives in {this.props.adress} </p>
                          )}
                        {(this.state.adress === "" ||
                          this.state.adress === undefined) && (
                          <p>Add where you live here.</p>
                        )}
                      </div>
                      <div
                        className="btn btn-link col-2 p-0"
                        onClick={() => this.handleEdit("adress")}
                      >
                        <FontAwesomeIcon
                          icon={["fas", "edit"]}
                          className="mx-2"
                        />
                      </div>
                    </div>
                  )}

                  {this.state.editAdress && (
                    <div className="col-10 row">
                      <div className="col-10 px-0 m-0">
                        <input
                          type="text"
                          className="w-100"
                          onChange={(event) =>
                            this.handleChange(event, "adress")
                          }
                        />
                      </div>
                      <div
                        className="btn btn-link col-2 p-0"
                        onClick={() => this.handleSubmit("adress")}
                      >
                        <FontAwesomeIcon
                          icon={["fas", "check-square"]}
                          className="mx-2"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-2 p-auto mr-2">
                    <FontAwesomeIcon icon={["fas", "mouse"]} />
                  </div>
                  {!this.state.editWebsite && (
                    <div className="col-10 row p-0">
                      <div className="col-10 px-0">
                        {this.state.website !== "" &&
                          this.state.website !== undefined && (
                            <a href={this.state.website}>
                              {this.state.website}
                            </a>
                          )}
                        {(this.state.website === "" ||
                          this.state.website === undefined) && (
                          <p>Add your website here.</p>
                        )}
                      </div>
                      <div
                        className="btn btn-link col-2 p-0"
                        onClick={() => this.handleEdit("website")}
                      >
                        <FontAwesomeIcon
                          icon={["fas", "edit"]}
                          className="mx-2"
                        />
                      </div>
                    </div>
                  )}
                  {this.state.editWebsite && (
                    <div className="col-10 row">
                      <div className="col-10 px-0 m-0">
                        <input
                          type="text"
                          className="w-100"
                          onChange={(event) =>
                            this.handleChange(event, "website")
                          }
                        />
                      </div>
                      <div
                        className="btn btn-link col-2 p-0"
                        onClick={() => this.handleSubmit("website")}
                      >
                        <FontAwesomeIcon
                          icon={["fas", "check-square"]}
                          className="mx-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideCard;
