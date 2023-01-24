import React, {Component} from "react";
import {Button, Col, FormControl, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";
import FicheUsagerExistModal from "./FicheUsagerExistModal";
import EnregistrerModificationModal from "./EnregistrerModificationModal";
import Datetime from "react-datetime";
import moment from "moment";
import "moment/locale/fr";

export class ModifierEtatCivilModal extends Component {
  static contextType = LoginContext;
  ref_civilites = JSON.parse(localStorage.getItem("ref_civilites"));
  ref_pays = JSON.parse(localStorage.getItem("ref_pays"));

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      open: false,
      showModalFicheUsagerExistModal: false,
      data: "",
        trace: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalModifierEtatCivilModal) {
      return { open: nextProps.showModalModifierEtatCivilModal };
    }
    return null;
  }

  toggleModalEnregistrerModificationModal = () => {
    this.setState({
      showModalEnregistrerModificationModal: !this.state
        .showModalEnregistrerModificationModal,
    });
  };

  toggleModalFicheUsagerExistModal = () => {
    this.setState({
      showModalFicheUsagerExistModal: !this.state
        .showModalFicheUsagerExistModal,
    });
  };

  handleCloseModalEnregistrerModificationModal = () => {
    this.setState({
      showModalEnregistrerModificationModal: false,
      idService: null,
      dateNaissance: null,
      civilite: null,
      nomNaissance: null,
      prenom: null,
      paysNaissance: null,
    });
    this.props.handleCloseModalEnregistrerModificationModal();
  };

  handleCloseModalFicheUsagerExistModal = () => {
    this.setState({ showModalFicheUsagerExistModal: false });
  };

  checkDateNaissance = (e) => {
    let formatted = e._d?.toLocaleDateString("fr-FR");
    let formatted2 =
      formatted?.split("/")[1] +
      "/" +
      formatted?.split("/")[0] +
      "/" +
      formatted?.split("/")[2];
    let date = moment.utc(formatted2);

    if (!this.meetsMinimumAge(date.toDate())) {
      this.setState({
        inputStyleDateNaissance: "invalidInput",
      });
      this.alertFail("L’ usager doit être majeur");
    } else {
      this.setState({
        inputStyleDateNaissance: "",
      });
    }
  };

  meetsMinimumAge = (birthDate) => {
    var year = birthDate.getFullYear() + 18;
    var month = birthDate.getMonth() + 1;
    var day = birthDate.getDate();
    var x = month + "/" + day + "/" + year;
    let date = moment.utc(x);
    return date.toDate() <= new Date();
  };

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

  checkIdService = (event) => {
    if (!event.target.value.match(/^([a-zA-Z-0-9])*$/)) {
      this.setState({
        inputStyleIdService: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleIdService: "",
      });
    }
  };

  checkCodePostal = (event) => {
    if (
      this.state.paysNaissance === "france" ||
      this.state.paysNaissance === "FRANCE" ||
      this.state.paysNaissance === "France"
    ) {
      if (
        event.target.value.length < 1 ||
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
    }
  };

  checkCommuneNaissance = (event) => {
      if (!event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleCommuneNaissance: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCommuneNaissance: "",
      });
    }
  };

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
    const { idRIO, service } = this.context;

    const {
      civiliteId,
      nomNaissance,
      prenom,
      dateNaissance,
      paysNaissance,
      communeNaissance,
    } = this.props.objPersonne;

    let civilite;
    if (this.ref_civilites != null) {
      this.ref_civilites.forEach((c) => {
        if (civiliteId === c.civiliteId) {
          civilite = c.libelleLong;
        }
      });
    }

    let data = {
      dateNaissance: null,
      codePostal: null,
      civilite: null,
      nomNaissance: null,
      prenom: null,
      paysNaissance: null,
      communeNaissance: null,
      idService: null,
      personnePhysique: this.props.objPersonne,
    };

    let dateFormatted = moment(dateNaissance, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    data.dateNaissance =
      this.state.dateNaissance != null
        ? this.state.dateNaissance
        : dateFormatted;

    data.codePostal =
      this.state.codePostal != null ? this.state.codePostal : "";

    data.civilite =
      this.state.civilite != null ? this.state.civilite : civilite;

    data.nomNaissance =
      this.state.nomNaissance != null
        ? this.state.nomNaissance.toUpperCase()
        : nomNaissance;

    data.prenom =
      this.state.prenom != null ? this.state.prenom.toUpperCase() : prenom;

    data.paysNaissance =
      this.state.paysNaissance != null
        ? this.state.paysNaissance.toUpperCase()
        : paysNaissance;

    data.communeNaissance =
      this.state.communeNaissance != null
        ? this.state.communeNaissance.toUpperCase()
        : communeNaissance;

    let trace = {
      profilUtilisateurId: 2,
      typeId: 0,
      demandeId: 0,
      identifiantUsagerId: 0,
      personnePhysiqueId: this.props.objPersonne.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    if (this.state.idService != null) {
      data.idService = this.state.idService.toUpperCase();
      trace.typeId = 2;
    } else {
      trace.typeId = 13;
    }

    this.setState({ data: data, trace: trace });

    let civiliteIdChanged;
    if (this.ref_civilites != null) {
      this.ref_civilites.forEach((c) => {
        if (data.civilite === c.libelleLong) {
          civiliteIdChanged = c.civiliteId;
        }
      });
    }

    if (
      this.state.dateNaissance == null &&
      this.state.civilite == null &&
      this.state.nomNaissance == null &&
      this.state.prenom == null &&
      this.state.paysNaissance == null &&
      this.state.communeNaissance == null &&
      this.state.idService == null
    ) {
      this.alertFail("Veuillez modifier au moins un des champs");
    } else {
      this.setState({ loading: true });
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_PHYSIQUE_BY_DONNEES_PIVOT_URL}`,
          {
            params: {
              nomNaissance: data.nomNaissance,
              prenom: data.prenom,
              civiliteId: civiliteIdChanged,
              dateNaissance: data.dateNaissance,
              paysNaissance: data.paysNaissance,
              communeNaissance: data.communeNaissance,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            this.setState({
              loading: false,
            });
            this.props.handleCloseModalModifierEtatCivilModal();
            this.toggleModalFicheUsagerExistModal();
          } else {
            this.setState({
              loading: false,
            });
            this.props.handleCloseModalModifierEtatCivilModal();
            this.toggleModalEnregistrerModificationModal();
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          this.alertFail("Merci de vérifier les informations saisies");
        });
    }
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


  isValidDate = (event) => {
    return event <= new Date();
  };

  render() {
    const {
      civiliteId,
      nomNaissance,
      prenom,
      dateNaissance,
      paysNaissance,
      communeNaissance,
    } = this.props.objPersonne;

    let civilite;
    if (this.ref_civilites != null) {
      this.ref_civilites.forEach((c) => {
        if (civiliteId === c.civiliteId) {
          civilite = c.libelleLong;
        }
      });
    }

    return (
      <>
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
              Déclaration de changement d'état civil
              {this.props.numeroIdentification}
            </h4>
            <hr className="borderDeclarationCession" />
          </Row>
          <form onSubmit={this.handleSubmit}>
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
                    id="Monsieur"
                    name="civilite"
                    value="Monsieur"
                    onChange={this.handleChange}
                    required
                    defaultChecked={"Monsieur" === civilite}
                  />
                  <label htmlFor="monsieur">Monsieur</label>
                </Col>
                <Col xs={12} sm={4} md={4}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="Madame"
                    name="civilite"
                    value="Madame"
                    onChange={this.handleChange}
                    required
                    defaultChecked={"Madame" === civilite}
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
                      name="nomNaissance"
                      className={`${this.state.inputStyleNom} form-control largeurInput`}
                      onChange={this.handleChange}
                      onBlur={this.checkNom}
                      required
                      defaultValue={nomNaissance}
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
                      className={`${this.state.inputStylePrenom} form-control largeurInput`}
                      name="prenom"
                      onChange={this.handleChange}
                      onBlur={this.checkPrenom}
                      defaultValue={prenom}
                      required
                    />
                  </Col>
                </div>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Date de naissance</label>
                  </Col>

                  <Col xs={12} sm={12} md={3}>
                    <Datetime
                      onChange={this.handleChangeDate}
                      isValidDate={this.isValidDate}
                      timeFormat={false}
                      className={`${this.state.inputStyleDateNaissance}`}
                      onClose={this.checkDateNaissance}
                      initialValue={dateNaissance}
                    />
                  </Col>
                </div>

                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Pays de naissance</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <FormControl
                      componentClass="select"
                      type="text"
                      name="paysNaissance"
                      onChange={this.handleChange}
                      defaultValue={paysNaissance}
                    >
                      <option value="">Tout afficher</option>
                      {this.ref_pays != null &&
                        this.ref_pays.map((s, index) => (
                          <option key={index}>{s.libelleLong}</option>
                        ))}
                    </FormControl>
                  </Col>
                </div>
              </Row>

              <Row style={{ marginTop: "10px" }}>

                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} md={3}>
                    <label>Commune de naissance</label>
                  </Col>

                  <Col xs={12} md={3}>
                      <FormControl
                          type="text"
                          name="communeNaissance"
                          onChange={this.handleChange}
                          defaultValue={communeNaissance}
                          className={`${this.state.inputStyleCommuneNaissance} form-control largeurInput`}
                          onBlur={this.checkCommuneNaissance}
                      />
                  </Col>
                </div>

                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>ID Service</label>
                  </Col>

                  <Col xs={12} sm={12} md={3}>
                    <input
                      type="text"
                      name="idService"
                      className={`${this.state.inputStyleIdService} form-control largeurInput`}
                      onBlur={this.checkIdService}
                      onChange={this.handleChange}
                    />
                  </Col>
                </div>
              </Row>
            </>

            <Row>
              <Col xs={12}>
                <Button className="buttonValider" type="submit">
                  Enregistrer les modifications
                </Button>
                <Button
                  className="buttonAnnuler"
                  onClick={() => {
                    this.setState({
                      communeSelectOptions: [],
                      inputStyleNom: "",
                      inputStylePrenom: "",
                      inputStyleIdService: "",
                      inputStyleCodePostal: "",
                      inputStylePaysNaissance: "",
                      inputStyleCommuneNaissance: "",
                      inputStyleDateNaissance: "",
                    });
                    this.props.handleCloseModalModifierEtatCivilModal();
                  }}
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </form>
        </Modal>

        <FicheUsagerExistModal
          showModalFicheUsagerExistModal={
            this.state.showModalFicheUsagerExistModal
          }
          handleCloseModalFicheUsagerExistModal={
            this.handleCloseModalFicheUsagerExistModal
          }
        />

        <EnregistrerModificationModal
          showModalEnregistrerModificationModal={
            this.state.showModalEnregistrerModificationModal
          }
          handleCloseModalEnregistrerModificationModal={
            this.handleCloseModalEnregistrerModificationModal
          }
          data={this.state.data}
          trace={this.state.trace}
        />
      </>
    );
  }
}

export default ModifierEtatCivilModal;
