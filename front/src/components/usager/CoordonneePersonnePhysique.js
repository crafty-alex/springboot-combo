import React from "react";
import { Col, Panel, Row } from "react-bootstrap";

const CoordonneePersonnePhysique = ({ personnePhysique }) => {
  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title>Adresse et coordonnées de l'usager</Panel.Title>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body>
        <Row>
          <Col xs={12} sm={12}>
            <b>Voie : </b>
            {personnePhysique.numeroVoie}&nbsp;{personnePhysique.nomVoie}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Complément : </b>
            {personnePhysique.complementAdresse}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Code postal : </b>
            {personnePhysique.codePostal}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Ville : </b>
            {personnePhysique.commune}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>N° de teléphone : </b>
            {personnePhysique.numeroTelephone}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Email : </b>
            {personnePhysique.usager?.email}
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
};

export default CoordonneePersonnePhysique;
