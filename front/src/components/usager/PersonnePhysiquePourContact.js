import React from "react";
import { Col, Row } from "react-bootstrap";

const PersonnePhysiquePourContact = ({
  personnePhysique,
  handleChangePersonnePhysique,
}) => {
  return (
    <>
      <Row>
        <Col xs={12} sm={1} md={1} lg={1}>
          <input
            style={{ marginLeft: "10px" }}
            type="radio"
            id="personnePhysique"
            name="personnePhysique"
            onClick={() => handleChangePersonnePhysique(personnePhysique)}
          />
        </Col>
        <Col xs={12} sm={5} md={5} lg={5}>
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

        <Col xs={12} sm={6} md={6} lg={6}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <b>Date de naissance : </b>
            {personnePhysique.dateNaissance}
          </Col>

          <Col xs={12} sm={12} md={12} lg={12}>
            <b>Lieu de naissance : </b>
            {personnePhysique.communeNaissance != null ? (
              <>
                {personnePhysique.communeNaissance} (
                {personnePhysique.paysNaissance})
              </>
            ) : (
              <>{personnePhysique.paysNaissance}</>
            )}
          </Col>

          <Col xs={12} sm={12} md={12} lg={12}>
            <b>Email : </b>
            {personnePhysique.usager.email}
          </Col>
        </Col>
      </Row>
      <hr
        className="borderDeclarationCession"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </>
  );
};

export default PersonnePhysiquePourContact;
