import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import axios from "axios";
import { Badge, Button, Col, Row } from "react-bootstrap";
import SearchDemande from "../search/SearchDemande";
import NotificationAlert from "react-notification-alert";
import { NavLink } from "react-router-dom";

class ListeDemandes extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      autosearchId: props.match.params.id,
      autosearchType: props.match.params.type,
      data: [],
      sort: true,
      loading: false,
      totalElements: 0,
      page: 0,
      totalPages: 0,
      disabledButtonPrevious: true,
      disabledButtonNext: true,
      search: false,
      searchedInput: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true });

    if (this.props.match.params.id === "false") {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_DEMANDES_URL}?page=${this.state.page}&size=20&sort=dateSoumission,ASC&sort=heureSoumission,ASC`
        )
        .then((res) => {
          if (this._isMounted) {
            this.setState(
              {
                data: res.data.content,
                loading: false,
                totalElements: res.data.totalElements,
                page: res.data.number,
                totalPages: res.data.totalPages,
              },
              () => {
                if (this.state.page + 1 < this.state.totalPages) {
                  this.setState({
                    disabledButtonNext: false,
                  });
                }
              }
            );
          }
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        autosearchId: nextProps.match.params.id,
        autosearchType: nextProps.match.params.type,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showCustomDemandesList = (page, data) => {
    this.setState(
      {
        search: true,
        searchedInput: data,
        data: page.content,
        loading: false,
        sort: true,
        page: page.number,
        totalPages: page.totalPages,
        totalElements: page.totalElements,
      },
      () => {
        if (this.state.page === 0) {
          this.setState({
            disabledButtonPrevious: true,
          });
        } else {
          if (this.state.page + 1 === this.state.totalPages) {
            this.setState({
              disabledButtonNext: true,
              disabledButtonPrevious: false,
            });
          }
        }
        if (this.state.page + 1 < this.state.totalPages) {
          this.setState({ disabledButtonNext: false });
        } else {
          this.setState({ disabledButtonNext: true });
        }
      }
    );
  };

  showLoading = () => {
    this.setState({ loading: true, sort: false });
  };

  showError = () => {
    this.setState({ loading: false });
  };

  fetchData = (direction) => {
    let page = 0;

    if (direction) {
      page = this.state.page + 1;
    } else {
      page = this.state.page - 1;
    }

    this.setState({ loading: true, sort: false });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_DEMANDES_URL}?page=${page}&size=20&sort=dateSoumission,ASC&sort=heureSoumission,ASC`
      )
      .then((res) => {
        this.setState(
          {
            data: res.data.content,
            loading: false,
            totalElements: res.data.totalElements,
            page: res.data.number,
            totalPages: res.data.totalPages,
            disabledButtonPrevious: false,
            sort: true,
          },
          () => {
            if (this.state.page === 0) {
              this.setState({
                disabledButtonPrevious: true,
              });
            }
            if (this.state.page + 1 === this.state.totalPages) {
              this.setState({ disabledButtonNext: true });
            }
            if (this.state.page + 1 < this.state.totalPages) {
              this.setState({ disabledButtonNext: false });
            }
          }
        );
      });
  };

  fetchDataCustom = (direction) => {
    let page = 0;

    if (direction) {
      page = this.state.page + 1;
    } else {
      page = this.state.page - 1;
    }

    this.setState({ loading: true, sort: false });

    let searchedInput = this.state.searchedInput;
    searchedInput.page = page;

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_DEMANDE_URL}`,
        searchedInput
      )
      .then((response) => {
        this.showCustomDemandesList(response.data, searchedInput);
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide");
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

        <h1 className="main-title">Demandes à traiter</h1>

        <SearchDemande
          showLoading={this.showLoading}
          showCustomDemandesList={this.showCustomDemandesList}
          showError={this.showError}
          autosearchId={this.state.autosearchId}
          autosearchType={this.state.autosearchType}
        />

        {!this.state.search ? (
          <div className="results">
            <Badge>{this.state.totalElements}</Badge> demandes en attente
          </div>
        ) : (
          <div className="searched-results">
            <Badge>{this.state.totalElements}</Badge> résultats de recherche{" "}
          </div>
        )}

        {this.state.data.length > 0 ? (
          <Row>
            <Col xs={4} sm={4} className="buttonPrevious">
              <Button
                disabled={this.state.disabledButtonPrevious}
                className="buttonSearchedResults"
                type="button"
                onClick={() => {
                  if (this.state.search) {
                    this.fetchDataCustom(false);
                  } else {
                    this.fetchData(false);
                  }
                }}
              >
                Précédent
              </Button>
            </Col>
            <Col xs={4} sm={4} className="pagination">
              {" "}
              <Button disabled className="buttonPagination">
                Page {this.state.page + 1} sur {this.state.totalPages}
              </Button>
            </Col>
            <Col xs={4} sm={4} className="buttonNext">
              <Button
                disabled={this.state.disabledButtonNext}
                className="buttonSearchedResults"
                type="button"
                onClick={() => {
                  if (this.state.search) {
                    this.fetchDataCustom(true);
                  } else {
                    this.fetchData(true);
                  }
                }}
              >
                Suivant
              </Button>
            </Col>
          </Row>
        ) : null}

        <div>
          {this.state.data.length > 0 ? (
            <ReactTable
              data={this.state.data}
              nextText="Suivant"
              previousText="Précédent"
              ofText="sur"
              sortable={this.state.sort}
              loading={this.state.loading}
              defaultPageSize={20}
              showPagination={false}
              columns={[
                {
                  id: "n_demande",
                  Header: "N°",
                  accessor: "numeroDemande",
                  width: 60,
                  Cell: (e) => (
                    <NavLink to={`/fiche-demande/${e.value}`}>
                      {e.value}
                    </NavLink>
                  ),
                },
                {
                  id: "date_soumission",
                  Header: "DATE",
                  accessor: "dateSoumission",
                  width: 100,
                  sortMethod: (a, b) => {
                    a = a.split("/").reverse().join("");
                    b = b.split("/").reverse().join("");
                    return a > b ? 1 : a < b ? -1 : 0;
                  },
                },
                {
                  id: "motif_demande",
                  Header: "MOTIF",
                  accessor: "motifDemande.libelleLong",
                  width: 170,
                },
                {
                  id: "motif_blocage",
                  Header: "BLOCAGE",
                  accessor: (value) =>
                    value.jointureDemandeMotifBlocage.length === 1
                      ? value.jointureDemandeMotifBlocage[0].motifBlocage
                          .libelleLong
                      : value.jointureDemandeMotifBlocage.length > 1
                      ? "Multiple"
                      : "N/A",
                  width: 170,
                },
                {
                  id: "en_fourriere",
                  Header: "FOURRIERE",
                  accessor: (value) =>
                    value.contenuDemande.enFourriere === false
                      ? "Non"
                      : value.contenuDemande.enFourriere === true
                      ? "Oui"
                      : "N/A",
                  width: 50,
                },
                {
                  id: "nom_prenom_usager",
                  Header: "USAGER",
                  accessor: (value) =>
                    value.contenuDemande.personnePhysique != null
                      ? `${value.contenuDemande.personnePhysique?.nomNaissance} ${value.contenuDemande.personnePhysique?.prenom}`
                      : value.contenuDemande.personneMorale != null
                      ? `${value.contenuDemande.personneMorale?.nomRepresentant} ${value.contenuDemande.personneMorale?.prenomRepresentant}`
                      : value.contenuDemande.typeProprietaire === 2 &&
                        value.contenuDemande.personneMorale == null &&
                        value.usager.personneMorale != null
                      ? `${value.usager.personneMorale?.nomRepresentant} ${value.usager.personneMorale?.prenomRepresentant}`
                      : `${value.usager.personnePhysique?.nomNaissance} ${value.usager.personnePhysique?.prenom}`,
                  width: 150,
                },
                {
                  id: "statut_demande",
                  Header: "STATUT",
                  accessor: "statutDemande.libelleLong",
                  width: 140,
                },
              ]}
            />
          ) : null}
        </div>

        {this.state.data.length > 0 ? (
          <Row>
            <Col xs={4} sm={4} className="buttonPrevious">
              <Button
                disabled={this.state.disabledButtonPrevious}
                className="buttonSearchedResults"
                type="button"
                onClick={() => {
                  if (this.state.search) {
                    this.fetchDataCustom(false);
                  } else {
                    this.fetchData(false);
                  }
                }}
              >
                Précédent
              </Button>
            </Col>
            <Col xs={4} sm={4} className="pagination">
              {" "}
              <Button disabled className="buttonPagination">
                Page {this.state.page + 1} sur {this.state.totalPages}
              </Button>
            </Col>
            <Col xs={4} sm={4} className="buttonNext">
              <Button
                disabled={this.state.disabledButtonNext}
                className="buttonSearchedResults"
                type="button"
                onClick={() => {
                  if (this.state.search) {
                    this.fetchDataCustom(true);
                  } else {
                    this.fetchData(true);
                  }
                }}
              >
                Suivant
              </Button>
            </Col>
          </Row>
        ) : null}
      </>
    );
  }
}

export default ListeDemandes;
