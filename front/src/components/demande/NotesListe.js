import React, { Component } from "react";
import { Modal } from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import NoteSimple from "./NoteSimple";

export default class NotesListe extends Component {
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
    return (
      <>
        <div className="pull-right">
          <a onClick={this.onOpenModal}>
            <FontAwesomeIcon size="2x" icon={faExternalLinkAlt} />
          </a>

          <div>
            <Modal
              closeOnOverlayClick={false}
              open={this.state.open}
              onClose={this.onCloseModal}
              center
              classNames={{
                modal: "customModalNote",
              }}
            >
              <Row>
                <Col>
                  <div className="bloc-commentaire">
                    {this.props.notes.length !== 0 &&
                      this.props.notes.map((note, index) => (
                        <div key={index}>
                          <NoteSimple
                            note={note}
                            pieceJointes={this.props.pieceJointes}
                            usager={this.props.usager}
                          />
                          <hr className="divider-grey" />
                        </div>
                      ))}
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
