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
              Aucune fiche usager ne correspond à l’acheteur indiqué. Un nouveau
              dossier est à remplir, via le menu « Nouveau dossier », pour créer
              la fiche usager correspondante au nouveau titulaire de l’engin.
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
