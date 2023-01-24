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

export default class SearchUsager extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      nom: "",
      prenom: "",
      denominationRaisonSociale: "",
      dateNaissance: null,
      numeroIdentification: "",
      numeroSerieVin: "",
      numeroVoie: "",
      nomVoie: "",
      codePostal: "",
      commune: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDate = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");

    let formatted =
      localeDateString?.split("/")[2] +
      "-" +
      localeDateString?.split("/")[1] +
      "-" +
      localeDateString?.split("/")[0];

    this.setState({ dateNaissance: formatted });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendTrace();

    let dateFormatted = null;
    if (
      this.state.dateNaissance !== null &&
      this.state.dateNaissance !== "" &&
      this.state.dateNaissance !== "undefined-undefined-undefined"
    ) {
      dateFormatted = moment(this.state.dateNaissance).format("DD/MM/YYYY");
    }

    let dataPersonnePhysique = {
      nomNaissance: "",
      prenom: "",
      dateNaissance: dateFormatted,
      numeroVoie: "",
      nomVoie: "",
      codePostal: "",
      commune: "",
      numeroIdentification: "",
      numeroSerieVin: "",
      page: 0,
    };

    if (this.state.denominationRaisonSociale !== "") {
      dataPersonnePhysique.nomNaissance = "NOT FOUND";
    }
    if (this.state.nom !== "") {
      dataPersonnePhysique.nomNaissance = this.state.nom.toUpperCase();
    }
    if (this.state.prenom !== "") {
      dataPersonnePhysique.prenom = this.state.prenom.toUpperCase();
    }
    if (this.state.numeroVoie !== "") {
      dataPersonnePhysique.numeroVoie = this.state.numeroVoie.toUpperCase();
    }

    if (this.state.nomVoie !== "") {
      dataPersonnePhysique.nomVoie = this.state.nomVoie.toUpperCase();
    }
    if (this.state.codePostal !== "") {
      dataPersonnePhysique.codePostal = this.state.codePostal;
    }
    if (this.state.commune !== "") {
      dataPersonnePhysique.commune = this.state.commune.toUpperCase();
    }
    if (this.state.numeroIdentification !== "") {
      dataPersonnePhysique.numeroIdentification = this.state.numeroIdentification;
    }
    if (this.state.numeroSerieVin !== "") {
      dataPersonnePhysique.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }

    let dataPersonneMorale = {
      nomRepresentant: "",
      prenomRepresentant: "",
      denominationRaisonSociale: "",
      numeroVoie: "",
      nomVoie: "",
      codePostal: "",
      commune: "",
      numeroIdentification: "",
      numeroSerieVin: "",
      page: 0,
    };

    if (
      this.state.dateNaissance !== null &&
      this.state.dateNaissance !== "undefined-undefined-undefined"
    ) {
      dataPersonneMorale.nomRepresentant = "NOT FOUND";
    }
    if (this.state.nom !== "") {
      dataPersonneMorale.nomRepresentant = this.state.nom.toUpperCase();
    }
    if (this.state.prenom !== "") {
      dataPersonneMorale.prenomRepresentant = this.state.prenom.toUpperCase();
    }
    if (this.state.denominationRaisonSociale !== "") {
      dataPersonneMorale.denominationRaisonSociale = this.state.denominationRaisonSociale.toUpperCase();
    }
    if (this.state.numeroVoie !== "") {
      dataPersonneMorale.numeroVoie = this.state.numeroVoie.toUpperCase();
    }
    if (this.state.nomVoie !== "") {
      dataPersonneMorale.nomVoie = this.state.nomVoie.toUpperCase();
    }
    if (this.state.codePostal !== "") {
      dataPersonneMorale.codePostal = this.state.codePostal;
    }
    if (this.state.commune !== "") {
      dataPersonneMorale.commune = this.state.commune.toUpperCase();
    }
    if (this.state.numeroIdentification !== "") {
      dataPersonneMorale.numeroIdentification = this.state.numeroIdentification;
    }
    if (this.state.numeroSerieVin !== "") {
      dataPersonneMorale.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }

    this.props.showLoading();

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_PERSONNE_PHYSIQUE_URL}`,
        dataPersonnePhysique
      )
      .then((response) => {
        this.props.showCustomPersonnePhysiqueList(
          response.data,
          dataPersonnePhysique
        );
      })
      .catch(() => {
        this.props.showErrorPersonnePhysique();
      });

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_PERSONNE_MORALE_URL}`,
        dataPersonneMorale
      )
      .then((response) => {
        this.props.showCustomPersonneMoraleList(
          response.data,
          dataPersonneMorale
        );
      })
      .catch(() => {
        this.props.showErrorPersonneMorale();
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

  checkDate = (e) => {
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
        inputStyleDate: "invalidInput",
      });
      this.alertFail(
        "La date doit être valide et inférieure ou égale à la date du jour"
      );
    } else {
      this.setState({
        inputStyleDate: "",
      });
    }
  };

  checkNumero = (event) => {
    if (event.target.value.length > 20 || event.target.value.match(/\s/g)) {
      this.setState({
        inputStyleNumero: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumero: "",
      });
    }
  };

  checkCodePostal = (event) => {
    if (
      event.target.value.length > 5 ||
      !event.target.value.match(/^([0-9])*$/)
    ) {
      this.setState({
        inputStyleCodePostal: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCodePostal: "",
      });
    }
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

  checkNumeroIdentification = (event) => {
    if (
      event.target.value.length > 6 ||
      !event.target.value.match(/^([0-9])*$/)
    ) {
      this.setState({
        inputStyleNumeroIdentification: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumeroIdentification: "",
      });
    }
  };

  checkNumeroVoie = (event) => {
    if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleNumeroVoie: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumeroVoie: "",
      });
    }
  };

  checkNomVoie = (event) => {
    if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleNomVoie: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNomVoie: "",
      });
    }
  };

  checkCommune = (event) => {
    if (!event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleCommune: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCommune: "",
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
                <ControlLabel>NOM USAGER</ControlLabel>
                <FormControl
                  value={this.state.nom}
                  type="text"
                  name="nom"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNom}`}
                  onBlur={this.checkNom}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>PRÉNOM(S) USAGER</ControlLabel>
                <FormControl
                  value={this.state.prenom}
                  type="text"
                  name="prenom"
                  onChange={this.handleChange}
                  className={`${this.state.inputStylePrenom}`}
                  onBlur={this.checkPrenom}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>DÉNOMINATION SOCIALE</ControlLabel>
                <FormControl
                  value={this.state.denominationRaisonSociale}
                  type="text"
                  name="denominationRaisonSociale"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <ControlLabel>DATE DE NAISSANCE</ControlLabel>
              <FormGroup>
                <Datetime
                  onChange={this.handleChangeDate}
                  value={this.state.dateNaissance}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDate}`}
                  onClose={this.checkDate}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>N° IDENTIFICATION</ControlLabel>
                <FormControl
                  value={this.state.numeroIdentification}
                  type="text"
                  name="numeroIdentification"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNumeroIdentification}`}
                  onBlur={this.checkNumeroIdentification}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>N° DE SÉRIE (VIN)</ControlLabel>
                <FormControl
                  value={this.state.numeroSerieVin}
                  type="text"
                  name="numeroSerieVin"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNumero}`}
                  onBlur={this.checkNumero}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>N° VOIE / EXTENSION</ControlLabel>
                <FormControl
                  value={this.state.numeroVoie}
                  type="text"
                  name="numeroVoie"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNumeroVoie}`}
                  onBlur={this.checkNumeroVoie}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>LIBELLÉ VOIE</ControlLabel>
                <FormControl
                  value={this.state.nomVoie}
                  type="text"
                  name="nomVoie"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNomVoie}`}
                  onBlur={this.checkNomVoie}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>CODE POSTAL</ControlLabel>
                <FormControl
                  value={this.state.codePostal}
                  type="text"
                  name="codePostal"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleCodePostal}`}
                  onBlur={this.checkCodePostal}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>COMMUNE</ControlLabel>
                <FormControl
                  value={this.state.commune}
                  type="text"
                  name="commune"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleCommune}`}
                  onBlur={this.checkCommune}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col className="button pull-right">
              <Button
                bsSize="small"
                bsStyle="info"
                className="button-search"
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
