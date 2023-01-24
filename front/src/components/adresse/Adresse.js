import React from "react";
import {Col, Row} from "react-bootstrap";

const Adresse = ({ adresse, handleChange }) => {
  return (
    <>
      <Row>
          <Col xs={1}>
          <input
            style={{ marginLeft: "10px" }}
            type="radio"
            id="adresse"
            name="adresse"
            onClick={() => handleChange(adresse)}
          />
        </Col>
          <Col xs={11}>
              <Col xs={12}>
            {adresse?.properties.housenumber}
          </Col>

          <Col xs={12}>{adresse?.properties.street}</Col>

          <Col xs={12}>{adresse?.properties.postcode}</Col>

          <Col xs={12}>{adresse?.properties.city}</Col>
        </Col>
      </Row>
    </>
  );
};

export default Adresse;
