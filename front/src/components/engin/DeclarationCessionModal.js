import React, {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";
import Datetime from "react-datetime";
import moment from "moment";

export class DeclarationCessionModal extends Component {
  static contextType = LoginContext;
  state = {
    isAcheteurPersonnePhysique: true,
    engin: this.props.engin,
    loading: false,
    isDateToday: false,
    open: false,
    dateCession: null,
    heureCession: "",
    openDate: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalDeclarationCession) {
      return { open: nextProps.showModalDeclarationCession };
    }
    return null;
  }

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

    if (date.toDate() > dateToday || !date._isValid) {
      this.setState({
        inputStyleDate: "invalidInput",
      });
    } else if (date.toDate().getDate() === dateToday.getDate()) {
      this.setState({
        inputStyleDate: "",
        isDateToday: true,
      });
    } else {
      this.setState({
        inputStyleDate: "",
        isDateToday: false,
      });
    }
  };

  checkHeure = (e) => {
    let heureToday = new Date().getTime();
    let heure = e._d?.getTime();

    if ((this.state.isDateToday && heure > heureToday) || heure == null) {
      this.setState({
        inputStyleHeure: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleHeure: "",
      });
    }
  };
  c;

  checkNom = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStyleNom: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNom: "",
      });
    }
  };

  checkPrenom = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStylePrenom: "invalidInput",
      });
    } else {
      this.setState({
        inputStylePrenom: "",
      });
    }
  };

  checkDenomination = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-0-9-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStyleDenomination: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleDenomination: "",
      });
    }
  };

  checkEmailPersonnePhysique = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^((.+)@(.+).(.+))*$/)
    ) {
      this.setState({
        inputStyleEmailPersonnePhysique: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleEmailPersonnePhysique: "",
      });
    }
  };

  checkEmailPersonneMorale = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^((.+)@(.+).(.+))*$/)
    ) {
      this.setState({
        inputStyleEmailPersonneMorale: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleEmailPersonneMorale: "",
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDate = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");
    this.setState({ dateCession: localeDateString });
  };

  handleChangeHeure = (e) => {
    let hours = e._d?.getUTCHours() + 1;
    let minutes = e._d?.getUTCMinutes();
    if (minutes?.toString().length === 1) {
      minutes = "0" + minutes;
    }
    let total = hours + ":" + minutes;
    this.setState({ heureCession: total });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { idRIO, service } = this.context;

    let data = {
      dateCession: "",
      acheteurPersonnePhysique: this.state.isAcheteurPersonnePhysique,
      civiliteAcheteur: this.state.civiliteAcheteur,
      nomNaissanceAcheteur: this.state.nomNaissanceAcheteur,
      prenomAcheteur: this.state.prenomAcheteur,
      emailAcheteur: this.state.emailAcheteur,
      statutJuridiqueAcheteur: this.state.statutJuridiqueAcheteur,
      raisonSocialeAcheteur: this.state.raisonSocialeAcheteur,
      engin: this.props.engin,
    };

    if (this.state.dateCession != null) {
      data.dateCession = this.state.dateCession + " " + this.state.heureCession;
    }

    let trace = {
      profilUtilisateurId: 2,
      typeId: 22,
      demandeId: 0,
      enginId: this.props.engin.enginId,
      identifiantUsagerId: this.props.engin.personnePhysique?.usager
        ? this.props.engin.personnePhysique.usager.identifiantUsagerId
        : this.props.engin.personneMorale.usager.identifiantUsagerId,
      personneMoraleId: this.props.engin.personneMoraleId,
      personnePhysiqueId: this.props.engin.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    this.setState({ loading: true });
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_CESSION}`,
        data
      )
      .then((response) => {
        this.setState({
          loading: false,
        });
        trace.demandeId = response.data;
        axios.post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
          trace
        );
        this.alertSuccess("Modifications enregistrées");
        setTimeout(() => this.props.handleCloseModalDeclarationCession(), 1500);
        this.props.fetchEnginInfo();
      })
      .catch(() => {
        this.setState({ loading: false });
        this.alertFail("Merci de vérifier les informations saisies");
      });
  };

  alertSuccess = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message} </strong>
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

  toggleMoraleOuPhysique = () => {
    this.setState({
      isAcheteurPersonnePhysique: !this.state.isAcheteurPersonnePhysique,
    });
  };

  isValidDate = (event) => {
    return event <= new Date();
  };

  render() {
    let inputProps = {
      required: true,
    };

    return (
      <Modal
        closeOnOverlayClick={false}
        showCloseIcon={false}
        open={this.state.open}
        center
        classNames={{
          modal: "customModalEngin",
        }}
      >
        <Loader fullPage loading={this.state.loading} />

        <NotificationAlert ref="notify" />

        <Row>
          <h4 className="declarationCession">
            Déclaration de cession de l'engin N°
            {this.props.numeroIdentification}
          </h4>
          <hr className="borderDeclarationCession" />
        </Row>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <h5 className="informationAcheteur">Informations de l'acheteur</h5>
            <hr className="borderBleuInformationAcheteur" />
          </Row>
          <Row
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Col xs={12} sm={4} md={3}>
              <input
                style={{
                  marginRight: "5px",
                }}
                type="radio"
                id="personnePhysique"
                name="personnePhysique"
                onChange={this.toggleMoraleOuPhysique}
                checked={this.state.isAcheteurPersonnePhysique}
                value="personnePhysique"
                required
              />

              <label htmlFor="personnePhysique">Particulier</label>
            </Col>
            <Col xs={12} sm={4} md={3}>
              <input
                style={{ marginRight: "5px" }}
                type="radio"
                id="personneMorale"
                checked={!this.state.isAcheteurPersonnePhysique}
                onChange={this.toggleMoraleOuPhysique}
                name="personnePhysique"
                value="personneMorale"
                required
              />
              <label htmlFor="personneMorale">Professionnel</label>
            </Col>
          </Row>
          {this.state.isAcheteurPersonnePhysique ? (
            <>
              <Row
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Col xs={12} sm={1} md={1}>
                  <label>Civilité</label>
                </Col>
                <Col xs={12} sm={3} md={3}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="monsieur"
                    name="civiliteAcheteur"
                    value="Monsieur"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="monsieur">Monsieur</label>
                </Col>
                <Col xs={12} sm={4} md={4}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="madame"
                    name="civiliteAcheteur"
                    value="Madame"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="madame">Madame</label>
                </Col>
              </Row>

              <Row style={{ marginTop: "20px" }}>
                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Nom de naissance</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      type="text"
                      name="nomNaissanceAcheteur"
                      className={`${this.state.inputStyleNom} form-control`}
                      onChange={this.handleChange}
                      onBlur={this.checkNom}
                      required
                    />
                  </Col>
                </div>

                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Prénom(s)</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      type="text"
                      className={`${this.state.inputStylePrenom} form-control`}
                      name="prenomAcheteur"
                      onChange={this.handleChange}
                      onBlur={this.checkPrenom}
                      required
                    />
                  </Col>
                </div>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <div>
                  <Col xs={12} sm={12} md={3}>
                    <label>Adresse électronique</label>
                  </Col>

                  <Col xs={12} sm={12} md={3}>
                    <input
                      type="email"
                      name="emailAcheteur"
                      className={`${this.state.inputStyleEmailPersonnePhysique} form-control`}
                      onChange={this.handleChange}
                      onBlur={this.checkEmailPersonnePhysique}
                      required
                    />
                  </Col>
                </div>
              </Row>
            </>
          ) : (
            <>
              <Row
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Col xs={12} sm={2} md={2}>
                  <label>Statut juridique</label>
                </Col>
                <Col xs={12} sm={3} md={3}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="société"
                    name="statutJuridiqueAcheteur"
                    value="Société"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="societe">Société</label>
                </Col>
                <Col xs={12} sm={4} md={4}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="association"
                    name="statutJuridiqueAcheteur"
                    value="Association"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="association">Association</label>
                </Col>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <div>
                  <Col xs={12} sm={12} md={3}>
                    <label>Raison sociale</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      type="text"
                      className={`${this.state.inputStyleDenomination} form-control`}
                      name="raisonSocialeAcheteur"
                      onChange={this.handleChange}
                      onBlur={this.checkDenomination}
                      required
                    />
                  </Col>
                </div>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Adresse électronique</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      type="email"
                      name="emailAcheteur"
                      className={`${this.state.inputStyleEmailPersonneMorale} form-control`}
                      onChange={this.handleChange}
                      onBlur={this.checkEmailPersonneMorale}
                      required
                    />
                  </Col>
                </div>
              </Row>
            </>
          )}

          <Row>
            <h5 className="informationAcheteur">Informations de la cession</h5>
            <hr className="borderBleuInformationAcheteur" />
          </Row>

          <Row style={{ marginTop: "20px" }}>
            <div>
              <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                <label>Date de la cession</label>
              </Col>
              <Col xs={12} sm={12} md={3}>
                <Datetime
                  onChange={this.handleChangeDate}
                  isValidDate={this.isValidDate}
                  timeFormat={false}
                  className={`${this.state.inputStyleDate}`}
                  onClose={this.checkDate}
                  inputProps={inputProps}
                />
              </Col>
            </div>

            <div>
              <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                <label>Heure de la cession</label>
              </Col>
              <Col xs={12} sm={12} md={3}>
                <Datetime
                  onChange={this.handleChangeHeure}
                  dateFormat={false}
                  className={`${this.state.inputStyleHeure}`}
                  onClose={this.checkHeure}
                  inputProps={inputProps}
                />
              </Col>
            </div>
          </Row>

          <Row>
            <Col xs={12}>
              <Button type="submit" className="buttonValider">
                Valider
              </Button>
              <Button
                className="buttonAnnuler"
                onClick={() => {
                  this.props.handleCloseModalDeclarationCession();
                  this.setState({
                    inputStyleDate: "",
                    inputStyleHeure: "",
                    inputStyleNom: "",
                    inputStylePrenom: "",
                    inputStyleDenomination: "",
                    inputStyleEmailPersonnePhysique: "",
                    inputStyleEmailPersonneMorale: "",
                  });
                }}
              >
                Annuler
              </Button>
            </Col>
          </Row>
        </form>
      </Modal>
    );
  }
}

export default DeclarationCessionModal;
