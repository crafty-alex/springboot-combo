import React, {useEffect, useRef, useState} from "react";
import "../../static/css/detail-styles.css";
import {Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, Radio, Row,} from "react-bootstrap";
import axios from "axios";
import EnginDejaExistantModal from "./EnginDejaExistantModal";
import NotificationAlert from "react-notification-alert";

const EnginNouveauDossier = (props) => {
  const ref_types_engin = JSON.parse(localStorage.getItem("ref_types_engin"));
  const ref_marques = JSON.parse(localStorage.getItem("ref_marques"));
  const ref_couleurs = JSON.parse(localStorage.getItem("ref_couleurs"));
  const notifyRef = useRef(null);

  const [isChecked, setCheck] = useState(false);
  const [isType1, setType1] = useState(true);
  const [isType2, setType2] = useState(false);
  const [isType3, setType3] = useState(false);
  const [inputStyleNumeroSerie, setInputStyleNumeroSerie] = useState("");
  const [numeroSerieOk, setNumeroSerieOk] = useState(false);
  const [enginModale, setEnginModale] = useState(false);

  useEffect(() => {
    if (props.numeroSerieVin === "") {
      setInputStyleNumeroSerie("");
    }
  }, [props.numeroSerieVin]);

  const handleCheck = () => {
    setCheck(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      props.checkEngin();
    } else {
      props.noCheckEngin();
    }
  }, [isChecked]);

  useEffect(() => {
    if (props.typeEnginId === "1") {
      setType1(true);
      setType2(false);
      setType3(false);
    } else if (props.typeEnginId === "2") {
      setType1(false);
      setType2(true);
      setType3(false);
    } else if (props.typeEnginId === "3") {
      setType1(false);
      setType2(false);
      setType3(true);
    } else {
      setType1(true);
      setType2(false);
      setType3(false);
    }
  }, [props.typeEnginId]);

  const checkNumeroSerie = (event) => {
    if (
      event.target.value.length < 1 ||
      event.target.value.length > 20 ||
      event.target.value.match(/\s/g)
    ) {
      setInputStyleNumeroSerie("invalidInput");
    } else {
      setInputStyleNumeroSerie("");
    }
  };

  const getEngin = () => {
    if (props.numeroSerieVin === "") {
      alertFail("Veuillez renseigner un numéro de série VIN");
      return;
    }
    axios
      .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_NUMERO_SERIE_VIN_EXIST}/${props.numeroSerieVin.toUpperCase()}`
      )
      .then((response) => {
        if (response.data) {
          setEnginModale(!enginModale);
        } else {
          setNumeroSerieOk(true);

            let event = {target: {name: "numeroSerieVinOk", value: true}};
            props.handleChange(event);
        }
      });
  };

  const handleCloseEnginModal = () => {
    setEnginModale(false);
  };

  const changeNumeroSerie = (e) => {
    setNumeroSerieOk(false);
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

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      <h4 className="titre-dossier">Caractéristiques de l'engin</h4>

      <NotificationAlert ref={notifyRef} />

      <Row>
        <Col xs={12} sm={5}>
          <Checkbox checked={isChecked} onChange={handleCheck}>
            Ne pas déclarer de nouvel engin
          </Checkbox>
        </Col>
      </Row>

      {!isChecked ? (
        <>
          <Row>
            <Col style={{ marginTop: "10px" }} xs={12} sm={3}>
              <ControlLabel>Numéro de série (VIN)</ControlLabel>
            </Col>
            <Col xs={8} sm={5}>
              <FormGroup>
                <FormControl
                  value={props.numeroSerieVin}
                  type="text"
                  name="numeroSerieVin"
                  onChange={changeNumeroSerie}
                  className={`${inputStyleNumeroSerie}`}
                  onBlur={checkNumeroSerie}
                />
              </FormGroup>
            </Col>
            <Col>
              <Button className="icon-search" onClick={getEngin}>
                Valider
              </Button>
            </Col>
          </Row>

          {numeroSerieOk && (
            <>
              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={5}>
                  <ControlLabel>Type</ControlLabel>
                </Col>
                <Col xs={12} sm={7}>
                  <FormGroup>
                    <Radio
                      value={ref_types_engin[0].typeEnginId}
                      name="typeEnginId"
                      id={ref_types_engin[0].typeEnginId}
                      onChange={props.handleChange}
                      checked={isType1}
                    >
                      {ref_types_engin[0].libelleLong}
                    </Radio>

                    <Radio
                      value={ref_types_engin[1].typeEnginId}
                      name="typeEnginId"
                      id={ref_types_engin[1].typeEnginId}
                      onChange={props.handleChange}
                      checked={isType2}
                    >
                      {ref_types_engin[1].libelleLong}
                    </Radio>

                    <Radio
                      value={ref_types_engin[2].typeEnginId}
                      name="typeEnginId"
                      id={ref_types_engin[2].typeEnginId}
                      onChange={props.handleChange}
                      checked={isType3}
                    >
                      {ref_types_engin[2].libelleLong}
                    </Radio>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={5}>
                  <ControlLabel>Marque</ControlLabel>
                </Col>
                <Col xs={12} sm={7}>
                  <FormControl
                    componentClass="select"
                    type="text"
                    name="marque"
                    value={props.marque}
                    onChange={props.handleChange}
                  >
                    <option>Tout afficher</option>
                    {ref_marques != null &&
                      ref_marques.map((m, index) => (
                        <option key={index}>{m.libelleLong}</option>
                      ))}
                    <option>Autre</option>
                  </FormControl>
                  {props.autreMarque && (
                    <FormControl
                      style={{ marginTop: "10px" }}
                      type="text"
                      name="marque"
                      placeholder="Saisir une nouvelle marque"
                      value={props.marque === "Autre" ? "" : props.marque}
                      onChange={props.handleChange}
                    ></FormControl>
                  )}
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col style={{ marginTop: "10px" }} xs={12} sm={5}>
                  <ControlLabel>Modèle</ControlLabel>
                </Col>
                <Col xs={12} sm={7}>
                  <FormGroup>
                    <FormControl
                      value={props.modele}
                      type="text"
                      name="modele"
                      onChange={props.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "10px" }} xs={12} sm={5}>
                  <ControlLabel>Couleur dominante</ControlLabel>
                </Col>
                <Col xs={12} sm={7}>
                  <FormControl
                    componentClass="select"
                    type="text"
                    name="couleurDominante"
                    value={props.couleurDominante}
                    onChange={props.handleChange}
                  >
                    <option>Tout afficher</option>
                    {ref_couleurs != null &&
                      ref_couleurs.map((m, index) => (
                        <option key={index}>{m.libelleLong}</option>
                      ))}
                  </FormControl>
                </Col>
              </Row>
            </>
          )}
        </>
      ) : null}

      <EnginDejaExistantModal
        showModal={enginModale}
        closeModal={handleCloseEnginModal}
      />
    </>
  );
};

export default EnginNouveauDossier;
