import React from "react";
import "../../static/css/detail-styles.css";
import { Col, Panel, Row } from "react-bootstrap";

const Detail = ({ demande }) => {
  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title>Détails de la demande</Panel.Title>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body>
        <Row>
          <Col xs={12}>
            <b>Date de la demande : </b>
            {demande.dateSoumission}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <b>Motif de demande : </b>
            {demande.motifDemande.libelleLong}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <b>Motifs de blocage : </b>
            {demande.jointureDemandeMotifBlocage.length !== 0 ? (
              demande.jointureDemandeMotifBlocage.map((motif, index) => (
                <span id="motif-blocage" key={index}>
                  {motif.motifBlocage.libelleLong}
                  <br />
                </span>
              ))
            ) : (
              <span>N/A</span>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <b>Statut : </b>
            {demande.statutDemande.libelleLong}
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
};

export default Detail;
