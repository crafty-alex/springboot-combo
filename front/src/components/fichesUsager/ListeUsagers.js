import React, { Component } from "react";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import SearchUsager from "../search/SearchUsager";
import NotificationAlert from "react-notification-alert";
import TabPersonnesPhysiques from "./TabPersonnesPhysiques";
import TabPersonnesMorales from "./TabPersonnesMorales";

class ListeUsagers extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dataPersonneMorale: [],
      dataPersonnePhysique: [],
      sortPersonnePhysique: true,
      sortPersonneMorale: true,
      loadingPersonneMorale: false,
      loadingPersonnePhysique: false,
      totalElementsPersonnePhysique: 0,
      totalElementsPersonneMorale: 0,
      pagePersonnePhysique: 0,
      pagePersonneMorale: 0,
      totalPagesPersonnePhysique: 0,
      totalPagesPersonneMorale: 0,
      disabledButtonPreviousPersonneMorale: true,
      disabledButtonNextPersonneMorale: true,
      disabledButtonPreviousPersonnePhysique: true,
      disabledButtonNextPersonnePhysique: true,
      search: false,
      searchedPersonnePhysiqueInput: {},
      searchedPersonneMoraleInput: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      loadingPersonnePhysique: true,
      loadingPersonneMorale: true,
    });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_PERSONNES_PHYSIQUES_URL}?page=${this.state.pagePersonnePhysique}&size=20&sort=dateCreation,DESC`
      )
      .then((res) => {
        if (this._isMounted) {
          this.setState(
            {
              dataPersonnePhysique: res.data.content,
              loadingPersonnePhysique: false,
              totalElementsPersonnePhysique: res.data.totalElements,
              pagePersonnePhysique: res.data.number,
              totalPagesPersonnePhysique: res.data.totalPages,
            },
            () => {
              if (
                this.state.pagePersonnePhysique + 1 <
                this.state.totalPagesPersonnePhysique
              ) {
                this.setState({
                  disabledButtonNextPersonnePhysique: false,
                });
              }
            }
          );
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_PERSONNES_MORALES_URL}?page=${this.state.page}&size=20&sort=dateCreation,DESC`
      )
      .then((res) => {
        if (this._isMounted) {
          this.setState(
            {
              dataPersonneMorale: res.data.content,
              loadingPersonneMorale: false,
              totalElementsPersonneMorale: res.data.totalElements,
              pagePersonneMorale: res.data.number,
              totalPagesPersonneMorale: res.data.totalPages,
            },
            () => {
              if (
                this.state.pagePersonneMorale + 1 <
                this.state.totalPagesPersonneMorale
              ) {
                this.setState({
                  disabledButtonNextPersonneMorale: false,
                });
              }
            }
          );
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showCustomPersonnePhysiqueList = (page, data) => {
    this.setState(
      {
        search: true,
        searchedPersonnePhysiqueInput: data,
        dataPersonnePhysique: page.content,
        loadingPersonnePhysique: false,
        sortPersonnePhysique: true,
        pagePersonnePhysique: page.number,
        totalPagesPersonnePhysique: page.totalPages,
        totalElementsPersonnePhysique: page.totalElements,
      },
      () => {
        if (this.state.pagePersonnePhysique === 0) {
          this.setState({
            disabledButtonPreviousPersonnePhysique: true,
          });
        } else {
          if (
            this.state.pagePersonnePhysique + 1 ===
            this.state.totalPagesPersonnePhysique
          ) {
            this.setState({
              disabledButtonNextPersonnePhysique: true,
              disabledButtonPreviousPersonnePhysique: false,
            });
          }
        }
        if (
          this.state.pagePersonnePhysique + 1 <
          this.state.totalPagesPersonnePhysique
        ) {
          this.setState({ disabledButtonNextPersonnePhysique: false });
        } else {
          this.setState({ disabledButtonNextPersonnePhysique: true });
        }
      }
    );
  };

  showCustomPersonneMoraleList = (page, data) => {
    this.setState(
      {
        search: true,
        searchedPersonneMoraleInput: data,
        dataPersonneMorale: page.content,
        loadingPersonneMorale: false,
        sortPersonneMorale: true,
        pagePersonneMorale: page.number,
        totalPagesPersonneMorale: page.totalPages,
        totalElementsPersonneMorale: page.totalElements,
      },
      () => {
        if (this.state.pagePersonneMorale === 0) {
          this.setState({
            disabledButtonPreviousPersonneMorale: true,
          });
        } else {
          if (
            this.state.pagePersonneMorale + 1 ===
            this.state.totalPagesPersonneMorale
          ) {
            this.setState({
              disabledButtonNextPersonneMorale: true,
              disabledButtonPreviousPersonneMorale: false,
            });
          }
        }
        if (
          this.state.pagePersonneMorale + 1 <
          this.state.totalPagesPersonneMorale
        ) {
          this.setState({ disabledButtonNextPersonneMorale: false });
        } else {
          this.setState({ disabledButtonNextPersonneMorale: true });
        }
      }
    );
  };

  showLoading = () => {
    this.setState({
      loadingPersonneMorale: true,
      loadingPersonnePhysique: true,
      sortPersonnePhysique: false,
      sortPersonneMorale: false,
    });
  };

  showErrorPersonnePhysique = () => {
    this.setState({
      loadingPersonnePhysique: false,
    });
  };

  showErrorPersonneMorale = () => {
    this.setState({
      loadingPersonneMorale: false,
    });
  };

  fetchDataPersonnePhysique = (direction) => {
    let pagePersonnePhysique = 0;

    if (direction) {
      pagePersonnePhysique = this.state.pagePersonnePhysique + 1;
    } else {
      pagePersonnePhysique = this.state.pagePersonnePhysique - 1;
    }

    this.setState({
      loadingPersonnePhysique: true,
      sortPersonnePhysique: false,
    });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_PERSONNES_PHYSIQUES_URL}?page=${pagePersonnePhysique}&size=20&sort=dateCreation,DESC`
      )
      .then((res) => {
        this.setState(
          {
            dataPersonnePhysique: res.data.content,
            loadingPersonnePhysique: false,
            totalElementsPersonnePhysique: res.data.totalElements,
            pagePersonnePhysique: res.data.number,
            totalPagesPersonnePhysique: res.data.totalPages,
            disabledButtonPreviousPersonnePhysique: false,
            sortPersonnePhysique: true,
          },
          () => {
            if (this.state.pagePersonnePhysique === 0) {
              this.setState({
                disabledButtonPreviousPersonnePhysique: true,
              });
            }
            if (
              this.state.pagePersonnePhysique + 1 ===
              this.state.totalPagesPersonnePhysique
            ) {
              this.setState({ disabledButtonNextPersonnePhysique: true });
            }
            if (
              this.state.pagePersonnePhysique + 1 <
              this.state.totalPagesPersonnePhysique
            ) {
              this.setState({ disabledButtonNextPersonnePhysique: false });
            }
          }
        );
      });
  };

  fetchDataPersonnePhysiqueCustom = (direction) => {
    let pagePersonnePhysique = 0;

    if (direction) {
      pagePersonnePhysique = this.state.pagePersonnePhysique + 1;
    } else {
      pagePersonnePhysique = this.state.pagePersonnePhysique - 1;
    }

    this.setState({
      loadingPersonnePhysique: true,
      sortPersonnePhysique: false,
    });

    let searchedPersonnePhysiqueInput = this.state
      .searchedPersonnePhysiqueInput;
    searchedPersonnePhysiqueInput.page = pagePersonnePhysique;

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_PERSONNE_PHYSIQUE_URL}`,
        searchedPersonnePhysiqueInput
      )
      .then((response) => {
        this.showCustomPersonnePhysiqueList(
          response.data,
          searchedPersonnePhysiqueInput
        );
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide");
        this.showErrorPersonnePhysique();
      });
  };

  fetchDataPersonneMorale = (direction) => {
    let pagePersonneMorale = 0;

    if (direction) {
      pagePersonneMorale = this.state.pagePersonneMorale + 1;
    } else {
      pagePersonneMorale = this.state.pagePersonneMorale - 1;
    }

    this.setState({
      loadingPersonneMorale: true,
      sortPersonneMorale: false,
    });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_PERSONNES_MORALES_URL}?page=${pagePersonneMorale}&size=20&sort=dateCreation,DESC`
      )
      .then((res) => {
        this.setState(
          {
            dataPersonneMorale: res.data.content,
            loadingPersonneMorale: false,
            totalElementsPersonneMorale: res.data.totalElements,
            pagePersonneMorale: res.data.number,
            totalPagesPersonneMorale: res.data.totalPages,
            disabledButtonPreviousPersonneMorale: false,
            sortPersonneMorale: true,
          },
          () => {
            if (this.state.pagePersonneMorale === 0) {
              this.setState({
                disabledButtonPreviousPersonneMorale: true,
              });
            }
            if (
              this.state.pagePersonneMorale + 1 ===
              this.state.totalPagesPersonneMorale
            ) {
              this.setState({ disabledButtonNextPersonneMorale: true });
            }
            if (
              this.state.pagePersonneMorale + 1 <
              this.state.totalPagesPersonneMorale
            ) {
              this.setState({ disabledButtonNextPersonneMorale: false });
            }
          }
        );
      });
  };

  fetchDataPersonneMoraleCustom = (direction) => {
    let pagePersonneMorale = 0;

    if (direction) {
      pagePersonneMorale = this.state.pagePersonneMorale + 1;
    } else {
      pagePersonneMorale = this.state.pagePersonneMorale - 1;
    }

    this.setState({
      loadingPersonneMorale: true,
      sortPersonneMorale: false,
    });

    let searchedPersonneMoraleInput = this.state.searchedPersonneMoraleInput;
    searchedPersonneMoraleInput.page = pagePersonneMorale;

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_PERSONNE_MORALE_URL}`,
        searchedPersonneMoraleInput
      )
      .then((response) => {
        this.showCustomPersonneMoraleList(
          response.data,
          searchedPersonneMoraleInput
        );
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide");
        this.showErrorPersonnePhysique();
      });
  };

  alertFail = (message) => {
    let options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong> {message} </strong>
          </div>
        </div>
      ),
      type: "danger",
      autoDismiss: 3,
    };
    this.refs.notify.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div>
          <NotificationAlert ref="notify" />
        </div>

        <h1 className="main-title">Récapitulatif des fiches usagers</h1>

        <SearchUsager
          showLoading={this.showLoading}
          showCustomPersonnePhysiqueList={this.showCustomPersonnePhysiqueList}
          showCustomPersonneMoraleList={this.showCustomPersonneMoraleList}
          showErrorPersonnePhysique={this.showErrorPersonnePhysique}
          showErrorPersonneMorale={this.showErrorPersonneMorale}
        />

        <Tabs defaultActiveKey={1} id="tab">
          <Tab eventKey={1} title="Particuliers">
            <TabPersonnesPhysiques
              search={this.state.search}
              totalElementsPersonnePhysique={
                this.state.totalElementsPersonnePhysique
              }
              disabledButtonPreviousPersonnePhysique={
                this.state.disabledButtonPreviousPersonnePhysique
              }
              fetchDataPersonnePhysiqueCustom={
                this.fetchDataPersonnePhysiqueCustom
              }
              fetchDataPersonnePhysique={this.fetchDataPersonnePhysique}
              pagePersonnePhysique={this.state.pagePersonnePhysique}
              totalPagesPersonnePhysique={this.state.totalPagesPersonnePhysique}
              disabledButtonNextPersonnePhysique={
                this.state.disabledButtonNextPersonnePhysique
              }
              dataPersonnePhysique={this.state.dataPersonnePhysique}
              sort={this.state.sort}
              loadingPersonnePhysique={this.state.loadingPersonnePhysique}
            />
          </Tab>

          <Tab eventKey={2} title="Entreprises/Associations">
            <TabPersonnesMorales
              search={this.state.search}
              totalElementsPersonneMorale={
                this.state.totalElementsPersonneMorale
              }
              disabledButtonPreviousPersonneMorale={
                this.state.disabledButtonPreviousPersonneMorale
              }
              fetchDataPersonneMoraleCustom={this.fetchDataPersonneMoraleCustom}
              fetchDataPersonneMorale={this.fetchDataPersonneMorale}
              pagePersonneMorale={this.state.pagePersonneMorale}
              totalPagesPersonneMorale={this.state.totalPagesPersonneMorale}
              disabledButtonNextPersonneMorale={
                this.state.disabledButtonNextPersonneMorale
              }
              dataPersonneMorale={this.state.dataPersonneMorale}
              sort={this.state.sort}
              loadingPersonneMorale={this.state.loadingPersonneMorale}
            />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default ListeUsagers;
