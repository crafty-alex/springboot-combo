import React from "react";
import { Col, Panel, Row } from "react-bootstrap";

const IdentitePersonnePhysique = ({ personnePhysique }) => {
  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title>Identité de l'usager</Panel.Title>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body className="identitePersonne">
        <Row>
          <Col xs={12} sm={5} md={6} lg={5}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Civilité : </b>
              {personnePhysique?.civilite?.libelleLong}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Nom de naissance : </b>
              {personnePhysique.nomNaissance}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Prénom(s) : </b>
              {personnePhysique.prenom}
            </Col>
          </Col>

          <Col xs={12} sm={7} md={6} lg={7}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Date de naissance : </b>
              {personnePhysique.dateNaissance}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Pays de naissance : </b>
              {personnePhysique.paysNaissance}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Commune de naissance : </b>
              {personnePhysique.communeNaissance}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>ID Service : </b>
              {personnePhysique.usager?.serviceId}
            </Col>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
};

export default IdentitePersonnePhysique;
