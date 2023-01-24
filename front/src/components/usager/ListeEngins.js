import React from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ListeEngins = ({ engin }) => {
  return (
    <>
      <div>
        <Row>
          <div className="title-liste-engins">
            <Col xs={5}>
              <NavLink to={`/fiche-engin/${engin?.numeroIdentification}`}>
                {engin?.numeroIdentification}
              </NavLink>
            </Col>
            <Col xs={4}>{engin?.datePremiereDeclaration}</Col>
            <Col xs={3}>{engin?.numeroSerieVin}</Col>
          </div>
        </Row>
      </div>
    </>
  );
};

export default ListeEngins;
