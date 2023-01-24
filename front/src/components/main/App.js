import React, { Component } from "react";
import Sidenav from "../navigation/Sidenav";
import Topnav from "../navigation/Topnav";
import Footer from "./Footer";
import Main from "./Main";
import { withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
import axios from "axios";
import { LoginContext } from "../util/LoginContext";

class App extends Component {
  _isMounted = false;

  state = {
    idRIO: "",
    nom: "",
    roles: [],
    service: "",
    mode: "",
  };

  componentDidMount() {
    this._isMounted = true;

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ALL_HEADERS}`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({ nom: response.data.split(";")[0] });
          this.setState({ idRIO: response.data.split(";")[1] });
          this.setState({
            roles: response.data
              .split(";")[2]
              .split("|")
              .map(Function.prototype.call, String.prototype.trim),
          });
          this.setState({ service: response.data.split(";")[3] });
          this.setState({ mode: response.data.split(";")[4] });
        }
      });

    if (JSON.parse(localStorage.getItem("ref_motifs_blocage")) != null) {
      let ref_motifs_blocage = JSON.parse(
        localStorage.getItem("ref_motifs_blocage")
      );
      let now = new Date();
      if (now.getTime() > ref_motifs_blocage.expiry) {
        localStorage.clear();
      }
    }

    if (JSON.parse(localStorage.getItem("ref_motifs_blocage")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MOTIFS_BLOCAGE_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            let ref_motifs_blocage = {
              value: response.data,
              expiry: new Date().getTime() + 24 * 60 * 60 * 1000,
            };
            localStorage.setItem(
              "ref_motifs_blocage",
              JSON.stringify(ref_motifs_blocage)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_statuts_demande")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_STATUTS_DEMANDE_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_statuts_demande",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_motifs_note")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MOTIFS_NOTE_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_motifs_note",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_motifs_rejet")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MOTIFS_REJET_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_motifs_rejet",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_couleurs")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_COULEURS_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem("ref_couleurs", JSON.stringify(response.data));
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_types_engin")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TYPES_ENGIN_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_types_engin",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_marques")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MARQUES_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem("ref_marques", JSON.stringify(response.data));
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_civilites")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_CIVILITES_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_civilites",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_statuts_engin")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_STATUTS_ENGIN_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_statuts_engin",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_roles")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_ROLES_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem("ref_roles", JSON.stringify(response.data));
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_types_trace")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TYPES_TRACE_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_types_trace",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_motifs_demande")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_MOTIFS_DEMANDE_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_motifs_demande",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_types_traitement")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TYPES_TRAITEMENT_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem(
              "ref_types_traitement",
              JSON.stringify(response.data)
            );
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_types_pj")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TYPES_PJ_URL}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem("ref_types_pj", JSON.stringify(response.data));
          }
        });
    }

    if (JSON.parse(localStorage.getItem("ref_pays")) == null) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_PAYS}`
        )
        .then((response) => {
          if (this._isMounted) {
            localStorage.setItem("ref_pays", JSON.stringify(response.data));
          }
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        <Grid>
          <Row>
            <Col sm={12}>
              <Topnav />
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Sidenav />
            </Col>
            <Col md={9}>
              <Main />
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Footer />
            </Col>
          </Row>
        </Grid>
      </LoginContext.Provider>
    );
  }
}

export default withRouter((props) => <App {...props} />);
