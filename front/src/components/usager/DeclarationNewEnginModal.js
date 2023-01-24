import React, {Component} from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup, Radio, Row,} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";
import NumeroSerieVinExistModal from "./NumeroSerieVinExistModal";

export class DeclarationNewEnginModal extends Component {
  static contextType = LoginContext;
  ref_couleurs = JSON.parse(localStorage.getItem("ref_couleurs"));
  ref_marques = JSON.parse(localStorage.getItem("ref_marques"));
  ref_types_engin = JSON.parse(localStorage.getItem("ref_types_engin"));

  state = {
    marque: "Tout afficher",
    couleur: "Tout afficher",
    typeEngin: "",
    modele: "",
    loading: false,
    autre: false,
    open: false,
    numeroSerieVin: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalDeclarationNewEngin) {
      return { open: nextProps.showModalDeclarationNewEngin };
    }
    return null;
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.marque === "Autre") {
        this.setState({ autre: true });
      }
    });
  };

    handleChangeNumeroSerie = (event) => {
        this.setState({enginExist: true});
        this.setState({[event.target.name]: event.target.value});
    };

  handleCloseModalNumeroSerieVinExistModal = () => {
    this.setState({ showModalNumeroSerieVinExistModal: false });
  };

  toggleModalNumeroSerieVinExistModal = () => {
    this.setState({
      showModalNumeroSerieVinExistModal: !this.state
        .showModalNumeroSerieVinExistModal,
    });
  };

  handleNuneroSerieVinExist = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${
          process.env.REACT_APP_GET_NUMERO_SERIE_VIN_EXIST
        }/${this.state.numeroSerieVin?.toUpperCase()}`
      )
      .then((response) => {
        if (response.data === true) {
          this.setState({ enginExist: response.data });
          this.toggleModalNumeroSerieVinExistModal();
          this.props.handleCloseModalDeclarationNewEngin();
        } else {
          this.setState({ enginExist: response.data });
        }
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { idRIO, service } = this.context;

    let data = {
      typeEnginId: "",
      marqueId: "",
      marque: "",
      modele: "",
      couleurId: "",
      numeroSerieVin: "",
      personneMorale: null,
      personnePhysique: null,
    };

    if (this.props.typePersonne === "Physique") {
      data.personnePhysique = this.props.objPersonne;
    } else {
      data.personneMorale = this.props.objPersonne;
    }

    let trace = {
      profilUtilisateurId: 2,
      typeId: 26,
      demandeId: 0,
      enginId: 0,
      identifiantUsagerId: this.props.objPersonne.usager?.identifiantUsagerId,
      personneMoraleId: this.props.objPersonne.personneMoraleId,
      personnePhysiqueId: this.props.objPersonne.personnePhysiqueId,
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
      if (data.marqueId === "") {
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

    if (this.state.typeEngin !== "") {
      this.ref_types_engin.forEach((e) => {
        if (this.state.typeEngin === e.libelleLong) {
          data.typeEnginId = e.typeEnginId;
        }
      });
    }

    if (this.state.modele !== "") {
      data.modele = this.state.modele;
    }

    if (this.state.numeroSerieVin !== "") {
      data.numeroSerieVin = this.state.numeroSerieVin;
    }

    if (
      this.state.marque === "Tout afficher" ||
      this.state.marque === "Autre" ||
      this.state.couleur === "Tout afficher" ||
        this.state.typeEngin === "" ||
        this.state.numeroSerieVin === ""
    ) {
      this.alertFail("Veuillez saisir tous les champs");
    } else {
      this.setState({ loading: true });

      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_ENGIN}`,
          data
        )
        .then((response) => {
          this.setState({
            loading: false,
          });
          trace.demandeId = response.data[0];
          trace.enginId = response.data[1];
          axios.post(
            `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
            trace
          );
          this.alertSuccess("Modifications enregistrées");
          setTimeout(
            () => this.props.handleCloseModalDeclarationNewEngin(),
            1500
          );
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

  checkNumeroSerieVin = (event) => {
    if (event.target.value.length < 1 || event.target.value.match(/\s/g)) {
      this.setState({
        inputStyleNumeroSerieVin: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleNumeroSerieVin: "",
      });
    }
  };

  checkMarque = (event) => {
    if (
      event.target.value.length < 1 ||
      this.state.marque === "Tout afficher"
    ) {
      this.setState({
        inputStyleMarque: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleMarque: "",
      });
    }
  };

  checkCouleur = (event) => {
    if (
      event.target.value.length < 1 ||
      this.state.couleur === "Tout afficher"
    ) {
      this.setState({
        inputStyleCouleur: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleCouleur: "",
      });
    }
  };

  handleClickCancel = () => {
    this.setState({
      enginExist: true,
    });
    this.props.handleCloseModalDeclarationNewEngin();
  };

  render() {
    return (
      <>
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
              Déclaration d'un nouvel engin
              {this.props.numeroIdentification}
            </h4>
            <hr className="borderDeclarationCession" />
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row style={{ marginTop: "40px", marginBottom: "25px" }}>
              <Col xs={12} sm={4} md={4} lg={4}>
                <ControlLabel style={{ marginTop: "5px" }}>
                  Numéro de série :
                </ControlLabel>
              </Col>
              <Col xs={5} sm={5} md={5} lg={5}>
                <FormControl
                    type="text"
                    name="numeroSerieVin"
                    onChange={this.handleChangeNumeroSerie}
                    onBlur={this.checkNumeroSerieVin}
                    className={`${this.state.inputStyleNumeroSerieVin} form-control`}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
                <Button onClick={this.handleNuneroSerieVinExist}>
                  Valider
                </Button>
              </Col>
            </Row>
            {this.state.enginExist === false && (
              <Row style={{ marginTop: "40px" }}>
                <Col xs={12} sm={7} md={7} lg={7}>
                  <Row>
                    <Col
                      style={{ marginTop: "10px" }}
                      xs={12}
                      sm={2}
                      md={2}
                      lg={2}
                    >
                      <span>Type</span>
                    </Col>
                    <Col xs={12} sm={10} md={10} lg={10}>
                      <FormGroup>
                        {this.ref_types_engin != null &&
                          this.ref_types_engin.map((e, index) => (
                            <Radio
                              name="typeEngin"
                              onChange={this.handleChange}
                              key={index}
                              value={e.libelleLong}
                            >
                              {e.libelleLong}
                            </Radio>
                          ))}
                      </FormGroup>
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
                          componentClass="select"
                          type="text"
                          name="marque"
                          onChange={this.handleChange}
                          onBlur={this.checkMarque}
                          className={`${this.state.inputStyleMarque} form-control`}
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
                          componentClass="select"
                          type="text"
                          name="couleur"
                          onChange={this.handleChange}
                          onBlur={this.checkCouleur}
                          className={`${this.state.inputStyleCouleur} form-control`}
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
            )}
            <Row style={{ marginTop: "40px" }}>
              <Col xs={12}>
                <Button type="submit" className="buttonValider">
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
          </form>
        </Modal>
        <NumeroSerieVinExistModal
          showModalNumeroSerieVinExistModal={
            this.state.showModalNumeroSerieVinExistModal
          }
          handleCloseModalNumeroSerieVinExistModal={
            this.handleCloseModalNumeroSerieVinExistModal
          }
        />
      </>
    );
  }
}

export default DeclarationNewEnginModal;
