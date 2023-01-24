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

export default class SearchDemande extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_motifs_blocage = JSON.parse(
      localStorage.getItem("ref_motifs_blocage")
    ).value;
    this.ref_statuts_demande = JSON.parse(
      localStorage.getItem("ref_statuts_demande")
    );
    this.state = {
      numeroDemande: "",
      prenomUsager: "",
      nomUsager: "",
      dateSoumission: null,
      statutDemande: "Tout afficher",
      motifBlocage: "Tout afficher",
      numeroSerieVin: "",
      typeDemandeId: "",
      denominationSociale: "",
    };
  }

  componentDidMount() {
    if (this.props.autosearchId !== "false") {
      this.setState(
        {
          numeroSerieVin: this.props.autosearchId,
          typeDemandeId: this.props.autosearchType,
        },
        () => {
          document.getElementById("demande-search").click();
        }
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.autosearchId !== this.props.autosearchId) {
      this.setState(
        {
          numeroSerieVin: nextProps.autosearchId,
          typeDemandeId: nextProps.autosearchType,
        },
        () => {
          document.getElementById("demande-search").click();
        }
      );
      return true;
    }
    return true;
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

    this.setState({ dateSoumission: formatted });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendTrace();

    let dateFormatted = null;
    if (
      this.state.dateSoumission !== null &&
      this.state.dateSoumission !== "" &&
      this.state.dateSoumission !== "undefined-undefined-undefined"
    ) {
      dateFormatted = moment(this.state.dateSoumission).format("DD/MM/YYYY");
    }

    let data = {
      numeroDemande: "",
      nomUsager: "",
      prenomUsager: "",
      dateSoumission: dateFormatted,
      statutDemandeId: "",
      motifBlocageId: "",
      numeroSerieVin: "",
      typeDemandeId: "",
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

    if (this.state.motifBlocage !== "Tout afficher") {
      this.ref_motifs_blocage.forEach((e) => {
        if (this.state.motifBlocage === e.libelleLong) {
          data.motifBlocageId = e.motifBlocageId;
        }
      });
    }

    if (this.state.statutDemande !== "Tout afficher") {
      this.ref_statuts_demande.forEach((e) => {
        if (this.state.statutDemande === e.libelleLong) {
          data.statutDemandeId = e.statutDemandeId;
        }
      });
    }

    if (this.state.numeroSerieVin !== "") {
      data.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }
    if (this.state.typeDemandeId !== "") {
      data.typeDemandeId = this.state.typeDemandeId;
    }

    this.props.showLoading();
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_DEMANDE_URL}`,
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

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>MOTIF DE BLOCAGE</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.motifBlocage}
                  type="text"
                  name="motifBlocage"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_motifs_blocage != null &&
                    this.ref_motifs_blocage.map((m, index) => (
                      <option key={index}>{m.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>STATUT DE LA DEMANDE</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.statutDemande}
                  type="text"
                  name="statutDemande"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_statuts_demande != null &&
                    this.ref_statuts_demande.map((s, index) => (
                      <option key={index}>{s.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <ControlLabel>DATE DE LA DEMANDE</ControlLabel>
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
          </Row>

          <Row>
            <Col>
              <Button
                id="demande-search"
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
