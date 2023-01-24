import React from "react";
import { Col, Panel, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SituationAdministrative = ({
  engin,
  dernieresDemandes,
  demandeVolDestruction,
  latestDemande,
}) => {
  let enginStatutId = engin?.statutEnginId;

  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title>Situation administrative</Panel.Title>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body>
        <Row>
          <Col xs={12} sm={6}>
            <b>N° d' identification : </b>
            {engin?.numeroIdentification}
          </Col>

          {enginStatutId === 3 && (
            <>
              <Col xs={12} sm={6}>
                {demandeVolDestruction != null && (
                  <b className="textRouge">Déclaré volé le : </b>
                )}
                {demandeVolDestruction != null &&
                  demandeVolDestruction?.contenuDemande?.dateVol}
              </Col>
            </>
          )}
          {enginStatutId === 2 && (
            <>
              <Col xs={12} sm={6}>
                {demandeVolDestruction != null && (
                  <b className="textRouge">Déclaré détruit le : </b>
                )}
                {demandeVolDestruction != null &&
                  demandeVolDestruction?.contenuDemande?.dateDestruction}
              </Col>
            </>
          )}
          {enginStatutId === 4 && (
            <>
              <Col xs={12} sm={6}>
                {latestDemande?.contenuDemande?.dateCession != null && (
                  <b className="textRouge">Déclaré vendu le : </b>
                )}
                {latestDemande?.contenuDemande?.dateCession != null &&
                  latestDemande?.contenuDemande?.dateCession}
              </Col>
            </>
          )}
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            <b>Date de 1ère déclaration : </b>
            {engin.datePremiereDeclaration}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <b>Opération en cours : </b>

            {dernieresDemandes?.length > 0 ? (
              dernieresDemandes.map((demande, index) => {
                return (
                  <span key={index} sm={12}>
                    {demande.motifDemande?.libelleLong} -{" "}
                    <NavLink to={`/fiche-demande/${demande.numeroDemande}`}>
                      Demande n° {""}
                      {demande.numeroDemande}
                      <br />
                    </NavLink>
                  </span>
                );
              })
            ) : (
              <span>N/A</span>
            )}
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
};

export default SituationAdministrative;
