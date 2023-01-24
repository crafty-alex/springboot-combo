import React, {Component} from "react";
import "../../static/css/dossier-styles.css";
import IdentiteNouveauDossier from "./IdentiteNouveauDossier";
import PersonnePhysiqueDejaExistanteModal from "./PersonnePhysiqueDejaExistanteModal";
import EnginNouveauDossier from "./EnginNouveauDossier";
import {Button, Col, Row} from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";

export default class NouveauDossier extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_civilites = JSON.parse(localStorage.getItem("ref_civilites"));
    this.ref_marques = JSON.parse(localStorage.getItem("ref_marques"));
    this.ref_couleurs = JSON.parse(localStorage.getItem("ref_couleurs"));
    this.state = {
      currentStep: 1,
      civilite: "Monsieur",
      nomNaissance: "",
      prenom: "",
      dateNaissance: null,
      codePostal: "",
      commune: "",
      communeNaissance: "",
      paysNaissance: "Tout afficher",
      nomVoie: "",
      numeroVoie: "",
      complement: "",
      inseeCommune: "",
      file: {},
      fileKbis: {},
      fileId: {},
      typeFile: "Justificatif de domicile",
      typeFileKbis: "Extrait KBIS",
      typeFileId: "Pièce d'identité du représentant / de la représentante",
      numeroTelephone: "",
      email: "",
      denominationRaisonSociale: "",
      statut: "societe",
      numeroSiretRna: "",
      nomRepresentant: "",
      prenomRepresentant: "",
      numeroSerieVin: "",
      typeEnginId: "1",
      marque: "Tout afficher",
      autreMarque: false,
      couleurDominante: "Tout afficher",
      modele: "",
      checkEngin: false,
      isPhysique: true,
      personnePhysiqueModale: false,
      loading: false,
        numeroSerieVinOk: false
    };
  }

  communeFirstOption = (value) => {
    this.setState({
      commune: value,
    });
  };

  nomVoieFirstOption = (value) => {
    this.setState({
      nomVoie: value,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
        cancel: false,
      },
      () => {
        if (this.state.marque === "Autre") {
          this.setState({ autreMarque: true });
        }
      }
    );
  };

  handleChangeDate = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");
    this.setState({ dateNaissance: localeDateString });
  };

  handleFile = (e) => {
    this.setState({ file: e });
  };

  handleFileKbis = (e) => {
    this.setState({ fileKbis: e });
  };

  handleFileId = (e) => {
    this.setState({ fileId: e });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.isPhysique) {
      if (!(this.state.file instanceof File)) {
        this.alertFail("Veuillez choisir la pièce justificative");
        return;
      }
    } else {
      if (
        !(this.state.fileKbis instanceof File) ||
        !(this.state.fileId instanceof File)
      ) {
        this.alertFail("Veuillez choisir les pièces justificatives");
        return;
      }
    }

    if (
      this.state.isPhysique &&
      (this.state.dateNaissance === null ||
        this.state.dateNaissance === undefined ||
        this.state.paysNaissance === "Tout afficher" ||
        this.state.nomNaissance === "" ||
        this.state.prenom === "" ||
        this.state.commune === "" ||
        this.state.codePostal === "" ||
        this.state.nomVoie === "" ||
        this.state.email === "")
    ) {
      this.alertFail("Veuillez remplir tous les champs liés au déclarant");
      return;
    } else if (
      !this.state.isPhysique &&
      (this.state.dateNaissance === null ||
        this.state.paysNaissance === "Tout afficher" ||
        this.state.nomNaissance === "" ||
        this.state.prenom === "" ||
        this.state.commune === "" ||
        this.state.codePostal === "" ||
        this.state.nomVoie === "" ||
        this.state.email === "" ||
        this.state.denominationRaisonSociale === "" ||
        this.state.numeroSiretRna === "" ||
        this.state.nomRepresentant === "" ||
        this.state.prenomRepresentant === "")
    ) {
      this.alertFail("Veuillez remplir tous les champs liés au déclarant");
      return;
    }

    if (
      !this.state.checkEngin &&
      (this.state.numeroSerieVin === "" ||
        this.state.marque === "Tout afficher" ||
        this.state.marque === "Autre" ||
        this.state.couleurDominante === "Tout afficher")
    ) {
      this.alertFail("Veuillez remplir tous les champs liés à l'engin");
      return;
    }

    if (this.state.isPhysique) {
      this.submitPersonnePhysique();
    } else {
      this.submitPersonneMorale();
    }
  };

  submitPersonneMorale = () => {
    const { idRIO, service } = this.context;

    let civiliteId;
    this.ref_civilites.forEach((c) => {
      if (this.state.civilite === c.libelleLong) {
        civiliteId = c.civiliteId;
      }
    });

    let data = {
      email: this.state.email,
      autreMarque: this.state.marque,
      personneMorale: {
        nomRepresentant: this.state.nomRepresentant,
        prenomRepresentant: this.state.prenomRepresentant,
        numeroSiret: null,
        numeroRna: null,
        denominationRaisonSociale: this.state.denominationRaisonSociale,
        numeroVoie: this.state.numeroVoie,
        nomVoie: this.state.nomVoie,
        codePostal: this.state.codePostal,
        commune: this.state.commune,
        inseeCommune: this.state.inseeCommune,
        entreeTourBatimentZi: this.state.complementAdresse,
      },
      personnePhysique: {
        nomNaissance: this.state.nomNaissance,
        prenom: this.state.prenom,
        numeroTelephone: this.state.numeroTelephone,
        dateNaissance: this.state.dateNaissance,
        paysNaissance: this.state.paysNaissance,
        communeNaissance: this.state.communeNaissance,
        civiliteId: civiliteId,
      },
      engin: null,
    };

    if (this.state.statut === "societe") {
      data.personneMorale.numeroSiret = this.state.numeroSiretRna.toUpperCase();
    } else {
      data.personneMorale.numeroRna = this.state.numeroSiretRna.toUpperCase();
    }

    if (!this.state.checkEngin) {
      data.engin = this.submitEngin();
    }

    const jsonData = JSON.stringify(data);
    const blobData = new Blob([jsonData], {
      type: "application/json",
    });

    var formData = new FormData();
    formData.append("personneMorale", blobData);
    formData.append("fileKbis", this.state.fileKbis);
    formData.append("fileId", this.state.fileId);

    let trace = {
      profilUtilisateurId: 2,
      typeId: 0,
      demandeId: null,
      enginId: null,
      identifiantUsagerId: null,
      personneMoraleId: null,
      personnePhysiqueId: null,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    if (!this.state.checkEngin) {
      trace.typeId = 26;
    } else {
      trace.typeId = 11;
    }

    this.setState({ loading: true });
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_PERSONNE_MORALE_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        trace.personneMoraleId = response.data[0];
        trace.personnePhysiqueId = response.data[1];
        trace.identifiantUsagerId = response.data[2];
        if (!this.state.checkEngin) {
          trace.enginId = response.data[3];
          trace.demandeId = response.data[4];
          trace.typeId = 2;
        }

        this.setState({ loading: false });
        axios.post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
          trace
        );
        this.alertSuccess("Action enregistrée");
        setTimeout(() => this.cancel(), 1500);
      })
      .catch(() => {
        this.setState({ loading: false });
        this.alertFail("Merci de vérifier les informations saisies");
      });
  };

  submitPersonnePhysique = () => {
    const { idRIO, service } = this.context;

    let civiliteId;
    this.ref_civilites.forEach((c) => {
      if (this.state.civilite === c.libelleLong) {
        civiliteId = c.civiliteId;
      }
    });

    let data = {
      autreMarque: this.state.marque,
      email: this.state.email,
      personnePhysique: {
        nomNaissance: this.state.nomNaissance,
        prenom: this.state.prenom,
        numeroTelephone: this.state.numeroTelephone,
        dateNaissance: this.state.dateNaissance,
        paysNaissance: this.state.paysNaissance,
        communeNaissance: this.state.communeNaissance,
        numeroVoie: this.state.numeroVoie,
        nomVoie: this.state.nomVoie,
        codePostal: this.state.codePostal,
        commune: this.state.commune,
        inseeCommune: this.state.inseeCommune,
        complementAdresse: this.state.complement,
        civiliteId: civiliteId,
      },
      engin: null,
    };

    if (!this.state.checkEngin) {
      data.engin = this.submitEngin();
    }

    const jsonData = JSON.stringify(data);
    const blobData = new Blob([jsonData], {
      type: "application/json",
    });

    var formData = new FormData();
    formData.append("personnePhysique", blobData);
    formData.append("file", this.state.file);

    let trace = {
      profilUtilisateurId: 2,
      typeId: 11,
      demandeId: null,
      enginId: null,
      identifiantUsagerId: null,
      personneMoraleId: null,
      personnePhysiqueId: null,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    this.setState({ loading: true });
    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_PERSONNE_PHYSIQUE_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        trace.personnePhysiqueId = response.data[0];
        trace.identifiantUsagerId = response.data[1];
        if (!this.state.checkEngin) {
          trace.enginId = response.data[2];
          trace.demandeId = response.data[3];
          trace.typeId = 2;
        }

        this.setState({ loading: false });
        axios.post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
          trace
        );
        this.alertSuccess("Action enregistrée");
        setTimeout(() => this.cancel(), 1500);
      })
      .catch(() => {
        this.setState({ loading: false });
        this.alertFail("Merci de vérifier les informations saisies");
      });
  };

  submitEngin = () => {
    let marqueId = 0;
    this.ref_marques.forEach((c) => {
      if (this.state.marque === c.libelleLong) {
        marqueId = c.marqueId;
      }
    });

    let couleurDominanteId;
    this.ref_couleurs.forEach((c) => {
      if (this.state.couleurDominante === c.libelleLong) {
        couleurDominanteId = c.couleurDominanteId;
      }
    });

    let engin = {
        modele: this.state.modele?.toUpperCase(),
        numeroSerieVin: this.state.numeroSerieVin.toUpperCase(),
      typeEnginId: parseInt(this.state.typeEnginId),
      marqueId: marqueId,
      couleurDominanteId: couleurDominanteId,
    };

    return engin;
  };

  next = () => {
    let civiliteId;
    this.ref_civilites.forEach((c) => {
      if (this.state.civilite === c.libelleLong) {
        civiliteId = c.civiliteId;
      }
    });

    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 2 : currentStep + 1;

    if (this.state.isPhysique && this.state.nomNaissance !== "") {
      let formattedDate =
        this.state.dateNaissance?.split("/")[2] +
        "-" +
        this.state.dateNaissance?.split("/")[1] +
        "-" +
        this.state.dateNaissance?.split("/")[0];

      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_PHYSIQUE_BY_DONNEES_PIVOT_URL}`,
          {
            params: {
              nomNaissance: this.state.nomNaissance?.toUpperCase(),
              prenom: this.state.prenom?.toUpperCase(),
              civiliteId: civiliteId,
              dateNaissance: formattedDate,
              paysNaissance: this.state.paysNaissance?.toUpperCase(),
              communeNaissance: this.state.communeNaissance?.toUpperCase(),
            },
          }
        )
        .then((response) => {
          if (response.data) {
            this.toggleModalPersonnePhysiqueDejaExistante();
          } else {
            this.setState({
              currentStep: currentStep,
            });
          }
        });
    } else {
      this.setState({
        currentStep: currentStep,
      });
    }
  };

  prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  cancel = () => {
    this.props.history.push({
      pathname: `/`,
    });
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

  handleClosePersonnePhysiqueModal = () => {
    this.setState({ personnePhysiqueModale: false });
  };

  toggleModalPersonnePhysiqueDejaExistante = () => {
    this.setState({
      personnePhysiqueModale: !this.state.personnePhysiqueModale,
    });
  };

  render() {
    let currentStep = this.state.currentStep;

    return (
      <>
        <NotificationAlert ref="notify" />
        <Loader fullPage loading={this.state.loading} />

        <form onSubmit={this.handleSubmit}>
          <IdentiteNouveauDossier
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleFile={this.handleFile}
            handleFileKbis={this.handleFileKbis}
            handleFileId={this.handleFileId}
            handleChangeDate={this.handleChangeDate}
            civilite={this.state.civilite}
            nomNaissance={this.state.nomNaissance}
            prenom={this.state.prenom}
            dateNaissance={this.state.dateNaissance}
            codePostal={this.state.codePostal}
            commune={this.state.commune}
            communeNaissance={this.state.communeNaissance}
            paysNaissance={this.state.paysNaissance}
            communeFirstOption={this.communeFirstOption}
            communeNaissanceFirstOption={this.communeNaissanceFirstOption}
            nomVoieFirstOption={this.nomVoieFirstOption}
            nomVoie={this.state.nomVoie}
            numeroVoie={this.state.numeroVoie}
            complement={this.state.complement}
            handleNumeroVoie={(e) => this.setState({ numeroVoie: e })}
            handleNomVoie={(e) => this.setState({ nomVoie: e })}
            handleCodePostal={(e) => this.setState({ codePostal: e })}
            handleCommune={(e) => this.setState({ commune: e })}
            handleInseeCommune={(e) => this.setState({ inseeCommune: e })}
            typeFile={this.state.typeFile}
            typeFileKbis={this.state.typeFileKbis}
            typeFileId={this.state.typeFileId}
            numeroTelephone={this.state.numeroTelephone}
            email={this.state.email}
            denominationRaisonSociale={this.state.denominationRaisonSociale}
            statut={this.state.statut}
            numeroSiretRna={this.state.numeroSiretRna}
            nomRepresentant={this.state.nomRepresentant}
            prenomRepresentant={this.state.prenomRepresentant}
            isMorale={() => this.setState({ isPhysique: false })}
            isPhysique={() => this.setState({ isPhysique: true })}
            clearCommune={() => this.setState({ commune: "" })}
            clearCommuneNaissance={() =>
              this.setState({ communeNaissance: "" })
            }
            clearFile={() => this.setState({ file: {} })}
            clearFileKbis={() => this.setState({ fileKbis: {} })}
            clearFileId={() => this.setState({ fileId: {} })}
            clearVoie={() => this.setState({ nomVoie: "" })}
          />
          <EnginNouveauDossier
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            numeroSerieVin={this.state.numeroSerieVin}
            modele={this.state.modele}
            marque={this.state.marque}
            typeEnginId={this.state.typeEnginId}
            autreMarque={this.state.autreMarque}
            couleurDominante={this.state.couleurDominante}
            checkEngin={() => this.setState({ checkEngin: true })}
            noCheckEngin={() => this.setState({ checkEngin: false })}
          />

          <Row>
            <Col xs={12}>
              {currentStep === 1 ? (
                <>
                  <div>
                    <Button
                      bsSize="small"
                      bsStyle="info"
                      className="buttons-dossier"
                      onClick={this.next}
                      disabled={this.state.nomVoie !== "" ? false : true}
                    >
                      Suivant
                    </Button>
                  </div>

                  <div>
                    <Button
                      bsSize="small"
                      bsStyle="danger"
                      className="buttons-dossier"
                      onClick={this.cancel}
                    >
                      Annuler
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                      bsSize="small"
                      className="buttons-dossier"
                      bsStyle="success"
                      type="submit"
                      disabled={this.state.numeroSerieVinOk ? false : true}
                  >
                    Valider
                  </Button>

                  <div>
                    <Button
                      className="buttons-dossier"
                      bsSize="small"
                      bsStyle="info"
                      onClick={this.prev}
                    >
                      Retour
                    </Button>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </form>

        <PersonnePhysiqueDejaExistanteModal
          showModal={this.state.personnePhysiqueModale}
          closeModal={this.handleClosePersonnePhysiqueModal}
        />
      </>
    );
  }
}
