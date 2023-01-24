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

export default class SearchAvancee extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      nom: "",
      prenom: "",
      denominationRaisonSociale: "",
      dateDemande: null,
      numeroIdentification: "",
      numeroSerieVin: "",
      numeroDemande: "",
      numeroSiret: "",
      echecSaisiePhysique: false,
      echecSaisieMorale: false,
      echecSaisieEngin: false,
      echecSaisieDemande: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendTrace();

    let dateFormatted = null;
    if (this.state.dateDemande !== null && this.state.dateDemande !== "") {
      dateFormatted = moment(this.state.dateDemande).format("DD/MM/YYYY");
    }

    let dataPersonnePhysique = {
      nomNaissance: "",
      prenom: "",
      numeroIdentification: "",
      numeroSerieVin: "",
      page: 0,
    };

    if (this.state.nom !== "") {
      dataPersonnePhysique.nomNaissance = this.state.nom.toUpperCase();
    }
    if (this.state.prenom !== "") {
      dataPersonnePhysique.prenom = this.state.prenom.toUpperCase();
    }
    if (this.state.numeroIdentification !== "") {
      dataPersonnePhysique.numeroIdentification = this.state.numeroIdentification;
    }
    if (this.state.numeroSerieVin !== "") {
      dataPersonnePhysique.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }
    if (this.state.denominationRaisonSociale !== "") {
      dataPersonnePhysique.nomNaissance = "NOT FOUND";
    }
    if (this.state.numeroSiret !== "") {
      dataPersonnePhysique.nomNaissance = "NOT FOUND";
    }
    if (this.state.numeroDemande !== "") {
      dataPersonnePhysique.nomNaissance = "NOT FOUND";
    }
    if (
      this.state.dateDemande !== null &&
      this.state.dateDemande !== "undefined-undefined-undefined"
    ) {
      dataPersonnePhysique.nomNaissance = "NOT FOUND";
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
      numeroSiretRna: "",
      page: 0,
    };

    if (this.state.nom !== "") {
      dataPersonneMorale.nomRepresentant = this.state.nom.toUpperCase();
    }
    if (this.state.prenom !== "") {
      dataPersonneMorale.prenomRepresentant = this.state.prenom.toUpperCase();
    }
    if (this.state.denominationRaisonSociale !== "") {
      dataPersonneMorale.denominationRaisonSociale = this.state.denominationRaisonSociale.toUpperCase();
    }
    if (this.state.numeroIdentification !== "") {
      dataPersonneMorale.numeroIdentification = this.state.numeroIdentification;
    }
    if (this.state.numeroSerieVin !== "") {
      dataPersonneMorale.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }
    if (this.state.numeroSiret !== "") {
      dataPersonneMorale.numeroSiretRna = this.state.numeroSiret.toUpperCase();
    }
    if (
      this.state.dateDemande !== null &&
      this.state.dateDemande !== "undefined-undefined-undefined"
    ) {
      dataPersonneMorale.denominationRaisonSociale = "NOT FOUND";
    }
    if (this.state.numeroDemande !== "") {
      dataPersonneMorale.denominationRaisonSociale = "NOT FOUND";
    }

    let dataEngin = {
      numeroSerieVin: "",
      numeroIdentification: "",
      nomUsager: "",
      prenomUsager: "",
      denominationRaisonSociale: "",
      numeroSiretRna: "",
      page: 0,
    };

    if (this.state.nom !== "") {
      dataEngin.nomUsager = this.state.nom.toUpperCase();
    }

    if (this.state.numeroIdentification !== "") {
      dataEngin.numeroIdentification = this.state.numeroIdentification;
    }

    if (this.state.numeroSerieVin !== "") {
      dataEngin.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }
    if (this.state.prenom !== "") {
      dataEngin.prenomUsager = this.state.prenom.toUpperCase();
    }
    if (this.state.denominationRaisonSociale !== "") {
      dataEngin.denominationRaisonSociale = this.state.denominationRaisonSociale.toUpperCase();
    }
    if (this.state.numeroSiret !== "") {
      dataEngin.numeroSiretRna = this.state.numeroSiret.toUpperCase();
    }
    if (
      this.state.dateDemande !== null &&
      this.state.dateDemande !== "undefined-undefined-undefined"
    ) {
      dataEngin.nomUsager = "NOT FOUND";
    }
    if (this.state.numeroDemande !== "") {
      dataEngin.nomUsager = "NOT FOUND";
    }

    let dataDemande = {
      numeroDemande: "",
      nomUsager: "",
      prenomUsager: "",
      dateSoumission: dateFormatted,
      denominationSociale: "",
      numeroSerieVin: "",
      numeroIdentification: "",
      numeroSiretRna: "",
      page: 0,
    };

    if (this.state.numeroDemande !== "") {
      dataDemande.numeroDemande = this.state.numeroDemande.toUpperCase();
    }
    if (this.state.prenom !== "") {
      dataDemande.prenomUsager = this.state.prenom.toUpperCase();
    }
    if (this.state.nom !== "") {
      dataDemande.nomUsager = this.state.nom.toUpperCase();
    }
    if (this.state.denominationRaisonSociale !== "") {
      dataDemande.denominationSociale = this.state.denominationRaisonSociale.toUpperCase();
    }
    if (this.state.numeroSerieVin !== "") {
      dataDemande.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }
    if (this.state.numeroIdentification !== "") {
      dataDemande.numeroIdentification = this.state.numeroIdentification;
    }
    if (this.state.numeroSiret !== "") {
      dataDemande.numeroSiretRna = this.state.numeroSiret.toUpperCase();
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

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_ENGIN_URL}`,
        dataEngin
      )
      .then((response) => {
        this.props.showCustomEnginsList(response.data, dataEngin);
      })
      .catch(() => {
        this.props.showErrorEngin();
      });

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_EVERY_DEMANDE_URL}`,
        dataDemande
      )
      .then((response) => {
        this.props.showCustomDemandesList(response.data, dataDemande);
      })
      .catch(() => {
        this.props.showErrorDemande();
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

  handleChangeDate = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");

    let formatted =
      localeDateString?.split("/")[2] +
      "-" +
      localeDateString?.split("/")[1] +
      "-" +
      localeDateString?.split("/")[0];

    this.setState({ dateDemande: formatted });
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

  checkNumeroSiret = (event) => {
    if (
      event.target.value.length > 14 ||
      !event.target.value.match(/^([A-Za-z0-9À-ÿ '-])*$/)
    ) {
      this.setState({
        inputStyleNumeroSiret: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumeroSiret: "",
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

  checkNumeroDemande = (event) => {
    if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleNumeroDemande: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumeroDemande: "",
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
            <Col xs={12} sm={6}>
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
            <Col xs={12} sm={6}>
              <FormGroup>
                <ControlLabel>NOM DE L'USAGER</ControlLabel>
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
          </Row>

          <Row>
            <Col xs={12} sm={6}>
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
            <Col xs={12} sm={6}>
              <FormGroup>
                <ControlLabel>PRÉNOM(S) DE L'USAGER</ControlLabel>
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
          </Row>

          <Row>
            <Col xs={12} sm={6}>
              <FormGroup>
                <ControlLabel>N° DE LA DEMANDE</ControlLabel>
                <FormControl
                  value={this.state.numeroDemande}
                  type="text"
                  name="numeroDemande"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNumeroDemande}`}
                  onBlur={this.checkNumeroDemande}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6}>
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
            <Col xs={12} sm={6}>
              <ControlLabel>DATE DE LA DEMANDE</ControlLabel>
              <FormGroup>
                <Datetime
                  onChange={this.handleChangeDate}
                  value={this.state.dateDemande}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDate}`}
                  onClose={this.checkDate}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={6}>
              <FormGroup>
                <ControlLabel>N° SIRET / N° RNA</ControlLabel>
                <FormControl
                  value={this.state.numeroSiret}
                  type="text"
                  name="numeroSiret"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleNumeroSiret}`}
                  onBlur={this.checkNumeroSiret}
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
