import React, { Component } from "react";
import { Col, Panel, Row } from "react-bootstrap";

export default class AdressePersonnePhysique extends Component {
  render() {
    let numeroVoie;
    let nomVoie;
    let complementAdresse;
    let codePostal;
    let commune;

    let personnePhysiqueNonExistant = this.props.demande.contenuDemande
      .personnePhysique;
    let personnePhysiqueExistant = this.props.demande.usager.personnePhysique;

    if (personnePhysiqueNonExistant != null) {
      numeroVoie = personnePhysiqueNonExistant.numeroVoie;
      nomVoie = personnePhysiqueNonExistant.nomVoie;
      complementAdresse = personnePhysiqueNonExistant.complementAdresse;
      codePostal = personnePhysiqueNonExistant.codePostal;
      commune = personnePhysiqueNonExistant.commune;
    } else {
      numeroVoie = personnePhysiqueExistant?.numeroVoie;
      nomVoie = personnePhysiqueExistant?.nomVoie;
      complementAdresse = personnePhysiqueExistant?.complementAdresse;
      codePostal = personnePhysiqueExistant?.codePostal;
      commune = personnePhysiqueExistant?.commune;
    }

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>Adresse du télé-déclarant</Panel.Title>
        </Panel.Heading>
        <hr className="divider" />
        <Panel.Body>
          <Row>
            <Col xs={12} sm={12}>
              <b>Voie : </b>
              <span>
                {numeroVoie} {nomVoie}
              </span>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <b>Complément : </b>
              <span>{complementAdresse}</span>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <b>Code postal : </b>
              <span>{codePostal}</span>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <b>Commune : </b>
              <span>{commune}</span>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    );
  }
}
