import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export class DeclarationTitulaireNonValideeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.open !== nextProps.showModalDeclarationTitulaireNonValideeModal
    ) {
      return { open: nextProps.showModalDeclarationTitulaireNonValideeModal };
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
              Un changement de titulaire est déjà en cours sur cet engin,
              veuillez valider cette dernière afin d’enregistrer le nouveau
              titulaire de l’engin.
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
                this.props.handleCloseModalDeclarationTitulaireNonValideeModal
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
export default DeclarationTitulaireNonValideeModal;
