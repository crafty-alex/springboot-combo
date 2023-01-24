import React, {Component} from "react";
import "../../static/css/pieceJointe-styles.css";
import {Button, Col, ControlLabel, FormControl, FormGroup, Row,} from "react-bootstrap";
import axios from "axios";
import "react-responsive-modal/styles.css";
import {Modal} from "react-responsive-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileSignature} from "@fortawesome/free-solid-svg-icons";
import {LoginContext} from "../util/LoginContext";
import {Loader} from "react-overlay-loader";
import NotificationAlert from "react-notification-alert";

export default class ModificationDemande extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.initialState = {
      open: false,
      loading: false,
      numeroTelephone: null,
      numeroVoie: null,
      nomVoie: null,
      complementAdresse: null,
        destinataireService: null,
        bpTriService: null,
        entreeTourBatimentZi: null,
      codePostal: null,
      commune: null,
      numeroSerieVin: null,
      type: null,
      marque: null,
      couleurDominante: null,
      modele: null,
      denominationRaisonSociale: null,
      nomRepresentant: null,
      prenomRepresentant: null,
    };

    this.state = this.initialState;
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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

  checkNomVoieMorale = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStyleNomVoieMorale: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNomVoieMorale: "",
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

    checkEntreeTourBatimentZi = (event) => {
        if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
            this.setState({
                inputStyleEntreeTourBatimentZi: "invalidInput",
            });
        } else {
            this.setState({
                inputStyleEntreeTourBatimentZi: "",
            });
        }
    };

    checkDestinataireService = (event) => {
        if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
            this.setState({
                inputStyleDestinataireService: "invalidInput",
            });
        } else {
            this.setState({
                inputStyleDestinataireService: "",
            });
        }
    };

    checkBpTriService = (event) => {
        if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
            this.setState({
                inputStyleBpTriService: "invalidInput",
            });
        } else {
            this.setState({
                inputStyleBpTriService: "",
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

  checkCodePostalMorale = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([0-9])*$/)
    ) {
      this.setState({
        inputStyleCodePostalMorale: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCodePostalMorale: "",
      });
    }
  };

  checkCommune = (event) => {
    if (!event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      this.setState({
        inputStyleCommune: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCommune: "",
      });
    }
  };

  checkCommuneMorale = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      this.setState({
        inputStyleCommuneMorale: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCommuneMorale: "",
      });
    }
  };

  checkNumeroSerie = (event) => {
    if (
      event.target.value.length < 1 ||
      event.target.value.length > 20 ||
      !event.target.value.match(/^([0-9a-zA-Z])*$/)
    ) {
      this.setState({
        inputStyleNumeroSerie: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumeroSerie: "",
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

  handleSubmit = (event) => {
    event.preventDefault();

    if (
      this.state.numeroTelephone === null &&
      this.state.nomVoie === null &&
      this.state.numeroVoie === null &&
      this.state.complementAdresse === null &&
      this.state.codePostal === null &&
      this.state.codePostal === null &&
      this.state.commune === null &&
      this.state.numeroSerieVin === null &&
      this.state.type === null &&
      this.state.marque === null &&
      this.state.couleurDominante === null &&
      this.state.modele === null &&
      this.state.denominationRaisonSociale === null &&
      this.state.nomRepresentant === null &&
      this.state.prenomRepresentant === null &&
        this.state.entreeTourBatimentZi === null &&
        this.state.bpTriService === null &&
        this.state.destinataireService === null
    ) {
      this.alertFail("Veuillez modifier au moins un des champs");
      return;
    }

    this.props.demande.statutDemandeId = 4;

    this.handleEngin();

    let {
      personneMoraleNonExistant,
      personneMoraleExistant,
    } = this.handlePersonneMorale();

    let {
      personnePhysiqueNonExistant,
      personnePhysiqueExistant,
    } = this.handlePersonnePhysique();

    this.setState({ loading: true });

    if (this.props.demande.contenuDemande.typeProprietaire === 1) {
      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_EDIT_DEMANDE_URL}`,
          this.props.demande
        )
        .then((response) => {
          if (personnePhysiqueNonExistant == null) {
            axios
              .post(
                `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_EDIT_PERSONNE_PHYSIQUE_URL}`,
                personnePhysiqueExistant
              )
              .then((response) => {
                this.submitEngin();
              })
              .catch(() => {
                this.alertFail("Merci de vérifier les informations saisies");
                setTimeout(() => window.location.reload(), 1500);
              });
          } else {
            this.submitEngin();
          }
        })
        .catch(() => {
          this.alertFail("Merci de vérifier les informations saisies");
          setTimeout(() => window.location.reload(), 1500);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_EDIT_DEMANDE_URL}`,
          this.props.demande
        )
        .then((response) => {
          if (personneMoraleNonExistant == null) {
            axios
              .post(
                `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_EDIT_PERSONNE_MORALE_URL}`,
                personneMoraleExistant
              )
              .then((response) => {
                axios
                  .post(
                    `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_EDIT_PERSONNE_PHYSIQUE_URL}`,
                    personnePhysiqueExistant
                  )
                  .then(() => {
                    this.submitEngin();
                  })
                  .catch(() => {
                    this.alertFail(
                      "Merci de vérifier les informations saisies"
                    );
                    setTimeout(() => window.location.reload(), 1500);
                  });
              })
              .catch(() => {
                this.alertFail("Merci de vérifier les informations saisies");
                setTimeout(() => window.location.reload(), 1500);
              });
          } else {
            axios
              .post(
                `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_EDIT_PERSONNE_PHYSIQUE_URL}`,
                personnePhysiqueExistant
              )
              .then(() => {
                this.submitEngin();
              })
              .catch(() => {
                this.alertFail("Merci de vérifier les informations saisies");
                setTimeout(() => window.location.reload(), 1500);
              });
          }
        })
        .catch(() => {
          this.alertFail("Merci de vérifier les informations saisies");
          setTimeout(() => window.location.reload(), 1500);
        });
    }
  };

  handlePersonneMorale = () => {
    let personneMoraleNonExistant = this.props.demande.contenuDemande
      .personneMorale;
    let personneMoraleExistant = this.props.personneMorale;

    if (personneMoraleExistant != null) {
      if (this.state.denominationRaisonSociale != null) {
        personneMoraleExistant.denominationRaisonSociale = this.state.denominationRaisonSociale.toUpperCase();
      }
      if (this.state.nomRepresentant != null) {
        personneMoraleExistant.nomRepresentant = this.state.nomRepresentant.toUpperCase();
      }
      if (this.state.prenomRepresentant != null) {
        personneMoraleExistant.prenomRepresentant = this.state.prenomRepresentant.toUpperCase();
      }
      if (this.state.numeroVoie != null) {
        personneMoraleExistant.numeroVoie = this.state.numeroVoie.toUpperCase();
      }

      if (this.state.nomVoie != null) {
        personneMoraleExistant.nomVoie = this.state.nomVoie.toUpperCase();
      }
        if (this.state.destinataireService != null) {
            personneMoraleExistant.destinataireService = this.state.destinataireService.toUpperCase();
        }
        if (this.state.bpTriService != null) {
            personneMoraleExistant.bpTriService = this.state.bpTriService.toUpperCase();
        }
      if (this.state.entreeTourBatimentZi != null) {
        personneMoraleExistant.entreeTourBatimentZi = this.state.entreeTourBatimentZi.toUpperCase();
      }
      if (this.state.codePostal != null) {
        personneMoraleExistant.codePostal = this.state.codePostal;
      }
      if (this.state.commune != null) {
        personneMoraleExistant.commune = this.state.commune.toUpperCase();
      }
    } else {
      if (this.state.denominationRaisonSociale != null) {
        personneMoraleNonExistant.denominationRaisonSociale = this.state.denominationRaisonSociale.toUpperCase();
      }
      if (this.state.nomRepresentant != null) {
        personneMoraleNonExistant.nomRepresentant = this.state.nomRepresentant.toUpperCase();
      }
      if (this.state.prenomRepresentant !== null) {
        personneMoraleNonExistant.prenomRepresentant = this.state.prenomRepresentant.toUpperCase();
      }
    }
    return { personneMoraleNonExistant, personneMoraleExistant };
  };

  submitEngin = () => {
    const { idRIO, service } = this.context;

    let trace = {
      profilUtilisateurId: 2,
      typeId: 5,
      demandeId: this.props.demande.demandeId,
      enginId: this.props.engin?.enginId,
      identifiantUsagerId: this.props.demande.identifiantUsagerId,
      personneMoraleId: this.props.demande.usager.personneMoraleId,
      personnePhysiqueId: this.props.demande.usager.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    if (this.props.engin.numeroIdentification != null) {
      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_EDIT_ENGIN_URL}`,
          this.props.engin
        )
        .then(() => {
          axios.post(
            `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
            trace
          );

          this.setState(this.initialState);
          this.alertSuccess("Modifications enregistrées");
          setTimeout(() => this.onCloseModal(), 1500);
          this.props.callBack();
        })
        .catch(() => {
          this.alertFail("Merci de vérifier les informations saisies");
          setTimeout(() => window.location.reload(), 1500);
        });
    } else {
      axios.post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
        trace
      );

      this.setState(this.initialState);
      this.alertSuccess("Modifications enregistrées");
      setTimeout(() => this.onCloseModal(), 1500);
      this.props.callBack();
    }
  };

  handlePersonnePhysique = () => {
    let personnePhysiqueNonExistant = this.props.demande.contenuDemande
      .personnePhysique;
    let personnePhysiqueExistant = this.props.demande.usager.personnePhysique;

    if (personnePhysiqueNonExistant != null) {
      if (this.state.numeroTelephone != null) {
        personnePhysiqueNonExistant.numeroTelephone = this.state.numeroTelephone;
      }
      if (this.state.numeroVoie != null) {
        personnePhysiqueNonExistant.numeroVoie = this.state.numeroVoie.toUpperCase();
      }
      if (this.state.nomVoie != null) {
        personnePhysiqueNonExistant.nomVoie = this.state.nomVoie.toUpperCase();
      }
      if (this.state.complementAdresse != null) {
        personnePhysiqueNonExistant.complementAdresse = this.state.complementAdresse.toUpperCase();
      }
      if (this.state.codePostal != null) {
        personnePhysiqueNonExistant.codePostal = this.state.codePostal;
      }
      if (this.state.commune != null) {
        personnePhysiqueNonExistant.commune = this.state.commune.toUpperCase();
      }
    } else {
      if (this.state.numeroTelephone != null) {
        personnePhysiqueExistant.numeroTelephone = this.state.numeroTelephone;
      }
      if (this.state.numeroVoie != null) {
        personnePhysiqueExistant.numeroVoie = this.state.numeroVoie.toUpperCase();
      }

      if (this.state.nomVoie != null) {
        personnePhysiqueExistant.nomVoie = this.state.nomVoie.toUpperCase();
      }
      if (this.state.complementAdresse != null) {
        personnePhysiqueExistant.complementAdresse = this.state.complementAdresse.toUpperCase();
      }
      if (this.state.codePostal != null) {
        personnePhysiqueExistant.codePostal = this.state.codePostal;
      }
      if (this.state.commune != null) {
        personnePhysiqueExistant.commune = this.state.commune.toUpperCase();
      }
    }
    return { personnePhysiqueNonExistant, personnePhysiqueExistant };
  };

  handleEngin = () => {
    let engin = this.props.demande.contenuDemande.engin;
    if (this.props.engin.numeroIdentification != null) {
      engin = this.props.engin;
    }

    if (this.state.type != null) {
      this.props.ref_types_engin.forEach((t) => {
        if (this.state.type === t.libelleLong) {
          engin.typeEnginId = t.typeEnginId;
        }
      });
    }
    if (this.state.marque != null) {
      this.props.ref_marques.forEach((m) => {
        if (this.state.marque === m.libelleLong) {
          engin.marqueId = m.marqueId;
        }
      });
    }
    if (this.state.couleurDominante != null) {
      this.props.ref_couleurs.forEach((c) => {
        if (this.state.couleurDominante === c.libelleLong) {
          engin.couleurDominanteId = c.couleurDominanteId;
        }
      });
    }

    if (this.state.modele != null) {
      engin.modele = this.state.modele.toUpperCase();
    }
    if (this.state.numeroSerieVin != null) {
      engin.numeroSerieVin = this.state.numeroSerieVin.toUpperCase();
    }
  };

  alertSuccess = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message}</strong>
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
    const { roles } = this.context;

    let engin = this.props.demande.contenuDemande.engin;
    if (this.props.engin.numeroIdentification != null) {
      engin = this.props.engin;
    }
    let modele = engin?.modele;
    let numeroSerieVin = engin?.numeroSerieVin;
    let couleurDominante;
    let marque;
    let type;

    if (engin != null) {
      this.props.ref_couleurs.forEach((c) => {
        if (engin.couleurDominanteId === c.couleurDominanteId) {
          couleurDominante = c.libelleLong;
        }
      });

      this.props.ref_marques.forEach((m) => {
        if (engin.marqueId === m.marqueId) {
          marque = m.libelleLong;
        }
      });

      this.props.ref_types_engin.forEach((t) => {
        if (engin.typeEnginId === t.typeEnginId) {
          type = t.libelleLong;
        }
      });
    }

    let numeroTelephone;
    let numeroVoie;
    let nomVoie;
    let complementAdresse;
    let codePostal;
    let commune;

    let personnePhysiqueNonExistant = this.props.demande.contenuDemande
      .personnePhysique;
    let personnePhysiqueExistant = this.props.demande.usager.personnePhysique;

    if (personnePhysiqueNonExistant != null) {
      numeroTelephone = personnePhysiqueNonExistant.numeroTelephone;
      numeroVoie = personnePhysiqueNonExistant.numeroVoie;
      nomVoie = personnePhysiqueNonExistant.nomVoie;
      complementAdresse = personnePhysiqueNonExistant.complementAdresse;
      codePostal = personnePhysiqueNonExistant.codePostal;
      commune = personnePhysiqueNonExistant.commune;
    } else {
      numeroTelephone = personnePhysiqueExistant?.numeroTelephone;
      numeroVoie = personnePhysiqueExistant?.numeroVoie;
      nomVoie = personnePhysiqueExistant?.nomVoie;
      complementAdresse = personnePhysiqueExistant?.complementAdresse;
      codePostal = personnePhysiqueExistant?.codePostal;
      commune = personnePhysiqueExistant?.commune;
    }

    let denominationRaisonSociale;
    let nomRepresentant;
    let prenomRepresentant;
    let numeroVoieMorale;
    let nomVoieMorale;
    let entreeTourBatimentZi;
      let destinataireService;
      let bpTriService;
    let codePostalMorale;
    let communeMorale;

    let personneMoraleNonExistant = this.props.demande.contenuDemande
      .personneMorale;
    let personneMoraleExistant = this.props.personneMorale;

    if (personneMoraleExistant != null) {
      denominationRaisonSociale =
          personneMoraleExistant.denominationRaisonSociale;
      nomRepresentant = personneMoraleExistant.nomRepresentant;
      prenomRepresentant = personneMoraleExistant.prenomRepresentant;
      numeroVoieMorale = personneMoraleExistant.numeroVoie;
      nomVoieMorale = personneMoraleExistant.nomVoie;
      entreeTourBatimentZi = personneMoraleExistant.entreeTourBatimentZi;
        destinataireService = personneMoraleExistant.destinataireService;
        bpTriService = personneMoraleExistant.bpTriService;
      codePostalMorale = personneMoraleExistant.codePostal;
      communeMorale = personneMoraleExistant.commune;
    } else {
      denominationRaisonSociale =
        personneMoraleNonExistant?.denominationRaisonSociale;
      nomRepresentant = personneMoraleNonExistant?.nomRepresentant;
      prenomRepresentant = personneMoraleNonExistant?.prenomRepresentant;
      numeroVoieMorale = personneMoraleNonExistant?.numeroVoie;
      nomVoieMorale = personneMoraleNonExistant?.nomVoie;
      entreeTourBatimentZi = personneMoraleNonExistant?.entreeTourBatimentZi;
        destinataireService = personneMoraleNonExistant?.destinataireService;
        bpTriService = personneMoraleNonExistant?.bpTriService;
      codePostalMorale = personneMoraleNonExistant?.codePostal;
      communeMorale = personneMoraleNonExistant?.commune;
    }

    return (
      <>
        <div>
          {roles.includes("agent") && (
            <FontAwesomeIcon
              size="3x"
              icon={faFileSignature}
              onClick={this.onOpenModal}
            />
          )}

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
                Modification de la déclaration n° {""}
                {this.props.demande.numeroDemande}
              </h4>
              <hr className="borderDeclarationCession" />
            </Row>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <h5 className="informationAcheteur">
                  Informations du déclarant
                </h5>
                <hr className="borderBleuInformationAcheteur" />
              </Row>

              {this.props.demande.contenuDemande.typeProprietaire === 1 ? (
                <>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>N° de téléphone</ControlLabel>
                        <FormControl
                          type="text"
                          name="numeroTelephone"
                          className={`${this.state.inputStyleTelephone} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkNumeroTelephone}
                          defaultValue={numeroTelephone}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>N° de voie</ControlLabel>
                        <FormControl
                          type="text"
                          name="numeroVoie"
                          className={`${this.state.inputStyleNumeroVoie} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkNumeroVoie}
                          defaultValue={numeroVoie}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Nom de voie</ControlLabel>
                        <FormControl
                          type="text"
                          name="nomVoie"
                          className={`${this.state.inputStyleNomVoie} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkNomVoie}
                          defaultValue={nomVoie}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Complément</ControlLabel>

                        <FormControl
                          type="text"
                          name="complementAdresse"
                          className={`${this.state.inputStyleComplement} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkComplement}
                          defaultValue={complementAdresse}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Code postal</ControlLabel>
                        <FormControl
                          type="text"
                          name="codePostal"
                          className={`${this.state.inputStyleCodePostal} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkCodePostal}
                          defaultValue={codePostal}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Commune</ControlLabel>
                        <FormControl
                          type="text"
                          name="commune"
                          className={`${this.state.inputStyleCommune} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkCommune}
                          defaultValue={commune}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Raison sociale</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={denominationRaisonSociale}
                          onChange={this.handleChange}
                          name="denominationRaisonSociale"
                          className={`${this.state.inputStyleDenomination}`}
                          onBlur={this.checkDenomination}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Nom du représentant </ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={nomRepresentant}
                          onChange={this.handleChange}
                          name="nomRepresentant"
                          className={`${this.state.inputStyleNom}`}
                          onBlur={this.checkNom}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Prénom(s) du représentant </ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={prenomRepresentant}
                          onChange={this.handleChange}
                          name="prenomRepresentant"
                          className={`${this.state.inputStylePrenom}`}
                          onBlur={this.checkPrenom}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>N° de téléphone du contact</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={numeroTelephone}
                          onChange={this.handleChange}
                          name="numeroTelephone"
                          className={`${this.state.inputStyleTelephone}`}
                          onBlur={this.checkTelephone}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>N° de voie</ControlLabel>
                        <FormControl
                          type="text"
                          name="numeroVoie"
                          className={`${this.state.inputStyleNumeroVoie} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkNumeroVoie}
                          defaultValue={numeroVoieMorale}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Nom de voie</ControlLabel>
                        <FormControl
                          type="text"
                          name="nomVoie"
                          className={`${this.state.inputStyleNomVoieMorale} form-control`}
                          onChange={this.handleChange}
                          onBlur={this.checkNomVoieMorale}
                          defaultValue={nomVoieMorale}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                          <ControlLabel>Entrée - Tour - Bâtiment</ControlLabel>
                        <FormControl
                            defaultValue={entreeTourBatimentZi}
                            type="text"
                            name="entreeTourBatimentZi"
                            onChange={this.handleChange}
                            className={`${this.state.inputStyleEntreeTourBatimentZi}`}
                            onBlur={this.checkEntreeTourBatimentZi}
                        />
                      </FormGroup>
                    </Col>
                      <Col xs={12} sm={4}>
                          <FormGroup>
                              <ControlLabel>Destinataire - Service</ControlLabel>
                              <FormControl
                                  defaultValue={destinataireService}
                                  type="text"
                                  name="destinataireService"
                                  onChange={this.handleChange}
                                  className={`${this.state.inputStyleDestinataireService}`}
                                  onBlur={this.checkDestinataireService}
                              />
                          </FormGroup>
                      </Col>
                      <Col xs={12} sm={4}>
                          <FormGroup>
                              <ControlLabel>BP - Tri - Service</ControlLabel>
                              <FormControl
                                  defaultValue={bpTriService}
                                  type="text"
                                  name="bpTriService"
                                  onChange={this.handleChange}
                                  className={`${this.state.inputStyleBpTriService}`}
                                  onBlur={this.checkBpTriService}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <FormGroup>
                                <ControlLabel>Code postal</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="codePostal"
                                    className={`${this.state.inputStyleCodePostalMorale} form-control`}
                                    onChange={this.handleChange}
                                    onBlur={this.checkCodePostalMorale}
                                    defaultValue={codePostalMorale}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={4}>
                            <FormGroup>
                                <ControlLabel>Commune</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="commune"
                                    className={`${this.state.inputStyleCommuneMorale} form-control`}
                                    onChange={this.handleChange}
                                    onBlur={this.checkCommuneMorale}
                                    defaultValue={communeMorale}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </>
              )}

              {this.props.demande.contenuDemande.engin != null && (
                <>
                  <Row>
                    <h5 className="informationAcheteur">
                      Informations de l'engin
                    </h5>
                    <hr className="borderBleuInformationAcheteur" />
                  </Row>

                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>N° de série</ControlLabel>
                        <FormControl
                          defaultValue={numeroSerieVin}
                          type="text"
                          name="numeroSerieVin"
                          onChange={this.handleChange}
                          className={`${this.state.inputStyleNumeroSerie}`}
                          onBlur={this.checkNumeroSerie}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Marque</ControlLabel>
                        <FormControl
                          defaultValue={marque}
                          componentClass="select"
                          type="text"
                          name="marque"
                          onChange={this.handleChange}
                        >
                          {this.props.ref_marques != null &&
                            this.props.ref_marques.map((t, index) => (
                              <option key={index}>{t.libelleLong}</option>
                            ))}
                        </FormControl>
                      </FormGroup>
                    </Col>

                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Modèle</ControlLabel>
                        <FormControl
                          defaultValue={modele}
                          type="text"
                          name="modele"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Type</ControlLabel>
                        <FormControl
                          defaultValue={type}
                          componentClass="select"
                          type="text"
                          name="type"
                          onChange={this.handleChange}
                        >
                          {this.props.ref_types_engin != null &&
                            this.props.ref_types_engin.map((t, index) => (
                              <option key={index}>{t.libelleLong}</option>
                            ))}
                        </FormControl>
                      </FormGroup>
                    </Col>

                    <Col xs={12} sm={4}>
                      <FormGroup>
                        <ControlLabel>Couleur</ControlLabel>
                        <FormControl
                          defaultValue={couleurDominante}
                          componentClass="select"
                          type="text"
                          name="couleurDominante"
                          onChange={this.handleChange}
                        >
                          {this.props.ref_couleurs != null &&
                            this.props.ref_couleurs.map((t, index) => (
                              <option key={index}>{t.libelleLong}</option>
                            ))}
                        </FormControl>
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              )}

              <Row>
                <Col xs={12}>
                  <Button type="submit" className="buttonValider">
                    Enregistrer les modifications
                  </Button>
                  <Button className="buttonAnnuler" onClick={this.onCloseModal}>
                    Annuler
                  </Button>
                </Col>
              </Row>
            </form>
          </Modal>
        </div>
      </>
    );
  }
}
