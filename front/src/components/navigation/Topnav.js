import React, {Component} from "react";
import {Col, FormControl, FormGroup, Glyphicon, Image, Row,} from "react-bootstrap";
import {LoginContext} from "../util/LoginContext";
import "../../static/css/styles.css";
import {NavLink, withRouter} from "react-router-dom";
import axios from "axios";
import Logo2 from "../../static/images/logo_ministere.jpg";
import Logo from "../../static/images/logo_dicem.png";
import NotificationAlert from "react-notification-alert";

class Topnav extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      numeroSerieVin: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendTrace();

    let dataEngin = {
      numeroSerieVin: "",
      page: 0,
    };

    let dataDemande = {
      numeroSerieVin: "",
      page: 0,
      typeDemandeId: 1,
    };

    if (this.state.numeroSerieVin !== "") {
      dataEngin.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
      dataDemande.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_ENGIN_URL}`,
        dataEngin
      )
      .then((response) => {
        if (response.data.totalElements === 1) {
          this.props.history.push({
            pathname: `/fiche-engin/${response.data.content[0].numeroIdentification}`,
          });
        } else if (response.data.totalElements < 1) {
          axios
            .post(
              `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CUSTOM_DEMANDE_URL}`,
              dataDemande
            )
            .then((response) => {
              if (response.data.totalElements === 1) {
                this.props.history.push({
                  pathname: `/fiche-demande/${response.data.content[0].numeroDemande}`,
                });
              } else if (response.data.totalElements > 1) {
                this.props.history.push({
                  pathname: `/liste-demandes/${dataDemande.numeroSerieVin}/${dataDemande.typeDemandeId}`,
                });
              } else {
                this.alertFail("Aucun résultat");
              }
            });
        } else {
          this.props.history.push({
            pathname: `/liste-engins/${dataEngin.numeroSerieVin}`,
          });
        }
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
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message}</strong>
          </div>
        </div>
      ),
      type: "danger",
      autoDismiss: 3,
    };

    this.refs.notify.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div>
          <NotificationAlert ref="notify" />
        </div>
        <LoginContext.Consumer>
          {({ nom, roles }) => {
            return (
              <>
                <Row>
                  <Col md={3}>
                    <Row>
                      <Col md={12}>
                        <Image id="logoMinistere" responsive src={Logo2} />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <Image id="logoDicem" responsive src={Logo} />
                      </Col>
                    </Row>
                  </Col>

                  <Col md={9}>
                    <Row className="navbarTopDicem">
                      <Col xs={12} sm={2}>
                        <div style={{ color: "white", marginTop: "5px" }}>
                            Version 0.7.0
                        </div>
                      </Col>

                      <Col xs={12} sm={7}>
                        <h1 className="titleDicem">D.I.C.E.M</h1>
                      </Col>

                      <Col xs={12} sm={3}>
                        <h2 className="param">
                          <div>{nom}</div>
                          {roles.map((element, index) => (
                            <div
                              key={index}
                              style={{
                                fontStyle: "italic",
                                fontSize: "0.9em",
                              }}
                            >
                              {element}
                            </div>
                          ))}
                        </h2>
                      </Col>
                    </Row>

                    <Row className="navbarTop">
                      <div>
                        <form onSubmit={this.handleSubmit}>
                          <Col xs={8} sm={5} md={4}>
                            <FormGroup>
                              <FormControl
                                placeholder="Recherche par numéro de série"
                                type="text"
                                name="numeroSerieVin"
                                onChange={this.handleChange}
                                required={true}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={1}>
                            <button className="btn btn-secondary" type="submit">
                              <Glyphicon glyph="search" />
                            </button>
                          </Col>
                        </form>

                        <Col xs={12} sm={4} md={4} lg={4}>
                          <div className="positionRechercheAvancee">
                            <NavLink
                              className="rechercheAvancee"
                              to="/advanced-search"
                            >
                              Recherche avancée &gt;&gt;
                            </NavLink>
                          </div>
                        </Col>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </>
            );
          }}
        </LoginContext.Consumer>
      </>
    );
  }
}

export default withRouter(Topnav);
