import React, { Component } from "react";
import CaracteristiquesEngin from "./CaracteristiquesEngin";
import "../../static/css/demande-styles.css";
import "../../static/css/engin-styles.css";
import axios from "axios";
import { faCircle, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import SituationAdministrative from "./SituationAdministrative";
import ProprietaireActuel from "./ProprietaireActuel";
import HistoriqueDemandesEngins from "./HistoriqueDemandesEngins";
import * as constantes from "../util/EnginObjet";
import { LoginContext } from "../util/LoginContext";
import DeclarationCessionModal from "./DeclarationCessionModal";
import CessionNonValideeModal from "./CessionNonValideeModal";
import CessionDejaValideeModal from "./CessionDejaValideeModal";
import DeclarationTitulaireNonValideeModal from "./DeclarationTitulaireNonValideeModal";
import DeclarationTitulaireCessionNonValideeModal from "./DeclarationTitulaireCessionNonValideeModal";
import DeclarationTitulairePasDeCessionModal from "./DeclarationTitulairePasDeCessionModal";
import DeclarationTitulaireModal from "./DeclarationTitulaireModal";
import ProprietaireNonExistantModal from "./ProprietaireNonExistantModal";
import DerniereDemandeDeclarationTitulaireNonValideeModal from "./DerniereDemandeDeclarationTitulaireNonValideeModal";
import ModificationCaracteristiquesNonValideeModal from "./ModificationCaracteristiquesNonValidee";
import ModificationCaracteristiquesModal from "./ModificationCaracteristiquesModal";
import ModificationSituationAdministrativeNonValideeModal from "./ModificationSituationAdministrativeNonValideeModal";
import ModificationSituationAdministrativeModal from "./ModificationSituationAdministrativeModal";

class FicheEngin extends Component {
  static contextType = LoginContext;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = constantes.ENGIN;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchEnginInfo();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.location.aboutProps?.name === "reload") {
      window.location.reload();
    }
    this.fetchEnginInfo();
  }

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
      enginId: this.state.engin.enginId,
      identifiantUsagerId: this.state.engin.personnePhysique?.usager
        ? this.state.engin.personnePhysique?.usager.identifiantUsagerId
        : this.state.engin.personneMorale?.usager.identifiantUsagerId,
      personneMoraleId: this.state.engin?.personneMoraleId,
      personnePhysiqueId: this.state.engin?.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    axios.post(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
      trace
    );
  };

  handleCloseModalDeclarationCession = () => {
    this.setState({ showModalDeclarationCession: false });
  };

  handleCloseModalCessionNonValideeModal = () => {
    this.setState({ showModalCessionNonValideeModal: false });
  };

  handleCloseModalCessionDejaValideeModal = () => {
    this.setState({ showModalCessionDejaValideeModal: false });
  };

  handleCloseModalDeclarationTitulaireNonValideeModal = () => {
    this.setState({ showModalDeclarationTitulaireNonValideeModal: false });
  };

  handleCloseModalDeclarationTitulaireCessionNonValideeModal = () => {
    this.setState({
      showModalDeclarationTitulaireCessionNonValideeModal: false,
    });
  };

  handleCloseModalDeclarationTitulaireModal = () => {
    this.setState({ showModalDeclarationTitulaireModal: false });
  };

  handleCloseModalDeclarationTitulairePasDeCessionModal = () => {
    this.setState({ showModalDeclarationTitulairePasDeCessionModal: false });
  };

  handleCloseModalDerniereDemandeDeclarationTitulaireNonValideeModal = () => {
    this.setState({
      showModalDerniereDemandeDeclarationTitulaireNonValideeModal: false,
    });
  };

  handleCloseModalModificationCaracteristiquesNonValideeModal = () => {
    this.setState({
      showModalModificationCaracteristiquesNonValideeModal: false,
    });
  };

  handleCloseModalModificationCaracteristiquesModal = () => {
    this.setState({
      showModalModificationCaracteristiquesModal: false,
    });
  };

  handleCloseModalModificationSituationAdministrativeNonValideeModal = () => {
    this.setState({
      showModalModificationSituationAdministrativeNonValideeModal: false,
    });
  };

  handleCloseModalModificationSituationAdministrativeModal = () => {
    this.setState({
      showModalModificationSituationAdministrativeModal: false,
    });
  };

  handleCloseModalProprietaireNonExistantModal = () => {
    this.setState({
      showModalProprietaireNonExistantModal: false,
    });
  };

  toggleModalDeclarationCession = () => {
    this.setState({
      showModalDeclarationCession: !this.state.showModalDeclarationCession,
    });
  };

  toggleModalCessionNonValideeModal = () => {
    this.setState({
      showModalCessionNonValideeModal: !this.state
        .showModalCessionNonValideeModal,
    });
  };

  toggleModalCessionDejaValideeModal = () => {
    this.setState({
      showModalCessionDejaValideeModal: !this.state
        .showModalCessionDejaValideeModal,
    });
  };

  toggleModalDeclarationTitulaireNonValideeModal = () => {
    this.setState({
      showModalDeclarationTitulaireNonValideeModal: !this.state
        .showModalDeclarationTitulaireNonValideeModal,
    });
  };

  toggleModalDeclarationTitulaireCessionNonValideeModal = () => {
    this.setState({
      showModalDeclarationTitulaireCessionNonValideeModal: !this.state
        .showModalDeclarationTitulaireCessionNonValideeModal,
    });
  };

  toggleModalDeclarationTitulaireModal = () => {
    this.setState({
      showModalDeclarationTitulaireModal: !this.state
        .showModalDeclarationTitulaireModal,
    });
  };

  toggleModalDeclarationTitulairePasDeCessionModal = () => {
    this.setState({
      showModalDeclarationTitulairePasDeCessionModal: !this.state
        .showModalDeclarationTitulairePasDeCessionModal,
    });
  };

  toggleModalFicheUsagerExistModal = () => {
    this.setState({
      showModalFicheUsagerExistModal: !this.state
        .showModalFicheUsagerExistModal,
    });
  };

  toggleModalDerniereDemandeDeclarationTitulaireNonValideeModal = () => {
    this.setState({
      showModalDerniereDemandeDeclarationTitulaireNonValideeModal: !this.state
        .showModalDerniereDemandeDeclarationTitulaireNonValideeModal,
    });
  };

  toggleModalModificationCaracteristiquesNonValideeModal = () => {
    this.setState({
      showModalModificationCaracteristiquesNonValideeModal: !this.state
        .showModalModificationCaracteristiquesNonValideeModal,
    });
  };

  toggleModalProprietaireNonExistant = () => {
    this.setState({
      showModalProprietaireNonExistantModal: !this.state
        .showModalProprietaireNonExistantModal,
    });
  };

  toggleModalModificationCaracteristiquesModal = () => {
    this.setState({
      showModalModificationCaracteristiquesModal: !this.state
        .showModalModificationCaracteristiquesModal,
    });
  };

  toggleModalModificationSituationAdministrativeNonValideeModal = () => {
    this.setState({
      showModalModificationSituationAdministrativeNonValideeModal: !this.state
        .showModalModificationSituationAdministrativeNonValideeModal,
    });
  };

  toggleModalModificationSituationAdministrativeModal = () => {
    this.setState({
      showModalModificationSituationAdministrativeModal: !this.state
        .showModalModificationSituationAdministrativeModal,
    });
  };

  toggleModalSuppressionPieceJointeModal = () => {
    this.setState({
      showModalSuppressionPieceJointeModal: !this.state
        .showModalSuppressionPieceJointeModal,
    });
  };

  handleClickCession = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CESSION_NON_VALIDEE}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data) {
          this.toggleModalCessionNonValideeModal();
        } else {
          axios
            .get(
              `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_DECLARATION_TITULAIRE_NON_VALIDEE_URL}/${this.props.match.params.id}`
            )
            .then((response) => {
              if (response.data) {
                this.toggleModalDerniereDemandeDeclarationTitulaireNonValideeModal();
              } else {
                axios
                  .get(
                    `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_LAST_DEMANDE_VALIDEE}/${this.props.match.params.id}`
                  )
                  .then((response) => {
                    if (response.data.motifDemandeId === 2) {
                      this.toggleModalCessionDejaValideeModal();
                    } else {
                      this.toggleModalDeclarationCession();
                    }
                  });
              }
            });
        }
      });
  };

  handleClickDeclarationTitulaire = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_DECLARATION_TITULAIRE_NON_VALIDEE_URL}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (response.data) {
          this.toggleModalDeclarationTitulaireNonValideeModal();
        } else {
          axios
            .get(
              `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CESSION_NON_VALIDEE}/${this.props.match.params.id}`
            )
            .then((response) => {
              if (response.data) {
                this.toggleModalDeclarationTitulaireCessionNonValideeModal();
              } else {
                axios
                  .get(
                    `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_LAST_DEMANDE_VALIDEE}/${this.props.match.params.id}`
                  )
                  .then((response) => {
                    if (response.data.motifDemandeId === 2) {
                      this.toggleModalDeclarationTitulaireModal();
                    } else {
                      this.toggleModalDeclarationTitulairePasDeCessionModal();
                    }
                  });
              }
            });
        }
      });
  };

  handleClickModificationCaracteristiques = () => {
    if (
      this.state.engin.personnePhysiqueId == null &&
      this.state.engin.personneMoraleId == null
    ) {
      this.toggleModalProprietaireNonExistant();
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MODIFICATION_CARACTERISTIQUES_NON_VALIDEE}/${this.props.match.params.id}`
        )
        .then((response) => {
          if (response.data) {
            this.toggleModalModificationCaracteristiquesNonValideeModal();
          } else {
            this.toggleModalModificationCaracteristiquesModal();
          }
        });
    }
  };

  handleClickModificationSituationAdministrative = () => {
    if (
      this.state.engin.personnePhysiqueId == null &&
      this.state.engin.personneMoraleId == null
    ) {
      this.toggleModalProprietaireNonExistant();
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MODIFICATION_SITUATION_ADMINISTRATIVE_NON_VALIDEE}/${this.props.match.params.id}`
        )
        .then((response) => {
          if (response.data) {
            this.toggleModalModificationSituationAdministrativeNonValideeModal();
          } else {
            this.toggleModalModificationSituationAdministrativeModal();
          }
        });
    }
  };

  fetchEnginInfo = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_LATEST_DEMANDE_VOL_DESTRUCTION_URL}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ demandeVolDestruction: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_LAST_DEMANDE_VALIDEE}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ latestDemande: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ENGIN_URL}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ engin: response.data }, () => this.sendTrace());
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_LATEST_DEMANDE_URL}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ dernieresDemandes: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_DEMANDES_BY_ENGIN_URL}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ demandes: response.data });
        }
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <LoginContext.Consumer>
        {({ roles }) => {
          return (
            <div>
              <Row>
                <Col xs={10}>
                  <h1 className="main-title">
                    Engin N° {this.state.engin.numeroIdentification}
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
                      <li>
                        <a onClick={this.handleClickCession}>
                          <FontAwesomeIcon
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            size="1x"
                            icon={faCircle}
                            style={{ color: "#0841ac" }}
                          />{" "}
                          Déclarer une cession
                        </a>
                      </li>
                      <DeclarationCessionModal
                        engin={this.state.engin}
                        fetchEnginInfo={this.fetchEnginInfo}
                        numeroIdentification={
                          this.state.engin.numeroIdentification
                        }
                        showModalDeclarationCession={
                          this.state.showModalDeclarationCession
                        }
                        handleCloseModalDeclarationCession={
                          this.handleCloseModalDeclarationCession
                        }
                      />
                      <CessionNonValideeModal
                        showModalCessionNonValideeModal={
                          this.state.showModalCessionNonValideeModal
                        }
                        handleCloseModalCessionNonValideeModal={
                          this.handleCloseModalCessionNonValideeModal
                        }
                      />
                      <CessionDejaValideeModal
                        showModalCessionDejaValideeModal={
                          this.state.showModalCessionDejaValideeModal
                        }
                        handleCloseModalCessionDejaValideeModal={
                          this.handleCloseModalCessionDejaValideeModal
                        }
                      />
                      <DerniereDemandeDeclarationTitulaireNonValideeModal
                        showModalDerniereDemandeDeclarationTitulaireNonValideeModal={
                          this.state
                            .showModalDerniereDemandeDeclarationTitulaireNonValideeModal
                        }
                        handleCloseModalDerniereDemandeDeclarationTitulaireNonValideeModal={
                          this
                            .handleCloseModalDerniereDemandeDeclarationTitulaireNonValideeModal
                        }
                      />

                      <li>
                        <a onClick={this.handleClickDeclarationTitulaire}>
                          <FontAwesomeIcon
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            size="1x"
                            icon={faCircle}
                            style={{ color: "#0841ac" }}
                          />{" "}
                          Déclarer un nouveau titulaire
                        </a>
                      </li>
                      <DeclarationTitulaireModal
                        engin={this.state.engin}
                        fetchEnginInfo={this.fetchEnginInfo}
                        numeroIdentification={
                          this.state.engin.numeroIdentification
                        }
                        showModalDeclarationTitulaireModal={
                          this.state.showModalDeclarationTitulaireModal
                        }
                        handleCloseModalDeclarationTitulaireModal={
                          this.handleCloseModalDeclarationTitulaireModal
                        }
                      />
                      <DeclarationTitulaireNonValideeModal
                        showModalDeclarationTitulaireNonValideeModal={
                          this.state
                            .showModalDeclarationTitulaireNonValideeModal
                        }
                        handleCloseModalDeclarationTitulaireNonValideeModal={
                          this
                            .handleCloseModalDeclarationTitulaireNonValideeModal
                        }
                      />
                      <DeclarationTitulaireCessionNonValideeModal
                        showModalDeclarationTitulaireCessionNonValideeModal={
                          this.state
                            .showModalDeclarationTitulaireCessionNonValideeModal
                        }
                        handleCloseModalDeclarationTitulaireCessionNonValideeModal={
                          this
                            .handleCloseModalDeclarationTitulaireCessionNonValideeModal
                        }
                      />

                      <DeclarationTitulairePasDeCessionModal
                        showModalDeclarationTitulairePasDeCessionModal={
                          this.state
                            .showModalDeclarationTitulairePasDeCessionModal
                        }
                        handleCloseModalDeclarationTitulairePasDeCessionModal={
                          this
                            .handleCloseModalDeclarationTitulairePasDeCessionModal
                        }
                      />

                      <li>
                        <a
                          onClick={this.handleClickModificationCaracteristiques}
                        >
                          <FontAwesomeIcon
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            size="1x"
                            icon={faCircle}
                            style={{ color: "#0841ac" }}
                          />{" "}
                          Modifier les caractéristiques
                        </a>
                      </li>
                      <ProprietaireNonExistantModal
                        showModalProprietaireNonExistantModal={
                          this.state.showModalProprietaireNonExistantModal
                        }
                        handleCloseModalProprietaireNonExistantModal={
                          this.handleCloseModalProprietaireNonExistantModal
                        }
                      />
                      <ModificationCaracteristiquesNonValideeModal
                        showModalModificationCaracteristiquesNonValideeModal={
                          this.state
                            .showModalModificationCaracteristiquesNonValideeModal
                        }
                        handleCloseModalModificationCaracteristiquesNonValideeModal={
                          this
                            .handleCloseModalModificationCaracteristiquesNonValideeModal
                        }
                      />

                      <ModificationCaracteristiquesModal
                        engin={this.state.engin}
                        fetchEnginInfo={this.fetchEnginInfo}
                        numeroIdentification={
                          this.state.engin.numeroIdentification
                        }
                        numeroSerieVin={this.state.engin.numeroSerieVin}
                        showModalModificationCaracteristiquesModal={
                          this.state.showModalModificationCaracteristiquesModal
                        }
                        handleCloseModalModificationCaracteristiquesModal={
                          this.handleCloseModalModificationCaracteristiquesModal
                        }
                      />

                      <li>
                        <a
                          onClick={
                            this.handleClickModificationSituationAdministrative
                          }
                        >
                          <FontAwesomeIcon
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            size="1x"
                            icon={faCircle}
                            style={{ color: "#0841ac" }}
                          />{" "}
                          Modifier la situation administrative
                        </a>
                      </li>
                      <ModificationSituationAdministrativeNonValideeModal
                        showModalModificationSituationAdministrativeNonValideeModal={
                          this.state
                            .showModalModificationSituationAdministrativeNonValideeModal
                        }
                        handleCloseModalModificationSituationAdministrativeNonValideeModal={
                          this
                            .handleCloseModalModificationSituationAdministrativeNonValideeModal
                        }
                      />

                      <ModificationSituationAdministrativeModal
                        engin={this.state.engin}
                        fetchEnginInfo={this.fetchEnginInfo}
                        numeroIdentification={
                          this.state.engin.numeroIdentification
                        }
                        numeroSerieVin={this.state.engin.numeroSerieVin}
                        showModalModificationSituationAdministrativeModal={
                          this.state
                            .showModalModificationSituationAdministrativeModal
                        }
                        handleCloseModalModificationSituationAdministrativeModal={
                          this
                            .handleCloseModalModificationSituationAdministrativeModal
                        }
                      />
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12} className="col-equal">
                  <CaracteristiquesEngin engin={this.state.engin} />
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12} className="col-equal">
                  <SituationAdministrative
                    engin={this.state.engin}
                    dernieresDemandes={this.state.dernieresDemandes}
                    demandeVolDestruction={this.state.demandeVolDestruction}
                    latestDemande={this.state.latestDemande}
                  />
                </Col>
              </Row>

              {this.state.engin.personnePhysique != null ||
              this.state.engin.personneMorale != null ? (
                <Row>
                  <Col xs={12} md={12} className="col-equal">
                    <ProprietaireActuel engin={this.state.engin} />
                  </Col>
                </Row>
              ) : null}

              <Row>
                <Col xs={12} md={12} className="col-equal">
                  <HistoriqueDemandesEngins demandes={this.state.demandes} />
                </Col>
              </Row>
            </div>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

export default FicheEngin;
