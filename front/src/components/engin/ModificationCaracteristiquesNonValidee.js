import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export class ModificationCaracteristiquesNonValideeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !==
      nextProps.showModalModificationCaracteristiquesNonValideeModal
    ) {
      return {
        open: nextProps.showModalModificationCaracteristiquesNonValideeModal,
      };
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
              Une modification des caractéristiques est déjà en cours sur cet
              engin, veuillez valider cette dernière afin d’enregistrer les
              nouvelles caractéristiques de l’engin.
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
                this.props
                  .handleCloseModalModificationCaracteristiquesNonValideeModal
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

export default ModificationCaracteristiquesNonValideeModal;
