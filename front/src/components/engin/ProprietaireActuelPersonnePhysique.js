import React from "react";
import { Col, Row } from "react-bootstrap";

const ProprietaireActuelPersonnePhysique = ({ engin }) => {
  return (
    <Row>
      <Col xs={12} sm={5} md={6} lg={5}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Civilité : </b>
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.civilite.libelleLong}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Nom de naissance : </b>
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.nomNaissance}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Prénom(s) : </b>
          {engin?.personnePhysique !== null && engin?.personnePhysique?.prenom}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b> Date de naissance : </b>
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.dateNaissance}
        </Col>
      </Col>

      <Col xs={12} sm={7} md={6} lg={7}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Pays de naissance : </b>
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.paysNaissance}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Commune de naissance : </b>
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.communeNaissance}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b> Adresse postale : </b>
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.numeroVoie}{" "}
          {engin?.personnePhysique !== null && engin?.personnePhysique?.nomVoie}{" "}
          -{" "}
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.codePostal}{" "}
          {engin?.personnePhysique !== null && engin?.personnePhysique?.commune}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>N° de téléphone : </b>
          {engin?.personnePhysique !== null &&
            engin?.personnePhysique?.numeroTelephone}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <b>Email : </b>
          {engin?.personnePhysique?.usager?.email}
        </Col>
      </Col>
    </Row>
  );
};

export default ProprietaireActuelPersonnePhysique;
