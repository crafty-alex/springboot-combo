import React from "react";
import { Col, Panel, Row } from "react-bootstrap";
import ListeHistoriqueEngins from "./ListeHistoriqueEngins";
import ListeHistoriqueEnginsComplete from "./ListeHistoriqueEnginsComplete";

const HistoriqueDemandesEngins = ({ demandes }) => {
  let listeHistorique = demandes?.map((demande, index) => {
    if (index <= 2) {
      return <ListeHistoriqueEngins key={index} demande={demande} />;
    }
  });

  return (
    <Panel>
      <Panel.Heading>
        <Row>
          <Col xs={9}>
            <Panel.Title>Historique des demandes</Panel.Title>
          </Col>
          {demandes?.length > 3 && (
            <Col xs={3}>
              <ListeHistoriqueEnginsComplete demandes={demandes} />
            </Col>
          )}
        </Row>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body>{listeHistorique}</Panel.Body>
    </Panel>
  );
};

export default HistoriqueDemandesEngins;
