import React, {Component} from "react";
import {Col, Panel, Row} from "react-bootstrap";

export default class AdressePersonneMorale extends Component {
  render() {
    let numeroVoie;
    let nomVoie;
      let destinataireService;
    let entreeTourBatimentZi;
      let bpTriService;
    let codePostal;
    let commune;

    let personneMoraleNonExistant = this.props.demande.contenuDemande
      .personneMorale;
    let personneMoraleExistant = this.props.personneMorale;

    if (personneMoraleExistant != null) {
      numeroVoie = personneMoraleExistant.numeroVoie;
      nomVoie = personneMoraleExistant.nomVoie;
        destinataireService = personneMoraleExistant.destinataireService;
      entreeTourBatimentZi = personneMoraleExistant.entreeTourBatimentZi;
        bpTriService = personneMoraleExistant.bpTriService;
      codePostal = personneMoraleExistant.codePostal;
      commune = personneMoraleExistant.commune;
    } else {
      if (personneMoraleNonExistant != null) {
        numeroVoie = personneMoraleNonExistant.numeroVoie;
        nomVoie = personneMoraleNonExistant.nomVoie;
          destinataireService = personneMoraleNonExistant.destinataireService;
        entreeTourBatimentZi = personneMoraleNonExistant.entreeTourBatimentZi;
          bpTriService = personneMoraleNonExistant.bpTriService;
        codePostal = personneMoraleNonExistant.codePostal;
        commune = personneMoraleNonExistant.commune;
      } else {
        numeroVoie = personneMoraleExistant?.numeroVoie;
        nomVoie = personneMoraleExistant?.nomVoie;
          destinataireService = personneMoraleExistant?.destinataireService;
        entreeTourBatimentZi = personneMoraleExistant?.entreeTourBatimentZi;
        codePostal = personneMoraleExistant?.codePostal;
          bpTriService = personneMoraleExistant?.bpTriService;
        commune = personneMoraleExistant?.commune;
      }
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
                <span>{destinataireService && entreeTourBatimentZi ? (destinataireService + ", " + entreeTourBatimentZi) :
                    destinataireService ? destinataireService :
                        entreeTourBatimentZi ? entreeTourBatimentZi :
                            null
                }</span>
            </Col>
          </Row>

            <Row>
                <Col xs={12} sm={12}>
                    <b>Bp - Tri - Service : </b>
                    <span>{bpTriService}</span>
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
