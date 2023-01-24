import React, {Component} from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup, Radio, Row,} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";

export class ModificationCaracteristiquesModal extends Component {
  static contextType = LoginContext;
  ref_couleurs = JSON.parse(localStorage.getItem("ref_couleurs"));
  ref_marques = JSON.parse(localStorage.getItem("ref_marques"));
  ref_types_engin = JSON.parse(localStorage.getItem("ref_types_engin"));

  constructor(props) {
    super(props);
    this.initialState = {
      marque: "Tout afficher",
      couleur: "Tout afficher",
      typeEngin: null,
      modele: null,
      engin: this.props.engin,
      loading: false,
      autre: false,
      open: false,
      numeroSerieVin: null,
    };

    this.state = this.initialState;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !== nextProps.showModalModificationCaracteristiquesModal
    ) {
      return { open: nextProps.showModalModificationCaracteristiquesModal };
    }
    return null;
  }

  checkNumeroSerie = (event) => {
    if (
      event.target.value.length < 1 ||
      event.target.value.length > 20 ||
      event.target.value.match(/\s/g)
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.marque === "Autre") {
        this.setState({ autre: true });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { idRIO, service } = this.context;

    let data = {
      typeEnginId: null,
      marqueId: null,
      marque: null,
      modele: null,
      couleurId: null,
      engin: this.props.engin,
      numeroSerieVin: null,
    };

    let trace = {
      profilUtilisateurId: 2,
      typeId: 21,
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

    if (
      this.state.marque !== "Tout afficher" &&
      this.state.marque !== "Autre"
    ) {
      this.ref_marques.forEach((e) => {
        if (this.state.marque === e.libelleLong) {
          data.marqueId = e.marqueId;
        }
      });

      if (data.marqueId === null) {
        data.marqueId = 0;
        data.marque = this.state.marque?.toUpperCase();
      }
    }

    if (this.state.couleur !== "Tout afficher") {
      this.ref_couleurs.forEach((e) => {
        if (this.state.couleur === e.libelleLong) {
          data.couleurId = e.couleurDominanteId;
        }
      });
    }

    if (this.state.typeEngin !== null) {
      this.ref_types_engin.forEach((e) => {
        if (this.state.typeEngin === e.libelleLong) {
          data.typeEnginId = e.typeEnginId;
        }
      });
    }

    if (this.state.modele !== null) {
      data.modele = this.state.modele;
    }

    if (this.state.numeroSerieVin !== null) {
      data.numeroSerieVin = this.state.numeroSerieVin;
    }

    if (
      (this.state.marque === "Tout afficher" ||
        this.state.marque === "Autre") &&
      this.state.couleur === "Tout afficher" &&
      this.state.modele === null &&
      this.state.typeEngin === null &&
      this.state.numeroSerieVin === null
    ) {
      this.alertFail("Veuillez modifier au moins un des champs");
    } else {
      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_MODIFICATION_CARACTERISTIQUES}`,
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
            () =>
              this.props.handleCloseModalModificationCaracteristiquesModal(),
            1500
          );
          this.props.fetchEnginInfo();
        })
        .catch(() => {
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

  render() {
    return (
      <Modal
        closeOnOverlayClick={false}
        showCloseIcon={false}
        open={this.state.open}
        center
      >
        <Loader fullPage loading={this.state.loading} />
        <NotificationAlert ref="notify" />

        <Row>
          <h4 className="declarationCession">
            Déclaration de modification des caractéristiques de l'engin N°
            {this.props.numeroIdentification}
          </h4>
          <hr className="borderDeclarationCession" />
        </Row>
        <form onSubmit={this.handleSubmit}>
          <Row style={{ marginTop: "40px" }}>
            <Col xs={12} sm={7} md={7} lg={7}>
              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={2} md={2} lg={2}>
                  <span>Type</span>
                </Col>
                <Col xs={12} sm={10} md={10} lg={10}>
                  <FormGroup>
                    {this.ref_types_engin != null &&
                      this.ref_types_engin.map((e, index) => (
                        <Radio
                          defaultChecked={
                            e.typeEnginId === this.props.engin.typeEnginId
                          }
                          value={e.libelleLong}
                          name="typeEngin"
                          onChange={this.handleChange}
                          key={index}
                        >
                          {e.libelleLong}
                        </Radio>
                      ))}
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: "40px", marginBottom: "25px" }}>
                <Col xs={12} sm={4} md={4} lg={4}>
                  <ControlLabel style={{ marginTop: "5px" }}>
                    N° de série :{" "}
                  </ControlLabel>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}>
                  <FormControl
                    defaultValue={this.props.numeroSerieVin}
                    type="text"
                    name="numeroSerieVin"
                    onChange={this.handleChange}
                    className={`${this.state.inputStyleNumeroSerie}`}
                    onBlur={this.checkNumeroSerie}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={5} sm={5} md={5} lg={5}>
              <Row style={{ marginTop: "10px" }}>
                <FormGroup>
                  <Col xs={12} sm={3}>
                    <ControlLabel>Marque</ControlLabel>
                  </Col>
                  <Col xs={12} sm={9}>
                    <FormControl
                      defaultValue={this.props.engin.marque.libelleLong}
                      componentClass="select"
                      type="text"
                      name="marque"
                      onChange={this.handleChange}
                    >
                      <option>Tout afficher</option>
                      {this.ref_marques != null &&
                        this.ref_marques.map((m, index) => (
                          <option key={index}>{m.libelleLong}</option>
                        ))}
                      <option>Autre</option>
                    </FormControl>
                    {this.state.autre && (
                      <FormControl
                        style={{ marginTop: "10px" }}
                        type="text"
                        name="marque"
                        placeholder="Saisir une autre marque"
                        onChange={this.handleChange}
                      ></FormControl>
                    )}
                  </Col>
                </FormGroup>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col xs={12} sm={3}>
                  <ControlLabel>Modèle</ControlLabel>
                </Col>
                <Col xs={12} sm={9}>
                  <FormControl
                    defaultValue={this.props.engin.modele}
                    type="text"
                    name="modele"
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <FormGroup>
                  <Col xs={12} sm={3}>
                    <ControlLabel>Couleur</ControlLabel>
                  </Col>
                  <Col xs={12} sm={9}>
                    <FormControl
                      defaultValue={
                        this.props.engin.couleurDominante.libelleLong
                      }
                      componentClass="select"
                      type="text"
                      name="couleur"
                      onChange={this.handleChange}
                    >
                      <option>Tout afficher</option>
                      {this.ref_couleurs != null &&
                        this.ref_couleurs.map((m, index) => (
                          <option key={index}>{m.libelleLong}</option>
                        ))}
                    </FormControl>
                  </Col>
                </FormGroup>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "40px" }}>
            <Col xs={12}>
              <Button type="submit" className="buttonValider">
                Valider
              </Button>
              <Button
                className="buttonAnnuler"
                onClick={() => {
                  this.setState({ inputStyleNumeroSerie: "" });
                  this.props.handleCloseModalModificationCaracteristiquesModal();
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

export default ModificationCaracteristiquesModal;
