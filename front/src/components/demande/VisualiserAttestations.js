import React, {Component} from "react";
import {Modal} from "react-responsive-modal";
import "../../static/css/attestation-styles.css";
import {Col, Row} from "react-bootstrap";
import axios from "axios";

export default class VisualiserAttestations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      attestations: this.props.attestations,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getAttestations = (ids) => {
    axios({
      url: `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ATTESTATIONS_URL}/${ids}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      if (
          response.data.type === "application/zip"
      ) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "attestations." +
            response.data.type.substring(response.data.type.indexOf("/") + 1)
        );
        document.body.appendChild(link);
        link.click();
      }
    });
  };

  getAttestation = (id) => {
    axios({
      url: `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ATTESTATION_URL}/${id}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      if (
        response.data.type === "image/jpeg" ||
        response.data.type === "image/png" ||
        response.data.type === "application/pdf"
      ) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "attestation_" +
            id +
            "." +
            response.data.type.substring(response.data.type.indexOf("/") + 1)
        );
        document.body.appendChild(link);
        link.click();
      }
    });
  };

  render() {
    let filtered = this.state.attestations.filter((a) => a.active);
    let ids = filtered.map((a) => a.attestationId);

    return (
      <>
        {filtered.length > 0 ? (
          <div>
            <a className="attestation" onClick={this.onOpenModal}>
              Visualiser les attestations
            </a>

            <Modal
              closeOnOverlayClick={false}
              onClose={this.onCloseModal}
              open={this.state.open}
              center
              classNames={{
                modal: "customModalAttestations",
              }}
            >
              <Row>
                <Col>
                  <a className="zip" onClick={() => this.getAttestations(ids)}>
                    Tout télécharger
                  </a>
                </Col>
              </Row>

              <Row>
                <Col>
                  <ol className="attest-list">
                    {filtered.map((value, index) => (
                      <li className="attest-list-item" key={index}>
                        <a
                          onClick={() =>
                            this.getAttestation(value.attestationId)
                          }
                        >
                          {value.uri.substring(value.uri.lastIndexOf("/") + 1)}
                        </a>
                      </li>
                    ))}
                  </ol>
                </Col>
              </Row>
            </Modal>
          </div>
        ) : null}
      </>
    );
  }
}
