import React, { Component } from "react";

import axios from "axios";
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
import moment from "moment";

export default class SearchTrace extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_types_trace = JSON.parse(localStorage.getItem("ref_types_trace"));
    this.ref_roles = JSON.parse(localStorage.getItem("ref_roles"));
    this.state = {
      dateMin: null,
      dateMax: null,
      typeTrace: "Tout afficher",
      action: "Tout afficher",
      matricule: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDateMin = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");

    let formatted =
      localeDateString?.split("/")[2] +
      "-" +
      localeDateString?.split("/")[1] +
      "-" +
      localeDateString?.split("/")[0];

    this.setState({ dateMin: formatted });
  };

  handleChangeDateMax = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");

    let formatted =
      localeDateString?.split("/")[2] +
      "-" +
      localeDateString?.split("/")[1] +
      "-" +
      localeDateString?.split("/")[0];

    this.setState({ dateMax: formatted });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendTrace();

    let dateMinFormatted = null;
    if (
      this.state.dateMin !== null &&
      this.state.dateMin !== "" &&
      this.state.dateMin !== "undefined-undefined-undefined"
    ) {
      dateMinFormatted =
        moment(this.state.dateMin).format("DD/MM/YYYY") + " 00:00:00";
    }

    let dateMaxFormatted = null;
    if (
      this.state.dateMax !== null &&
      this.state.dateMax !== "" &&
      this.state.dateMax !== "undefined-undefined-undefined"
    ) {
      dateMaxFormatted =
        moment(this.state.dateMax).format("DD/MM/YYYY") + " 23:59:59";
    }

    let data = {
      dateMin: dateMinFormatted,
      dateMax: dateMaxFormatted,
      typeId: "",
      profilUtilisateurId: "",
      utilisateurId: "",
      page: 0,
    };

    if (this.state.matricule !== "") {
      data.utilisateurId = this.state.matricule.toUpperCase();
    }

    if (this.state.typeTrace !== "Tout afficher") {
      this.ref_types_trace.forEach((e) => {
        if (this.state.typeTrace === e.libelleLong) {
          data.typeId = e.typeTraceId;
        }
      });
    }

    if (this.state.action !== "Tout afficher") {
      this.ref_roles.forEach((e) => {
        if (this.state.action === e.libelleLong) {
          data.profilUtilisateurId = e.profilUtilisateurId;
        }
      });
    }

    this.props.showLoading();
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_TRACE_URL}`,
        data
      )
      .then((response) => {
        this.props.showCustomTracesList(response.data, data);
      })
      .catch(() => {
        this.alertFail("Échec : Saisie invalide");
        this.props.showError();
      });
  };

  sendTrace = () => {
    const { idRIO, service } = this.context;

    let trace = {
      profilUtilisateurId: 1,
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
      autoDismiss: 6,
    };
    this.refs.notify.notificationAlert(options);
  };

  checkDateMin = (e) => {
    let dateMaxNoHours = new Date(this.state.dateMax).setHours(0, 0, 0, 0);
    let dateMinNoHours = e._d?.setHours(0, 0, 0, 0);
    let dateTodayNoHours = new Date().setHours(0, 0, 0, 0);

    if (
      dateMinNoHours > dateTodayNoHours ||
      (e !== "" && typeof e === "string") ||
      (this.state.dateMax !== null &&
        this.state.dateMax !== "" &&
        this.state.dateMax !== "undefined-undefined-undefined" &&
        dateMinNoHours > dateMaxNoHours)
    ) {
      this.setState({
        inputStyleDateMin: "invalidInput",
      });
      this.alertFail(
        "La date doit être valide et inférieure ou égale à la date du jour/date Max"
      );
    } else {
      this.setState({
        inputStyleDateMin: "",
      });
    }
  };

  checkDateMax = (e) => {
    let dateMinNoHours = new Date(this.state.dateMin).setHours(0, 0, 0, 0);
    let dateMaxNoHours = e._d?.setHours(0, 0, 0, 0);
    let dateTodayNoHours = new Date().setHours(0, 0, 0, 0);

    if (
      dateMaxNoHours > dateTodayNoHours ||
      (e !== "" && typeof e === "string") ||
      (this.state.dateMin !== null &&
        this.state.dateMin !== "" &&
        this.state.dateMin !== "undefined-undefined-undefined" &&
        dateMinNoHours > dateMaxNoHours)
    ) {
      this.setState({
        inputStyleDateMax: "invalidInput",
      });
      this.alertFail(
        "La date doit être valide et inférieure ou égale à la date du jour et supérieur à la date Min"
      );
    } else {
      this.setState({
        inputStyleDateMax: "",
      });
    }
  };

  checkMatricule = (event) => {
    if (
      event.target.value.length > 12 ||
      !event.target.value.match(/^([0-9a-zA-Z])*$/)
    ) {
      this.setState({
        inputStyleMatricule: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleMatricule: "",
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
              <ControlLabel>DATE MIN</ControlLabel>
              <FormGroup>
                <Datetime
                  onChange={this.handleChangeDateMin}
                  value={this.state.dateMin}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDateMin}`}
                  onClose={this.checkDateMin}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <ControlLabel>DATE MAX</ControlLabel>
              <FormGroup>
                <Datetime
                  onChange={this.handleChangeDateMax}
                  value={this.state.dateMax}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDateMax}`}
                  onClose={this.checkDateMax}
                />
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>TYPE DE TRACE</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.typeTrace}
                  type="text"
                  name="typeTrace"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_types_trace != null &&
                    this.ref_types_trace.map((m, index) => (
                      <option key={index}>{m.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>ACTION MENÉE PAR</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.action}
                  type="text"
                  name="action"
                  onChange={this.handleChange}
                >
                  <option>Tout afficher</option>
                  {this.ref_roles != null &&
                    this.ref_roles.map((m, index) => (
                      <option key={index}>{m.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
              <FormGroup>
                <ControlLabel>MATRICULE (RIO)</ControlLabel>
                <FormControl
                  value={this.state.matricule}
                  type="text"
                  name="matricule"
                  onChange={this.handleChange}
                  className={`${this.state.inputStyleMatricule}`}
                  onBlur={this.checkMatricule}
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
