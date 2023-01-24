import React from "react";
import { Col, Row } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const NoteSimple = ({ note, usager, pieceJointes }) => {
  let pieceJointesArray = [];
  if (note.reponseNote.length !== 0) {
    for (let i = 0; i < note.reponseNote.length; i++) {
      let reponseNoteId = note.reponseNote[i].reponseNoteId;
      for (let j = 0; j < pieceJointes.length; j++) {
        if (pieceJointes[j].reponseNoteId === reponseNoteId) {
          pieceJointesArray.push(pieceJointes[j]);
        }
      }
    }
  }

  const getPJ = (id) => {
    axios({
      url: `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PIECE_JOINTE_URL}/${id}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      if (
        response.data.type === "image/jpeg" ||
        response.data.type === "image/png" ||
        response.data.type === "application/pdf"
      ) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "piece_jointe." +
            response.data.type.substring(response.data.type.indexOf("/") + 1)
        );
        document.body.appendChild(link);
        link.click();
      }
    });
  };

  let initialNom = note.nomAgent?.charAt(0);
  let initialPrenom = note.prenomAgent?.charAt(0);

  return (
    <div>
      <div>
        <Row className="header-commentaire">
          {!note.noteUsager ? (
            <>
              <Col className="avatar" xs={4} sm={2} md={2} lg={2}>
                <Avatar>
                  {initialPrenom}
                  {initialNom}
                </Avatar>
              </Col>
              <Col xs={8} sm={4} md={8} lg={7}>
                <div className="bold-title">
                  {note.prenomAgent} {note.nomAgent} - Agent
                </div>
                <div>le {note.dateSaisie}</div>
              </Col>
            </>
          ) : (
            <Col xs={12} sm={12} md={12} lg={12}>
              {usager.personnePhysique != null ? (
                <b>
                  Note de{" "}
                  <span className="nom-usager">
                    {usager.personnePhysique.prenom}{" "}
                    {usager.personnePhysique.nomNaissance} :
                  </span>
                </b>
              ) : (
                <b>Note de l'usager : </b>
              )}
              <div>le {note.dateSaisie}</div>
            </Col>
          )}
        </Row>

        <div className="bold-title title-margin-top">Motif :</div>
        <div>{note.motifNote.libelleLong}</div>

        <div className="bold-title title-margin-top">Commentaire :</div>
        <div style={{ whiteSpace: "pre-line" }}>{note.contenuNote}</div>

        <Row>
          <Col sm={12}>
            <div className="bold-title title-margin-around">
              {!note.noteUsager && (
                <>
                  {usager.personnePhysique != null ? (
                    <div>
                      Réponse de{" "}
                      <span className="nom-usager">
                        {usager.personnePhysique.prenom}{" "}
                        {usager.personnePhysique.nomNaissance} :
                      </span>
                    </div>
                  ) : (
                    <div>Réponse : </div>
                  )}
                </>
              )}
            </div>
          </Col>
          <Col sm={12}>
            {pieceJointesArray.length !== 0 &&
              pieceJointesArray.map((pj, index) => (
                <ul key={index}>
                  <li>
                    <FontAwesomeIcon size="1x" icon={faPaperclip} />
                    &nbsp; &nbsp;
                    <a onClick={() => getPJ(pj.pieceJointeId)}>
                      {pj.typePieceJointe.libelleLong}
                    </a>
                  </li>
                </ul>
              ))}
          </Col>
        </Row>

        <div>
          {!note.noteUsager && (
            <>
              {note.reponseNote.length !== 0 ? (
                note.reponseNote.map((reponseNote, index) => (
                  <div key={index}>
                    <div>
                      le {reponseNote.dateReponse} <br />
                      {reponseNote.contenuReponse}
                      <br />
                      <br />
                    </div>
                  </div>
                ))
              ) : (
                <div className="reponse-note">En attente de réponse</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteSimple;
