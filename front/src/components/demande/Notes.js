import React, { Component } from "react";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import "moment/locale/fr";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import "../../static/css/note-styles.css";
import { LoginContext } from "../util/LoginContext";
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Panel,
  Row,
} from "react-bootstrap";
import NotesListe from "./NotesListe";
import NoteSimple from "./NoteSimple";

export default class Notes extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.ref_motifs_note = JSON.parse(localStorage.getItem("ref_motifs_note"));
    this.state = {
      loading: false,
      date: new Date().toLocaleDateString("fr-FR"),
      motifNote: "Tout afficher",
      contenuNote: "",
      publishNote: true,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { idRIO, service, nom } = this.context;

    if (this.state.motifNote === "Tout afficher") {
      this.alertFail("Veuillez choisir un motif");
      return;
    }

    let data = {
      prenomAgent: nom.substring(0, nom.lastIndexOf(" ")),
      nomAgent: nom.substring(nom.lastIndexOf(" ") + 1),
      dateSaisie: moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
      motifNoteId: "",
      contenuNote: this.state.contenuNote,
      demandeId: this.props.demande.demandeId,
      noteUsager: false,
    };

    this.ref_motifs_note.forEach((e) => {
      if (this.state.motifNote === e.libelleLong) {
        data.motifNoteId = e.motifNoteId;
      }
    });

    this.setState({ loading: true });

    axios
      .post(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_NOTE_URL}`,
        data
      )
      .then(() => {
        this.setState({
          loading: false,
          motifNote: "Tout afficher",
          contenuNote: "",
        });
        this.alertSuccess("Note enregistrée");
        this.props.callBack();
      })
      .catch(() => {
        this.setState({ loading: false });
        this.alertFail("Échec : Note non enregistrée");
      });

    let trace = {
      profilUtilisateurId: 2,
      typeId: 4,
      demandeId: this.props.demande.demandeId,
      enginId: this.props.engin?.enginId,
      identifiantUsagerId: this.props.demande.identifiantUsagerId,
      personneMoraleId: this.props.demande.usager.personneMoraleId,
      personnePhysiqueId: this.props.demande.usager.personnePhysiqueId,
      utilisateurId: idRIO,
      serviceUtilisateur: service,
    };

    axios.post(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_SAVE_TRACE_URL}`,
      trace
    );

    this.setState({ motifNote: "Demande de justificatif", contenuNote: "" });
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

  alertSuccess = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message}</strong>
          </div>
        </div>
      ),
      type: "success",
      autoDismiss: 3,
    };
    this.refs.notify.notificationAlert(options);
  };

  render() {
    const { nom, roles } = this.context;
    let initialPrenom = nom.charAt(0);
    let initialNom = nom.substring(nom.lastIndexOf(" ") + 1).charAt(0);
    const { notes, usager, pieceJointes } = this.props.demande;
    let disablePublishNote = true;
    if (
      this.props.demande.statutDemandeId === 2 ||
      this.props.demande.statutDemandeId === 3 ||
      this.props.demande.statutDemandeId === 4
    ) {
      if (roles.includes("agent")) {
        disablePublishNote = false;
      }
    }

    return (
      <>
        <Loader fullPage loading={this.state.loading} />

        <Panel>
          <Panel.Heading>
            <Row>
              <Col xs={8}>
                <Panel.Title>Notes</Panel.Title>
              </Col>

              <Col xs={4} sm={4}>
                {notes.length !== 0 && (
                  <NotesListe
                    notes={notes}
                    pieceJointes={pieceJointes}
                    usager={usager}
                  />
                )}
              </Col>
            </Row>
          </Panel.Heading>

          <hr className="divider" />

          <Panel.Body>
            <div>
              <NotificationAlert ref="notify" />
            </div>

            <Row>
              <Col sm={12} md={6}>
                <form className="form" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Row>
                      <Col xs={4} sm={2} md={2} lg={2}>
                        <Avatar>
                          {" "}
                          {initialPrenom}
                          {initialNom}
                        </Avatar>
                      </Col>
                      <Col xs={8} sm={6} md={5} lg={4}>
                        <div className="bold-title">Ajout d'une note</div>
                        <div className="note-date">le {this.state.date}</div>
                      </Col>
                    </Row>

                    <Row className="input-motif">
                      <Col sm={12} md={8}>
                        <ControlLabel>Choisir un motif</ControlLabel>
                        <FormControl
                          disabled={disablePublishNote}
                          required
                          componentClass="select"
                          value={this.state.motifNote}
                          onChange={this.handleChange}
                          name="motifNote"
                        >
                          <option>Tout afficher</option>
                          {this.ref_motifs_note != null &&
                            this.ref_motifs_note.map((n, index) => (
                              <option key={index}>{n.libelleLong}</option>
                            ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup controlId="formControlsTextarea">
                    <FormControl
                      disabled={disablePublishNote}
                      required
                      name="contenuNote"
                      value={this.state.contenuNote}
                      maxLength="250"
                      componentClass="textarea"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Row>
                    <Col sm={6}>
                      <Button
                        disabled={disablePublishNote}
                        bsSize="small"
                        bsStyle="info"
                        className="button-note"
                        type="submit"
                      >
                        Publier la note
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Col>

              <Col sm={12} md={6}>
                {notes.length !== 0 && (
                  <NoteSimple
                    note={notes[0]}
                    pieceJointes={pieceJointes}
                    usager={usager}
                  />
                )}
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </>
    );
  }
}
