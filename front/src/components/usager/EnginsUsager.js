import React from "react";
import "react-table/react-table.css";
import { Col, Panel, Row } from "react-bootstrap";
import ListeEngins from "./ListeEngins";
import ListeEnginComplet from "./ListeEnginComplet";

const EnginsUsager = ({ engins }) => {
  const listeEngins = engins?.map((engin, index) => {
    if (index <= 3) {
      return <ListeEngins key={index} engin={engin} />;
    }
  });

  return (
    <Panel>
      <Panel.Heading>
        <Row>
          <Col xs={9}>
            <Panel.Title>Engin(s) de l'usager</Panel.Title>
          </Col>
          {engins?.length > 4 && (
            <Col xs={3}>
              <ListeEnginComplet engins={engins} />
            </Col>
          )}
        </Row>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body>
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
      </Panel.Body>
    </Panel>
  );
};
export default EnginsUsager;
