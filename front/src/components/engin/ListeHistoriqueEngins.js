import React from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListeHistoriqueEngins = ({ demande }) => {
  let statutId = demande.statutDemande.statutDemandeId;
  let statut = demande.statutDemande.libelleLong;

  return (
    <>
      <div>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Col
              className="bold-title title-margin-top"
              xs={12}
              sm={12}
              md={12}
            >
              Motif de la demande :{" "}
              <b className="fontWeight">{demande.motifDemande?.libelleLong}</b>
            </Col>
          </Col>

          <Col xs={12} sm={4} md={4}>
            <Col xs={12} sm={12} md={12}>
              <div className="bold-title title-margin-top">
                Date de la demande :
              </div>{" "}
              {demande.dateSoumission}
            </Col>
            {statutId === 5 ? (
              <Col xs={12} sm={12} md={12}>
                <div className="bold-title title-margin-top">Statut :</div>
                <span>Validée le {demande.dateTraitement}</span>
              </Col>
            ) : statutId === 6 ? (
              <Col xs={12} sm={12} md={12}>
                <div className="bold-title title-margin-top">Statut :</div>
                <span>Rejetée le {demande.dateTraitement}</span>
              </Col>
            ) : (
              <Col xs={12} sm={12} md={12}>
                <div className="bold-title title-margin-top">Statut :</div>
                <span className="couleurStatut">{statut}</span>
              </Col>
            )}
          </Col>
          <Col xs={12} sm={4} md={4}>
            <Col xs={12} sm={12} md={12}>
              <div className="bold-title title-margin-top">Demande n° :</div>
              <NavLink
                to={{
                  pathname: `/fiche-demande/${demande.numeroDemande}`,
                  aboutProps: { name: "reload" },
                }}
              >
                {demande.numeroDemande}
              </NavLink>
            </Col>

            <Col xs={12} sm={12} md={12}>
              <div className="bold-title title-margin-top">
                Type de traitement :
              </div>{" "}
              {demande.typeTraitement?.libelleLong}
            </Col>
          </Col>

          <Col xs={12} sm={4} md={4}>
            <Col xs={12} sm={9} md={9}>
              <div className="bold-title title-margin-top">
                Nom du déclarant :{" "}
              </div>
              {demande.usager.personnePhysique?.nomNaissance != null
                ? demande.usager.personnePhysique?.nomNaissance
                : demande.contenuDemande.personnePhysique?.nomNaissance}
            </Col>
            <Col xs={12} sm={9} md={9}>
              <div className="bold-title title-margin-top">
                Prénom(s) du déclarant :{" "}
              </div>{" "}
              {demande.usager.personnePhysique?.prenom != null
                ? demande.usager.personnePhysique?.prenom
                : demande.contenuDemande.personnePhysique?.prenom}
            </Col>
            <Col xs={12} sm={2} md={2}>
              {demande.usager.personnePhysique != null ? (
                <NavLink
                  to={{
                    pathname: `/fiche-usager/1/${demande.usager.personnePhysiqueId}`,
                    aboutProps: { name: "reload" },
                  }}
                >
                  <div className="user-icon">
                    <FontAwesomeIcon size="3x" icon={faUser} />
                  </div>
                </NavLink>
              ) : null}
            </Col>
          </Col>
        </Row>
      </div>
      <hr className="divider-grey" />
    </>
  );
};

export default ListeHistoriqueEngins;
