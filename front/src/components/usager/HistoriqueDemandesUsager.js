import React from "react";
import { Col, Panel, Row } from "react-bootstrap";
import ListeHistoriqueUsager from "./ListeHistoriqueUsager";
import ListeHistoriqueUsagerComplete from "./ListeHistoriqueUsagerComplete";

const HistoriqueDemandesUsager = ({ demandes }) => {
  let listeHistorique = demandes?.map((demande, index) => {
    if (index <= 2) {
      return <ListeHistoriqueUsager key={index} demande={demande} />;
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
              <ListeHistoriqueUsagerComplete demandes={demandes} />
            </Col>
          )}
        </Row>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body>{listeHistorique} </Panel.Body>
    </Panel>
  );
};

export default HistoriqueDemandesUsager;
