import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import "../../static/css/trace-styles.css";
import axios from "axios";
import { Badge, Button, Col, Row } from "react-bootstrap";
import SearchTrace from "../search/SearchTrace";
import NotificationAlert from "react-notification-alert";
import { Modal } from "react-responsive-modal";
import { NavLink } from "react-router-dom";

class ListeTraces extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
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
      open: false,
      trace: { typeTrace: {}, profilUtilisateur: {} },
      numeroDemande: "",
      numeroIdentification: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_TRACES_URL}?page=${this.state.page}&size=20&sort=dateTrace,DESC`
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  showCustomTracesList = (page, data) => {
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
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_TRACES_URL}?page=${page}&size=20&sort=dateTrace,DESC`
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
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_TRACE_URL}`,
        searchedInput
      )
      .then((response) => {
        this.showCustomTracesList(response.data, searchedInput);
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide");
        this.showError();
      });
  };

  onOpenModal = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TRACE_URL}/${id}`
      )
      .then((response) => {
        this.setState({ trace: response.data }, () => {
          axios
            .get(
              `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_DEMANDE_ID_URL}/${this.state.trace.demandeId}`
            )
            .then((response) => {
              this.setState({ numeroDemande: response.data });
            });

          axios
            .get(
              `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ENGIN_ID_URL}/${this.state.trace.enginId}`
            )
            .then((response) => {
              this.setState({ numeroIdentification: response.data });
            });
        });
      });

    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
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

        <h1 className="main-title">Historique des opérations</h1>

        <SearchTrace
          showLoading={this.showLoading}
          showCustomTracesList={this.showCustomTracesList}
          showError={this.showError}
        />

        {!this.state.search ? (
          <div className="results">
            <Badge>{this.state.totalElements}</Badge> opérations au total
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
          <Modal
            closeOnOverlayClick={false}
            open={this.state.open}
            onClose={this.onCloseModal}
            center
            classNames={{
              modal: "customModalTrace",
            }}
          >
            <Row>
              <Col xs={12} sm={6}>
                <Col xs={12}>
                  <div className=" title-margin-top bold-title">ID trace :</div>
                  {this.state.trace.traceId}
                </Col>

                <Col xs={12}>
                  <div className="bold-title title-margin-top">
                    Date et heure :
                  </div>{" "}
                  {this.state.trace.dateTrace}
                </Col>

                <Col xs={12}>
                  <div className=" title-margin-top bold-title">
                    Type de trace :
                  </div>
                  {this.state.trace.typeTrace.libelleLong}
                </Col>
                <Col xs={12}>
                  <div className="bold-title title-margin-top">
                    Type propriétaire :
                  </div>{" "}
                  {this.state.trace.personnePhysiqueId != null
                    ? "personne physique"
                    : "personne morale"}
                </Col>

                <Col xs={12}>
                  <div className="bold-title title-margin-top">
                    ID demande :
                  </div>{" "}
                  {this.state.trace.demandeId != null ? (
                    <NavLink
                      to={{
                        pathname: `/fiche-demande/${this.state.numeroDemande}`,
                        aboutProps: { name: "reload" },
                      }}
                    >
                      {this.state.trace.demandeId}
                    </NavLink>
                  ) : (
                    "N/A"
                  )}
                </Col>

                <Col xs={12}>
                  <div className="bold-title title-margin-top">ID engin :</div>{" "}
                  {this.state.trace.enginId != null ? (
                    <NavLink
                      to={{
                        pathname: `/fiche-engin/${this.state.numeroIdentification}`,
                        aboutProps: { name: "reload" },
                      }}
                    >
                      {this.state.trace.enginId}
                    </NavLink>
                  ) : (
                    "N/A"
                  )}
                </Col>

                <Col xs={12}>
                  <div className="bold-title title-margin-top">ID usager :</div>{" "}
                  {this.state.trace.personnePhysiqueId != null ? (
                    <NavLink
                      to={{
                        pathname: `/fiche-usager/1/${this.state.trace.personnePhysiqueId}`,
                        aboutProps: { name: "reload" },
                      }}
                    >
                      {this.state.trace.personnePhysiqueId}
                    </NavLink>
                  ) : this.state.trace.personneMoraleId != null ? (
                    <NavLink
                      to={{
                        pathname: `/fiche-usager/2/${this.state.trace.personneMoraleId}`,
                        aboutProps: { name: "reload" },
                      }}
                    >
                      {this.state.trace.personneMoraleId}
                    </NavLink>
                  ) : (
                    "N/A"
                  )}
                </Col>
              </Col>

              <Col xs={12} sm={6}>
                <Col xs={12}>
                  <div className="bold-title title-margin-top">
                    Action menée par :
                  </div>{" "}
                  {this.state.trace.profilUtilisateur.libelleLong}
                </Col>

                <Col xs={12}>
                  <div className="bold-title title-margin-top">
                    Service utilisateur :
                  </div>{" "}
                  {this.state.trace.serviceUtilisateur}
                </Col>

                <Col xs={12}>
                  <div className="bold-title title-margin-top">
                    Matricule (RIO):
                  </div>{" "}
                  {this.state.trace.utilisateurId}
                </Col>
              </Col>
            </Row>
          </Modal>
        </div>

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
                  id: "id_trace",
                  Header: "ID TRACE",
                  accessor: "traceId",
                  width: 110,
                  Cell: (e) => (
                    <a onClick={() => this.onOpenModal(e.value)}>{e.value}</a>
                  ),
                },
                {
                  id: "date_trace",
                  Header: "DATE ET HEURE",
                  accessor: "dateTrace",
                  width: 170,
                  sortMethod: (a, b) => {
                    let dateA1 = a.split("/").reverse()[0].split(" ")[0];
                    let dateA2 = a.split("/").reverse()[1];
                    let dateA3 = a.split("/").reverse()[2];
                    let dateAFinal = dateA1 + dateA2 + dateA3;
                    let hourA = a
                      .split("/")[2]
                      .split(" ")[1]
                      .split(":")
                      .join("");
                    a = dateAFinal + hourA;

                    let dateB1 = b.split("/").reverse()[0].split(" ")[0];
                    let dateB2 = b.split("/").reverse()[1];
                    let dateB3 = b.split("/").reverse()[2];
                    let dateBFinal = dateB1 + dateB2 + dateB3;
                    let hourB = b
                      .split("/")[2]
                      .split(" ")[1]
                      .split(":")
                      .join("");
                    b = dateBFinal + hourB;

                    return a > b ? 1 : a < b ? -1 : 0;
                  },
                },
                {
                  id: "type_trace",
                  Header: "TYPE ",
                  accessor: "typeTrace.libelleLong",
                  width: 320,
                },
                {
                  id: "action",
                  Header: "ACTION",
                  accessor: "profilUtilisateur.libelleLong",
                  width: 110,
                },
                {
                  id: "matricule",
                  Header: "MATRICULE",
                  accessor: "utilisateurId",
                  width: 120,
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

export default ListeTraces;
