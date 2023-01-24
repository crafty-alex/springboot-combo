import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import "react-notification-alert/dist/animate.css";
import "../../static/css/form-styles.css";
import NotificationAlert from "react-notification-alert";
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { LoginContext } from "../util/LoginContext";
import Datetime from "react-datetime";

export default class SearchDemandesTraitees extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_motifs_demande = JSON.parse(
      localStorage.getItem("ref_motifs_demande")
    );
    this.ref_types_traitement = JSON.parse(
      localStorage.getItem("ref_types_traitement")
    );
    this.state = {
      numeroDemande: "",
      prenomUsager: "",
      nomUsager: "",
      dateSoumission: null,
      dateTraitement: null,
      motifDemande: "Tout afficher",
      typeTraitement: "Tout afficher",
      denominationSociale: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDateSoumission = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");

    let formatted =
      localeDateString?.split("/")[2] +
      "-" +
      localeDateString?.split("/")[1] +
      "-" +
      localeDateString?.split("/")[0];

    this.setState({ dateSoumission: formatted });
  };

  handleChangeDateTraitement = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");

    let formatted =
      localeDateString?.split("/")[2] +
      "-" +
      localeDateString?.split("/")[1] +
      "-" +
      localeDateString?.split("/")[0];

    this.setState({ dateTraitement: formatted });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendTrace();

    let dateSoumissionFormatted = null;
    if (
      this.state.dateSoumission !== null &&
      this.state.dateSoumission !== "" &&
      this.state.dateSoumission !== "undefined-undefined-undefined"
    ) {
      dateSoumissionFormatted = moment(this.state.dateSoumission).format(
        "DD/MM/YYYY"
      );
    }

    let dateTraitementFormatted = null;
    if (
      this.state.dateTraitement !== null &&
      this.state.dateTraitement !== "" &&
      this.state.dateTraitement !== "undefined-undefined-undefined"
    ) {
      dateTraitementFormatted = moment(this.state.dateTraitement).format(
        "DD/MM/YYYY"
      );
    }

    let data = {
      numeroDemande: "",
      nomUsager: "",
      prenomUsager: "",
      dateSoumission: dateSoumissionFormatted,
      dateTraitement: dateTraitementFormatted,
      motifDemandeId: "",
      typeTraitementId: "",
      denominationSociale: "",
      page: 0,
    };

    if (this.state.numeroDemande !== "") {
      data.numeroDemande = this.state.numeroDemande.toUpperCase();
    }
    if (this.state.prenomUsager !== "") {
      data.prenomUsager = this.state.prenomUsager.toUpperCase();
    }
    if (this.state.nomUsager !== "") {
      data.nomUsager = this.state.nomUsager.toUpperCase();
    }
    if (this.state.denominationSociale !== "") {
      data.denominationSociale = this.state.denominationSociale.toUpperCase();
    }

    if (this.state.motifDemande !== "Tout afficher") {
      this.ref_motifs_demande.forEach((e) => {
        if (this.state.motifDemande === e.libelleLong) {
          data.motifDemandeId = e.motifDemandeId;
        }
      });
    }

    if (this.state.typeTraitement !== "Tout afficher") {
      this.ref_types_traitement.forEach((e) => {
        if (this.state.typeTraitement === e.libelleLong) {
          data.typeTraitementId = e.typeTraitementId;
        }
      });
    }

    this.props.showLoading();
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_DEMANDES_TRAITEES_URL}`,
        data
      )
      .then((response) => {
        this.props.showCustomDemandesList(response.data, data);
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide");
        this.props.showError();
      });
  };

  sendTrace = () => {
    const { roles, idRIO, service } = this.context;
    let roleId = 1;
    if (roles.includes("agent")) {
      roleId = 2;
    }

    let trace = {
      profilUtilisateurId: roleId,
      typeId: 6,
      demandeId: null,
      enginId: null,
      identifiantUsagerId: null,
      personneMoraleId: null,
      personnePhysiqueId: null,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    axios.post(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
      trace
    );
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

  checkPrenom = (event) => {
    if (!event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStylePrenom: "invalidInput",
      });
    } else {
      this.setState({
        inputStylePrenom: "",
      });
    }
  };

  checkNom = (event) => {
    if (!event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleNom: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNom: "",
      });
    }
  };

  checkDateSoumission = (e) => {
    let formatted = e._d?.toLocaleDateString("fr-FR");
    let formatted2 =
      formatted?.split("/")[1] +
      "/" +
      formatted?.split("/")[0] +
      "/" +
      formatted?.split("/")[2];
    let date = moment.utc(formatted2);
    let dateToday = new Date();
    if (date.toDate() > dateToday || (!date._isValid && e !== "")) {
      this.setState({
        inputStyleDateSoumission: "invalidInput",
      });
      this.alertFail(
        "La date doit être valide et inférieure ou égale à la date du jour"
      );
    } else {
      this.setState({
        inputStyleDateSoumission: "",
      });
    }
  };

  checkDateTraitement = (e) => {
    let formatted = e._d?.toLocaleDateString("fr-FR");
    let formatted2 =
      formatted?.split("/")[1] +
      "/" +
      formatted?.split("/")[0] +
      "/" +
      formatted?.split("/")[2];
    let date = moment.utc(formatted2);
    let dateToday = new Date();
    if (date.toDate() > dateToday || (!date._isValid && e !== "")) {
      this.setState({
        inputStyleDateTraitement: "invalidInput",
      });
      this.alertFail(
        "La date doit être valide et inférieure ou égale à la date du jour"
      );
    } else {
      this.setState({
        inputStyleDateTraitement: "",
      });
    }
  };

  checkNumero = (event) => {
    if (
      event.target.value.length > 12 ||
      !event.target.value.match(/^([0-9a-zA-Z])*$/)
    ) {
      this.setState({
        inputStyleNumero: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumero: "",
      });
    }
  };

  isValidDate = (event) => {
    return event <= new Date();
  };

  render() {
    return (
      <>
        <div>
          <NotificationAlert ref="notify" />
        </div>

        <form className="form" onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>N° DE LA DEMANDE</ControlLabel>
                <FormControl
                  value={this.state.numeroDemande}
                  type="text"
                  name="numeroDemande"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNumero}`}
                  onBlur={this.checkNumero}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={4}>
              <ControlLabel>DATE DE CRÉATION</ControlLabel>
              <FormGroup>
                <Datetime
                  onChange={this.handleChangeDateSoumission}
                  value={this.state.dateSoumission}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDateSoumission}`}
                  onClose={this.checkDateSoumission}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={4}>
              <ControlLabel>DATE DE TRAITEMENT</ControlLabel>
              <FormGroup>
                <Datetime
                  onChange={this.handleChangeDateTraitement}
                  value={this.state.dateTraitement}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDateTraitement}`}
                  onClose={this.checkDateTraitement}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>MOTIF DE DEMANDE</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.motifDemande}
                  type="text"
                  name="motifDemande"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_motifs_demande != null &&
                    this.ref_motifs_demande.map((m, index) => (
                      <option key={index}>{m.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>NATURE DE TRAITEMENT</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.typeTraitement}
                  type="text"
                  name="typeTraitement"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_types_traitement != null &&
                    this.ref_types_traitement.map((m, index) => (
                      <option key={index}>{m.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>DENOMINATION SOCIALE</ControlLabel>
                <FormControl
                  value={this.state.denominationSociale}
                  type="text"
                  name="denominationSociale"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>NOM DE L' USAGER</ControlLabel>
                <FormControl
                  value={this.state.nomUsager}
                  type="text"
                  name="nomUsager"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNom}`}
                  onBlur={this.checkNom}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>PRÉNOM(S) DE L' USAGER</ControlLabel>
                <FormControl
                  value={this.state.prenomUsager}
                  type="text"
                  name="prenomUsager"
                  onChange={this.handleChange}
                  className={`${this.state.inputStylePrenom}`}
                  onBlur={this.checkPrenom}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                bsSize="small"
                bsStyle="info"
                className="button-search-demande"
                type="submit"
              >
                Rechercher
              </Button>
            </Col>
          </Row>
        </form>
      </>
    );
  }
}
