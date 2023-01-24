import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export default class ProprietaireNonExistantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalProprietaireNonExistantModal) {
      return { open: nextProps.showModalProprietaireNonExistantModal };
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
              Veuillez d'abord lier l'engin à un propriétaire physique ou moral.
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
              onClick={this.props.handleCloseModalProprietaireNonExistantModal}
            >
              Ok
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}
