import React, { Component } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  Radio,
  Row,
} from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { Loader } from "react-overlay-loader";
import { LoginContext } from "../util/LoginContext";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuppressionPieceJointeModal from "./SuppressionPieceJointeModal";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Datetime from "react-datetime";
import moment from "moment";

export class ModificationSituationAdministrativeModal extends Component {
  static contextType = LoginContext;

  state = {
    isVol: true,
    engin: this.props.engin,
    loading: false,
    fileVol: {},
    open: false,
    showModalSuppressionPieceJointeModal: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !==
      nextProps.showModalModificationSituationAdministrativeModal
    ) {
      return {
        open: nextProps.showModalModificationSituationAdministrativeModal,
      };
    }
    return null;
  }

  toggleModalSuppressionPieceJointeModal = () => {
    this.setState({
      showModalSuppressionPieceJointeModal: !this.state
        .showModalSuppressionPieceJointeModal,
    });
  };

  handleCloseModalSuppressionPieceJointeModal = () => {
    this.setState({
      showModalSuppressionPieceJointeModal: false,
    });
  };

  resetFile = () => {
    this.setState({ fileVol: {}, showModalSuppressionPieceJointeModal: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDateVol = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");
    this.setState({ dateVol: localeDateString });
  };

  handleChangeDateDestruction = (e) => {
    let localeDateString = e._d?.toLocaleDateString("fr-FR");
    this.setState({ dateDestruction: localeDateString });
  };

  handleFileVol = (e) => {
    this.setState({ fileVol: e.target.files[0] });
    e.target.value = "";
  };

  toggleVolOuDestruction = () => {
    this.setState({
      isVol: !this.state.isVol,
    });
  };

  checkDateVol = (e) => {
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
        inputStyleDateVol: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleDateVol: "",
      });
    }
  };

  checkDateDestruction = (e) => {
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
        inputStyleDateDestruction: "invalidInput",
      });
    } else {
      this.setState({
        inputStyleDateDestruction: "",
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { idRIO, service } = this.context;

    if (this.state.isVol) {
      if (!(this.state.fileVol instanceof File)) {
        this.alertFail("Veuillez choisir une pièce jointe");
        return;
      }
    }

    let data = {
      volOuDestruction: this.state.isVol,
      dateVol: "",
      dateDestruction: "",
      engin: this.props.engin,
    };

    let trace = {
      profilUtilisateurId: 2,
      typeId: 20,
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

    if (this.state.dateVol != null) {
      data.dateVol = this.state.dateVol;
    }

    if (this.state.dateDestruction != null) {
      data.dateDestruction = this.state.dateDestruction;
    }

    const jsonData = JSON.stringify(data);
    const blobData = new Blob([jsonData], {
      type: "application/json",
    });

    this.setState({ loading: true });

    var formData = new FormData();
    if (this.state.isVol) {
      formData.append("file", this.state.fileVol);
    }
    formData.append("data", blobData);

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_POST_SAVE_NEW_MODIFICATION_SITUATION_ADMINISTRATIVE}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
        setTimeout(
          () =>
            this.props.handleCloseModalModificationSituationAdministrativeModal(),
          1500
        );
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
              Déclaration de changement de statut de l'engin N°
              {this.props.numeroIdentification}
            </h4>
            <hr className="borderDeclarationCession" />
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row style={{ marginTop: "40px", marginLeft: "40px" }}>
              <Col xs={12} sm={12} md={3}>
                <FormGroup>
                  <Radio
                    onChange={this.toggleVolOuDestruction}
                    checked={this.state.isVol}
                    value="vol"
                    name="volOuDestruction"
                    inline
                    required
                  >
                    Vol
                  </Radio>
                  <Radio
                    onChange={this.toggleVolOuDestruction}
                    checked={!this.state.isVol}
                    value="destruction"
                    name="volOuDestruction"
                    inline
                    required
                  >
                    Destruction
                  </Radio>
                </FormGroup>
              </Col>
            </Row>
            {this.state.isVol ? (
              <>
                <Row style={{ marginTop: "15px", marginLeft: "40px" }}>
                  <Col xs={12} sm={4} md={4}>
                    <span>Date du vol</span>
                  </Col>
                  <Col xs={12} sm={4} md={4}>
                    <Datetime
                      onChange={this.handleChangeDateVol}
                      isValidDate={this.isValidDate}
                      timeFormat={false}
                      className={`${this.state.inputStyleDateVol}`}
                      onClose={this.checkDateVol}
                      inputProps={inputProps}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    marginTop: "30px",
                    marginLeft: "40px",
                    marginBottom: "-100px",
                  }}
                >
                  <Col
                    style={{ marginTop: "10px" }}
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                  >
                    <FormGroup>
                      <span>Joindre un dépôt de plainte</span>
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
                        {!this.state.fileVol?.name ? (
                          <span className="spanAucunFichier">
                            Aucun fichier selectionné
                          </span>
                        ) : (
                          <span className="spanAucunFichier">
                            {this.state.fileVol.name}
                          </span>
                        )}
                        <FormControl
                          id="file-input"
                          type="file"
                          name="fileVol"
                          onChange={this.handleFileVol}
                        />
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <FontAwesomeIcon
                        className="iconFiles"
                        size="1x"
                        icon={faTrashAlt}
                        onClick={this.toggleModalSuppressionPieceJointeModal}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                {" "}
                <Row style={{ marginTop: "15px", marginLeft: "40px" }}>
                  <Col xs={12} sm={4} md={4}>
                    <span>Date de destruction</span>
                  </Col>
                  <Col xs={12} sm={4} md={4}>
                    <Datetime
                      onChange={this.handleChangeDateDestruction}
                      isValidDate={this.isValidDate}
                      timeFormat={false}
                      className={`${this.state.inputStyleDateDestruction}`}
                      onClose={this.checkDateDestruction}
                    />
                  </Col>
                </Row>
              </>
            )}
            <Row style={{ marginTop: "40px" }}>
              <Col xs={12}>
                <Button type="submit" className="buttonValider">
                  Valider
                </Button>
                <Button
                  className="buttonAnnuler"
                  onClick={() => {
                    this.setState({
                      inputStyleDateVol: "",
                      inputStyleDateDestruction: "",
                    });
                    this.props.handleCloseModalModificationSituationAdministrativeModal();
                  }}
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </form>
        </Modal>

        <SuppressionPieceJointeModal
          showModalSuppressionPieceJointeModal={
            this.state.showModalSuppressionPieceJointeModal
          }
          handleCloseModalSuppressionPieceJointeModal={
            this.handleCloseModalSuppressionPieceJointeModal
          }
          resetFile={this.resetFile}
        />
      </>
    );
  }
}

export default ModificationSituationAdministrativeModal;
