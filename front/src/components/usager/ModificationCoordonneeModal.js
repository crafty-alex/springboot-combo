import React, {Component} from "react";
import {Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, Row,} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import {Loader} from "react-overlay-loader";
import axios from "axios";
import {faPaperclip,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NotificationAlert from "react-notification-alert";
import {LoginContext} from "../util/LoginContext";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import AdresseModal from "../adresse/AdresseModal";

export class ModificationCoordonneeModal extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.initialState = {
      showModal: false,
      listeAdresses: [],
      numeroVoieOk: true,
      adresseSelected: false,
      loading: false,
      open: false,
      numeroVoie: "",
      nomVoie: "",
      complement: "",
      codePostal: "",
      commune: "",
      numeroTelephone: null,
      nomRepresentant: null,
      prenomRepresentant: null,
      denominationSociale: null,
      fileKbis: {},
      fileId: {},
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    if (!this.props.objPersonne.numeroVoie) {
      this.setState({numeroVoieOk: !!this.props.objPersonne.numeroVoie});
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalModificationCoordonnee) {
      return {open: nextProps.showModalModificationCoordonnee, numeroVoieOk: !!nextProps.objPersonne.numeroVoie};
    }
    return null;
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileKbis = (e) => {
    this.setState({ fileKbis: e.target.files[0] });
    e.target.value = "";
  };

  handleFileId = (e) => {
    this.setState({ fileId: e.target.files[0] });
    e.target.value = "";
  };

  resetFileKbis = () => {
    this.setState({ fileKbis: {} });
  };

  resetFileId = () => {
    this.setState({ fileId: {} });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { idRIO, service } = this.context;

    if (
      ((this.state.denominationSociale !== null &&
        this.state.denominationSociale !==
          this.props.objPersonne.denominationRaisonSociale) ||
        (this.state.nomRepresentant !== null &&
          this.state.nomRepresentant !==
            this.props.objPersonne.nomRepresentant) ||
        (this.state.prenomRepresentant !== null &&
          this.state.prenomRepresentant !==
            this.props.objPersonne.prenomRepresentant)) &&
      (!(this.state.fileKbis instanceof File) ||
        !(this.state.fileId instanceof File))
    ) {
      this.alertFail("Veuillez choisir les pièces justificatives");
      return;
    }

    let data = {
      numeroVoie: this.state.numeroVoie,
      nomVoie: this.state.nomVoie,
      complement: this.state.complement,
      codePostal: this.state.codePostal,
      commune: this.state.commune,
      numeroTelephone: this.state.numeroTelephone,
      nomRepresentant: this.state.nomRepresentant,
      prenomRepresentant: this.state.prenomRepresentant,
      denominationSociale: this.state.denominationSociale,
      personneMorale: null,
      personnePhysique: null,
    };

    if (this.props.typePersonne === "Physique") {
      data.personnePhysique = this.props.objPersonne;
    } else {
      data.personneMorale = this.props.objPersonne;
    }

    const jsonData = JSON.stringify(data);
    const blobData = new Blob([jsonData], {
      type: "application/json",
    });

    var formData = new FormData();
    formData.append("fileKbis", this.state.fileKbis);
    formData.append("fileId", this.state.fileId);
    formData.append("data", blobData);

    let trace = {
      profilUtilisateurId: 2,
      typeId: 25,
      demandeId: 0,
      identifiantUsagerId: this.props.objPersonne.usager?.identifiantUsagerId,
      personneMoraleId: this.props.objPersonne.personneMoraleId,
      personnePhysiqueId: this.props.objPersonne.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    this.setState({ loading: true });

    if (
      this.state.numeroVoie === "" &&
      this.state.nomVoie === "" &&
      this.state.complement === "" &&
      this.state.codePostal === "" &&
      this.state.commune === "" &&
      this.state.numeroTelephone !== null
    ) {
      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_MODIFICATION_TELEPHONE}`,
          data
        )
        .then((response) => {
          this.setState(this.initialState);
          trace.demandeId = response.data;
          axios.post(
            `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
            trace
          );
          this.alertSuccess("Modifications enregistrées");
          setTimeout(
            () => this.props.handleCloseModalModificationCoordonnee(),
            1500
          );
        })
        .catch((e) => {
          console.error(e);
          this.setState(this.initialState);
          this.alertFail("Merci de vérifier les informations saisies");
        });
    } else if (
      this.state.numeroVoie === "" &&
      this.state.nomVoie === "" &&
      this.state.complement === "" &&
      this.state.codePostal === "" &&
      this.state.commune === "" &&
      this.state.nomRepresentant === null &&
      this.state.prenomRepresentant === null &&
      this.state.denominationSociale === null
    ) {
      this.alertFail("Veuillez modifier au moins un des champs");
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_MODIFICATION_COORDONNEES}`,
          formData
        )
        .then((response) => {
          this.setState(this.initialState);
          trace.demandeId = response.data;
          axios.post(
            `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
            trace
          );
          this.alertSuccess("Modifications enregistrées");
          setTimeout(
            () => this.props.handleCloseModalModificationCoordonnee(),
            1500
          );
        })
        .catch((e) => {
          console.error(e);
          this.setState(this.initialState);
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


  handleApiAdresse = () => {
    let type = 1;
    if (this.props.typePersonne === "Morale") {
      type = 2;
    }

    let cp = 0;
    if (this.state.codePostal !== "") {
      cp = this.state.codePostal;
    }
    let numeroVoie = this.state.numeroVoie;
    let nomVoie = this.state.nomVoie;

    let voie =
        numeroVoie +
        " " +
        nomVoie.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    this.setState({loading: true});

    axios
        .get(
            `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_API_ADRESSE}/${cp}/${voie}/10/${type}`
        )
        .then((response) => {

          if (Array.isArray(response.data.features)) {
            this.setState({
              listeAdresses: response.data.features,
            });
          } else {
            let array = [];
            array.push(response.data.features);
            this.setState({
              listeAdresses: array,
            });
          }

          this.setState({loading: false});
          this.toggleModal();
        })
        .catch(() => {
          this.setState({loading: false});
          this.alertFail("Merci de vérifier les informations saisies");
        });
  };

  handleSelectedAdress = (adresse) => {
    this.setState({
      numeroVoie: adresse.properties.housenumber,
      nomVoie: adresse.properties.street,
      codePostal: adresse.properties.postcode,
      commune: adresse.properties.city,
      inseeCommune: adresse.properties.citycode,
      adresseSelected: true,
    });

    setTimeout(() => {
      document.getElementById("numeroVoie").value = adresse.properties.housenumber;
      document.getElementById("nomVoie").value = adresse.properties.street;
      document.getElementById("codePostal").value = adresse.properties.postcode;
      document.getElementById("commune").value = adresse.properties.city;
    }, 800);
  };


  handleClickCancel = () => {
    this.setState(this.initialState);
    this.setState({numeroVoieOk: !!this.props.objPersonne.numeroVoie});
    this.props.handleCloseModalModificationCoordonnee();
  };


  handleCloseModal = () => {
    this.setState(this.initialState);
  };

  handleCloseModalValidate = () => {
    if (this.state.adresseSelected) {
      this.setState({
        showModal: false,
        numeroVoieOk: !!this.state.numeroVoie,
      });
    } else {
      this.alertFail("Veuillez sélectionner une adresse postale.");
    }
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  togglePasDeNumeroDeVoie = () => {
    this.setState({
      numeroVoieOk: !this.state.numeroVoieOk,
      numeroVoie: "",
    });
    document.getElementById("numeroVoie").value = "";
  };

  checkDenomination = (event) => {
    if (event.target.value.length < 1) {
      this.setState({
        inputStyleDenomination: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleDenomination: "",
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

  checkNumeroTelephone = (event) => {
    if (
      event.target.value.length > 10 ||
      !event.target.value.match(/^([0-9])*$/)
    ) {
      this.setState({
        inputStyleTelephone: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleTelephone: "",
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

  checkComplement = (event) => {
    if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleComplement: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleComplement: "",
      });
    }
  };

  checkCodePostal = (event) => {
    if (!event.target.value.match(/^([0-9])*$/)) {
      this.setState({
        inputStyleCodePostal: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCodePostal: "",
      });
    }
  };

  checkCommune = (event) => {
    if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleCommune: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCommune: "",
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

  render() {

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
            Déclaration de changement de coordonnées
            {this.props.numeroIdentification}
          </h4>
          <hr className="borderDeclarationCession" />
        </Row>
        <Row>
          <h5 className="informationAcheteur">
            Adresse et coordonnées de l'usager
          </h5>
          <hr className="borderBleuInformationAcheteur" />
        </Row>
        <form onSubmit={this.handleSubmit}>

          <Row style={{ marginTop: "5px" }}>
            <div className="form-inline">
              <Col style={{marginTop: "10px"}} xs={12} sm={12} md={3}>
                <label>Numéro de voie / Extension</label>
              </Col>
              <Col xs={12} sm={12} md={3}>
                <FormControl
                    type="text"
                    name="numeroVoie"
                    id="numeroVoie"
                    defaultValue={this.props.objPersonne.numeroVoie}
                    className={`${this.state.inputStyleNumeroVoie} form-control`}
                    onBlur={this.checkNumeroVoie}
                    onChange={this.handleChange}
                    disabled={!this.state.numeroVoieOk}
                    onFocus={() => {
                      if (this.state.listeAdresses.length !== 0) {
                        this.setState({adresseSelected: false});
                      }
                    }}
                />
              </Col>
            </div>
          </Row>


          <Row>
            <Col style={{marginTop: "8px"}} xs={12}>
              <Checkbox
                  type="checkbox"
                  checked={!this.state.numeroVoieOk}
                  onChange={this.togglePasDeNumeroDeVoie}
                  onFocus={() => {
                    if (this.state.listeAdresses.length !== 0) {
                      this.setState({adresseSelected: false});
                    }
                  }}
              >
                L’adresse ne comporte pas de numéro de voie
              </Checkbox>
            </Col>
          </Row>


          <Row style={{ marginTop: "5px" }}>
              <Col style={{ marginTop: "5px" }} xs={12} sm={12} md={3}>
                <label>Type et nom de voie</label>
              </Col>
            <Col xs={12} sm={12} md={6}>
              <FormControl
                  type="text"
                  name="nomVoie"
                  id="nomVoie"
                  className={`${this.state.inputStyleNomVoie} form-control`}
                  onBlur={this.checkNomVoie}
                  onChange={this.handleChange}
                  defaultValue={this.props.objPersonne.nomVoie}
                  onFocus={() => {
                    if (this.state.listeAdresses.length !== 0) {
                      this.setState({adresseSelected: false});
                    }
                  }}
              />
            </Col>
          </Row>

          <Row style={{marginTop: "5px"}}>
            <Col style={{marginTop: "10px"}} xs={12} md={3}>
              <label>Code postal</label>
            </Col>
            <Col xs={12} md={3}>
              <FormControl
                  type="text"
                  name="codePostal"
                  id="codePostal"
                  className={`${this.state.inputStyleCodePostal} form-control`}
                  onBlur={this.checkCodePostal}
                  onChange={this.handleChange}
                  defaultValue={this.props.objPersonne.codePostal}
              />
              </Col>
          </Row>


          <Row>
            <Col>
              <Button
                  bsSize="small"
                  bsStyle="info"
                  onClick={this.handleApiAdresse}
                  style={{marginTop: "40px", marginBottom: "20px", marginLeft: "10px"}}
                  disabled={
                    !(this.state.numeroVoie !== "" ||
                        this.state.nomVoie !== "" ||
                        this.state.codePostal !== "")
                  }
              >
                Rechercher
              </Button>
            </Col>
          </Row>

          {this.state.adresseSelected && (
              <>

                <Row>
                  <div className="form-inline">
                    <Col style={{marginTop: "5px"}} xs={12} md={3}>
                      <label>Commune</label>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                          type="text"
                          id="commune"
                          name="commune"
                          onChange={this.handleChange}
                          defaultValue={this.props.objPersonne.commune}
                      />
                    </Col>
                  </div>
                </Row>

              </>
          )}


          <Row style={{ marginTop: "5px" }}>
            <div className="form-inline">
              <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={6}>
                <label>Complément (Etage, Esc, App et/ou Immeuble)</label>
              </Col>
              <Col xs={12} sm={12} md={3}>
                <FormControl
                    type="text"
                    name="complement"
                    className={`${this.state.inputStyleComplement} form-control`}
                    onBlur={this.checkComplement}
                    onChange={this.handleChange}
                    defaultValue={this.props.typePersonne === "Physique" ? this.props.objPersonne.complementAdresse : this.props.objPersonne.entreeTourBatimentZi}
                />
              </Col>
            </div>
          </Row>

          {this.props.typePersonne === "Physique" && (
              <Row style={{marginTop: "5px"}}>
                <div className="form-inline">
                  <Col style={{marginTop: "10px"}} xs={12} sm={12} md={3}>
                    <label>Numéro de téléphone</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <FormControl
                        type="text"
                        name="numeroTelephone"
                        className={`${this.state.inputStyleTelephone} form-control`}
                        onBlur={this.checkNumeroTelephone}
                        onChange={this.handleChange}
                        defaultValue={this.props.objPersonne.numeroTelephone}
                    />
                  </Col>
                </div>
              </Row>
          )}



                {this.props.typePersonne === "Morale" && (
            <>
              <Row>
                <h5 className="informationAcheteur">Identité de l’usager </h5>
                <hr className="borderBleuInformationAcheteur" />
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <div className="form-inline">
                  <Col style={{ marginTop: "10px" }} xs={12} md={3}>
                    <label>Dénomination sociale</label>
                  </Col>
                  <Col xs={12} md={3}>
                    <FormControl
                      type="text"
                      name="denominationSociale"
                      onChange={this.handleChange}
                      defaultValue={
                        this.props.objPersonne.denominationRaisonSociale
                      }
                      className={`${this.state.inputStyleDenomination} form-control`}
                      onBlur={this.checkDenomination}
                    />
                  </Col>
                </div>

                <Col style={{ marginTop: "10px" }} xs={12} md={3}>
                  <ControlLabel>Joindre un extrait de KBIS</ControlLabel>
                </Col>
                <Col xs={12} md={3} style={{ marginTop: "10px" }}>
                  <FormGroup>
                    <span className="image-upload">
                      <label htmlFor="file-input2">
                        <FontAwesomeIcon
                          className="iconFiles"
                          size="1x"
                          icon={faPaperclip}
                        />
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      {!this.state.fileKbis?.name ? (
                        <span className="spanAucunFichier">
                          Aucun fichier selectionné
                        </span>
                      ) : (
                        <span className="spanAucunFichier">
                          {this.state.fileKbis.name}
                        </span>
                      )}
                      <FormControl
                        id="file-input2"
                        type="file"
                        name="fileKbis"
                        onChange={this.handleFileKbis}
                      />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      className="iconFiles"
                      size="1x"
                      icon={faTrashAlt}
                      onClick={this.resetFileKbis}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <div className="form-inline">
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Nom du représentant légal</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <FormControl
                      type="text"
                      name="nomRepresentant"
                      onChange={this.handleChange}
                      defaultValue={this.props.objPersonne.nomRepresentant}
                      className={`${this.state.inputStyleNom} form-control`}
                      onBlur={this.checkNom}
                    />
                  </Col>
                </div>

                <Col style={{ marginTop: "10px" }} xs={12} md={3}>
                  <ControlLabel>
                    Joindre une pièce d'identité du représentant
                  </ControlLabel>
                </Col>
                <Col xs={12} md={3} style={{ marginTop: "10px" }}>
                  <FormGroup>
                    <span className="image-upload">
                      <label htmlFor="file-input3">
                        <FontAwesomeIcon
                          className="iconFiles"
                          size="1x"
                          icon={faPaperclip}
                        />
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      {!this.state.fileId?.name ? (
                        <span className="spanAucunFichier">
                          Aucun fichier selectionné
                        </span>
                      ) : (
                        <span className="spanAucunFichier">
                          {this.state.fileId.name}
                        </span>
                      )}
                      <FormControl
                        id="file-input3"
                        type="file"
                        name="fileId"
                        onChange={this.handleFileId}
                      />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      className="iconFiles"
                      size="1x"
                      icon={faTrashAlt}
                      onClick={this.resetFileId}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <div className="form-inline">
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Prénom(s) du représentant légal</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <FormControl
                      type="text"
                      name="prenomRepresentant"
                      onChange={this.handleChange}
                      defaultValue={this.props.objPersonne.prenomRepresentant}
                      className={`${this.state.inputStylePrenom} form-control`}
                      onBlur={this.checkPrenom}
                    />
                  </Col>
                </div>
              </Row>
            </>
          )}



          <Row>
            <Col xs={12}>
              <Button
                      type="submit"
                      className="buttonValider">
                Valider
              </Button>
              <Button
                className="buttonAnnuler"
                onClick={this.handleClickCancel}
              >
                Annuler
              </Button>
            </Col>
          </Row>

          <AdresseModal
              showModal={this.state.showModal}
              handleCloseModal={this.handleCloseModal}
              handleCloseModalValidate={this.handleCloseModalValidate}
              listeAdresses={this.state.listeAdresses}
              selectedAdress={this.handleSelectedAdress}
          />

        </form>
      </Modal>
    );
  }
}

export default ModificationCoordonneeModal;
