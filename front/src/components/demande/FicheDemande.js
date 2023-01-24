import React, { Component } from "react";
import Detail from "./Detail";
import PieceJointe from "./PieceJointe";
import Notes from "./Notes";
import IdentitePersonnePhysique from "./IdentitePersonnePhysique";
import IdentitePersonneMorale from "./IdentitePersonneMorale";
import AdressePersonnePhysique from "./AdressePersonnePhysique";
import CaracteristiquesEngin from "./CaracteristiquesEngin";
import RejetDemande from "./RejetDemande";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import "../../static/css/demande-styles.css";
import { Button, Col, Row } from "react-bootstrap";
import AdressePersonneMorale from "./AdressePersonneMorale";
import * as constantes from "../util/DemandeObject";
import { Loader } from "react-overlay-loader";
import _ from "lodash";
import VisualiserAttestations from "./VisualiserAttestations";
import { LoginContext } from "../util/LoginContext";
import ModificationDemande from "./ModificationDemande";

class FicheDemande extends Component {
  static contextType = LoginContext;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.ref_motifs_rejet = JSON.parse(
      localStorage.getItem("ref_motifs_rejet")
    );
    this.ref_couleurs = JSON.parse(localStorage.getItem("ref_couleurs"));
    this.ref_marques = JSON.parse(localStorage.getItem("ref_marques"));
    this.ref_types_engin = JSON.parse(localStorage.getItem("ref_types_engin"));
    this.state = {
      demande: constantes.DEMANDE,
      loading: false,
      engin: {
        typeEngin: {},
        marque: {},
        couleurDominante: {},
        statutEngin: {},
      },
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.location.aboutProps?.name === "reload") {
      window.location.reload();
    }

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_DEMANDE_URL}/${this.props.match.params.id}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ demande: response.data }, () => {
            this.findPersonneMoraleAndEngin();
            this.sendTrace();
          });
        }
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.callBack();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      demandeId: this.state.demande.demandeId,
      enginId: this.state.engin?.enginId,
      identifiantUsagerId: this.state.demande.identifiantUsagerId,
      personneMoraleId: this.state.demande.usager.personneMoraleId,
      personnePhysiqueId: this.state.demande.usager.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    axios.post(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
      trace
    );
  };

  findPersonneMoraleAndEngin = () => {
    if (
      this.state.demande.contenuDemande.numeroRna != null ||
      this.state.demande.contenuDemande.numeroSiret != null
    ) {
      let numero;
      let type;
      let numeroRna = this.state.demande.contenuDemande.numeroRna;
      let numeroSiret = this.state.demande.contenuDemande.numeroSiret;
      if (numeroRna != null) {
        numero = numeroRna;
        type = "RNA";
      }
      if (numeroSiret != null) {
        numero = numeroSiret;
        type = "SIRET";
      }

      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_MORALE_FICHE_DEMANDE_URL}/${numero}/${type}`
        )
        .then((response) => {
          if (this._isMounted) {
            this.setState({ personneMorale: response.data });
          }
        });
    }

    if (this.state.demande.contenuDemande.engin?.numeroIdentification != null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ENGIN_URL}/${this.state.demande.contenuDemande.engin.numeroIdentification}`
        )
        .then((response) => {
          if (this._isMounted) {
            this.setState({ engin: response.data });
          }
        });
    }
  };

  validateRefuseDemande = (motifRejet, rejetAutre) => {
    const { idRIO, service } = this.context;
    let typeTrace;

    let demande = this.state.demande;
    demande.statutDemandeId = 5;
    typeTrace = 2;

    if (motifRejet != null) {
      demande.statutDemandeId = 6;
      typeTrace = 3;

      this.ref_motifs_rejet.forEach((e) => {
        if (motifRejet === e.libelleLong) {
          demande.motifRejetId = e.motifRejetId;
        }
      });
    }

    let request = {
      demande: {},
      rejetAutre: "",
    };
    request.demande = demande;
    request.rejetAutre = rejetAutre;

    this.setState({ loading: true });
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_VALIDATE_REFUSE_DEMANDE_URL}`,
        request
      )
      .then((res) => {
        this.setState({
          loading: false,
        });
        this.alertSuccess("Action enregistrée");
        setTimeout(() => window.location.reload(), 1500);
      })
      .catch(() => {
        this.setState({ loading: false });
        this.alertFail("Action non enregistrée");
        setTimeout(() => window.location.reload(), 1500);
      });

    let trace = {
      profilUtilisateurId: 2,
      typeId: typeTrace,
      demandeId: this.state.demande.demandeId,
      enginId: this.state.engin?.enginId,
      identifiantUsagerId: this.state.demande.identifiantUsagerId,
      personneMoraleId: this.state.demande.usager.personneMoraleId,
      personnePhysiqueId: this.state.demande.usager.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    axios.post(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
      trace
    );
  };

  callBack = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_DEMANDE_URL}/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ demande: response.data }, () =>
          this.findPersonneMoraleAndEngin()
        );
      });
  };

  alertSuccess = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message}</strong>
          </div>
        </div>
      ),
      type: "success",
      autoDismiss: 3,
    };
    this.refs.notify.notificationAlert(options);
  };

  alertFail = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message} </strong>
          </div>
        </div>
      ),
      type: "danger",
      autoDismiss: 3,
    };

    this.refs.notify.notificationAlert(options);
  };

  getAttestation = (id) => {
    axios({
      url: `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ATTESTATION_URL}/${id}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      if (
        response.data.type === "image/jpeg" ||
        response.data.type === "image/png" ||
        response.data.type === "application/pdf"
      ) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "attestation_" +
            id +
            "." +
            response.data.type.substring(response.data.type.indexOf("/") + 1)
        );
        document.body.appendChild(link);
        link.click();
      }
    });
  };

  render() {
    const { roles } = this.context;

    return (
      <div>
        <Loader fullPage loading={this.state.loading} />
        <div>
          <NotificationAlert ref="notify" />
        </div>

        <Row>
          <Col xs={10}>
            <h1 className="main-title" value={this.state.demande.demandeId}>
              Demande N° {this.state.demande.numeroDemande}
            </h1>
          </Col>

          {roles.includes("agent") &&
          (this.state.demande.statutDemandeId === 1 ||
            this.state.demande.statutDemandeId === 2 ||
            this.state.demande.statutDemandeId === 3 ||
            this.state.demande.statutDemandeId === 4) ? (
            <Col xs={2} className="positionIcon">
              <ModificationDemande
                callBack={this.callBack}
                engin={this.state.engin}
                personneMorale={this.state.personneMorale}
                ref_couleurs={this.ref_couleurs}
                ref_marques={this.ref_marques}
                ref_types_engin={this.ref_types_engin}
                demande={this.state.demande}
              />
            </Col>
          ) : null}
        </Row>

        <Row className="equal">
          <Col xs={12} md={6} className="col-equal">
            <Detail demande={this.state.demande} />
          </Col>
          <Col xs={12} md={6} className="col-equal">
            <PieceJointe
              demande={this.state.demande}
              callBack={this.callBack}
              engin={this.state.engin}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            {this.state.demande.contenuDemande.typeProprietaire === 1 ? (
              <IdentitePersonnePhysique demande={this.state.demande} />
            ) : (
              <IdentitePersonneMorale
                personneMorale={this.state.personneMorale}
                demande={this.state.demande}
              />
            )}
          </Col>
        </Row>

        <Row>
          {_.isEmpty(this.state.demande.contenuDemande.engin) ? (
            <Col sm={12}>
              {this.state.demande.contenuDemande.typeProprietaire === 1 ? (
                <AdressePersonnePhysique demande={this.state.demande} />
              ) : (
                <AdressePersonneMorale
                  personneMorale={this.state.personneMorale}
                  demande={this.state.demande}
                />
              )}
            </Col>
          ) : (
            <div className="equal">
              <Col xs={12} md={6} className="col-equal">
                {this.state.demande.contenuDemande.typeProprietaire === 1 ? (
                  <AdressePersonnePhysique demande={this.state.demande} />
                ) : (
                  <AdressePersonneMorale
                    personneMorale={this.state.personneMorale}
                    demande={this.state.demande}
                  />
                )}
              </Col>
              <Col xs={12} md={6} className="col-equal">
                <CaracteristiquesEngin
                  demande={this.state.demande}
                  engin={this.state.engin}
                  ref_couleurs={this.ref_couleurs}
                  ref_marques={this.ref_marques}
                  ref_types_engin={this.ref_types_engin}
                />
              </Col>
            </div>
          )}
        </Row>

        <Row>
          <Col sm={12}>
            <Notes
              demande={this.state.demande}
              engin={this.state.engin}
              callBack={this.callBack}
            />
          </Col>
        </Row>

        {(this.state.demande.statutDemandeId === 1 ||
          this.state.demande.statutDemandeId === 2 ||
          this.state.demande.statutDemandeId === 3 ||
          this.state.demande.statutDemandeId === 4) &&
        !this.state.edit &&
        roles.includes("agent") ? (
          <Row>
            <Col xs={12}>
              <Button
                bsStyle="success"
                bsSize="small"
                className="buttons-demande"
                onClick={() => this.validateRefuseDemande()}
              >
                Valider la demande
              </Button>

              <RejetDemande
                validateRefuseDemande={this.validateRefuseDemande}
                demande={this.state.demande}
              />
            </Col>
          </Row>
        ) : this.state.demande.statutDemandeId === 5 &&
          this.state.demande.attestations.length === 1 &&
          this.state.demande.attestations[0].active ? (
          <a
            className="attestation"
            onClick={() =>
              this.getAttestation(
                this.state.demande.attestations[0].attestationId
              )
            }
          >
            Visualiser l'attestation
          </a>
        ) : this.state.demande.statutDemandeId === 5 &&
          this.state.demande.attestations.length > 1 ? (
          <VisualiserAttestations
            attestations={this.state.demande.attestations}
          />
        ) : null}
      </div>
    );
  }
}

export default FicheDemande;
