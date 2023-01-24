import React, { Component } from "react";
import { Modal } from "react-responsive-modal";
import NotificationAlert from "react-notification-alert";
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";

export default class RejetDemande extends Component {
  constructor(props) {
    super(props);
    this.ref_motifs_rejet = JSON.parse(
      localStorage.getItem("ref_motifs_rejet")
    );
    this.state = {
      open: false,
      motifRejet: "Tout afficher",
      rejetAutre: "",
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false, motifRejet: "Tout afficher", rejetAutre: "" });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.motifRejet === "Tout afficher") {
      this.alertFail("Veuillez choisir un motif");
      return;
    }

    this.props.validateRefuseDemande(
      this.state.motifRejet,
      this.state.rejetAutre
    );
    this.setState({ open: false });
  };

  alertFail = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message}</strong>
          </div>
        </div>
      ),
      type: "danger",
      autoDismiss: 3,
    };

    this.refs.notify.notificationAlert(options);
  };

  render() {
    let motif;
    let denominationRaisonSociale;

    if (this.props.demande.contenuDemande.personneMorale != null) {
      denominationRaisonSociale = this.props.demande.contenuDemande
        .personneMorale.denominationRaisonSociale;
    } else {
      denominationRaisonSociale = this.props.demande.usager.personneMorale
        ?.denominationRaisonSociale;
    }

    switch (this.props.demande.motifDemandeId) {
      case 1:
        motif = "première déclaration d’un engin motorisé non réceptionné,";
        break;
      case 2:
        motif = "déclaration de vente d’un engin motorisé non réceptionné,";
        break;
      case 3:
        motif =
          "déclaration de changement de titulaire d’un engin motorisé non réceptionné,";
        break;
      case 4:
        motif =
          "déclaration de changement de coordonnées d’un engin motorisé non réceptionné,";
        break;
      case 5:
        motif =
          "déclaration de vol ou de destruction d’un engin motorisé non réceptionné,";
        break;
      case 6:
        motif = "demande de code de vente d’un engin motorisé non réceptionné,";
        break;
      case 7:
        motif = "demande de récupération d'engins déjà déclarés,";
        break;
      case 8:
        motif =
          "déclaration de modification du contact de la société/de l'association " +
          denominationRaisonSociale +
          " pour un engin motorisé non réceptionné,";
        break;
      case 9:
        motif =
          "déclaration de modification des caractéristiques d’un engin motorisé non réceptionné,";
        break;
      default:
        motif = "";
    }

    return (
      <>
        <div>
          <div>
            <NotificationAlert ref="notify" />
          </div>

          <Button
            bsStyle="danger"
            className="buttons-demande"
            onClick={this.onOpenModal}
          >
            Rejeter la demande
          </Button>

          <div>
            <Modal
              closeOnOverlayClick={false}
              showCloseIcon={false}
              open={this.state.open}
              center
            >
              <Row>
                <h4 className="declarationCession">Rejet de la demande</h4>
                <hr className="borderDeclarationCession" />
              </Row>

              <Row>
                <form className="form-refus">
                  <Row>
                    <FormGroup>
                      <Col xs={12} md={6}>
                        <ControlLabel>
                          Sélectionnez le motif de rejet de cette demande
                        </ControlLabel>
                      </Col>
                      <Col xs={12} md={6}>
                        <FormControl
                          componentClass="select"
                          value={this.state.motifRejet}
                          type="text"
                          name="motifRejet"
                          onChange={this.handleChange}
                        >
                          <option>Tout afficher</option>
                          {this.ref_motifs_rejet != null &&
                            this.ref_motifs_rejet.map((r, index) => (
                              <option key={index}>{r.libelleLong}</option>
                            ))}
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Row>

                  {this.state.motifRejet === "Autre" && (
                    <div>
                      <div>
                        <i>
                          <br />
                          <br />
                          Madame, Monsieur,
                          <br />
                          <br />A la suite de votre {motif} nous sommes au
                          regret de vous informer que nous n’avons pu donner
                          suite à votre demande.
                          <br />
                          <br />
                        </i>
                      </div>

                      <FormGroup>
                        <FormControl
                          placeholder="Champ libre (limité à 1000 caractères)"
                          componentClass="textarea"
                          name="rejetAutre"
                          maxLength={1000}
                          onChange={this.handleChange}
                        />
                      </FormGroup>

                      <div>
                        <i>
                          Pour toute réclamation concernant cette décision,
                          merci de saisir par courrier, le Bureau national
                          d’immatriculation des véhicules dont l’adresse est
                          disponible dans la signature de ce mail.
                          <br />
                          <br />
                          Cordialement,
                        </i>
                      </div>
                    </div>
                  )}
                </form>
              </Row>

              <Row>
                <Col xs={12} className="buttons-refus-colonne">
                  <Button
                    bsStyle="success"
                    bsSize="small"
                    className="buttons-refus"
                    onClick={this.handleSubmit}
                  >
                    Confirmer
                  </Button>

                  <Button
                    bsStyle="danger"
                    bsSize="small"
                    className="buttons-refus"
                    onClick={this.onCloseModal}
                  >
                    Annuler
                  </Button>
                </Col>
              </Row>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}
