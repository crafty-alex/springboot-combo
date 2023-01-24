import React, { Component } from "react";
import "../../static/css/accueil-styles.css";
import axios from "axios";
import { Col, Panel, Row } from "react-bootstrap";

class Accueil extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_EN_COURS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ totalEnCours: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_OLDEST_DEMANDE_EN_COURS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ oldestEnCours: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_SOUMISES_TRAITER}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ soumisesAtraiter: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_ATTENTE_USAGER}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ attenteUsager: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_A_VALIDER}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ aValider: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_AGENT_JOUR}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesAgentJour: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_AGENT_SEMAINE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesAgentSemaine: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_AGENT_MOIS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesAgentMois: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_AGENT_ANNEE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesAgentAnnee: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_SYSTEME_JOUR}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesSystemeJour: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_SYSTEME_SEMAINE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesSystemeSemaine: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_SYSTEME_MOIS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesSystemeMois: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_VALIDEES_SYSTEME_ANNEE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ valideesSystemeAnnee: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_AGENT_JOUR}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesAgentJour: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_AGENT_SEMAINE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesAgentSemaine: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_AGENT_MOIS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesAgentMois: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_AGENT_ANNEE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesAgentAnnee: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_SYSTEME_JOUR}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesSystemeJour: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_SYSTEME_SEMAINE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesSystemeSemaine: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_SYSTEME_MOIS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesSystemeMois: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_REFUSEES_SYSTEME_ANNEE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ refuseesSystemeAnnee: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_TRAITEES_JOUR}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ traiteesJour: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_TRAITEES_SEMAINE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ traiteesSemaine: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_TRAITEES_MOIS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ traiteesMois: response.data });
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMBER_DEMANDES_TRAITEES_ANNEE}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ traiteesAnnee: response.data });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <Panel className="stat-accueil">
          <Panel.Heading>
            <Panel.Title>Demandes à traiter</Panel.Title>
          </Panel.Heading>
          <hr className="divider stat-accueil" />
          <Panel.Body>
            <Row>
              <Col xs={6}>
                <b>TOTAL : </b>
                {this.state.totalEnCours}
              </Col>
              <Col xs={6}>
                <b>Soumise ou A traiter : </b>
                {this.state.soumisesAtraiter}
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={6}>
                <b>En attente retour usager : </b>
                {this.state.attenteUsager}
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <b>Plus ancienne demande : </b>
                {this.state.oldestEnCours}
              </Col>
              <Col xs={6}>
                <b>A valider : </b>
                {this.state.aValider}
              </Col>
            </Row>
          </Panel.Body>
        </Panel>

        <Panel className="stat-accueil">
          <Panel.Heading>
            <Panel.Title>Récapitulatif</Panel.Title>
          </Panel.Heading>
          <hr className="divider stat-accueil" />
          <Panel.Body>
            <Row>
              <Col xsOffset={3} xs={2}>
                <b>Ce jour</b>
              </Col>
              <Col xs={2}>
                <b>Cette semaine</b>
              </Col>
              <Col xs={2}>
                <b>Ce mois</b>
              </Col>
              <Col xs={2}>
                <b>Cette année</b>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <b>Validées Agent</b>
              </Col>
              <Col xs={2}>{this.state.valideesAgentJour}</Col>
              <Col xs={2}>{this.state.valideesAgentSemaine}</Col>
              <Col xs={2}>{this.state.valideesAgentMois}</Col>
              <Col xs={2}>{this.state.valideesAgentAnnee}</Col>
            </Row>
            <Row>
              <Col xs={3}>
                <b>Validées Système</b>
              </Col>
              <Col xs={2}>{this.state.valideesSystemeJour}</Col>
              <Col xs={2}>{this.state.valideesSystemeSemaine}</Col>
              <Col xs={2}>{this.state.valideesSystemeMois}</Col>
              <Col xs={2}>{this.state.valideesSystemeAnnee}</Col>
            </Row>
            <Row>
              <Col xs={3}>
                <b>Refusées Agent</b>
              </Col>
              <Col xs={2}>{this.state.refuseesAgentJour}</Col>
              <Col xs={2}>{this.state.refuseesAgentSemaine}</Col>
              <Col xs={2}>{this.state.refuseesAgentMois}</Col>
              <Col xs={2}>{this.state.refuseesAgentAnnee}</Col>
            </Row>
            <Row>
              <Col xs={3}>
                <b>Refusées Système</b>
              </Col>
              <Col xs={2}>{this.state.refuseesSystemeJour}</Col>
              <Col xs={2}>{this.state.refuseesSystemeSemaine}</Col>
              <Col xs={2}>{this.state.refuseesSystemeMois}</Col>
              <Col xs={2}>{this.state.refuseesSystemeAnnee}</Col>
            </Row>
            <Row>
              <Col xs={3}>
                <b>TOTAL Traitées</b>
              </Col>
              <Col xs={2}>{this.state.traiteesJour}</Col>
              <Col xs={2}>{this.state.traiteesSemaine}</Col>
              <Col xs={2}>{this.state.traiteesMois}</Col>
              <Col xs={2}>{this.state.traiteesAnnee}</Col>
            </Row>
          </Panel.Body>
        </Panel>
      </>
    );
  }
}

export default Accueil;
