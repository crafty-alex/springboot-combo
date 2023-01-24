import React from "react";
import { Col, Row } from "react-bootstrap";

const ProprietaireActuelPersonneMorale = ({ engin }) => {
  return (
    <Row>
      <Col xs={12} sm={5} md={6} lg={5}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Raison sociale : </b>
          {engin?.personneMorale?.denominationRaisonSociale}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>N° SIRET / N° RNA : </b>
          {engin?.personneMorale?.numeroSiret != null &&
            engin?.personneMorale?.numeroSiret}
          {engin?.personneMorale?.numeroRna != null &&
            engin?.personneMorale?.numeroRna}
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Nom du représentant : </b>
          {engin?.personneMorale?.nomRepresentant}
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Prénom(s) du représentant : </b>
          {engin?.personneMorale?.prenomRepresentant}
        </Col>
      </Col>

      <Col xs={12} sm={7} md={6} lg={7}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Civilité du contact : </b>

          {engin?.personneMorale?.usager ? (
            engin?.personneMorale?.usager?.personnePhysique?.civilite
              .libelleLong
          ) : (
            <span>N/A</span>
          )}
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Nom du contact : </b>
          {engin?.personneMorale?.usager ? (
            engin?.personneMorale?.usager?.personnePhysique?.nomNaissance
          ) : (
            <span>N/A</span>
          )}
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Prénom(s) du contact : </b>

          {engin?.personneMorale?.usager ? (
            engin?.personneMorale?.usager?.personnePhysique?.prenom
          ) : (
            <span>N/A</span>
          )}
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <b>N° de téléphone : </b>

          {engin?.personneMorale?.usager ? (
            engin?.personneMorale?.usager?.personnePhysique?.numeroTelephone
          ) : (
            <span>N/A</span>
          )}
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Email : </b>

          {engin?.personneMorale?.usager ? (
            engin?.personneMorale?.usager?.email
          ) : (
            <span>N/A</span>
          )}
        </Col>
      </Col>
    </Row>
  );
};

export default ProprietaireActuelPersonneMorale;
