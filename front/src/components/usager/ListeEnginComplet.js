import React, { Component } from "react";
import { Modal } from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import ListeEngins from "./ListeEngins";

export default class ListeEnginsComplet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const listeEngins = this.props.engins.map((engin, index) => {
      return <ListeEngins key={index} engin={engin} />;
    });
    return (
      <>
        <div className="pull-right">
          <a onClick={this.onOpenModal}>
            <FontAwesomeIcon size="2x" icon={faExternalLinkAlt} />
          </a>

          <div>
            <Modal
              closeOnOverlayClick={false}
              onClose={this.onCloseModal}
              open={this.state.open}
              center
            >
              <Row>
                <Col xs={5}>
                  <b>N° d'identification</b>
                </Col>
                <Col xs={4}>
                  <b>Date de création</b>
                </Col>
                <Col xs={3}>
                  <b>N° de série</b>
                </Col>
              </Row>
              {listeEngins}
            </Modal>
          </div>
        </div>
      </>
    );
  }
}
