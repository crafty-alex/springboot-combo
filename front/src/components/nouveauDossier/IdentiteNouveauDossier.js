import React, {useEffect, useRef, useState} from "react";
import "../../static/css/detail-styles.css";
import Datetime from "react-datetime";
import {Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, Radio, Row,} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import NotificationAlert from "react-notification-alert";
import PersonneMoraleDejaExistanteModal from "./PersonneMoraleDejaExistanteModal";
import AdresseModal from "../adresse/AdresseModal";

import moment from "moment";
import {Loader} from "react-overlay-loader";

const IdentiteNouveauDossier = (props) => {
  const ref_pays = JSON.parse(localStorage.getItem("ref_pays"));
  const notifyRef = useRef(null);

  const [codePostal, setCodePostal] = useState("");
  const [nomVoie, setNomVoie] = useState("");
  const [numeroVoie, setNumeroVoie] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listeAdresses, setListeAdresses] = useState([]);
  const [numeroVoieOk, setNumeroVoieOk] = useState(true);
  const [adresseSelected, setAdresseSelected] = useState(false);
  const [personneMoraleModale, setPersonneMoraleModale] = useState(false);
  const [personneMoraleOk, setPersonneMoraleOk] = useState(false);
  const [file, setFile] = useState({});
  const [fileKbis, setFileKbis] = useState({});
  const [fileId, setFileId] = useState({});
  const [isPhysique, setIsPhysique] = useState(true);
  const [isMonsieur, setMonsieur] = useState(true);
  const [isSiret, setSiret] = useState(true);
  const [inputStyleNom, setInputStyleNom] = useState("");
  const [inputStylePrenom, setInputStylePrenom] = useState("");
  const [inputStyleNomRepresentant, setInputStyleNomRepresentant] = useState(
    ""
  );
  const [
    inputStylePrenomRepresentant,
    setInputStylePrenomRepresentant,
  ] = useState("");
  const [inputStyleDate, setInputStyleDate] = useState("");
  const [inputStyleCommuneNaissance, setInputStyleCommuneNaissance] = useState(
    ""
  );
  const [inputStyleCodePostal, setInputStyleCodePostal] = useState("");
  const [inputStyleNumeroVoie, setInputStyleNumeroVoie] = useState("");
  const [inputStyleNomVoie, setInputStyleNomVoie] = useState("");
  const [inputStyleComplement, setInputStyleComplement] = useState("");
  const [inputStyleEmail, setInputStyleEmail] = useState("");
  const [inputStyleNumeroTelephone, setInputStyleNumeroTelephone] = useState(
    ""
  );
  const [inputStyleDenomination, setInputStyleDenomination] = useState("");
  const [inputStyleNumeroSiretRna, setInputStyleNumeroSiretRna] = useState("");

  useEffect(() => {
    if (props.numeroTelephone === "") {
      setInputStyleNumeroTelephone("");
    }
  }, [props.numeroTelephone]);

  useEffect(() => {
    if (props.email === "") {
      setInputStyleEmail("");
    }
  }, [props.email]);

  useEffect(() => {
    if (props.complement === "") {
      setInputStyleComplement("");
    }
  }, [props.complement]);

  useEffect(() => {
    if (props.numeroVoie === "") {
      setInputStyleNumeroVoie("");
    }
  }, [props.numeroVoie]);

  useEffect(() => {
    if (props.codePostal === "") {
      setInputStyleCodePostal("");
    }
  }, [props.codePostal]);

  useEffect(() => {
    if (props.prenom === "") {
      setInputStylePrenom("");
    }
  }, [props.prenom]);

  useEffect(() => {
    if (props.nomNaissance === "") {
      setInputStyleNom("");
    }
  }, [props.nomNaissance]);

  useEffect(() => {
    if (props.prenomRepresentant === "") {
      setInputStylePrenomRepresentant("");
    }
  }, [props.prenomRepresentant]);

  useEffect(() => {
    if (props.nomRepresentant === "") {
      setInputStyleNomRepresentant("");
    }
  }, [props.nomRepresentant]);

  useEffect(() => {
    if (props.dateNaissance === "") {
      setInputStyleDate("");
    }
  }, [props.dateNaissance]);

  useEffect(() => {
    if (props.denominationRaisonSociale === "") {
      setInputStyleDenomination("");
    }
  }, [props.denominationRaisonSociale]);

  useEffect(() => {
    if (props.numeroSiretRna === "") {
      setInputStyleNumeroSiretRna("");
    }
  }, [props.numeroSiretRna]);

  useEffect(() => {
    if (props.civilite === "Monsieur") {
      setMonsieur(true);
    } else if (props.civilite === "Madame") {
      setMonsieur(false);
    } else {
      setMonsieur(true);
    }
  }, [props.civilite]);

  useEffect(() => {
    if (props.statut === "societe") {
      setSiret(true);
    } else {
      setSiret(false);
    }
  }, [props.statut]);

  useEffect(() => {
    if (props.type === "physique") {
      setIsPhysique(true);
    } else if (props.type === "morale") {
      setIsPhysique(false);
    } else {
      setIsPhysique(true);
    }
  }, [props.type]);

  const handleApiAdresse = () => {
    let type = 1;
    if (!isPhysique) {
      type = 2;
    }

    let cp = 0;
    if (codePostal !== "") {
      cp = codePostal;
    }
    let voie =
      numeroVoie +
      " " +
      nomVoie.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    setLoading(true);

    axios
      .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_API_ADRESSE}/${cp}/${voie}/10/${type}`
      )
      .then((response) => {

        if (Array.isArray(response.data.features)) {
          setListeAdresses(response.data.features);
        } else {
          let array = [];
          array.push(response.data.features);
          setListeAdresses(array);
        }

        setLoading(false);
        toggleModal();
      })
        .catch((err) => {
        setLoading(false);
          if (err.response.status === 404) {
            alertFail("Adresse non trouvée");
          } else {
            alertFail("Merci de vérifier les informations saisies");
          }

      });
  };

  const handleSelectedAdress = (adresse) => {
    props.handleNumeroVoie(adresse.properties.housenumber);
    props.handleNomVoie(adresse.properties.street);
    props.handleCodePostal(adresse.properties.postcode);
    props.handleCommune(adresse.properties.city);
    props.handleInseeCommune(adresse.properties.citycode);
    setAdresseSelected(true);
  };

  const handleCloseModal = () => {
    setNumeroVoie("");
    setNomVoie("");
    setCodePostal("");
    setShowModal(false);
    setNumeroVoieOk(true);
    setAdresseSelected(false);
  };

  const handleCloseModalValidate = () => {
    if (adresseSelected) {
      setShowModal(false);
      setNumeroVoieOk(!numeroVoie);
    } else {
      alertFail("Veuillez sélectionner une adresse postale.");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const togglePasDeNumeroDeVoie = () => {
    setNumeroVoieOk(!numeroVoieOk);
    setNumeroVoie("");
    document.getElementById("numeroVoie").value = "";
  };

  const resetFile = () => {
    setFile({});
    props.clearFile();
  };

  const resetFileKbis = () => {
    setFileKbis({});
    props.clearFileKbis();
  };

  const resetFileId = () => {
    setFileId({});
    props.clearFileId();
  };

  const handleFileKbis = (e) => {
    setFileKbis(e.target.files[0]);
    props.handleFileKbis(e.target.files[0]);
    e.target.value = "";
  };

  const handleFileId = (e) => {
    setFileId(e.target.files[0]);
    props.handleFileId(e.target.files[0]);
    e.target.value = "";
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    props.handleFile(e.target.files[0]);
    e.target.value = "";
  };

  const toggleMoraleOuPhysique = () => {
    setIsPhysique(!isPhysique);
  };

  useEffect(() => {
    if (!isPhysique) {
      props.isMorale();
    } else {
      props.isPhysique();
    }
  }, [isPhysique]);

  const checkNom = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      setInputStyleNom("invalidInput");
    } else {
      setInputStyleNom("");
    }
  };

  const checkNomVoie = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      setInputStyleNomVoie("invalidInput");
    } else {
      setInputStyleNomVoie("");
    }
  };

  const checkPrenom = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      setInputStylePrenom("invalidInput");
    } else {
      setInputStylePrenom("");
    }
  };

  const checkNomRepresentant = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      setInputStyleNomRepresentant("invalidInput");
    } else {
      setInputStyleNomRepresentant("");
    }
  };

  const checkPrenomRepresentant = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)
    ) {
      setInputStylePrenomRepresentant("invalidInput");
    } else {
      setInputStylePrenomRepresentant("");
    }
  };

  const checkDate = (e) => {
    let formatted = e._d?.toLocaleDateString("fr-FR");
    let formatted2 =
      formatted?.split("/")[1] +
      "/" +
      formatted?.split("/")[0] +
      "/" +
      formatted?.split("/")[2];
    let date = moment.utc(formatted2);

    if (!meetsMinimumAge(date.toDate())) {
      setInputStyleDate("invalidInput");
      alertFail("L’ usager doit être majeur pour déclarer un engin");
    } else {
      setInputStyleDate("");
    }
  };

  const meetsMinimumAge = (birthDate) => {
    var year = birthDate.getFullYear() + 18;
    var month = birthDate.getMonth() + 1;
    var day = birthDate.getDate();
    var x = month + "/" + day + "/" + year;
    let date = moment.utc(x);
    return date.toDate() <= new Date();
  };

  const checkCommuneNaissance = (event) => {
    if (!event.target.value.match(/^([a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      setInputStyleCommuneNaissance("invalidInput");
    } else {
      setInputStyleCommuneNaissance("");
    }
  };

  const checkCodePostal = (event) => {
    if (!event.target.value.match(/^([0-9])*$/)) {
      setInputStyleCodePostal("invalidInput");
    } else {
      setInputStyleCodePostal("");
    }
  };

  const checkNumeroVoie = (event) => {
    if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      setInputStyleNumeroVoie("invalidInput");
    } else {
      setInputStyleNumeroVoie("");
    }
  };

  const checkComplement = (event) => {
    if (!event.target.value.match(/^([0-9a-zA-Z-éèôöâïêëÈÉÂÔÊËÛçùûà' ])*$/)) {
      setInputStyleComplement("invalidInput");
    } else {
      setInputStyleComplement("");
    }
  };

  const checkNumeroTelephone = (event) => {
    if (
      event.target.value.length > 10 ||
      !event.target.value.match(/^([0-9])*$/)
    ) {
      setInputStyleNumeroTelephone("invalidInput");
    } else {
      setInputStyleNumeroTelephone("");
    }
  };

  const checkEmail = (event) => {
    if (
      event.target.value.length < 1 ||
      !event.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setInputStyleEmail("invalidInput");
    } else {
      setInputStyleEmail("");
    }
  };

  const checkDenominationRaisonSociale = (event) => {
    if (event.target.value.length < 1) {
      setInputStyleDenomination("invalidInput");
    } else {
      setInputStyleDenomination("");
    }
  };

  const checkNumeroSiretRna = (event) => {
    if (
      event.target.value.length < 1 ||
      event.target.value.length > 14 ||
      !event.target.value.match(/^([A-Za-z0-9À-ÿ '-])*$/)
    ) {
      setInputStyleNumeroSiretRna("invalidInput");
    } else {
      setInputStyleNumeroSiretRna("");
    }
  };

  const getPersonneMorale = () => {
    if (props.statut === "" || props.numeroSiretRna === "") {
      alertFail("Veuillez renseigner un numéro de SIRET / RNA ");
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PERSONNE_MORALE_BY_DONNEES_PIVOT_URL}`,
        {
          params: {
            statutJuridique: props.statut,
            numeroSiretRna: props.numeroSiretRna,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          setPersonneMoraleModale(!personneMoraleModale);
        } else {
          setPersonneMoraleOk(true);
        }
      });
  };

  const handleClosePersonneMoraleModal = () => {
    setPersonneMoraleModale(false);
  };

  const changeSiretRna = (e) => {
    setPersonneMoraleOk(false);
    props.handleChange(e);
  };

  const alertFail = (message) => {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
            <strong>{message} </strong>
          </div>
        </div>
      ),
      type: "danger",
      autoDismiss: 3,
    };

    notifyRef.current.notificationAlert(options);
  };

  const isValidDate = (event) => {
    return event <= new Date();
  };

  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <h4 className="titre-dossier">Identité du déclarant</h4>

      <NotificationAlert ref={notifyRef} />

      <Loader fullPage loading={loading} />

      <Row>
        <Col xs={12} sm={9} smOffset={3}>
          <Radio
            style={{ marginRight: "30px" }}
            value="physique"
            id="physique"
            name="typePersonne"
            onChange={toggleMoraleOuPhysique}
            inline
            checked={isPhysique}
          >
            Personne Physique
          </Radio>

          <Radio
            value="morale"
            id="morale"
            name="typePersonne"
            onChange={toggleMoraleOuPhysique}
            inline
            checked={!isPhysique}
          >
            Personne Morale
          </Radio>
        </Col>
      </Row>

      {isPhysique ? (
        <>
          <Row style={{ marginTop: "30px" }}>
            <Col xs={12} sm={3}>
              <ControlLabel>Civilité</ControlLabel>
            </Col>
            <Col xs={12} sm={5}>
              <FormGroup>
                <Radio
                  style={{ marginRight: "30px" }}
                  value="Monsieur"
                  id="monsieur"
                  name="civilite"
                  onChange={props.handleChange}
                  inline
                  checked={isMonsieur}
                >
                  Monsieur
                </Radio>
                <Radio
                  value="Madame"
                  id="madame"
                  name="civilite"
                  onChange={props.handleChange}
                  inline
                  checked={!isMonsieur}
                >
                  Madame
                </Radio>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Nom de naissance</ControlLabel>
            </Col>
            <Col xs={12} sm={5}>
              <FormGroup>
                <FormControl
                  value={props.nomNaissance}
                  type="text"
                  name="nomNaissance"
                  onChange={props.handleChange}
                  onBlur={checkNom}
                  className={`${inputStyleNom} form-control`}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Prénom(s)</ControlLabel>
            </Col>
            <Col xs={12} sm={5}>
              <FormGroup>
                <FormControl
                  value={props.prenom}
                  type="text"
                  name="prenom"
                  onChange={props.handleChange}
                  onBlur={checkPrenom}
                  className={`${inputStylePrenom} form-control`}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Date de naissance</ControlLabel>
            </Col>
            <Col xs={12} sm={5}>
              <Datetime
                onChange={props.handleChangeDate}
                value={props.dateNaissance}
                isValidDate={isValidDate}
                timeFormat={false}
                className={`${inputStyleDate}`}
                onClose={checkDate}
              />
            </Col>
          </Row>

          <Row>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Pays de naissance</ControlLabel>
            </Col>
            <Col xs={12} sm={5}>
              <FormGroup>
                <FormControl
                  componentClass="select"
                  value={props.paysNaissance}
                  type="text"
                  name="paysNaissance"
                  onChange={props.handleChange}
                >
                  <option value="">Tout afficher</option>
                  {ref_pays != null &&
                    ref_pays.map((s, index) => (
                      <option key={index}>{s.libelleLong}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                <ControlLabel>Commune de naissance</ControlLabel>
            </Col>
              <Col xs={12} sm={5}>
              <FormGroup>
                <FormControl
                  type="text"
                  value={props.communeNaissance}
                  name="communeNaissance"
                  onChange={props.handleChange}
                  className={`${inputStyleCommuneNaissance} form-control`}
                  onBlur={checkCommuneNaissance}
                ></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row style={{ marginTop: "30px" }}>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Raison sociale</ControlLabel>
            </Col>
            <Col xs={12} sm={5}>
              <FormGroup>
                <FormControl
                  value={props.denominationRaisonSociale}
                  type="text"
                  name="denominationRaisonSociale"
                  onChange={props.handleChange}
                  onBlur={checkDenominationRaisonSociale}
                  className={`${inputStyleDenomination} form-control`}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={3}>
              <ControlLabel>Statut juridique</ControlLabel>
            </Col>
            <Col xs={12} sm={7}>
              <FormGroup>
                <Radio
                  style={{ marginRight: "30px" }}
                  value="societe"
                  id="societe"
                  name="statut"
                  onChange={props.handleChange}
                  inline
                  checked={isSiret}
                >
                  Société (SIRET)
                </Radio>
                <Radio
                  value="association"
                  id="association"
                  name="statut"
                  onChange={props.handleChange}
                  inline
                  checked={!isSiret}
                >
                  Association (RNA)
                </Radio>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Numéro SIRET / RNA</ControlLabel>
            </Col>
            <Col xs={8} sm={5}>
              <FormGroup>
                <FormControl
                  value={props.numeroSiretRna}
                  type="text"
                  name="numeroSiretRna"
                  onChange={changeSiretRna}
                  onBlur={checkNumeroSiretRna}
                  className={`${inputStyleNumeroSiretRna} form-control`}
                />
              </FormGroup>
            </Col>
            <Col>
              <Button className="icon-search" onClick={getPersonneMorale}>
                Valider
              </Button>
            </Col>
          </Row>

          {personneMoraleOk && (
            <>
              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Nom du représentant</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      value={props.nomRepresentant}
                      type="text"
                      name="nomRepresentant"
                      onChange={props.handleChange}
                      onBlur={checkNomRepresentant}
                      className={`${inputStyleNomRepresentant} form-control`}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Prénom(s) du représentant</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      value={props.prenomRepresentant}
                      type="text"
                      name="prenomRepresentant"
                      onChange={props.handleChange}
                      onBlur={checkPrenomRepresentant}
                      className={`${inputStylePrenomRepresentant} form-control`}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{ marginTop: "30px" }}>
                <Col xs={12} sm={3}>
                  <ControlLabel>Civilité du contact</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <Radio
                      style={{ marginRight: "30px" }}
                      value="Monsieur"
                      id="monsieurContact"
                      name="civilite"
                      onChange={props.handleChange}
                      inline
                      checked={isMonsieur}
                    >
                      Monsieur
                    </Radio>
                    <Radio
                      value="Madame"
                      id="madameContact"
                      name="civilite"
                      onChange={props.handleChange}
                      inline
                      checked={!isMonsieur}
                    >
                      Madame
                    </Radio>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Nom du contact</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      value={props.nomNaissance}
                      type="text"
                      name="nomNaissance"
                      onChange={props.handleChange}
                      onBlur={checkNom}
                      className={`${inputStyleNom} form-control`}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Prénom(s) du contact</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      value={props.prenom}
                      type="text"
                      name="prenom"
                      onChange={props.handleChange}
                      onBlur={checkPrenom}
                      className={`${inputStylePrenom} form-control`}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Date de naissance du contact</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <Datetime
                      onChange={props.handleChangeDate}
                      value={props.dateNaissance}
                      isValidDate={isValidDate}
                      timeFormat={false}
                      className={`${inputStyleDate}`}
                      onClose={checkDate}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Pays de naissance du contact</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      componentClass="select"
                      value={props.paysNaissance}
                      type="text"
                      name="paysNaissance"
                      onChange={props.handleChange}
                    >
                      <option value="">Tout afficher</option>
                      {ref_pays != null &&
                        ref_pays.map((s, index) => (
                          <option key={index}>{s.libelleLong}</option>
                        ))}
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Commune de naissance du contact</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      value={props.communeNaissance}
                      type="text"
                      name="communeNaissance"
                      onChange={props.handleChange}
                      className={`${inputStyleCommuneNaissance} form-control`}
                      onBlur={checkCommuneNaissance}
                    ></FormControl>
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col style={{ marginTop: "10px" }} xs={12} sm={4}>
                  <ControlLabel>Joindre un extrait de KBIS</ControlLabel>
                </Col>
                <Col xs={12} sm={4} style={{ marginTop: "10px" }}>
                  <FormGroup>
                    <span className="image-upload">
                      <label htmlFor="file-input2">
                        <FontAwesomeIcon
                          className="iconFiles"
                          size="1x"
                          icon={faPaperclip}
                        />
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      {!fileKbis?.name ? (
                        <span className="spanAucunFichier">
                          Aucun fichier selectionné
                        </span>
                      ) : (
                        <span className="spanAucunFichier">
                          {fileKbis.name}
                        </span>
                      )}
                      <FormControl
                        id="file-input2"
                        type="file"
                        name="fileKbis"
                        onChange={handleFileKbis}
                      />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      className="iconFiles"
                      size="1x"
                      icon={faTrashAlt}
                      onClick={resetFileKbis}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={4}>
                  <FormGroup>
                    <FormControl
                      componentClass="select"
                      value={props.typeFileKbis}
                      type="text"
                      name="typeFileKbis"
                      onChange={props.handleChange}
                    >
                      <option value="Extrait KBIS">Extrait KBIS</option>
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col style={{ marginTop: "10px" }} xs={12} sm={4}>
                  <ControlLabel>
                    Joindre une pièce d'identité du représentant
                  </ControlLabel>
                </Col>
                <Col xs={12} sm={4} style={{ marginTop: "10px" }}>
                  <FormGroup>
                    <span className="image-upload">
                      <label htmlFor="file-input3">
                        <FontAwesomeIcon
                          className="iconFiles"
                          size="1x"
                          icon={faPaperclip}
                        />
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      {!fileId?.name ? (
                        <span className="spanAucunFichier">
                          Aucun fichier selectionné
                        </span>
                      ) : (
                        <span className="spanAucunFichier">{fileId.name}</span>
                      )}
                      <FormControl
                        id="file-input3"
                        type="file"
                        name="fileId"
                        onChange={handleFileId}
                      />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      className="iconFiles"
                      size="1x"
                      icon={faTrashAlt}
                      onClick={resetFileId}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={4}>
                  <FormGroup>
                    <FormControl
                      componentClass="select"
                      value={props.typeFileId}
                      type="text"
                      name="typeFileId"
                      onChange={props.handleChange}
                    >
                      <option value="Pièce d'identité du représentant / de la représentante">
                        Pièce d'identité du représentant / de la représentante
                      </option>
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}

      {(personneMoraleOk || isPhysique) && (
        <>
          <hr className="divider-dossier" />
          <h4 className="titre-dossier">Adresse du déclarant</h4>

          <Row>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Numéro de voie / Extension</ControlLabel>
            </Col>
            <Col xs={12} sm={3}>
              <FormGroup>
                <FormControl
                  disabled={!numeroVoieOk ? "disabled" : ""}
                  value={
                    props.numeroVoie === "" ? numeroVoie : props.numeroVoie
                  }
                  type="text"
                  name="numeroVoie"
                  id="numeroVoie"
                  onChange={(e) => setNumeroVoie(e.target.value)}
                  className={`${inputStyleNumeroVoie} form-control`}
                  onBlur={checkNumeroVoie}
                  onFocus={() => {
                    if (listeAdresses.length !== 0) {
                      setAdresseSelected(false);
                      props.handleNumeroVoie("");
                      setNumeroVoie("");
                    }
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Checkbox
                type="checkbox"
                checked={!numeroVoieOk}
                onChange={togglePasDeNumeroDeVoie}
                onFocus={() => {
                  if (listeAdresses.length !== 0) {
                    setAdresseSelected(false);
                  }
                }}
              >
                L’adresse ne comporte pas de numéro de voie
              </Checkbox>
            </Col>
          </Row>

          <Row style={{ marginTop: "10px" }}>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Type et nom de voie</ControlLabel>
            </Col>
            <Col xs={12} sm={5}>
              <FormControl
                type="text"
                name="nomVoie"
                onChange={(e) => setNomVoie(e.target.value)}
                value={props.nomVoie === "" ? nomVoie : props.nomVoie}
                className={`${inputStyleNomVoie} form-control`}
                onBlur={checkNomVoie}
                onFocus={() => {
                  if (listeAdresses.length !== 0) {
                    setAdresseSelected(false);
                    props.handleNomVoie("");
                    setNomVoie("");
                  }
                }}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Code postal</ControlLabel>
            </Col>
            <Col xs={12} sm={2}>
              <FormGroup>
                <FormControl
                  value={
                    props.codePostal === "" ? codePostal : props.codePostal
                  }
                  type="text"
                  name="codePostal"
                  onChange={(e) => setCodePostal(e.target.value)}
                  id="codePostal"
                  className={`${inputStyleCodePostal} form-control`}
                  onBlur={checkCodePostal}
                  onFocus={() => {
                    if (listeAdresses.length !== 0) {
                      setAdresseSelected(false);
                      props.handleCodePostal("");
                      setCodePostal("");
                    }
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                bsSize="small"
                bsStyle="info"
                onClick={handleApiAdresse}
                style={{
                  marginLeft: "15px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                disabled={
                  numeroVoie !== "" || nomVoie !== "" || codePostal !== ""
                    ? false
                    : true
                }
              >
                Rechercher
              </Button>
            </Col>
          </Row>

          {adresseSelected && (
            <>
              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={2}>
                  <ControlLabel>Commune</ControlLabel>
                </Col>
                <Col xs={6} sm={3}>
                  <FormGroup>
                    <FormControl
                      value={props.commune}
                      type="text"
                      name="commune"
                      onChange={props.handleChange}
                    ></FormControl>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={5}>
                  <ControlLabel>
                    Complément (Etage, Esc, App et/ou Immeuble)
                  </ControlLabel>
                </Col>
                <Col xs={12} sm={7}>
                  <FormGroup>
                    <FormControl
                      value={props.complement}
                      type="text"
                      name="complement"
                      onChange={props.handleChange}
                      className={`${inputStyleComplement} form-control`}
                      onBlur={checkComplement}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {isPhysique && (
                <Row>
                  <Col style={{ marginTop: "10px" }} xs={12} sm={4}>
                    <ControlLabel>
                      Joindre un justificatif de domicile
                    </ControlLabel>
                  </Col>
                  <Col xs={12} sm={4} style={{ marginTop: "10px" }}>
                    <FormGroup>
                      <span className="image-upload">
                        <label htmlFor="file-input">
                          <FontAwesomeIcon
                            className="iconFiles"
                            size="1x"
                            icon={faPaperclip}
                          />
                        </label>
                        &nbsp;&nbsp;&nbsp;
                        {!file?.name ? (
                          <span className="spanAucunFichier">
                            Aucun fichier selectionné
                          </span>
                        ) : (
                          <span className="spanAucunFichier">{file.name}</span>
                        )}
                        <FormControl
                          id="file-input"
                          type="file"
                          name="file"
                          onChange={handleFile}
                        />
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <FontAwesomeIcon
                        className="iconFiles"
                        size="1x"
                        icon={faTrashAlt}
                        onClick={resetFile}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={4}>
                    <FormGroup>
                      <FormControl
                        componentClass="select"
                        value={props.typeFile}
                        type="text"
                        name="typeFile"
                        onChange={props.handleChange}
                      >
                        <option value="Justificatif de domicile">
                          Justificatif de domicile
                        </option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>
              )}

              <hr className="divider-dossier" />

              {isPhysique ? (
                <h4 className="titre-dossier">Coordonnées du déclarant</h4>
              ) : (
                <h4 className="titre-dossier">Coordonnées du contact</h4>
              )}

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Adresse électronique</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      value={props.email}
                      type="text"
                      name="email"
                      onChange={props.handleChange}
                      className={`${inputStyleEmail} form-control`}
                      onBlur={checkEmail}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
                  <ControlLabel>Numéro de téléphone</ControlLabel>
                </Col>
                <Col xs={12} sm={5}>
                  <FormGroup>
                    <FormControl
                      value={props.numeroTelephone}
                      type="text"
                      name="numeroTelephone"
                      onChange={props.handleChange}
                      className={`${inputStyleNumeroTelephone} form-control`}
                      onBlur={checkNumeroTelephone}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}

      <AdresseModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleCloseModalValidate={handleCloseModalValidate}
        listeAdresses={listeAdresses}
        selectedAdress={handleSelectedAdress}
      />

      <PersonneMoraleDejaExistanteModal
        showModal={personneMoraleModale}
        closeModal={handleClosePersonneMoraleModal}
      />
    </>
  );
};

export default IdentiteNouveauDossier;
