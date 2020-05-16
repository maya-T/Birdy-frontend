import React, { Component } from "react";
import axios from "axios";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class SideCard extends Component {
  state = {
    editBio: false,
    editAdress: false,
    editWebsite: false,
  };
  handleEdit = (field, value) => {
    if (field === "bio") {
      this.setState({ editBio: value });
    } else if (field === "adress") {
      this.setState({ editAdress: value });
    } else if (field === "website") {
      this.setState({ editWebsite: value });
    }
  };

  handleSubmit = (field, toDelete) => {
    let value = this.props[field];
    let oldValue = this.props[field];
    if (toDelete) {
      value = "none";
      this.props.handleInfoChange("none", field);
    }
    if (value !== "") {
      axios
        .get(
          "http://localhost:8080/TestWeb/UpdateInfo/field/" +
            field +
            "/login/" +
            this.props.username +
            "/content/" +
            value
        )
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.handleEdit(field, false);
        });
    }
  };

  render() {
    return (
      <div>
        {!(!this.props.isMyProfile && this.props.bio === "none") && (
          <div className="card mb-2 p-1">
            <div className="card-body">
              <h5 className="card-title">Intro</h5>
              {this.state.editBio && (
                <div>
                  <textarea
                    defaultValue={
                      (this.props.bio !== "none" && this.props.bio) ||
                      (this.props.bio === "none" && "Write a bio")
                    }
                    className="w-100 border rounded"
                    style={{ border: "none" }}
                    onChange={(event) =>
                      this.props.handleInfoChange(event.target.value, "bio")
                    }
                  ></textarea>
                  <div className="row">
                    <div className="col-4 p-1">
                      <button
                        className="card-link btn btn-outline-secondary w-100 btn-sm "
                        onClick={() => this.handleEdit("bio", false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-4 p-1">
                      <button
                        className="card-link btn btn-secondary w-100 btn-sm "
                        onClick={() => this.handleSubmit("bio", true)}
                      >
                        delete
                      </button>
                    </div>
                    <div className="col-4 p-1">
                      <button
                        className="card-link btn btn-primary w-100 btn-sm "
                        onClick={() => this.handleSubmit("bio", false)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {!this.state.editBio && (
                <div>
                  {this.props.bio !== "none" && (
                    <p className="card-text">{this.props.bio}</p>
                  )}
                  {this.props.bio === "none" && (
                    <p className="card-text">Add your bio here.</p>
                  )}

                  {this.props.isMyProfile && (
                    <button
                      className="card-link btn btn-secondary btn-sm w-100"
                      onClick={() => this.handleEdit("bio", true)}
                    >
                      Edit Bio
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* /////////////////////////////////// */}

        <div>
          {!(
            !this.props.isMyProfile &&
            this.props.adress === "none" &&
            this.props.website === "none"
          ) && (
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
                          {this.props.adress !== "none" && (
                            <p>Lives in {this.props.adress} </p>
                          )}
                          {this.props.adress === "none" && (
                            <p>Add where you live here.</p>
                          )}
                        </div>
                        {this.props.isMyProfile && (
                          <div
                            className="btn btn-link col-2 p-0"
                            onClick={() => this.handleEdit("adress", true)}
                          >
                            <FontAwesomeIcon
                              icon={["fas", "edit"]}
                              className="mx-2"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {this.state.editAdress && (
                      <div className="col-10 row p-0">
                        <div className="col-9 px-0 m-0">
                          <input
                            defaultValue={
                              (this.props.adress !== "none" &&
                                this.props.adress) ||
                              (this.props.adress === "none" && "Your adress")
                            }
                            type="text"
                            className="w-100"
                            onChange={(event) =>
                              this.props.handleInfoChange(
                                event.target.value,
                                "adress"
                              )
                            }
                          />
                        </div>
                        <div
                          className="btn btn-link col-1 p-0"
                          onClick={() => this.handleSubmit("adress", false)}
                        >
                          <FontAwesomeIcon
                            icon={["fas", "check-square"]}
                            className="mx-1"
                          />
                        </div>
                        <div
                          className="btn btn-link col-1 p-0"
                          onClick={() => this.handleEdit("adress", false)}
                        >
                          <FontAwesomeIcon
                            icon={["fas", "times-circle"]}
                            className="mx-1"
                          />
                        </div>
                        <div
                          className="btn btn-link col-1 p-0"
                          onClick={() => this.handleSubmit("adress", true)}
                        >
                          <FontAwesomeIcon
                            icon={["far", "trash-alt"]}
                            className="mx-1"
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
                          {this.props.website !== "none" && (
                            <a href={this.props.website}>
                              {this.props.website}
                            </a>
                          )}
                          {this.props.website === "none" && (
                            <p>Add your website here.</p>
                          )}
                        </div>
                        {this.props.isMyProfile && (
                          <div
                            className="btn btn-link col-2 p-0"
                            onClick={() => this.handleEdit("website", true)}
                          >
                            <FontAwesomeIcon
                              icon={["fas", "edit"]}
                              className="mx-2"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {this.state.editWebsite && (
                      <div className="col-10 row p-0">
                        <div className="col-9 px-0 m-0">
                          <input
                            defaultValue={
                              (this.props.website !== "none" &&
                                this.props.website) ||
                              (this.props.website === "none" && "Your website")
                            }
                            type="text"
                            className="w-100"
                            onChange={(event) =>
                              this.props.handleInfoChange(
                                event.target.value,
                                "website"
                              )
                            }
                          />
                        </div>
                        <div
                          className="btn btn-link col-1 p-0"
                          onClick={() => this.handleSubmit("website", false)}
                        >
                          <FontAwesomeIcon
                            icon={["fas", "check-square"]}
                            className="mx-1"
                          />
                        </div>
                        <div
                          className="btn btn-link col-1 p-0"
                          onClick={() => this.handleEdit("website", false)}
                        >
                          <FontAwesomeIcon
                            icon={["fas", "times-circle"]}
                            className="mx-1"
                          />
                        </div>
                        <div
                          className="btn btn-link col-1 p-0"
                          onClick={() => this.handleSubmit("website", true)}
                        >
                          <FontAwesomeIcon
                            icon={["far", "trash-alt"]}
                            className="mx-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SideCard;
