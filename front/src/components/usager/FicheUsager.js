import React, { Component } from "react";
import "../../static/css/demande-styles.css";
import "../../static/css/engin-styles.css";
import "../../static/css/usager-styles.css";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import * as constantes from "../util/PersonnePhysiqueOuMoraleObject";
import CoordonneePersonnePhysique from "./CoordonneePersonnePhysique";
import EnginsUsager from "./EnginsUsager";
import IdentitePersonnePhysique from "./IdentitePersonnePhysique";
import CoordonneePersonneMorale from "./CoordonneePersonneMorale";
import IdentitePersonneMorale from "./IdentitePersonneMorale";
import HistoriqueDemandesUsager from "./HistoriqueDemandesUsager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../util/LoginContext";
import ModificationCoordonneeModal from "./ModificationCoordonneeModal";
import ModificationCoordonneeNonValideeModal from "./ModificationCoordonneeNonValideeModal";
import DeclarationNewEnginModal from "./DeclarationNewEnginModal";
import ModifierEtatCivilModal from "./ModifierEtatCivilModal";
import DeclarationContactPersonneMorale from "./DeclarationContactPersonneMorale";
import ContactNonExistantModal from "../usager/ContactNonExistantModal";

class FicheUsager extends Component {
  static contextType = LoginContext;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = constantes.PERSONNEPHYSIQUEOUMORALE;
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.location.aboutProps?.name === "reload") {
      window.location.reload();
    }

    this.fetchInfoUsager();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchInfoUsager();
    }
  }

  fetchInfoUsager = () => {
    if (this.props.match.params.type === "1") {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_PHYSIQUE_URL}/${this.props.match.params.id}`
        )
        .then((response) => {
          if (this._isMounted) {
            this.setState(
              {
                personnePhysique: response.data,
                personneMorale: null,
              },
              () => this.sendTrace()
            );
          }
        });

      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_DEMANDES_PERSONNE_PHYSIQUE_URL}/${this.props.match.params.id}`
        )
        .then((response) => {
          if (this._isMounted) {
            this.setState({
              demandesPersonnePhysique: response.data,
            });
          }
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_MORALE_URL}/${this.props.match.params.id}`
        )
        .then((response) => {
          if (this._isMounted) {
            this.setState({ personneMorale: response.data }, () => {
              this.sendTrace();
              let type;
              let numero;
              if (this.state.personneMorale.numeroSiret != null) {
                type = "SIRET";
                numero = this.state.personneMorale.numeroSiret;
              } else {
                type = "RNA";
                numero = this.state.personneMorale.numeroRna;
              }

              axios
                .get(
                  `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_DEMANDES_PERSONNE_MORALE_URL}/${type}/${numero}`
                )
                .then((response) => {
                  if (this._isMounted) {
                    this.setState({ demandesPersonneMorale: response.data });
                  }
                });
            });
          }
        });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseModalModifierEtatCivilModal = () => {
    this.setState({ showModalModifierEtatCivilModal: false });
    this.fetchInfoUsager();
  };

  handleCloseModalModificationCoordonnee = () => {
    this.setState({
      showModalModificationCoordonnee: false,
    });
    this.fetchInfoUsager();
  };

  handleCloseModalDeclarationNewEngin = () => {
    this.setState({ showModalDeclarationNewEngin: false });
    this.fetchInfoUsager();
  };

  handleCloseModalModificationCoordonneeNonValideeModal = () => {
    this.setState({ showModalModificationCoordonneeNonValideeModal: false });
  };

  handleCloseModalDeclarationContactPersonneMorale = () => {
    this.setState({ showModalDeclarationContactPersonneMorale: false });
    this.fetchInfoUsager();
  };

  toggleModalModifierEtatCivilModal = () => {
    this.setState({
      showModalModifierEtatCivilModal: !this.state
        .showModalModifierEtatCivilModal,
    });
  };

  toggleModalModificationCoordonnee = () => {
    this.setState({
      showModalModificationCoordonnee: !this.state
        .showModalModificationCoordonnee,
    });
  };

  toggleModalDeclarationNewEngin = () => {
    if (
      this.state.personneMorale != null &&
      this.state.personneMorale?.usager == null
    ) {
      this.toggleModalContactNonExistant();
    } else {
      this.setState({
        showModalDeclarationNewEngin: !this.state.showModalDeclarationNewEngin,
      });
    }
  };

  handleCloseModalContactNonExistantModal = () => {
    this.setState({
      showModalContactNonExistantModal: false,
    });
  };

  toggleModalContactNonExistant = () => {
    this.setState({
      showModalContactNonExistantModal: !this.state
        .showModalContactNonExistantModal,
    });
  };

  toggleModalModificationCoordonneeNonValideeModal = () => {
    this.setState({
      showModalModificationCoordonneeNonValideeModal: !this.state
        .showModalModificationCoordonneeNonValideeModal,
    });
  };

  toggleModalDeclarationContactPersonneMorale = () => {
    this.setState({
      showModalDeclarationContactPersonneMorale: !this.state
        .showModalDeclarationContactPersonneMorale,
    });
  };

  handleClickCoordonnee = () => {
    if (this.props.match.params.type === "1") {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MODIFICATION_COORDONNEE_NON_VALIDEE_PERSONNE_PHYSIQUE}/${this.props.match.params.id}`
        )
        .then((response) => {
          if (response.data) {
            this.toggleModalModificationCoordonneeNonValideeModal();
          } else {
            this.toggleModalModificationCoordonnee();
          }
        });
    } else {
      if (this.state.personneMorale.usager == null) {
        this.toggleModalContactNonExistant();
      } else {
        axios
          .get(
            `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MODIFICATION_COORDONNEE_NON_VALIDEE_PERSONNE_MORALE}/${this.props.match.params.id}`
          )
          .then((response) => {
            if (response.data) {
              this.toggleModalModificationCoordonneeNonValideeModal();
            } else {
              this.toggleModalModificationCoordonnee();
            }
          });
      }
    }
  };

  sendTrace = () => {
    const { roles, idRIO, service } = this.context;
    let roleId = 1;
    if (roles.includes("agent")) {
      roleId = 2;
    }

    let trace = {
      profilUtilisateurId: roleId,
      typeId: 1,
      demandeId: null,
      enginId: null,
      identifiantUsagerId: this.state.personnePhysique?.usager
        ? this.state.personnePhysique.usager.identifiantUsagerId
        : this.state.personneMorale?.usager?.identifiantUsagerId,
      personneMoraleId: this.state.personneMorale?.personneMoraleId,
      personnePhysiqueId: this.state.personnePhysique?.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    axios.post(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
      trace
    );
  };

  render() {
    let prenom = this.state.personnePhysique?.prenom?.toLowerCase();
    let prenomFormatted = prenom?.charAt(0).toUpperCase() + prenom?.slice(1);
    let personneMoraleOuPersonePhysique =
      this.state.personneMorale === null
        ? prenomFormatted + " " + this.state.personnePhysique?.nomNaissance
        : this.state.personneMorale?.denominationRaisonSociale;

    return (
      <LoginContext.Consumer>
        {({ roles }) => {
          return (
            <div>
              <Row>
                <Col xs={10}>
                  <h1 className="main-title">
                    {personneMoraleOuPersonePhysique}
                  </h1>
                </Col>

                <Col className="positionIcon" xs={2}>
                  <div className="dropdown">
                    {roles.includes("agent") && (
                      <FontAwesomeIcon
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        size="3x"
                        icon={faFileSignature}
                      />
                    )}
                    <ul
                      className="dropdown-menu dropdown-menu-right borderBlue"
                      aria-labelledby="dropdownMenu"
                    >
                      {this.props.match.params.type === "1" ? (
                        <>
                          <li>
                            <a onClick={this.toggleModalModifierEtatCivilModal}>
                              <FontAwesomeIcon
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                size="1x"
                                icon={faCircle}
                                style={{ color: "#0841ac" }}
                              />{" "}
                              Modifier l’état civil
                            </a>
                          </li>
                          <ModifierEtatCivilModal
                            showModalModifierEtatCivilModal={
                              this.state.showModalModifierEtatCivilModal
                            }
                            handleCloseModalModifierEtatCivilModal={
                              this.handleCloseModalModifierEtatCivilModal
                            }
                            handleCloseModalEnregistrerModificationModal={
                              this.fetchInfoUsager
                            }
                            objPersonne={this.state.personnePhysique}
                          />
                        </>
                      ) : (
                        <>
                          <li>
                            <a
                              onClick={
                                this.toggleModalDeclarationContactPersonneMorale
                              }
                            >
                              <FontAwesomeIcon
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                size="1x"
                                icon={faCircle}
                                style={{ color: "#0841ac" }}
                              />{" "}
                              Déclarer un contact de la personne morale
                            </a>
                          </li>
                          <DeclarationContactPersonneMorale
                            showModalDeclarationContactPersonneMorale={
                              this.state
                                .showModalDeclarationContactPersonneMorale
                            }
                            handleCloseModalDeclarationContactPersonneMorale={
                              this
                                .handleCloseModalDeclarationContactPersonneMorale
                            }
                            objPersonne={this.state.personneMorale}
                            fetchInfoUsager={this.fetchInfoUsager}
                          />
                        </>
                      )}

                      <li>
                        <a onClick={this.handleClickCoordonnee}>
                          <FontAwesomeIcon
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            size="1x"
                            icon={faCircle}
                            style={{ color: "#0841ac" }}
                          />{" "}
                          Modifier les coordonnées
                        </a>
                      </li>
                      <ModificationCoordonneeModal
                        showModalModificationCoordonnee={
                          this.state.showModalModificationCoordonnee
                        }
                        handleCloseModalModificationCoordonnee={
                          this.handleCloseModalModificationCoordonnee
                        }
                        typePersonne={
                          this.state.personneMorale == null
                            ? "Physique"
                            : "Morale"
                        }
                        objPersonne={
                          this.state.personneMorale == null
                            ? this.state.personnePhysique
                            : this.state.personneMorale
                        }
                      />
                      <ModificationCoordonneeNonValideeModal
                        showModalModificationCoordonneeNonValideeModal={
                          this.state
                            .showModalModificationCoordonneeNonValideeModal
                        }
                        handleCloseModalModificationCoordonneeNonValideeModal={
                          this
                            .handleCloseModalModificationCoordonneeNonValideeModal
                        }
                      />
                      <ContactNonExistantModal
                        showModalContactNonExistantModal={
                          this.state.showModalContactNonExistantModal
                        }
                        handleCloseModalContactNonExistantModal={
                          this.handleCloseModalContactNonExistantModal
                        }
                      />
                      <li>
                        <a onClick={this.toggleModalDeclarationNewEngin}>
                          <FontAwesomeIcon
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            size="1x"
                            icon={faCircle}
                            style={{ color: "#0841ac" }}
                          />{" "}
                          Déclarer un nouvel engin
                        </a>
                      </li>
                      <DeclarationNewEnginModal
                        showModalDeclarationNewEngin={
                          this.state.showModalDeclarationNewEngin
                        }
                        handleCloseModalDeclarationNewEngin={
                          this.handleCloseModalDeclarationNewEngin
                        }
                        typePersonne={
                          this.state.personneMorale == null
                            ? "Physique"
                            : "Morale"
                        }
                        objPersonne={
                          this.state.personneMorale == null
                            ? this.state.personnePhysique
                            : this.state.personneMorale
                        }
                      />
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12} className="col-equal">
                  {this.state.personneMorale === null ? (
                    <IdentitePersonnePhysique
                      personnePhysique={this.state.personnePhysique}
                    />
                  ) : (
                    <IdentitePersonneMorale
                      personneMorale={this.state.personneMorale}
                    />
                  )}
                </Col>
              </Row>

              <Row className="equal">
                <Col xs={12} md={6} className="col-equal">
                  {this.state.personneMorale == null ? (
                    <CoordonneePersonnePhysique
                      personnePhysique={this.state.personnePhysique}
                    />
                  ) : (
                    <CoordonneePersonneMorale
                      personneMorale={this.state.personneMorale}
                    />
                  )}
                </Col>
                <Col xs={12} md={6} className="col-equal">
                  {this.state.personneMorale == null ? (
                    <EnginsUsager engins={this.state.personnePhysique.engins} />
                  ) : (
                    <EnginsUsager engins={this.state.personneMorale.engins} />
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12} className="col-equal">
                  {this.state.personneMorale == null ? (
                    <HistoriqueDemandesUsager
                      demandes={this.state.demandesPersonnePhysique}
                    />
                  ) : (
                    <HistoriqueDemandesUsager
                      demandes={this.state.demandesPersonneMorale}
                    />
                  )}
                </Col>
              </Row>
            </div>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

export default FicheUsager;
