import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export class ModificationCoordonneeNonValideeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !==
      nextProps.showModalModificationCoordonneeNonValideeModal
    ) {
      return { open: nextProps.showModalModificationCoordonneeNonValideeModal };
    }
    return null;
  }

  render() {
    return (
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
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <b style={{ textAlign: "center" }}>
              Une demande de modification des coordonnées est déja en cours pour
              cet utilisateur, veuillez valider cette dernière afin
              d'enregistrer les nouvelles coordonnées de l'usager.
            </b>
          </Col>
          <Col
            xs={12}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "blue",
                color: "white",
                marginTop: "20px",
              }}
              onClick={
                this.props.handleCloseModalModificationCoordonneeNonValideeModal
              }
            >
              Ok
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ModificationCoordonneeNonValideeModal;
