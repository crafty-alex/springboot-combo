import React from "react";
import { Col, Panel, Row } from "react-bootstrap";

const CaracteristiquesEngin = ({ engin }) => {
  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title>Caractéristiques de l'engin</Panel.Title>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body>
        <Row>
          <Col xs={12} sm={6}>
            <b>Type : </b>
            {engin?.typeEngin?.libelleLong}
          </Col>

          <Col xs={12} sm={6}>
            <b>N° de série : </b>
            {engin?.numeroSerieVin}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <b>Marque : </b>
            {engin?.marque?.libelleLong}
          </Col>
          <Col xs={12} sm={6}>
            <b>Couleur : </b>
            {engin?.couleurDominante?.libelleLong}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <b>Modèle : </b>
            {engin?.modele}
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
};

export default CaracteristiquesEngin;
