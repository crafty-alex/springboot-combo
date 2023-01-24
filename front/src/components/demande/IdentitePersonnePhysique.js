import React, { Component } from "react";
import Non_connect from "../../static/images/non_connecte.png";
import Connect from "../../static/images/connecte.png";
import { Col, Image, Panel, Row } from "react-bootstrap";
import "moment/locale/fr";

export default class IdentitePersonnePhysique extends Component {
  constructor(props) {
    super(props);
    this.ref_civilites = JSON.parse(localStorage.getItem("ref_civilites"));
  }

  render() {
    let verificationIdentite = (
      <Image className="pull-right" style={{ width: "2em" }} src={Connect} />
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

    let civiliteId;
    let civilite;
    let nomNaissance;
    let prenom;
    let dateNaissance;
    let paysNaissance;
    let communeNaissance;
    let numeroTelephone;

    let personnePhysiqueNonExistant = this.props.demande.contenuDemande
      .personnePhysique;
    let personnePhysiqueExistant = this.props.demande.usager.personnePhysique;

    if (personnePhysiqueNonExistant != null) {
      civiliteId = personnePhysiqueNonExistant.civiliteId;
      nomNaissance = personnePhysiqueNonExistant.nomNaissance;
      prenom = personnePhysiqueNonExistant.prenom;
      dateNaissance = personnePhysiqueNonExistant.dateNaissance;
      paysNaissance = personnePhysiqueNonExistant.paysNaissance;
      communeNaissance = personnePhysiqueNonExistant.communeNaissance;
      numeroTelephone = personnePhysiqueNonExistant.numeroTelephone;
    } else {
      civiliteId = personnePhysiqueExistant?.civiliteId;
      nomNaissance = personnePhysiqueExistant?.nomNaissance;
      prenom = personnePhysiqueExistant?.prenom;
      dateNaissance = personnePhysiqueExistant?.dateNaissance;
      paysNaissance = personnePhysiqueExistant?.paysNaissance;
      communeNaissance = personnePhysiqueExistant?.communeNaissance;
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
                <b>Civilité : </b>
                {civilite}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Nom de naissance : </b>
                {nomNaissance}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Prénom(s) : </b>
                {prenom}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Date de naissance : </b>
                {dateNaissance}
              </Col>
            </Col>

            <Col xs={12} sm={6} md={6} lg={6}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Pays de naissance : </b>
                {paysNaissance}
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <b>Commune : </b>
                {communeNaissance}
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
