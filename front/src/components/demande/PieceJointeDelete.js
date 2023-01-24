import React, { Component } from "react";
import "../../static/css/pieceJointe-styles.css";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { LoginContext } from "../util/LoginContext";

export default class PieceJointeDelete extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  deleteFile = (id) => {
    const { idRIO, service } = this.context;

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_DELETE_PIECE_JOINTE_URL}/${id}`
      )
      .then((response) => {
        this.setState({
          open: false,
        });
        setTimeout(() => this.props.callBack(), 1000);
      })
      .catch(() => {
        this.setState({
          open: false,
        });
        this.alertFail("Échec : Pièce jointe non supprimée");
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
    return (
      <>
        <div>
          {this.props.roles.includes("agent") &&
          (this.props.demande.statutDemandeId === 1 ||
            this.props.demande.statutDemandeId === 2 ||
            this.props.demande.statutDemandeId === 3 ||
            this.props.demande.statutDemandeId === 4) ? (
            <FontAwesomeIcon
              onClick={this.onOpenModal}
              icon={faTrashAlt}
              size="1x"
            />
          ) : null}

          <Modal
            closeOnOverlayClick={false}
            showCloseIcon={false}
            open={this.state.open}
            center
          >
            <Row>
              <Col
                xs={12}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <b style={{ textAlign: "center" }}>
                  Voulez-vous vraiment supprimer le fichier ?
                </b>
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Col
                xs={12}
                sm={4}
                md={4}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginTop: "20px",
                  }}
                  onClick={this.onCloseModal}
                >
                  Non
                </Button>
              </Col>
              <Col
                xs={12}
                sm={4}
                md={4}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    marginTop: "20px",
                  }}
                  onClick={() => this.deleteFile(this.props.pj.pieceJointeId)}
                >
                  Oui
                </Button>
              </Col>
            </Row>
          </Modal>
        </div>
      </>
    );
  }
}
