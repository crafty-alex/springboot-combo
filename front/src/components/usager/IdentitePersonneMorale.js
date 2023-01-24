import React from "react";
import { Col, Panel, Row } from "react-bootstrap";

const IdentitePersonneMorale = ({ personneMorale }) => {
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
              <b>Raison sociale : </b>
              {personneMorale?.denominationRaisonSociale}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>N° SIRET / N° RNA : </b>
              {personneMorale?.numeroSiret} {personneMorale?.numeroRna}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Nom du représentant : </b>
              {personneMorale.nomRepresentant}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Prénom(s) du représentant : </b>
              {personneMorale?.prenomRepresentant}
            </Col>
          </Col>

          <Col xs={12} sm={7} md={6} lg={7}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Civilité du contact : </b>
              {personneMorale.usager ? (
                personneMorale.usager?.personnePhysique?.civilite.libelleLong
              ) : (
                <span>N/A</span>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Nom du contact : </b>

              {personneMorale.usager ? (
                personneMorale.usager?.personnePhysique?.nomNaissance
              ) : (
                <span>N/A</span>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <b>Prénom(s) du contact : </b>

              {personneMorale.usager ? (
                personneMorale.usager?.personnePhysique?.prenom
              ) : (
                <span>N/A</span>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <b>ID Service : </b>

              {personneMorale.usager ? (
                personneMorale.usager?.serviceId
              ) : (
                <span>N/A</span>
              )}
            </Col>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
};

export default IdentitePersonneMorale;
