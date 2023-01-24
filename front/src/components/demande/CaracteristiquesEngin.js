import React, {Component} from "react";
import {Col, Panel, Row} from "react-bootstrap";

export default class CaracteristiquesEngin extends Component {
  render() {
    let engin = this.props.demande.contenuDemande.engin;
    if (this.props.engin.numeroIdentification != null) {
      engin = this.props.engin;
    }
    let modele = engin.modele;
    let numeroSerieVin = engin.numeroSerieVin;
    let couleurDominante;
    let marque;
    let type;

    this.props.ref_couleurs.forEach((c) => {
      if (engin.couleurDominanteId === c.couleurDominanteId) {
        couleurDominante = c.libelleLong;
      }
    });

    this.props.ref_marques.forEach((m) => {
      if (engin.marqueId === m.marqueId) {
        marque = m.libelleLong;
      }
    });

      if (this.props.engin.numeroIdentification != null) {
          marque = engin.marque.libelleLong;
      }

    this.props.ref_types_engin.forEach((t) => {
      if (engin.typeEnginId === t.typeEnginId) {
        type = t.libelleLong;
      }
    });

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>Caractéristiques de l'engin</Panel.Title>
        </Panel.Heading>
        <hr className="divider" />
        <Panel.Body>
          <Row>
            <Col xs={12} sm={12}>
              <b>Type : </b>
              <span>{type}</span>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <b>Marque : </b>
              <span>{marque}</span>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <b>Modèle : </b>
              <span>{modele}</span>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <b>N° de série : </b>
              <span>{numeroSerieVin}</span>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <b>Couleur : </b>
              <span>{couleurDominante}</span>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    );
  }
}
