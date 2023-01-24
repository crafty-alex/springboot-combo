import React, { Component } from "react";
import PieceJointeDelete from "./PieceJointeDelete";
import "../../static/css/pieceJointe-styles.css";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  Panel,
  Row,
} from "react-bootstrap";
import { LoginContext } from "../util/LoginContext";
import axios from "axios";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationAlert from "react-notification-alert";
import { Loader } from "react-overlay-loader";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default class PieceJointe extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_types_pj = JSON.parse(localStorage.getItem("ref_types_pj"));
    this.ref_roles = JSON.parse(localStorage.getItem("ref_roles"));
    this.state = {
      file: {},
      typeFile: "Tout afficher",
      loading: false,
      open: false,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false, file: {}, typeFile: "Tout afficher" });
  };

  handleChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { idRIO, service } = this.context;
    let typeId;

    if (this.state.typeFile === "Tout afficher") {
      this.alertFail("Merci d’indiquer le type de pièce justificative jointe");
    } else {
      this.ref_types_pj.forEach((e) => {
        if (this.state.typeFile === e.libelleLong) {
          typeId = e.typePieceJointeId;
        }
      });

      const json = JSON.stringify(typeId);
      const blob = new Blob([json], {
        type: "application/json",
      });
      const json2 = JSON.stringify(this.props.demande.demandeId);
      const blob2 = new Blob([json2], {
        type: "application/json",
      });

      var formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("type", blob);
      formData.append("id", blob2);

      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_PIECE_JOINTE_URL}`,
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
            open: false,
            typeFile: "Tout afficher",
          });
          this.alertSuccess("Pièce jointe enregistrée");
          setTimeout(() => this.props.callBack(), 1000);
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
          this.alertFail("Échec : Pièce jointe non enregistrée");
        });

      let trace = {
        profilUtilisateurId: 2,
        typeId: 19,
        demandeId: this.props.demande.demandeId,
        enginId: this.props.engin?.enginId,
        identifiantUsagerId: this.props.demande.identifiantUsagerId,
        personneMoraleId: this.props.demande.usager.personneMoraleId,
        personnePhysiqueId: this.props.demande.usager.personnePhysiqueId,
        utilisateurId: idRIO,
        serviceUtilisateur: service,
      };

      axios.post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
        trace
      );
    }
  };

  getPJ = (id) => {
    axios({
      url: `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PIECE_JOINTE_URL}/${id}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      if (
        response.data.type === "image/jpeg" ||
        response.data.type === "image/png" ||
        response.data.type === "application/pdf"
      ) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "piece_jointe." +
            response.data.type.substring(response.data.type.indexOf("/") + 1)
        );
        document.body.appendChild(link);
        link.click();
      }
    });
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
    let filtered = this.props.demande.pieceJointes.filter((a) => a.active);

    return (
      <>
        <div>
          <Loader fullPage loading={this.state.loading} />
          <NotificationAlert ref="notify" />
        </div>
        <LoginContext.Consumer>
          {({ roles }) => {
            return (
              <Panel>
                <Panel.Heading>
                  <Row>
                    <Col xs={10}>
                      <Panel.Title>
                        Pièces justificatives disponibles
                      </Panel.Title>
                    </Col>
                    <Col xs={2}>
                      {roles.includes("agent") &&
                      (this.props.demande.statutDemandeId === 1 ||
                        this.props.demande.statutDemandeId === 2 ||
                        this.props.demande.statutDemandeId === 3 ||
                        this.props.demande.statutDemandeId === 4) ? (
                        <FontAwesomeIcon
                          onClick={this.onOpenModal}
                          size="2x"
                          icon={faFolderPlus}
                          style={{ float: "right", marginBottom: "5px" }}
                        />
                      ) : null}
                    </Col>
                  </Row>
                </Panel.Heading>
                <hr className="divider" />
                <Panel.Body>
                  <Row>
                    <Col xs={10}>
                      <ol className="pj-list">
                        {(roles.includes("agent") || roles.includes("admin")) &&
                          filtered.length > 0 &&
                          filtered.map((pj, index) => (
                            <>
                              <Row>
                                <Col xs={10}>
                                  <li className="pj-list-item" key={index}>
                                    <a
                                      onClick={() =>
                                        this.getPJ(pj.pieceJointeId)
                                      }
                                    >
                                      {pj.typePieceJointe.libelleLong}
                                    </a>
                                  </li>
                                </Col>
                                <Col xs={2}>
                                  <div>
                                    <PieceJointeDelete
                                      roles={roles}
                                      demande={this.props.demande}
                                      engin={this.props.engin}
                                      pj={pj}
                                      callBack={this.props.callBack}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </>
                          ))}
                      </ol>
                    </Col>
                  </Row>

                  <div>
                    <Modal
                      closeOnOverlayClick={false}
                      showCloseIcon={false}
                      open={this.state.open}
                      center
                    >
                      <form className="form" onSubmit={this.handleSubmit}>
                        <Row>
                          <Col xs={12}>
                            <FormGroup>
                              <FormControl
                                required
                                type="file"
                                onChange={this.handleChangeFile}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6}>
                            <FormGroup>
                              <FormControl
                                componentClass="select"
                                value={this.state.typeFile}
                                type="text"
                                name="typeFile"
                                onChange={this.handleChange}
                              >
                                <option value="">Tout afficher</option>
                                {this.ref_types_pj != null &&
                                  this.ref_types_pj.map((s, index) => (
                                    <option key={index}>{s.libelleLong}</option>
                                  ))}
                              </FormControl>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12}>
                            <Button
                              bsSize="small"
                              bsStyle="success"
                              type="submit"
                              className="button-pj-modal"
                            >
                              Valider
                            </Button>

                            <Button
                              bsSize="small"
                              bsStyle="danger"
                              className="button-pj-modal"
                              onClick={this.onCloseModal}
                            >
                              Annuler
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    </Modal>
                  </div>
                </Panel.Body>
              </Panel>
            );
          }}
        </LoginContext.Consumer>
      </>
    );
  }
}
