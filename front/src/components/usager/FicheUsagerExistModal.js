import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export class FicheUsagerExistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalFicheUsagerExistModal) {
      return { open: nextProps.showModalFicheUsagerExistModal };
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
            <b>
              L’ usager est déjà présent dans DICEM. Vous ne pouvez pas déclarer
              cet usager. Si vous souhaitez réaliser des déclarations pour le
              compte de l’usager, aller sur la fiche usager.
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
              onClick={this.props.handleCloseModalFicheUsagerExistModal}
            >
              Ok
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default FicheUsagerExistModal;
