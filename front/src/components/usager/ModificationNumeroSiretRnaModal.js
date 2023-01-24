import React, {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Loader} from "react-overlay-loader";
import {LoginContext} from "../util/LoginContext";
import NumeroSiretRnaExistModal from "./NumeroSiretRnaExistModal";
import EnregistrerModificationSiretRnaModal from "./EnregistrerModificationSiretRnaModal";
import "moment/locale/fr";

export class ModificationNumeroSiretRnaModal extends Component {
  static contextType = LoginContext;
  state = {
    loading: false,
    open: false,
    showModalModificationNumeroSiretRnaModal: false,
    data: {},
    isSiret: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalModificationNumeroSiretRnaModal) {
      return { open: nextProps.showModalModificationNumeroSiretRnaModal };
    }
    return null;
  }

  checkSiret = (event) => {
    if (
      event.target.value.length < 1 ||
        event.target.value.length > 14 ||
      !event.target.value.match(/^([0-9])*$/)
    ) {
      this.setState({
        inputStyleSiret: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleSiret: "",
      });
    }
  };

  checkRna = (event) => {
    if (
      event.target.value.length < 1 ||
        event.target.value.length > 10 ||
      !event.target.value.match(/^([a-zA-Z-0-9])*$/)
    ) {
      this.setState({
        inputStyleRna: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleRna: "",
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      numeroSiret: "",
      numeroRna: "",
      statutJuridique: "",
      personneMorale: this.props.objPersonne,
    };

    if (this.state.isSiret === true) {
      data.statutJuridique = "societe";
      data.numeroSiret = this.state.numeroSiret;
    } else {
      data.statutJuridique = "association";
      data.numeroRna = this.state.numeroRna;
    }

    this.setState({ data: data });

    let numero;
    if (this.state.isSiret === true) {
      numero = data.numeroSiret;
    } else {
      numero = data.numeroRna;
    }

    this.setState({ data: data });
    this.setState({ loading: true });
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_MORALE_BY_DONNEES_PIVOT_URL}`,
        {
          params: {
            statutJuridique: data.statutJuridique,
            numeroSiretRna: numero,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          this.setState({
            loading: false,
          });
          this.props.handleCloseModalModificationNumeroSiretRnaModal();
          this.toggleModalNumeroSiretRnaExistModal();
        } else {
          this.setState({
            loading: false,
          });
          this.props.handleCloseModalModificationNumeroSiretRnaModal();
          this.toggleModalEnregistrerModificationSiretRnaModal();
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
  }

  toggleModalNumeroSiretRnaExistModal = () => {
    this.setState({
      showModalNumeroSiretRnaExistModal: !this.state
        .showModalNumeroSiretRnaExistModal,
    });
  };

  handleCloseModalNumeroSiretRnaExistModal = () => {
    this.setState({ showModalNumeroSiretRnaExistModal: false });
  };

  toggleModalEnregistrerModificationSiretRnaModal = () => {
    this.setState({
      showModalEnregistrerModificationSiretRnaModal: !this.state
        .showModalEnregistrerModificationSiretRnaModal,
    });
  };

  handleCloseModalEnregistrerModificationSiretRnaModal = () => {
    this.setState({ showModalEnregistrerModificationSiretRnaModal: false });
  };

  toggleSiretOuTna = () => {
    this.setState({
      isSiret: !this.state.isSiret,
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
              Modification numero SIRET / RNA
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
                <Col xs={12} sm={2} md={2}>
                  <label>Statut juridique</label>
                </Col>
                <Col xs={12} sm={3} md={3}>
                  <input
                    style={{ marginRight: "5px" }}
                    type="radio"
                    id="societe"
                    name="statutJuridique"
                    value="societe"
                    checked={this.state.isSiret}
                    onChange={this.toggleSiretOuTna}
                    required
                    className="largeurInput"
                  />
                  <label htmlFor="societe">Société</label>
                </Col>
                <Col xs={12} sm={4} md={4}>
                  <input
                    style={{ marginRight: "5px" }}
                    checked={!this.state.isSiret}
                    type="radio"
                    id="association"
                    name="statutJuridique"
                    value="association"
                    onChange={this.toggleSiretOuTna}
                    required
                    className="largeurInput"
                  />
                  <label htmlFor="association">Association</label>
                </Col>
              </Row>

              {this.state.isSiret === true ? (
                <Row style={{ marginTop: "10px" }}>
                  <div>
                    <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                      <label>N° SIRET</label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input
                        type="text"
                        name="numeroSiret"
                        className={`${this.state.inputStyleSiret} form-control largeurInput`}
                        onChange={this.handleChange}
                        onBlur={this.checkSiret}
                      />
                    </Col>
                  </div>
                </Row>
              ) : (
                <Row style={{ marginTop: "10px" }}>
                  <div>
                    <Col style={{ marginTop: "10px" }} xs={12} sm={12} md={3}>
                      <label>N° RNA</label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input
                        type="text"
                        name="numeroRna"
                        className={`${this.state.inputStyleRna} form-control largeurInput`}
                        onChange={this.handleChange}
                        onBlur={this.checkRna}
                      />
                    </Col>
                  </div>
                </Row>
              )}
            </>

            <Row>
              <Col xs={12}>
                <Button className="buttonValider" type="submit">
                  Valider
                </Button>
                <Button
                  className="buttonAnnuler"
                  onClick={() => {
                    this.props.handleCloseModalModificationNumeroSiretRnaModal();
                  }}
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </form>
        </Modal>

        <NumeroSiretRnaExistModal
          showModalNumeroSiretRnaExistModal={
            this.state.showModalNumeroSiretRnaExistModal
          }
          handleCloseModalNumeroSiretRnaExistModal={
            this.handleCloseModalNumeroSiretRnaExistModal
          }
          objPersonne={this.props.objPersonne}
        />

        <EnregistrerModificationSiretRnaModal
          showModalEnregistrerModificationSiretRnaModal={
            this.state.showModalEnregistrerModificationSiretRnaModal
          }
          handleCloseModalEnregistrerModificationSiretRnaModal={
            this.handleCloseModalEnregistrerModificationSiretRnaModal
          }
          objPersonne={this.props.objPersonne}
          data={this.state.data}
          fetchInfoUsager={this.props.fetchInfoUsager}
          trace={this.props.trace}
        />
      </>
    );
  }
}

export default ModificationNumeroSiretRnaModal;
