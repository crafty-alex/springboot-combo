import React, {Component} from "react";
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";
import "moment/locale/fr";
import {faFileSignature, faPaperclip, faTrashAlt,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModificationNumeroSiretRnaModal from "./ModificationNumeroSiretRnaModal";
import ListePersonnePhysiquePourContactModal from "./ListePersonnePhysiquePourContactModal";

export class DeclarationContactPersonneMorale extends Component {
  static contextType = LoginContext;
  state = {
    trace: {},
    fileKbis: {},
    fileCni: {},
    loading: false,
    open: false,
    showModalDeclarationContactPersonneMorale: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !== nextProps.showModalDeclarationContactPersonneMorale
    ) {
      return { open: nextProps.showModalDeclarationContactPersonneMorale };
    }
    return null;
  }

  checkNomContact = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStyleNomContact: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNomContact: "",
      });
    }
  };

  checkPrenomContact = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStylePrenomContact: "invalidInput",
      });
    } else {
      this.setState({
        inputStylePrenomContact: "",
      });
    }
  };

  handleCloseModalDeclarationContactPersonneMorale = () => {
    this.setState({
      fileKbis: {},
      fileCni: {},
      inputStylePrenomContact: "",
      inputStyleNomContact: "",
    });
    this.props.handleCloseModalDeclarationContactPersonneMorale();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { idRIO, service } = this.context;

    if (
      this.state.civilite == null &&
      this.state.nomContact == null &&
      this.state.prenomContact == null
    ) {
      this.alertFail("Veuillez modifier au moins un des champs du contact");
      return;
    }

    if (
      !(this.state.fileKbis instanceof File) ||
      !(this.state.fileCni instanceof File)
    ) {
      this.alertFail("Veuillez choisir les pièces justificatives");
      return;
    }

    let civiliteUpperCase =
      this.state.civilite != null
        ? this.state.civilite
        : this.props.objPersonne.usager?.personnePhysique.civilite.libelleLong;

    let nomContactUpperCase =
      this.state.nomContact != null
        ? this.state.nomContact.toUpperCase()
        : this.props.objPersonne.usager?.personnePhysique.nomNaissance;

    let prenomContactUpperCase =
      this.state.prenomContact != null
        ? this.state.prenomContact.toUpperCase()
        : this.props.objPersonne.usager?.personnePhysique.prenom;

    let data = {
      civilite: civiliteUpperCase,
      nomContact: nomContactUpperCase,
      prenomContact: prenomContactUpperCase,
      personneMorale: this.props.objPersonne,
      representant: this.state.representant,
    };

    this.setState({ data: data });

    let trace = {
      profilUtilisateurId: 2,
      typeId: 16,
      demandeId: 0,
      identifiantUsagerId: this.props.objPersonne.usager?.identifiantUsagerId,
      personneMoraleId: this.props.objPersonne?.personneMoraleId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    this.setState({ trace: trace });

    this.setState({ loading: true });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_PERSONNE_PHYSIQUE_BY_DONNEES_PIVOT_URL}`,
        {
          params: {
            civilite: data.civilite,
            nomContact: data.nomContact,
            prenomContact: data.prenomContact,
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.length !== 0) {
          this.setState({
            loading: false,
          });
          this.setState({ listePersonnePhysiques: response.data });
          this.toggleModalListePersonnePhysiquePourContactModal();
        } else {
          this.setState({ loading: false });
          this.alertFail("Merci de vérifier les informations saisies");
        }
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
  }

  alertFail(message) {
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
  }

  handleFileKbis = (e) => {
    this.setState({ fileKbis: e.target.files[0] });
    e.target.value = "";
  };

  handleFileCni = (e2) => {
    this.setState({ fileCni: e2.target.files[0] });
    e2.target.value = "";
  };

  resetFileKbis = () => {
    this.setState({ fileKbis: {} });
  };

  resetFileCni = () => {
    this.setState({ fileCni: {} });
  };

  handleCloseModalModificationNumeroSiretRnaModal = () => {
    this.setState({ showModalModificationNumeroSiretRnaModal: false });
  };

  toggleModalModificationNumeroSiretRnaModal = () => {
    this.setState({
      showModalModificationNumeroSiretRnaModal: !this.state
        .showModalModificationNumeroSiretRnaModal,
    });
  };

  handleCloseModalListePersonnePhysiquePourContactModal = () => {
    this.setState({ showModalListePersonnePhysiquePourContactModal: false });
  };

  toggleModalListePersonnePhysiquePourContactModal = () => {
    this.setState({
      showModalListePersonnePhysiquePourContactModal: !this.state
        .showModalListePersonnePhysiquePourContactModal,
    });
  };

  render() {
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
              Déclarer un contact pour la personne morale
            </h4>
            <hr className="borderDeclarationCession" />
          </Row>
          <form onSubmit={this.handleSubmit}>
            <>
              <Row>
                <div>
                  <Col style={{ marginTop: "20px", marginLeft: "20px" }}>
                    <b>Numéro SIRET / Numéro RNA :</b>{" "}
                    {this.props.objPersonne?.numeroSiret != null
                      ? this.props.objPersonne?.numeroSiret
                      : this.props.objPersonne?.numeroRna}{" "}
                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      className="iconFiles"
                      size="2x"
                      icon={faFileSignature}
                      onClick={this.toggleModalModificationNumeroSiretRnaModal}
                    />
                  </Col>
                </div>
              </Row>
              <Row
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Col xs={12} sm={3} md={3}>
                  <label>Civilité du contact</label>
                </Col>
                <Col xs={12} sm={3} md={3}>
                  <input
                    defaultChecked={
                      this.props.objPersonne.usager?.personnePhysique
                        .civiliteId === 2
                    }
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="monsieur"
                    name="civilite"
                    value="Monsieur"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="monsieur">Monsieur</label>
                </Col>
                <Col xs={12} sm={4} md={4}>
                  <input
                    defaultChecked={
                      this.props.objPersonne.usager?.personnePhysique
                        .civiliteId === 1
                    }
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="madame"
                    name="civilite"
                    value="Madame"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="madame">Madame</label>
                </Col>
              </Row>

              <Row style={{ marginTop: "20px" }}>
                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Nom du contact</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      defaultValue={
                        this.props.objPersonne.usager?.personnePhysique
                          ?.nomNaissance
                      }
                      type="text"
                      name="nomContact"
                      className={`${this.state.inputStyleNomContact} form-control largeurInput`}
                      onChange={this.handleChange}
                      onBlur={this.checkNomContact}
                      required
                    />
                  </Col>
                </div>

                <div>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                    <label>Prénom(s) du contact</label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      defaultValue={
                        this.props.objPersonne.usager?.personnePhysique?.prenom
                      }
                      type="text"
                      className={`${this.state.inputStylePrenomContact} form-control largeurInput`}
                      name="prenomContact"
                      onChange={this.handleChange}
                      onBlur={this.checkPrenomContact}
                      required
                    />
                  </Col>
                </div>
              </Row>

              <Row
                style={{
                  marginTop: "30px",
                  marginLeft: "40px",
                  marginBottom: "-100px",
                }}
              >
                <Col style={{ marginTop: "10px" }} xs={12}>
                  <FormGroup>
                    <span>
                      Joindre un <b>extrait de KBIS</b>
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="image-upload">
                      <label htmlFor="file-input">
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
                        id="file-input"
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

              <Row
                style={{
                  marginTop: "30px",
                  marginLeft: "40px",
                  marginBottom: "-100px",
                }}
              >
                <Col style={{ marginTop: "10px" }} xs={12}>
                  <FormGroup>
                    <span>
                      Joindre une <b>pièce d'identité du représentant</b>
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="image-upload">
                      <label htmlFor="file-input2">
                        <FontAwesomeIcon
                          className="iconFiles"
                          size="1x"
                          icon={faPaperclip}
                        />
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      {!this.state.fileCni?.name ? (
                        <span className="spanAucunFichier">
                          Aucun fichier selectionné
                        </span>
                      ) : (
                        <span className="spanAucunFichier">
                          {this.state.fileCni.name}
                        </span>
                      )}
                      <FormControl
                        id="file-input2"
                        type="file"
                        name="fileCni"
                        onChange={this.handleFileCni}
                      />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      className="iconFiles"
                      size="1x"
                      icon={faTrashAlt}
                      onClick={this.resetFileCni}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row
                style={{
                  marginTop: "30px",
                  marginLeft: "40px",
                  marginBottom: "-100px",
                }}
              >
                <Col xs={12} sm={6}>
                  <span>
                    {" "}
                    Ce nouveau contact est-il le représentant légal de
                    l’organisation ?
                  </span>
                </Col>
                <Col xs={12} sm={2}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="oui"
                    name="representant"
                    value="oui"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="oui">Oui</label>
                </Col>
                <Col xs={12} sm={2}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="non"
                    name="representant"
                    value="non"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="non">Non</label>
                </Col>
              </Row>
            </>

            <Row>
              <Col xs={12}>
                <Button className="buttonValider" type="submit">
                  Valider
                </Button>
                <Button
                  className="buttonAnnuler"
                  onClick={
                    this.handleCloseModalDeclarationContactPersonneMorale
                  }
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </form>
        </Modal>

        <ModificationNumeroSiretRnaModal
          showModalModificationNumeroSiretRnaModal={
            this.state.showModalModificationNumeroSiretRnaModal
          }
          handleCloseModalModificationNumeroSiretRnaModal={
            this.handleCloseModalModificationNumeroSiretRnaModal
          }
          objPersonne={this.props.objPersonne}
          fetchInfoUsager={this.props.fetchInfoUsager}
          trace={this.state.trace}
        />
        <ListePersonnePhysiquePourContactModal
          showModalListePersonnePhysiquePourContactModal={
            this.state.showModalListePersonnePhysiquePourContactModal
          }
          handleCloseModalListePersonnePhysiquePourContactModal={
            this.handleCloseModalListePersonnePhysiquePourContactModal
          }
          handleCloseModalDeclarationContactPersonneMorale={
            this.handleCloseModalDeclarationContactPersonneMorale
          }
          listePersonnePhysiques={this.state.listePersonnePhysiques}
          objPersonne={this.props.objPersonne}
          representant={this.state.representant}
          trace={this.state.trace}
          fetchInfoUsager={this.props.fetchInfoUsager}
          fileKbis={this.state.fileKbis}
          fileCni={this.state.fileCni}
        />
      </>
    );
  }
}

export default DeclarationContactPersonneMorale;
