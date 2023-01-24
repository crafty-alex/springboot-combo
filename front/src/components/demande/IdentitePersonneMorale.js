import React, { Component } from "react";
import Non_connect from "../../static/images/non_connecte.png";
import Connect from "../../static/images/connecte.png";
import { Col, Image, Panel, Row } from "react-bootstrap";

export default class IdentitePersonneMorale extends Component {
  constructor(props) {
    super(props);
    this.ref_civilites = JSON.parse(localStorage.getItem("ref_civilites"));
  }

  render() {
    let verificationIdentite = (
      <>
        <Image className="pull-right" style={{ width: "2em" }} src={Connect} />
      </>
    );

    this.props.demande.jointureDemandeMotifBlocage.forEach((element) => {
      if (element.motifBlocage.libelleLong === "Identité non verifiée") {
        verificationIdentite = (
          <Image
            className="pull-right"
            style={{ width: "2em" }}
            src={Non_connect}
          />
        );
      }
    });

    let denominationRaisonSociale;
    let numeroSiret;
    let numeroRna;
    let nomRepresentant;
    let prenomRepresentant;

    let personneMoraleNonExistant = this.props.demande.contenuDemande
      .personneMorale;
    let personneMoraleExistant = this.props.personneMorale;

    if (personneMoraleExistant != null) {
      denominationRaisonSociale =
        personneMoraleExistant.denominationRaisonSociale;
      numeroSiret = personneMoraleExistant.numeroSiret;
      numeroRna = personneMoraleExistant.numeroRna;
      nomRepresentant = personneMoraleExistant.nomRepresentant;
      prenomRepresentant = personneMoraleExistant.prenomRepresentant;
    } else {
      denominationRaisonSociale =
        personneMoraleNonExistant?.denominationRaisonSociale;
      numeroSiret = personneMoraleNonExistant?.numeroSiret;
      numeroRna = personneMoraleNonExistant?.numeroRna;
      nomRepresentant = personneMoraleNonExistant?.nomRepresentant;
      prenomRepresentant = personneMoraleNonExistant?.prenomRepresentant;
    }

    let civiliteId;
    let civilite;
    let nomNaissance;
    let prenom;
    let numeroTelephone;

    let personnePhysiqueNonExistant = this.props.demande.contenuDemande
      .personnePhysique;
    let personnePhysiqueExistant = this.props.demande.usager.personnePhysique;

    if (personnePhysiqueNonExistant != null) {
      civiliteId = personnePhysiqueNonExistant.civiliteId;
      nomNaissance = personnePhysiqueNonExistant.nomNaissance;
      prenom = personnePhysiqueNonExistant.prenom;
      numeroTelephone = personnePhysiqueNonExistant.numeroTelephone;
    } else {
      civiliteId = personnePhysiqueExistant?.civiliteId;
      nomNaissance = personnePhysiqueExistant?.nomNaissance;
      prenom = personnePhysiqueExistant?.prenom;
      numeroTelephone = personnePhysiqueExistant?.numeroTelephone;
    }

    if (this.ref_civilites != null) {
      this.ref_civilites.forEach((c) => {
        if (civiliteId === c.civiliteId) {
          civilite = c.libelleLong;
        }
      });
    }

    let { email, serviceId } = this.props.demande.usager;

    return (
      <Panel>
        <Panel.Heading>
          <Row>
            <Col xs={6}>
              <Panel.Title>Identité du déclarant</Panel.Title>
            </Col>
            <Col xs={6}>{verificationIdentite}</Col>
          </Row>
        </Panel.Heading>
        <hr className="divider" />
        <Panel.Body className="identitePersonne">
          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <b>ID Service : </b>
                {serviceId}
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Raison sociale : </b>
                <span>{denominationRaisonSociale}</span>
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>N° SIRET / N° RNA : </b>
                {numeroSiret != null && numeroSiret}
                {numeroRna != null && numeroRna}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Nom du représentant : </b>
                <span>{nomRepresentant}</span>
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Prénom(s) du représentant : </b>
                <span>{prenomRepresentant}</span>
              </Col>
            </Col>

            <Col xs={12} sm={6} md={6} lg={6}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Civilité du contact : </b>
                {civilite}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Nom du contact : </b>
                {nomNaissance}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Prénom(s) du contact : </b>
                {prenom}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>N° de téléphone : </b>
                <span>{numeroTelephone}</span>
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Email : </b>
                {email}
              </Col>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    );
  }
}
