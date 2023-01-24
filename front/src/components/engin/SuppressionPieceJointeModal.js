import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";

export class SuppressionPieceJointeModal extends Component {
  state = {
    open: false,
    showModalSuppressionPieceJointeModal: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open !== nextProps.showModalSuppressionPieceJointeModal) {
      return { open: nextProps.showModalSuppressionPieceJointeModal };
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
              onClick={this.props.handleCloseModalSuppressionPieceJointeModal}
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
              onClick={this.props.resetFile}
            >
              Oui
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default SuppressionPieceJointeModal;
