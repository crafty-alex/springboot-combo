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
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { LoginContext } from "../util/LoginContext";
import Datetime from "react-datetime";

export default class SearchEngin extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_statuts_engin = JSON.parse(
      localStorage.getItem("ref_statuts_engin")
    );
    this.ref_marques = JSON.parse(localStorage.getItem("ref_marques"));
    this.state = {
      numeroIdentification: "",
      marque: "Tout afficher",
      modele: "",
      datePremiereDeclaration: null,
      numeroSerieVin: "",
      nom: "",
      statutEngin: "Tout afficher",
    };
  }

  componentDidMount() {
    if (this.props.autosearch !== "false") {
      this.setState({ numeroSerieVin: this.props.autosearch }, () => {
        document.getElementById("engin-search").click();
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.autosearch !== this.props.autosearch) {
      this.setState({ numeroSerieVin: nextProps.autosearch }, () => {
        document.getElementById("engin-search").click();
      });
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

    this.setState({ datePremiereDeclaration: formatted });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendTrace();

    let dateFormatted = null;
    if (
      this.state.datePremiereDeclaration !== null &&
      this.state.datePremiereDeclaration !== "" &&
      this.state.datePremiereDeclaration !== "undefined-undefined-undefined"
    ) {
      dateFormatted = moment(this.state.datePremiereDeclaration).format(
        "DD/MM/YYYY"
      );
    }

    let data = {
      modele: "",
      numeroSerieVin: "",
      numeroIdentification: "",
      datePremiereDeclaration: dateFormatted,
      marqueId: "",
      statutEnginId: "",
      nomUsager: "",
      page: 0,
    };

    if (this.state.nom !== "") {
      data.nomUsager = this.state.nom.toUpperCase();
    }

    if (this.state.numeroIdentification !== "") {
      data.numeroIdentification = this.state.numeroIdentification;
    }

    if (this.state.modele !== "") {
      data.modele = this.state.modele.toUpperCase();
    }

    if (this.state.numeroSerieVin !== "") {
      data.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }

    if (this.state.marque !== "Tout afficher") {
      this.ref_marques.forEach((e) => {
        if (this.state.marque === e.libelleLong) {
          data.marqueId = e.marqueId;
        }
      });
    }

    if (this.state.statutEngin !== "Tout afficher") {
      this.ref_statuts_engin.forEach((e) => {
        if (this.state.statutEngin === e.libelleLong) {
          data.statutEnginId = e.statutEnginId;
        }
      });
    }

    this.props.showLoading();
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_ENGIN_URL}`,
        data
      )
      .then((response) => {
        this.props.showCustomEnginsList(response.data, data);
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

  isValidDate = (event) => {
    return event <= new Date();
  };

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        <strong>Personne physique :</strong> propriétaire <br />
        <strong>Personne morale :</strong> représentant légal
      </Tooltip>
    );

    return (
      <>
        <div>
          <NotificationAlert ref="notify" />
        </div>

        <form className="form" onSubmit={this.handleSubmit}>
          <Row>
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
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>STATUT ENGIN</ControlLabel>
                <FormControl
                  value={this.state.statutEngin}
                  type="text"
                  name="statutEngin"
                  componentClass="select"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_statuts_engin != null &&
                    this.ref_statuts_engin.map((s, index) => (
                      <option key={index}>{s.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>MARQUE</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.marque}
                  type="text"
                  name="marque"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_marques != null &&
                    this.ref_marques.map((m, index) => (
                      <option key={index}>{m.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>MODÈLE</ControlLabel>
                <FormControl
                  value={this.state.modele}
                  type="text"
                  name="modele"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <OverlayTrigger
                  className="tooltip"
                  placement="bottom"
                  overlay={tooltip}
                >
                  <div>
                    <ControlLabel>NOM PROPRIÉTAIRE ACTUEL</ControlLabel>
                    <FormControl
                      value={this.state.nom}
                      type="text"
                      name="nom"
                      onChange={this.handleChange}
                      className={`${this.state.inputStyleNom}`}
                      onBlur={this.checkNom}
                    />
                  </div>
                </OverlayTrigger>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <ControlLabel>DATE DE LA PREMIÈRE DÉCLARATION</ControlLabel>
              <FormGroup>
                <Datetime
                  onChange={this.handleChangeDate}
                  value={this.state.datePremiereDeclaration}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDate}`}
                  onClose={this.checkDate}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col className="button pull-right">
              <Button
                id="engin-search"
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
