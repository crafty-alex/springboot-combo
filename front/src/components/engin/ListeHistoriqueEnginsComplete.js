import React, { Component } from "react";
import { Modal } from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import ListeHistoriqueEngins from "./ListeHistoriqueEngins";

export default class ListeHistoriqueEnginsComplete extends Component {
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
    let listeHistorique = this.props.demandes.map((demande, index) => {
      return <ListeHistoriqueEngins key={index} demande={demande} />;
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
                <Col>
                  <div className="bloc-commentaire">
                    <div>{listeHistorique}</div>
                  </div>
                </Col>
              </Row>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}
