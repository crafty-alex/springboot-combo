import React, {Component} from "react";
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";
import FicheUsagerExistModal from "./FicheUsagerExistModal";
import "moment/locale/fr";
import Datetime from "react-datetime";
import moment from "moment";

export class DeclarationTitulaireModal extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_pays = JSON.parse(localStorage.getItem("ref_pays"));
    this.ref_civilites = JSON.parse(localStorage.getItem("ref_civilites"));
    this.state = {
      isAcheteurPersonnePhysique: true,
      engin: this.props.engin,
      loading: false,
      open: false,
      showModalFicheUsagerExistModal: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalDeclarationTitulaireModal) {
      return { open: nextProps.showModalDeclarationTitulaireModal };
    }
    return null;
  }

  toggleModalFicheUsagerExistModal = () => {
    this.setState({
      showModalFicheUsagerExistModal: !this.state
        .showModalFicheUsagerExistModal,
    });
  };

  handleCloseModalFicheUsagerExistModal = () => {
    this.setState({ showModalFicheUsagerExistModal: false });
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
    if (date.toDate() > dateToday || !date._isValid) {
      this.setState({
        inputStyleDate: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleDate: "",
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

  checkCodeVente = (event) => {
    if (event.target.value.length !== 12) {
      this.setState({
        inputStyleCodeVente: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCodeVente: "",
      });
    }
  };

  checkSiretRna = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-0-9-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStyleSiretRna: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleSiretRna: "",
      });
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

    let nomNaissanceAcheteurUpperCase =
      this.state.nomNaissanceAcheteur != null
        ? this.state.nomNaissanceAcheteur.toUpperCase()
        : this.state.nomNaissanceAcheteur;

    let prenomAcheteurUpperCase =
      this.state.prenomAcheteur != null
        ? this.state.prenomAcheteur.toUpperCase()
        : this.state.prenomAcheteur;

    let paysNaissanceUpperCase =
      this.state.paysNaissance != null
        ? this.state.paysNaissance.toUpperCase()
        : this.state.paysNaissance;

    let communeNaissanceUpperCase =
      this.state.communeNaissance != null
        ? this.state.communeNaissance.toUpperCase()
        : this.state.communeNaissance;

    let raisonSocialeAcheteurUpperCase =
      this.state.raisonSocialeAcheteur != null
        ? this.state.raisonSocialeAcheteur.toUpperCase()
        : this.state.raisonSocialeAcheteur;

    let data = {
      codeVente: this.state.codeVente,
      dateNaissance: this.state.dateNaissance,
      numeroSiretRna: this.state.numeroSiretRna,
      acheteurPersonnePhysique: this.state.isAcheteurPersonnePhysique,
      civiliteAcheteur: this.state.civiliteAcheteur,
      nomNaissanceAcheteur: nomNaissanceAcheteurUpperCase,
      prenomAcheteur: prenomAcheteurUpperCase,
      paysNaissance: paysNaissanceUpperCase,
      communeNaissance: communeNaissanceUpperCase,
      statutJuridiqueAcheteur: this.state.statutJuridiqueAcheteur,
      raisonSocialeAcheteur: raisonSocialeAcheteurUpperCase,
      engin: this.props.engin,
    };

    let trace = {
      profilUtilisateurId: 2,
      typeId: 23,
      demandeId: 0,
      enginId: this.props.engin.enginId,
      identifiantUsagerId: 0,
      personneMoraleId: this.props.engin.personneMoraleId,
      personnePhysiqueId: this.props.engin.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    let civiliteId;
    if (this.ref_civilites != null) {
      this.ref_civilites.forEach((c) => {
        if (this.state.civiliteAcheteur === c.libelleLong) {
          civiliteId = c.civiliteId;
        }
      });
    }

    this.setState({ loading: true });
    if (this.state.isAcheteurPersonnePhysique) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_PHYSIQUE_BY_DONNEES_PIVOT_URL}`,
          {
            params: {
              nomNaissance: data.nomNaissanceAcheteur,
              prenom: data.prenomAcheteur,
              civiliteId: civiliteId,
              dateNaissance: data.dateNaissance,
              paysNaissance: data.paysNaissance,
              communeNaissance: data.communeNaissance,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            trace.identifiantUsagerId =
              response.data.usager.identifiantUsagerId;
            trace.personnePhysiqueId = response.data.personnePhysiqueId;
            axios
              .post(
                `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_DECLARATION_TITULAIRE_URL}`,
                data
              )
              .then((response) => {
                this.setState({
                  loading: false,
                  communeSelectOptions: [],
                });
                trace.demandeId = response.data;
                axios.post(
                  `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
                  trace
                );
                this.alertSuccess("Modifications enregistrées");
                setTimeout(
                  () => this.props.handleCloseModalDeclarationTitulaireModal(),
                  1500
                );
                this.props.fetchEnginInfo();
              })
              .catch((response) => {
                this.setState({
                  loading: false,
                  communeSelectOptions: [],
                });
                if (response.response.data === "Le code vente est erroné") {
                  this.alertFail(
                    "Le code de vente saisi est erroné. Merci de saisir un code de vente valide"
                  );
                } else {
                  this.alertFail("Merci de vérifier les informations saisies");
                }
              });
          } else {
            this.setState({
              loading: false,
              communeSelectOptions: [],
            });

            this.props.handleCloseModalDeclarationTitulaireModal();
            this.toggleModalFicheUsagerExistModal();
          }
        })
        .catch(() => {
          this.setState({
            loading: false,
            communeSelectOptions: [],
          });
          this.alertFail("Merci de vérifier les informations saisies");
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_MORALE_BY_DONNEES_PIVOT_URL}`,
          {
            params: {
              statutJuridique: data.statutJuridiqueAcheteur,
              numeroSiretRna: data.numeroSiretRna,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            trace.identifiantUsagerId =
              response.data.usager.identifiantUsagerId;
            trace.personneMoraleId = response.data.personneMoraleId;
            axios
              .post(
                `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_DECLARATION_TITULAIRE_URL}`,
                data
              )
              .then((response) => {
                this.setState({
                  loading: false,
                  communeSelectOptions: [],
                });

                trace.demandeId = response.data;
                axios.post(
                  `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
                  trace
                );
                this.alertSuccess("Modifications enregistrées");
                setTimeout(
                  () => this.props.handleCloseModalDeclarationTitulaireModal(),
                  1500
                );
                this.props.fetchEnginInfo();
              })
              .catch(() => {
                this.setState({
                  loading: false,
                  communeSelectOptions: [],
                });
                this.alertFail("Merci de vérifier les informations saisies");
              });
          } else {
            this.setState({
              loading: false,
              communeSelectOptions: [],
            });

            this.props.handleCloseModalDeclarationTitulaireModal();
            this.toggleModalFicheUsagerExistModal();
          }
        })
        .catch(() => {
          this.setState({
            loading: false,
            communeSelectOptions: [],
          });
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
              Déclaration de changement de titulaire de l'engin N°
              {this.props.numeroIdentification}
            </h4>
            <hr className="borderDeclarationCession" />
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row style={{ marginTop: "20px" }}>
              <div>
                <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                  <label>Code de vente unique</label>
                </Col>
                <Col xs={12} sm={12} md={3}>
                  <input
                    type="text"
                    name="codeVente"
                    className={`${this.state.inputStyleCodeVente} form-control`}
                    onChange={this.handleChange}
                    onBlur={this.checkCodeVente}
                    required
                  />
                </Col>
              </div>
            </Row>
            <Row>
              <h5 className="informationAcheteur">
                Informations de l'acheteur
              </h5>
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
                        className={`${this.state.inputStyleNom} form-control largeurInput`}
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
                        className={`${this.state.inputStylePrenom} form-control largeurInput`}
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
                    <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                      <label>Date de naissance</label>
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
                      <label>Pays de naissance</label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <FormGroup>
                        <FormControl
                          componentClass="select"
                          type="text"
                          name="paysNaissance"
                          onChange={this.handleChange}
                        >
                          <option value="">Tout afficher</option>
                          {this.ref_pays != null &&
                            this.ref_pays.map((s, index) => (
                              <option key={index}>{s.libelleLong}</option>
                            ))}
                        </FormControl>
                      </FormGroup>
                    </Col>
                  </div>
                </Row>

                <Row>

                  <div>
                    <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                      <label>Commune de naissance</label>
                    </Col>

                    <Col xs={12} md={3}>
                        <FormControl
                            name="communeNaissance"
                            type="text"
                            onChange={this.handleChange}
                            className={`${this.state.inputStyleCommuneNaissance} form-control largeurInput`}
                            onBlur={this.checkCommuneNaissance}
                      >
                        </FormControl>
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
                      id="societe"
                      name="statutJuridiqueAcheteur"
                      value="societe"
                      onChange={this.handleChange}
                      required
                      className="largeurInput"
                    />
                    <label htmlFor="societe">Société</label>
                  </Col>
                  <Col xs={12} sm={4} md={4}>
                    <input
                      style={{ marginRight: "5px" }}
                      type="radio"
                      id="association"
                      name="statutJuridiqueAcheteur"
                      value="association"
                      onChange={this.handleChange}
                      required
                      className="largeurInput"
                    />
                    <label htmlFor="association">Association</label>
                  </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <div>
                    <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                      <label>Raison sociale</label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input
                        type="text"
                        className={`${this.state.inputStyleDenomination} form-control largeurInput`}
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
                      <label>N°SIRET / N°RNA</label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input
                        type="text"
                        name="numeroSiretRna"
                        className={`${this.state.inputStyleSiretRna} form-control largeurInput`}
                        onChange={this.handleChange}
                        onBlur={this.checkSiretRna}
                        required
                      />
                    </Col>
                  </div>
                </Row>
              </>
            )}

            <Row>
              <Col xs={12}>
                <Button className="buttonValider" type="submit">
                  Valider
                </Button>
                <Button
                  className="buttonAnnuler"
                  onClick={() => {
                    this.setState({
                      communeSelectOptions: [],
                      inputStyleDate: "",
                      inputStyleNom: "",
                      inputStylePrenom: "",
                      inputStyleDenomination: "",
                      inputStyleCodeVente: "",
                      inputStyleSiretRna: "",
                      inputStyleCommuneNaissance: "",
                    });
                    this.props.handleCloseModalDeclarationTitulaireModal();
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
      </>
    );
  }
}

export default DeclarationTitulaireModal;
