import React from "react";
import { Col, Panel, Row } from "react-bootstrap";

const CoordonneePersonneMorale = ({ personneMorale }) => {
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
            {personneMorale.numeroVoie}&nbsp;
            {personneMorale.nomVoie}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Complément : </b>
            {personneMorale.entreeTourBatimentZi}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Code postal : </b>
            {personneMorale.codePostal}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Ville : </b>
            {personneMorale.commune}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Email : </b>

            {personneMorale.usager ? (
              personneMorale.usager?.email
            ) : (
              <span>N/A</span>
            )}
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
};

export default CoordonneePersonneMorale;
