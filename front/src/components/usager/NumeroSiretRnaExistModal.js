import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export class NumeroSiretRnaExistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalNumeroSiretRnaExistModal) {
      return { open: nextProps.showModalNumeroSiretRnaExistModal };
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
              Le numéro SIRET / RNA saisi est déjà présent dans DICEM. Vous ne
              pouvez pas modifier cette fiche usager avec ce numéro SIRET / RNA.
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
              onClick={this.props.handleCloseModalNumeroSiretRnaExistModal}
            >
              Ok
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default NumeroSiretRnaExistModal;
