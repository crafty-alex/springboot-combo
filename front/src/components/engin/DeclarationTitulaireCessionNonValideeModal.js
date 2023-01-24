import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { Modal } from "react-responsive-modal";

export class DeclarationTitulaireCessionNonValideeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !==
      nextProps.showModalDeclarationTitulaireCessionNonValideeModal
    ) {
      return {
        open: nextProps.showModalDeclarationTitulaireCessionNonValideeModal,
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
              Une demande de cession est en cours, veuillez valider cette
              dernière avant d’effectuer un changement de titulaire pour
              l’engin.
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
                  .handleCloseModalDeclarationTitulaireCessionNonValideeModal
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
export default DeclarationTitulaireCessionNonValideeModal;
