import React, {Component} from "react";
import "bootstrap/dist/js/bootstrap";
import "../../static/css/styles.css";
import {NavLink} from "react-router-dom";
import {Col, Collapse, Navbar, Row, Well} from "react-bootstrap";
import {LoginContext} from "../util/LoginContext";

export default class Sidenav extends Component {
  state = {
    open: false,
  };

  render() {
    return (
      <LoginContext.Consumer>
        {({ roles }) => {
          return (
            <Row>
                <Col xs={12}>
                <div className="sidenav">
                  <div id="myLinks">
                    <Navbar collapseOnSelect>
                      <Navbar.Header>
                        <Navbar.Toggle />
                      </Navbar.Header>
                      <Navbar.Collapse>
                        <div id="onglets">
                          <ul>
                            {(roles.includes("admin") ||
                              roles.includes("agent")) && (
                              <li className="nav-li">
                                <NavLink exact to="/">
                                  ACCUEIL
                                </NavLink>
                              </li>
                            )}

                            {roles.includes("agent") && (
                              <li className="nav-li">
                                <NavLink to="/nouveau-dossier">
                                  Nouveau dossier
                                </NavLink>
                              </li>
                            )}

                            {(roles.includes("admin") ||
                              roles.includes("agent")) && (
                              <li className="nav-li">
                                <NavLink to="/liste-demandes/false/false">
                                  Demandes à traiter
                                </NavLink>
                              </li>
                            )}

                            {(roles.includes("admin") ||
                              roles.includes("agent")) && (
                              <>
                                <li
                                  className="nav-li"
                                  id="recap-menu"
                                  onClick={() =>
                                    this.setState({ open: !this.state.open })
                                  }
                                >
                                  Récapitulatifs
                                </li>
                                <Collapse in={this.state.open}>
                                  <div>
                                    <Well>
                                      <li className="nav-li">
                                        <NavLink to="/liste-engins/false">
                                          Fiches Engins
                                        </NavLink>
                                      </li>
                                      <li className="nav-li">
                                        <NavLink to="/liste-usagers">
                                          Fiches Usagers
                                        </NavLink>
                                      </li>
                                      <li className="nav-li">
                                        <NavLink to="/liste-demandes-traitees">
                                          Demandes Traitées
                                        </NavLink>
                                      </li>
                                      <li className="nav-li">
                                        <NavLink to="/liste-demandes-rejetees">
                                          Demandes Rejetées
                                        </NavLink>
                                      </li>
                                    </Well>
                                  </div>
                                </Collapse>
                              </>
                            )}

                            {roles.includes("admin") && (
                              <>
                                <hr className="borderStatistiques" />
                                <li className="nav-li">
                                  <NavLink to="/statistiques">
                                    Statistiques
                                  </NavLink>
                                </li>

                                <li className="nav-li">
                                  <NavLink to="/liste-traces">
                                    Historique des opérations
                                  </NavLink>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </Navbar.Collapse>
                    </Navbar>
                  </div>
                </div>
              </Col>
            </Row>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}
