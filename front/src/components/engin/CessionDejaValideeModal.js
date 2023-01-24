import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export class CessionDejaValideeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalCessionDejaValideeModal) {
      return { open: nextProps.showModalCessionDejaValideeModal };
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
              Une demande de cession est déjà enregistrée pour cet engin.
              Veuillez effectuer un changement de titulaire pour pouvoir
              enregistrer ensuite une nouvelle déclaration de cession.
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
              onClick={this.props.handleCloseModalCessionDejaValideeModal}
            >
              Ok
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default CessionDejaValideeModal;
