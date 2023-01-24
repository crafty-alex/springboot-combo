import React, { Component } from "react";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import SearchAvancee from "../search/SearchAvancee";
import NotificationAlert from "react-notification-alert";
import TabPersonnesPhysiques from "../fichesUsager/TabPersonnesPhysiques";
import TabPersonnesMorales from "../fichesUsager/TabPersonnesMorales";
import TabEngin from "../fichesEngin/TabEngin";
import TabDemandeTraitee from "../demandesTraitees/TabDemandeTraitee";

class ListeSearchAvancee extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dataPersonneMorale: [],
      dataPersonnePhysique: [],
      dataEngin: [],
      dataDemande: [],
      sortPersonnePhysique: true,
      sortPersonneMorale: true,
      sortEngin: true,
      sortDemande: true,
      loadingPersonneMorale: false,
      loadingPersonnePhysique: false,
      loadingEngin: false,
      loadingDemande: false,
      totalElementsPersonnePhysique: 0,
      totalElementsPersonneMorale: 0,
      totalElementsEngin: 0,
      totalElementsDemande: 0,
      pagePersonnePhysique: 0,
      pagePersonneMorale: 0,
      pageEngin: 0,
      pageDemande: 0,
      totalPagesPersonnePhysique: 0,
      totalPagesPersonneMorale: 0,
      totalPagesEngin: 0,
      totalPagesDemande: 0,
      disabledButtonPreviousPersonneMorale: true,
      disabledButtonNextPersonneMorale: true,
      disabledButtonPreviousPersonnePhysique: true,
      disabledButtonNextPersonnePhysique: true,
      disabledButtonPreviousEngin: true,
      disabledButtonNextEngin: true,
      disabledButtonPreviousDemande: true,
      disabledButtonNextDemande: true,
      search: false,
      searchedPersonnePhysiqueInput: {},
      searchedPersonneMoraleInput: {},
      searchedEnginInput: {},
      searchedDemandeInput: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      loadingPersonnePhysique: true,
      loadingPersonneMorale: true,
      loadingEngin: true,
      loadingDemande: true,
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
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_ENGINS_URL}?page=${this.state.pageEngin}&size=20&sort=datePremiereDeclaration,DESC&sort=heurePremiereDeclaration,DESC`
      )
      .then((res) => {
        if (this._isMounted) {
          this.setState(
            {
              dataEngin: res.data.content,
              loadingEngin: false,
              totalElementsEngin: res.data.totalElements,
              pageEngin: res.data.number,
              totalPagesEngin: res.data.totalPages,
            },
            () => {
              if (this.state.pageEngin + 1 < this.state.totalPagesEngin) {
                this.setState({
                  disabledButtonNextEngin: false,
                });
              }
            }
          );
        }
      });
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_EVERY_DEMANDES_URL}?page=${this.state.pageDemande}&size=20&sort=dateSoumission,DESC&sort=heureSoumission,DESC`
      )
      .then((res) => {
        if (this._isMounted) {
          this.setState(
            {
              dataDemande: res.data.content,
              loadingDemande: false,
              totalElementsDemande: res.data.totalElements,
              pageDemande: res.data.number,
              totalPagesDemande: res.data.totalPages,
            },
            () => {
              if (this.state.pageDemande + 1 < this.state.totalPagesDemande) {
                this.setState({
                  disabledButtonNextDemande: false,
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
  showCustomEnginsList = (page, data) => {
    this.setState(
      {
        search: true,
        searchedEnginInput: data,
        dataEngin: page.content,
        loadingEngin: false,
        sortEngin: true,
        pageEngin: page.number,
        totalPagesEngin: page.totalPages,
        totalElementsEngin: page.totalElements,
      },
      () => {
        if (this.state.pageEngin === 0) {
          this.setState({
            disabledButtonPreviousEngin: true,
          });
        } else {
          if (this.state.pageEngin + 1 === this.state.totalPagesEngin) {
            this.setState({
              disabledButtonNextEngin: true,
              disabledButtonPreviousEngin: false,
            });
          }
        }
        if (this.state.pageEngin + 1 < this.state.totalPagesEngin) {
          this.setState({ disabledButtonNextEngin: false });
        } else {
          this.setState({ disabledButtonNextEngin: true });
        }
      }
    );
  };

  showCustomDemandesList = (page, data) => {
    this.setState(
      {
        search: true,
        searchedDemandeInput: data,
        dataDemande: page.content,
        loadingDemande: false,
        sortDemande: true,
        pageDemande: page.number,
        totalPagesDemande: page.totalPages,
        totalElementsDemande: page.totalElements,
      },
      () => {
        if (this.state.pageDemande === 0) {
          this.setState({
            disabledButtonPreviousDemande: true,
          });
        } else {
          if (this.state.pageDemande + 1 === this.state.totalPagesDemande) {
            this.setState({
              disabledButtonNextDemande: true,
              disabledButtonPreviousDemande: false,
            });
          }
        }
        if (this.state.pageDemande + 1 < this.state.totalPagesDemande) {
          this.setState({ disabledButtonNextDemande: false });
        } else {
          this.setState({ disabledButtonNextDemande: true });
        }
      }
    );
  };

  showLoading = () => {
    this.setState({
      loadingPersonneMorale: true,
      loadingPersonnePhysique: true,
      loadingEngin: true,
      loadingDemande: true,
      sortPersonnePhysique: false,
      sortPersonneMorale: false,
      sortEngin: false,
      sortDemande: false,
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
  showErrorEngin = () => {
    this.setState({ loadingEngin: false });
  };
  showErrorDemande = () => {
    this.setState({ loadingDemande: false });
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
        this.alertFail("Échec : Saisie invalide Personne physique");
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
        this.alertFail("Échec : Saisie invalide Personne Morale");
        this.showErrorPersonnePhysique();
      });
  };

  fetchDataEngin = (direction) => {
    let pageEngin = 0;

    if (direction) {
      pageEngin = this.state.pageEngin + 1;
    } else {
      pageEngin = this.state.pageEngin - 1;
    }

    this.setState({ loadingEngin: true, sortEngin: false });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_ENGINS_URL}?page=${pageEngin}&size=20&sort=datePremiereDeclaration,DESC&sort=heurePremiereDeclaration,DESC`
      )
      .then((res) => {
        this.setState(
          {
            dataEngin: res.data.content,
            loadingEngin: false,
            totalElementsEngin: res.data.totalElements,
            pageEngin: res.data.number,
            totalPagesEngin: res.data.totalPages,
            disabledButtonPreviousEngin: false,
            sortEngin: true,
          },
          () => {
            if (this.state.pageEngin === 0) {
              this.setState({
                disabledButtonPreviousEngin: true,
              });
            }
            if (this.state.pageEngin + 1 === this.state.totalPagesEngin) {
              this.setState({ disabledButtonNextEngin: true });
            }
            if (this.state.pageEngin + 1 < this.state.totalPagesEngin) {
              this.setState({ disabledButtonNextEngin: false });
            }
          }
        );
      });
  };

  fetchDataEnginCustom = (direction) => {
    let pageEngin = 0;

    if (direction) {
      pageEngin = this.state.pageEngin + 1;
    } else {
      pageEngin = this.state.pageEngin - 1;
    }

    this.setState({ loadingEngin: true, sortEngin: false });

    let searchedEnginInput = this.state.searchedEnginInput;
    searchedEnginInput.page = pageEngin;

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_ENGIN_URL}`,
        searchedEnginInput
      )
      .then((response) => {
        this.showCustomEnginsList(response.data, searchedEnginInput);
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide Engin");
        this.showError();
      });
  };

  fetchDataDemande = (direction) => {
    let pageDemande = 0;

    if (direction) {
      pageDemande = this.state.pageDemande + 1;
    } else {
      pageDemande = this.state.pageDemande - 1;
    }

    this.setState({ loadingDemande: true, sortDemande: false });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_EVERY_DEMANDES_URL}?page=${pageDemande}&size=20&sort=dateSoumission,DESC&sort=heureSoumission,DESC`
      )
      .then((res) => {
        this.setState(
          {
            dataDemande: res.data.content,
            loadingDemande: false,
            totalElementsDemande: res.data.totalElements,
            pageDemande: res.data.number,
            totalPagesDemande: res.data.totalPages,
            disabledButtonPreviousDemande: false,
            sortDemande: true,
          },
          () => {
            if (this.state.pageDemande === 0) {
              this.setState({
                disabledButtonPreviousDemande: true,
              });
            }
            if (this.state.pageDemande + 1 === this.state.totalPagesDemande) {
              this.setState({ disabledButtonNextDemande: true });
            }
            if (this.state.page + 1 < this.state.totalPagesDemande) {
              this.setState({ disabledButtonNextDemande: false });
            }
          }
        );
      });
  };

  fetchDataDemandeCustom = (direction) => {
    let pageDemande = 0;

    if (direction) {
      pageDemande = this.state.pageDemande + 1;
    } else {
      pageDemande = this.state.pageDemande - 1;
    }

    this.setState({ loadingDemande: true, sortDemande: false });

    let searchedDemandeInput = this.state.searchedDemandeInput;
    searchedDemandeInput.page = pageDemande;

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_EVERY_DEMANDE_URL}`,
        searchedDemandeInput
      )
      .then((response) => {
        this.showCustomDemandesList(response.data, searchedDemandeInput);
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide Demande");
        this.showError();
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

        <h1 className="main-title">Recherche avancée</h1>

        <SearchAvancee
          showLoading={this.showLoading}
          showCustomPersonnePhysiqueList={this.showCustomPersonnePhysiqueList}
          showCustomPersonneMoraleList={this.showCustomPersonneMoraleList}
          showCustomEnginsList={this.showCustomEnginsList}
          showCustomDemandesList={this.showCustomDemandesList}
          showErrorPersonnePhysique={this.showErrorPersonnePhysique}
          showErrorPersonneMorale={this.showErrorPersonneMorale}
          showErrorEngin={this.showErrorEngin}
          showErrorDemande={this.showErrorDemande}
        />

        <Tabs defaultActiveKey={1} id="tab">
          <Tab eventKey={1} title="Engins">
            <TabEngin
              search={this.state.search}
              totalElementsEngin={this.state.totalElementsEngin}
              disabledButtonPreviousEngin={
                this.state.disabledButtonPreviousEngin
              }
              fetchDataEnginCustom={this.fetchDataEnginCustom}
              fetchDataEngin={this.fetchDataEngin}
              pageEngin={this.state.pageEngin}
              totalPagesEngin={this.state.totalPagesEngin}
              disabledButtonNextEngin={this.state.disabledButtonNextEngin}
              dataEngin={this.state.dataEngin}
              sort={this.state.sortEngin}
              loadingEngin={this.state.loadingEngin}
            />
          </Tab>

          <Tab eventKey={2} title="Particuliers">
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

          <Tab eventKey={3} title="Entreprises/Associations">
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

          <Tab eventKey={4} title="Demandes">
            <TabDemandeTraitee
              search={this.state.search}
              totalElementsDemande={this.state.totalElementsDemande}
              disabledButtonDemande={this.state.disabledButtonPreviousDemande}
              fetchDataDemandeCustom={this.fetchDataDemandeCustom}
              fetchDataDemande={this.fetchDataDemande}
              pageDemande={this.state.pageDemande}
              totalPagesDemande={this.state.totalPagesDemande}
              disabledButtonNextDemande={this.state.disabledButtonNextDemande}
              dataDemande={this.state.dataDemande}
              sort={this.state.sort}
              loadingDemande={this.state.loadingDemande}
              complet={true}
            />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default ListeSearchAvancee;
