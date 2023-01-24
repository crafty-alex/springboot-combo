import React, { Component } from "react";
import "../../static/css/statistiques-styles.css";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  Panel,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

class Statistiques extends Component {
  state = {
    tableauDemandesStatus: undefined,
    tableauConsultations: undefined,
    tableauDemandesbyMonth: undefined,
    selectedMonth: new Date().getMonth() + 1,
    selectedYear: new Date().getFullYear(),
    monthForXLS: new Date().getMonth() + 1,
    yearForXLS: new Date().getFullYear(),
    demandesJanvier: 7672,
    demandesFevrier: 8425,
    demandesMars: 6654,
    demandesAvril: 5467,
    demandesMai: 5454,
    demandesJuin: 5235,
    demandesJuillet: 5100,
    demandesAout: 4228,
    demandesSeptembre: 4431,
    demandesOctobre: 4730,
    demandesNovembre: 4344,
    demandesDecembre: 5248,
    demandesTotal: 66988,
    consultationsJanvier: 9113,
    consultationsFevrier: 8352,
    consultationsMars: 9792,
    consultationsAvril: 9424,
    consultationsMai: 10226,
    consultationsJuin: 10749,
    consultationsJuillet: 8974,
    consultationsAout: 9826,
    consultationsSeptembre: 10060,
    consultationsOctobre: 9670,
    consultationsNovembre: 8432,
    consultationsDecembre: 7163,
    consultationsTotal: 111780,
  };

  constructor(props) {
    super(props);
    this.ref_motifs_demande = JSON.parse(
      localStorage.getItem("ref_motifs_demande")
    );
  }

  componentDidMount() {
    this.getTableaux();

    for (let i = 2021; i <= 2025; i++) {
      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TABLEAU_REPARTITION_DEMANDES}/${i}`
        )
        .then((response) => {
          this.setState({
            [`demandes` + i]: response.data,
            demandesJanvier:
              this.state.demandesJanvier +
              response.data[0][2] +
              response.data[1][2],
            demandesFevrier:
              this.state.demandesFevrier +
              response.data[0][3] +
              response.data[1][3],
            demandesMars:
              this.state.demandesMars +
              response.data[0][4] +
              response.data[1][4],
            demandesAvril:
              this.state.demandesAvril +
              response.data[0][5] +
              response.data[1][5],
            demandesMai:
              this.state.demandesMai +
              response.data[0][6] +
              response.data[1][6],
            demandesJuin:
              this.state.demandesJuin +
              response.data[0][7] +
              response.data[1][7],
            demandesJuillet:
              this.state.demandesJuillet +
              response.data[0][8] +
              response.data[1][8],
            demandesAout:
              this.state.demandesAout +
              response.data[0][9] +
              response.data[1][9],
            demandesSeptembre:
              this.state.demandesSeptembre +
              response.data[0][10] +
              response.data[1][10],
            demandesOctobre:
              this.state.demandesOctobre +
              response.data[0][11] +
              response.data[1][11],
            demandesNovembre:
              this.state.demandesNovembre +
              response.data[0][12] +
              response.data[1][12],
            demandesDecembre:
              this.state.demandesDecembre +
              response.data[0][13] +
              response.data[1][13],
            demandesTotal:
              this.state.demandesTotal +
              response.data[0][14] +
              response.data[1][14],
          });
        });

      axios
        .get(
          `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TABLEAU_REPARTITION_CONSULTATIONS}/${i}`
        )
        .then((response) => {
          this.setState({
            [`consultations` + i]: response.data,
            consultationsJanvier:
              this.state.consultationsJanvier +
              response.data[0][1] +
              response.data[1][1],
            consultationsFevrier:
              this.state.consultationsFevrier +
              response.data[0][2] +
              response.data[1][2],
            consultationsMars:
              this.state.consultationsMars +
              response.data[0][3] +
              response.data[1][3],
            consultationsAvril:
              this.state.consultationsAvril +
              response.data[0][4] +
              response.data[1][4],
            consultationsMai:
              this.state.consultationsMai +
              response.data[0][5] +
              response.data[1][5],
            consultationsJuin:
              this.state.consultationsJuin +
              response.data[0][6] +
              response.data[1][6],
            consultationsJuillet:
              this.state.consultationsJuillet +
              response.data[0][7] +
              response.data[1][7],
            consultationsAout:
              this.state.consultationsAout +
              response.data[0][8] +
              response.data[1][8],
            consultationsSeptembre:
              this.state.consultationsSeptembre +
              response.data[0][9] +
              response.data[1][9],
            consultationsOctobre:
              this.state.consultationsOctobre +
              response.data[0][10] +
              response.data[1][10],
            consultationsNovembre:
              this.state.consultationsNovembre +
              response.data[0][11] +
              response.data[1][11],
            consultationsDecembre:
              this.state.consultationsDecembre +
              response.data[0][12] +
              response.data[1][12],
            consultationsTotal:
              this.state.consultationsTotal +
              response.data[0][13] +
              response.data[1][13],
          });
        });
    }
  }

  async getTableaux() {
    const responseTableauDemandesStatus = await axios.get(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TABLEAU_DEMANDES_BY_STATUS}`
    );

    const responseTableauConsultations = await axios.get(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TABLEAU_CONSULTATIONS_FSI}/${this.state.selectedMonth}/${this.state.selectedYear}`
    );

    const responseTableauDemandesbyMonth = await axios.get(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TABLEAU_DEMANDES_BY_MONTH}/${this.state.selectedMonth}/${this.state.selectedYear}`
    );

    this.setState({
      tableauDemandesStatus: responseTableauDemandesStatus.data,
      tableauConsultations: responseTableauConsultations.data,
      tableauDemandesbyMonth: responseTableauDemandesbyMonth.data,
    });
  }

  handleChangeMonth = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) + 1 });
  };

  handleChangeYear = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getRecherche();
  };

  async getRecherche() {
    const rechercheConsultations = await axios.get(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TABLEAU_CONSULTATIONS_FSI}/${this.state.selectedMonth}/${this.state.selectedYear}`
    );

    const rechercheDemandesByMonth = await axios.get(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/${process.env.REACT_APP_GET_TABLEAU_DEMANDES_BY_MONTH}/${this.state.selectedMonth}/${this.state.selectedYear}`
    );
    this.setState({
      tableauConsultations: rechercheConsultations.data,
      tableauDemandesbyMonth: rechercheDemandesByMonth.data,
      yearForXLS: this.state.selectedYear,
    });
    if (this.state.selectedMonth < 10) {
      this.setState({
        monthForXLS: "0" + this.state.selectedMonth.toString(),
      });
    } else {
      this.setState({
        monthForXLS: this.state.selectedMonth,
      });
    }
  }

  render() {
    let arrayMotifsDemande = [];

    this.ref_motifs_demande.forEach((e) => {
      arrayMotifsDemande.push(e.libelleLong);
    });

    let monthToday = new Date().getMonth().toString();

    var start_year = new Date().getFullYear();
    let optionsYears = [];
    let deltaYears = 2020 - 2018;
    for (var i = 2020; i > 2020 - deltaYears; i--) {
      optionsYears.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    let listeAnnees = [];
    for (let i = 2021; i <= 2025; i++) {
      listeAnnees.push(i);
    }

    return !this.state.tableauConsultations ||
      !this.state.tableauDemandesbyMonth ||
      !this.state.tableauDemandesStatus ? (
      <h3>Chargement en cours...</h3>
    ) : (
      <>
        <Row style={{ marginTop: "20px" }}>
          <form onSubmit={this.handleSubmit}>
            <Col className="libelle" xs={12} sm={4}>
              <b>Les chiffres du mois :</b>
            </Col>

            <Col xs={12} sm={3}>
              <FormGroup>
                <FormControl
                  defaultValue={monthToday}
                  componentClass="select"
                  type="text"
                  name="selectedMonth"
                  onChange={this.handleChangeMonth}
                >
                  <option value={"00"}>Janvier</option>
                  <option value={"01"}>Février</option>
                  <option value={"02"}>Mars</option>
                  <option value={"03"}>Avril</option>
                  <option value={"04"}>Mai</option>
                  <option value={"05"}>Juin</option>
                  <option value={"06"}>Juillet</option>
                  <option value={"07"}>Août</option>
                  <option value={"08"}>Septembre</option>
                  <option value={"09"}>Octobre</option>
                  <option value={"10"}>Novembre</option>
                  <option value={"11"}>Décembre</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={12} sm={3}>
              <FormGroup>
                <FormControl
                  componentClass="select"
                  type="text"
                  name="selectedYear"
                  onChange={this.handleChangeYear}
                >
                  {optionsYears}
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={12} sm={2}>
              <Button
                style={{ marginBottom: "15px" }}
                bsStyle="info"
                type="submit"
              >
                Rechercher
              </Button>
            </Col>
          </form>
        </Row>

        <hr className="stat-divider" />

        <Row>
          <Panel className="stat-accueil">
            <Panel.Body>
              <Row>
                <Col xs={6} md={6} lg={5} style={{ textAlign: "right" }}>
                  <b>Nombre de consultations par les FSI : </b>
                  {this.state.tableauConsultations[0][1] +
                    this.state.tableauConsultations[1][1]}
                </Col>
                <Col xs={6} md={6} lg={5} lgOffset={2}>
                  <b>Nombre de demandes rejetées : </b>
                  {this.state.tableauDemandesbyMonth[0][4] +
                    this.state.tableauDemandesbyMonth[1][4] +
                    this.state.tableauDemandesbyMonth[2][4] +
                    this.state.tableauDemandesbyMonth[3][4] +
                    this.state.tableauDemandesbyMonth[4][4] +
                    this.state.tableauDemandesbyMonth[5][4] +
                    this.state.tableauDemandesbyMonth[6][4] +
                    this.state.tableauDemandesbyMonth[4][4] +
                    this.state.tableauDemandesbyMonth[8][4] +
                    this.state.tableauDemandesbyMonth[9][4] +
                    this.state.tableauDemandesbyMonth[0][5] +
                    this.state.tableauDemandesbyMonth[1][5] +
                    this.state.tableauDemandesbyMonth[2][5] +
                    this.state.tableauDemandesbyMonth[3][5] +
                    this.state.tableauDemandesbyMonth[4][5] +
                    this.state.tableauDemandesbyMonth[5][5] +
                    this.state.tableauDemandesbyMonth[6][5] +
                    this.state.tableauDemandesbyMonth[7][5] +
                    this.state.tableauDemandesbyMonth[8][5] +
                    this.state.tableauDemandesbyMonth[9][5]}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6} lg={5} style={{ textAlign: "right" }}>
                  <b>dont Gendarmerie : </b>
                  {this.state.tableauConsultations[0][1]}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6} lg={5} style={{ textAlign: "right" }}>
                  <b>dont Police : </b>
                  {this.state.tableauConsultations[1][1]}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    className="tableau"
                    id="table-demandesByMonth"
                    responsive
                    striped={true}
                    bordered={true}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th colSpan="2" className="demandes-validees">
                          DEMANDES VALIDÉES
                        </th>
                        <th colSpan="2" className="demandes-rejetees">
                          DEMANDES REJETÉES
                        </th>
                        <th className="demandes-total">TOTAL</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th></th>
                        <th className="demandes-validees">MANUELLE</th>
                        <th className="demandes-validees">SYSTÈME</th>
                        <th className="demandes-rejetees">MANUELLE</th>
                        <th className="demandes-rejetees">SYSTÈME</th>
                        <th className="demandes-total"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[0]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[0][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[0][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[0][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[0][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[0][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[1]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[1][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[1][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[1][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[1][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[1][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[2]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[2][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[2][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[2][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[2][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[2][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[3]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[3][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[3][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[3][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[3][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[3][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[4]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[4][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[4][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[4][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[4][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[4][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[5]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[5][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[5][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[5][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[5][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[5][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[6]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[6][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[6][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[6][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[6][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[6][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[7]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[7][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[7][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[7][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[7][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[7][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[8]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[8][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[8][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[8][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[8][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[8][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="motif">{arrayMotifsDemande[9]}</td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[9][2]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[9][3]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[9][4]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[9][5]}
                        </td>
                        <td className="cell">
                          {this.state.tableauDemandesbyMonth[9][6]}
                        </td>
                      </tr>
                      <tr>
                        <td className="total">TOTAL</td>
                        <td className="demandes-validees">
                          {this.state.tableauDemandesbyMonth[0][2] +
                            this.state.tableauDemandesbyMonth[1][2] +
                            this.state.tableauDemandesbyMonth[2][2] +
                            this.state.tableauDemandesbyMonth[3][2] +
                            this.state.tableauDemandesbyMonth[4][2] +
                            this.state.tableauDemandesbyMonth[5][2] +
                            this.state.tableauDemandesbyMonth[6][2] +
                            this.state.tableauDemandesbyMonth[7][2] +
                            this.state.tableauDemandesbyMonth[8][2] +
                            this.state.tableauDemandesbyMonth[9][2]}
                        </td>
                        <td className="demandes-validees">
                          {this.state.tableauDemandesbyMonth[0][3] +
                            this.state.tableauDemandesbyMonth[1][3] +
                            this.state.tableauDemandesbyMonth[2][3] +
                            this.state.tableauDemandesbyMonth[3][3] +
                            this.state.tableauDemandesbyMonth[4][3] +
                            this.state.tableauDemandesbyMonth[5][3] +
                            this.state.tableauDemandesbyMonth[6][3] +
                            this.state.tableauDemandesbyMonth[7][3] +
                            this.state.tableauDemandesbyMonth[8][3] +
                            this.state.tableauDemandesbyMonth[9][3]}
                        </td>
                        <td className="demandes-rejetees">
                          {this.state.tableauDemandesbyMonth[0][4] +
                            this.state.tableauDemandesbyMonth[1][4] +
                            this.state.tableauDemandesbyMonth[2][4] +
                            this.state.tableauDemandesbyMonth[3][4] +
                            this.state.tableauDemandesbyMonth[4][4] +
                            this.state.tableauDemandesbyMonth[5][4] +
                            this.state.tableauDemandesbyMonth[6][4] +
                            this.state.tableauDemandesbyMonth[4][4] +
                            this.state.tableauDemandesbyMonth[8][4] +
                            this.state.tableauDemandesbyMonth[9][4]}
                        </td>
                        <td className="demandes-rejetees">
                          {this.state.tableauDemandesbyMonth[0][5] +
                            this.state.tableauDemandesbyMonth[1][5] +
                            this.state.tableauDemandesbyMonth[2][5] +
                            this.state.tableauDemandesbyMonth[3][5] +
                            this.state.tableauDemandesbyMonth[4][5] +
                            this.state.tableauDemandesbyMonth[5][5] +
                            this.state.tableauDemandesbyMonth[6][5] +
                            this.state.tableauDemandesbyMonth[7][5] +
                            this.state.tableauDemandesbyMonth[8][5] +
                            this.state.tableauDemandesbyMonth[9][5]}
                        </td>
                        <td className="demandes-total">
                          {this.state.tableauDemandesbyMonth[0][6] +
                            this.state.tableauDemandesbyMonth[1][6] +
                            this.state.tableauDemandesbyMonth[2][6] +
                            this.state.tableauDemandesbyMonth[3][6] +
                            this.state.tableauDemandesbyMonth[4][6] +
                            this.state.tableauDemandesbyMonth[5][6] +
                            this.state.tableauDemandesbyMonth[6][6] +
                            this.state.tableauDemandesbyMonth[7][6] +
                            this.state.tableauDemandesbyMonth[8][6] +
                            this.state.tableauDemandesbyMonth[9][6]}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={12} style={{ textAlign: "right" }}>
                  <ReactHTMLTableToExcel
                    id="btn-tableau-demandes-par-mois"
                    className="download-table-xls-button btnExtractStats"
                    table="table-demandesByMonth"
                    filename={`DICEM2_stats_demandes_mois_${this.state.yearForXLS}${this.state.monthForXLS}`}
                    sheet={`${this.state.monthForXLS}_${this.state.yearForXLS}`}
                    buttonText="Extraire les statistiques"
                  />
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        </Row>

        <Row>
          <Col className="libelle" xs={12}>
            <b>Nombre total de demandes par statut</b>
          </Col>
        </Row>

        <hr className="stat-divider" />

        <Row>
          <Col style={{ marginLeft: "-15px", width: "auto" }} xs={12} sm={7}>
            <Panel className="stat-accueil">
              <Panel.Body>
                <Table
                  className="tableau-statuts"
                  id="tableau-demandesByStatus"
                  responsive
                  striped={true}
                  bordered={true}
                >
                  <tbody>
                    <tr>
                      <td className="statut">SOUMISE</td>
                      <td className="cell">
                        {this.state.tableauDemandesStatus[0][2]}
                      </td>
                    </tr>
                    <tr>
                      <td className="statut">A TRAITER</td>
                      <td className="cell">
                        {this.state.tableauDemandesStatus[1][2]}
                      </td>
                    </tr>
                    <tr>
                      <td className="statut">EN ATTENTE RETOUR USAGER</td>
                      <td className="cell">
                        {this.state.tableauDemandesStatus[2][2]}
                      </td>
                    </tr>
                    <tr>
                      <td className="statut">A VALIDER</td>
                      <td className="cell">
                        {this.state.tableauDemandesStatus[3][2]}
                      </td>
                    </tr>
                    <tr>
                      <td className="statut">TRAITEE</td>
                      <td className="cell">
                        {this.state.tableauDemandesStatus[4][2]}
                      </td>
                    </tr>
                    <tr>
                      <td className="statut">REJETEE</td>
                      <td className="cell">
                        {this.state.tableauDemandesStatus[5][2]}
                      </td>
                    </tr>
                    <tr>
                      <td className="total-libelle">TOTAL</td>
                      <td className="total-statuts">
                        {this.state.tableauDemandesStatus[0][2] +
                          this.state.tableauDemandesStatus[1][2] +
                          this.state.tableauDemandesStatus[2][2] +
                          this.state.tableauDemandesStatus[3][2] +
                          this.state.tableauDemandesStatus[4][2] +
                          this.state.tableauDemandesStatus[5][2]}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Row>
                  <Col
                    xs={12}
                    style={{ textAlign: "right", paddingRight: "9px" }}
                  >
                    <ReactHTMLTableToExcel
                      id="btn-tableau-demandes-par-status"
                      className="download-table-xls-button btnExtractStats"
                      table="tableau-demandesByStatus"
                      filename={`DICEM2_stats_demandes_status_${new Date().getFullYear()}${
                        new Date().getMonth() + 1
                      }`}
                      sheet={`${
                        new Date().getMonth() + 1
                      }_${new Date().getFullYear()}`}
                      buttonText="Extraire les statistiques"
                    />
                  </Col>
                </Row>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col className="libelle" xs={12}>
            <b>
              Répartition des demandes enregistrées depuis 2009 par type de
              saisie
            </b>
          </Col>
        </Row>

        <hr className="stat-divider" />

        <Row>
          <Panel className="stat-accueil">
            <Panel.Body>
              <Row>
                <Col>
                  <Table
                    className="tableau"
                    id="table-demandesDepuis2009"
                    responsive
                    striped={false}
                    bordered={true}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th className="cell">Janv</th>
                        <th className="cell">Fév</th>
                        <th className="cell">Mars</th>
                        <th className="cell">Avr</th>
                        <th className="cell">Mai</th>
                        <th className="cell">Juin</th>
                        <th className="cell">Juil</th>
                        <th className="cell">Août</th>
                        <th className="cell">Sept</th>
                        <th className="cell">Oct</th>
                        <th className="cell">Nov</th>
                        <th className="cell">Déc</th>
                        <th className="cell">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2009"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2009-man collapse-ligne-2009-sys"
                          />{" "}
                          2009
                        </td>
                        <td className="cell-mois"></td>
                        <td className="cell-mois"></td>
                        <td className="cell-mois"></td>
                        <td className="cell-mois"></td>
                        <td className="cell-mois"></td>
                        <td className="cell-mois">310</td>
                        <td className="cell-mois">527</td>
                        <td className="cell-mois">504</td>
                        <td className="cell-mois">582</td>
                        <td className="cell-mois">659</td>
                        <td className="cell-mois">707</td>
                        <td className="cell-mois">1783</td>
                        <td className="cell-mois">5072</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2009"
                        id="collapse-ligne-2009-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell">142</td>
                        <td className="cell">315</td>
                        <td className="cell">332</td>
                        <td className="cell">322</td>
                        <td className="cell">366</td>
                        <td className="cell">201</td>
                        <td className="cell">995</td>
                        <td className="cell">2673</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2009"
                        id="collapse-ligne-2009-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell">168</td>
                        <td className="cell">212</td>
                        <td className="cell">172</td>
                        <td className="cell">260</td>
                        <td className="cell">293</td>
                        <td className="cell">506</td>
                        <td className="cell">788</td>
                        <td className="cell">2399</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2010"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2010-man collapse-ligne-2010-sys"
                          />
                          {"  "}2010
                        </td>
                        <td className="cell-mois">3038</td>
                        <td className="cell-mois">3840</td>
                        <td className="cell-mois">3019</td>
                        <td className="cell-mois">1978</td>
                        <td className="cell-mois">957</td>
                        <td className="cell-mois">690</td>
                        <td className="cell-mois">647</td>
                        <td className="cell-mois">39</td>
                        <td className="cell-mois">892</td>
                        <td className="cell-mois">1060</td>
                        <td className="cell-mois">738</td>
                        <td className="cell-mois">562</td>
                        <td className="cell-mois">17460</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2010"
                        id="collapse-ligne-2010-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">1959</td>
                        <td className="cell">2746</td>
                        <td className="cell">2070</td>
                        <td className="cell">1265</td>
                        <td className="cell">656</td>
                        <td className="cell">448</td>
                        <td className="cell">444</td>
                        <td className="cell">39</td>
                        <td className="cell">613</td>
                        <td className="cell">654</td>
                        <td className="cell">464</td>
                        <td className="cell">438</td>
                        <td className="cell">11796</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2010"
                        id="collapse-ligne-2010-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">1079</td>
                        <td className="cell">1094</td>
                        <td className="cell">949</td>
                        <td className="cell">713</td>
                        <td className="cell">301</td>
                        <td className="cell">242</td>
                        <td className="cell">203</td>
                        <td className="cell">0</td>
                        <td className="cell">279</td>
                        <td className="cell">406</td>
                        <td className="cell">274</td>
                        <td className="cell">124</td>
                        <td className="cell">5664</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2011"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2011-man collapse-ligne-2011-sys"
                          />
                          {"  "}2011
                        </td>
                        <td className="cell-mois">730</td>
                        <td className="cell-mois">1127</td>
                        <td className="cell-mois">497</td>
                        <td className="cell-mois">635</td>
                        <td className="cell-mois">787</td>
                        <td className="cell-mois">482</td>
                        <td className="cell-mois">737</td>
                        <td className="cell-mois">872</td>
                        <td className="cell-mois">398</td>
                        <td className="cell-mois">726</td>
                        <td className="cell-mois">517</td>
                        <td className="cell-mois">625</td>
                        <td className="cell-mois">8133</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2011"
                        id="collapse-ligne-2011-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">373</td>
                        <td className="cell">549</td>
                        <td className="cell">258</td>
                        <td className="cell">344</td>
                        <td className="cell">550</td>
                        <td className="cell">446</td>
                        <td className="cell">356</td>
                        <td className="cell">471</td>
                        <td className="cell">236</td>
                        <td className="cell">643</td>
                        <td className="cell">377</td>
                        <td className="cell">330</td>
                        <td className="cell">4933</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2011"
                        id="collapse-ligne-2011-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">357</td>
                        <td className="cell">578</td>
                        <td className="cell">239</td>
                        <td className="cell">291</td>
                        <td className="cell">237</td>
                        <td className="cell">36</td>
                        <td className="cell">381</td>
                        <td className="cell">401</td>
                        <td className="cell">162</td>
                        <td className="cell">83</td>
                        <td className="cell">140</td>
                        <td className="cell">295</td>
                        <td className="cell">3200</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2012"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2012-man collapse-ligne-2012-sys"
                          />
                          {"  "}2012
                        </td>
                        <td className="cell-mois">816</td>
                        <td className="cell-mois">890</td>
                        <td className="cell-mois">879</td>
                        <td className="cell-mois">700</td>
                        <td className="cell-mois">727</td>
                        <td className="cell-mois">551</td>
                        <td className="cell-mois">520</td>
                        <td className="cell-mois">314</td>
                        <td className="cell-mois">360</td>
                        <td className="cell-mois">331</td>
                        <td className="cell-mois">395</td>
                        <td className="cell-mois">574</td>
                        <td className="cell-mois">7057</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2012"
                        id="collapse-ligne-2012-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">582</td>
                        <td className="cell">656</td>
                        <td className="cell">555</td>
                        <td className="cell">554</td>
                        <td className="cell">501</td>
                        <td className="cell">334</td>
                        <td className="cell">394</td>
                        <td className="cell">245</td>
                        <td className="cell">226</td>
                        <td className="cell">272</td>
                        <td className="cell">326</td>
                        <td className="cell">378</td>
                        <td className="cell">5023</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2012"
                        id="collapse-ligne-2012-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">234</td>
                        <td className="cell">234</td>
                        <td className="cell">324</td>
                        <td className="cell">146</td>
                        <td className="cell">226</td>
                        <td className="cell">217</td>
                        <td className="cell">126</td>
                        <td className="cell">69</td>
                        <td className="cell">134</td>
                        <td className="cell">59</td>
                        <td className="cell">69</td>
                        <td className="cell">196</td>
                        <td className="cell">2034</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2013"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2013-man collapse-ligne-2013-sys"
                          />
                          {"  "}2013
                        </td>
                        <td className="cell-mois">819</td>
                        <td className="cell-mois">637</td>
                        <td className="cell-mois">541</td>
                        <td className="cell-mois">645</td>
                        <td className="cell-mois">482</td>
                        <td className="cell-mois">339</td>
                        <td className="cell-mois">384</td>
                        <td className="cell-mois">242</td>
                        <td className="cell-mois">294</td>
                        <td className="cell-mois">276</td>
                        <td className="cell-mois">475</td>
                        <td className="cell-mois">368</td>
                        <td className="cell-mois">5502</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2013"
                        id="collapse-ligne-2013-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">558</td>
                        <td className="cell">498</td>
                        <td className="cell">391</td>
                        <td className="cell">478</td>
                        <td className="cell">328</td>
                        <td className="cell">239</td>
                        <td className="cell">281</td>
                        <td className="cell">158</td>
                        <td className="cell">214</td>
                        <td className="cell">174</td>
                        <td className="cell">363</td>
                        <td className="cell">236</td>
                        <td className="cell">3918</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2013"
                        id="collapse-ligne-2013-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">261</td>
                        <td className="cell">139</td>
                        <td className="cell">150</td>
                        <td className="cell">167</td>
                        <td className="cell">154</td>
                        <td className="cell">100</td>
                        <td className="cell">103</td>
                        <td className="cell">84</td>
                        <td className="cell">80</td>
                        <td className="cell">102</td>
                        <td className="cell">112</td>
                        <td className="cell">132</td>
                        <td className="cell">1584</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2014"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2014-man collapse-ligne-2014-sys"
                          />
                          {"  "}2014
                        </td>
                        <td className="cell-mois">417</td>
                        <td className="cell-mois">390</td>
                        <td className="cell-mois">166</td>
                        <td className="cell-mois">9</td>
                        <td className="cell-mois">140</td>
                        <td className="cell-mois">78</td>
                        <td className="cell-mois">73</td>
                        <td className="cell-mois">1069</td>
                        <td className="cell-mois">637</td>
                        <td className="cell-mois">561</td>
                        <td className="cell-mois">393</td>
                        <td className="cell-mois">471</td>
                        <td className="cell-mois">4404</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2014"
                        id="collapse-ligne-2014-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">299</td>
                        <td className="cell">281</td>
                        <td className="cell">138</td>
                        <td className="cell">2</td>
                        <td className="cell">110</td>
                        <td className="cell">65</td>
                        <td className="cell">37</td>
                        <td className="cell">615</td>
                        <td className="cell">494</td>
                        <td className="cell">415</td>
                        <td className="cell">200</td>
                        <td className="cell">270</td>
                        <td className="cell">2926</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2014"
                        id="collapse-ligne-2014-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">118</td>
                        <td className="cell">109</td>
                        <td className="cell">28</td>
                        <td className="cell">7</td>
                        <td className="cell">30</td>
                        <td className="cell">13</td>
                        <td className="cell">36</td>
                        <td className="cell">454</td>
                        <td className="cell">143</td>
                        <td className="cell">146</td>
                        <td className="cell">193</td>
                        <td className="cell">201</td>
                        <td className="cell">1478</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2015"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2015-man collapse-ligne-2015-sys"
                          />
                          {"  "}2015
                        </td>
                        <td className="cell-mois">312</td>
                        <td className="cell-mois">299</td>
                        <td className="cell-mois">247</td>
                        <td className="cell-mois">113</td>
                        <td className="cell-mois">389</td>
                        <td className="cell-mois">520</td>
                        <td className="cell-mois">547</td>
                        <td className="cell-mois">315</td>
                        <td className="cell-mois">110</td>
                        <td className="cell-mois">267</td>
                        <td className="cell-mois">257</td>
                        <td className="cell-mois">175</td>
                        <td className="cell-mois">3551</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2015"
                        id="collapse-ligne-2015-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">181</td>
                        <td className="cell">177</td>
                        <td className="cell">82</td>
                        <td className="cell">23</td>
                        <td className="cell">220</td>
                        <td className="cell">338</td>
                        <td className="cell">369</td>
                        <td className="cell">212</td>
                        <td className="cell">66</td>
                        <td className="cell">165</td>
                        <td className="cell">200</td>
                        <td className="cell">110</td>
                        <td className="cell">2143</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2015"
                        id="collapse-ligne-2015-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">131</td>
                        <td className="cell">122</td>
                        <td className="cell">165</td>
                        <td className="cell">90</td>
                        <td className="cell">169</td>
                        <td className="cell">182</td>
                        <td className="cell">178</td>
                        <td className="cell">103</td>
                        <td className="cell">44</td>
                        <td className="cell">102</td>
                        <td className="cell">57</td>
                        <td className="cell">65</td>
                        <td className="cell">1408</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2016"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2016-man collapse-ligne-2016-sys"
                          />
                          {"  "}2016
                        </td>
                        <td className="cell-mois">299</td>
                        <td className="cell-mois">459</td>
                        <td className="cell-mois">330</td>
                        <td className="cell-mois">315</td>
                        <td className="cell-mois">411</td>
                        <td className="cell-mois">933</td>
                        <td className="cell-mois">356</td>
                        <td className="cell-mois">86</td>
                        <td className="cell-mois">161</td>
                        <td className="cell-mois">82</td>
                        <td className="cell-mois">53</td>
                        <td className="cell-mois">79</td>
                        <td className="cell-mois">3564</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2016"
                        id="collapse-ligne-2016-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">196</td>
                        <td className="cell">318</td>
                        <td className="cell">234</td>
                        <td className="cell">198</td>
                        <td className="cell">280</td>
                        <td className="cell">616</td>
                        <td className="cell">181</td>
                        <td className="cell">73</td>
                        <td className="cell">155</td>
                        <td className="cell">73</td>
                        <td className="cell">44</td>
                        <td className="cell">63</td>
                        <td className="cell">2431</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2016"
                        id="collapse-ligne-2016-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">103</td>
                        <td className="cell">141</td>
                        <td className="cell">96</td>
                        <td className="cell">117</td>
                        <td className="cell">131</td>
                        <td className="cell">317</td>
                        <td className="cell">175</td>
                        <td className="cell">13</td>
                        <td className="cell">6</td>
                        <td className="cell">9</td>
                        <td className="cell">9</td>
                        <td className="cell">16</td>
                        <td className="cell">1133</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2017"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2017-man collapse-ligne-2017-sys"
                          />
                          {"  "}2017
                        </td>
                        <td className="cell-mois">540</td>
                        <td className="cell-mois">368</td>
                        <td className="cell-mois">478</td>
                        <td className="cell-mois">274</td>
                        <td className="cell-mois">406</td>
                        <td className="cell-mois">352</td>
                        <td className="cell-mois">245</td>
                        <td className="cell-mois">343</td>
                        <td className="cell-mois">276</td>
                        <td className="cell-mois">267</td>
                        <td className="cell-mois">194</td>
                        <td className="cell-mois">295</td>
                        <td className="cell-mois">4038</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2017"
                        id="collapse-ligne-2017-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">76</td>
                        <td className="cell">222</td>
                        <td className="cell">449</td>
                        <td className="cell">197</td>
                        <td className="cell">93</td>
                        <td className="cell">175</td>
                        <td className="cell">166</td>
                        <td className="cell">75</td>
                        <td className="cell">136</td>
                        <td className="cell">177</td>
                        <td className="cell">121</td>
                        <td className="cell">99</td>
                        <td className="cell">1986</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2017"
                        id="collapse-ligne-2017-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">464</td>
                        <td className="cell">146</td>
                        <td className="cell">29</td>
                        <td className="cell">77</td>
                        <td className="cell">313</td>
                        <td className="cell">177</td>
                        <td className="cell">79</td>
                        <td className="cell">268</td>
                        <td className="cell">140</td>
                        <td className="cell">90</td>
                        <td className="cell">73</td>
                        <td className="cell">196</td>
                        <td className="cell">2052</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2018"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2018-man collapse-ligne-2018-sys"
                          />
                          {"  "}2018
                        </td>
                        <td className="cell-mois">516</td>
                        <td className="cell-mois">356</td>
                        <td className="cell-mois">330</td>
                        <td className="cell-mois">416</td>
                        <td className="cell-mois">476</td>
                        <td className="cell-mois">491</td>
                        <td className="cell-mois">347</td>
                        <td className="cell-mois">119</td>
                        <td className="cell-mois">317</td>
                        <td className="cell-mois">253</td>
                        <td className="cell-mois">215</td>
                        <td className="cell-mois">202</td>
                        <td className="cell-mois">4038</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2018"
                        id="collapse-ligne-2018-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">345</td>
                        <td className="cell">147</td>
                        <td className="cell">137</td>
                        <td className="cell">107</td>
                        <td className="cell">121</td>
                        <td className="cell">127</td>
                        <td className="cell">99</td>
                        <td className="cell">8</td>
                        <td className="cell">159</td>
                        <td className="cell">172</td>
                        <td className="cell">148</td>
                        <td className="cell">83</td>
                        <td className="cell">1653</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2018"
                        id="collapse-ligne-2018-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">171</td>
                        <td className="cell">209</td>
                        <td className="cell">193</td>
                        <td className="cell">309</td>
                        <td className="cell">355</td>
                        <td className="cell">364</td>
                        <td className="cell">248</td>
                        <td className="cell">111</td>
                        <td className="cell">158</td>
                        <td className="cell">81</td>
                        <td className="cell">67</td>
                        <td className="cell">119</td>
                        <td className="cell">2385</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2019"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2019-man collapse-ligne-2019-sys"
                          />
                          {"  "}2019
                        </td>
                        <td className="cell-mois">185</td>
                        <td className="cell-mois">59</td>
                        <td className="cell-mois">167</td>
                        <td className="cell-mois">382</td>
                        <td className="cell-mois">679</td>
                        <td className="cell-mois">489</td>
                        <td className="cell-mois">717</td>
                        <td className="cell-mois">325</td>
                        <td className="cell-mois">404</td>
                        <td className="cell-mois">248</td>
                        <td className="cell-mois">400</td>
                        <td className="cell-mois">114</td>
                        <td className="cell-mois">4169</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2019"
                        id="collapse-ligne-2019-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">69</td>
                        <td className="cell">23</td>
                        <td className="cell">117</td>
                        <td className="cell">270</td>
                        <td className="cell">170</td>
                        <td className="cell">137</td>
                        <td className="cell">141</td>
                        <td className="cell">87</td>
                        <td className="cell">70</td>
                        <td className="cell">101</td>
                        <td className="cell">108</td>
                        <td className="cell">52</td>
                        <td className="cell">1345</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2019"
                        id="collapse-ligne-2019-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">116</td>
                        <td className="cell">36</td>
                        <td className="cell">50</td>
                        <td className="cell">112</td>
                        <td className="cell">509</td>
                        <td className="cell">352</td>
                        <td className="cell">576</td>
                        <td className="cell">238</td>
                        <td className="cell">334</td>
                        <td className="cell">147</td>
                        <td className="cell">292</td>
                        <td className="cell">62</td>
                        <td className="cell">2824</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseDemande2020"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2020-man collapse-ligne-2020-sys"
                          />
                          {"  "}2020
                        </td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2020"
                        id="collapse-ligne-2020-man"
                      >
                        <td className="cell-type">MANUELLE</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseDemande2020"
                        id="collapse-ligne-2020-sys"
                      >
                        <td className="cell-type">SYSTEME</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                      </tr>
                      {listeAnnees.map((annee, index) => {
                        return [
                          <tr key={index}>
                            <td className="ligne-mois">
                              <FontAwesomeIcon
                                className="bouton"
                                type="button"
                                icon={faChevronDown}
                                data-toggle="collapse"
                                data-target={`.multi-collapseDemande${annee}`}
                                aria-expanded="false"
                                aria-controls={`collapse-ligne-${annee}-man collapse-ligne-${annee}-sys`}
                              />
                              {" " + annee}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][2] +
                                this.state["demandes" + annee][1][2]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][3] +
                                this.state["demandes" + annee][1][3]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][4] +
                                this.state["demandes" + annee][1][4]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][5] +
                                this.state["demandes" + annee][1][5]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][6] +
                                this.state["demandes" + annee][1][6]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][7] +
                                this.state["demandes" + annee][1][7]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][8] +
                                this.state["demandes" + annee][1][8]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][9] +
                                this.state["demandes" + annee][1][9]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][10] +
                                this.state["demandes" + annee][1][10]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][11] +
                                this.state["demandes" + annee][1][11]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][12] +
                                this.state["demandes" + annee][1][12]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][13] +
                                this.state["demandes" + annee][1][13]}
                            </td>
                            <td className="cell-mois">
                              {this.state["demandes" + annee][0][14] +
                                this.state["demandes" + annee][1][14]}
                            </td>
                          </tr>,
                          <tr
                            className={`collapse multi-collapseDemande${annee}`}
                            id={`collapse-ligne-${annee}-man`}
                          >
                            <td className="cell-type">MANUELLE</td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][2]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][3]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][4]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][5]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][6]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][7]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][8]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][9]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][10]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][11]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][12]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][13]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][0][14]}
                            </td>
                          </tr>,
                          <tr
                            className={`collapse multi-collapseDemande${annee}`}
                            id={`collapse-ligne-${annee}-sys`}
                          >
                            <td className="cell-type">SYSTEME</td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][2]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][3]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][4]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][5]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][6]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][7]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][8]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][9]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][10]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][11]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][12]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][13]}
                            </td>
                            <td className="cell">
                              {this.state["demandes" + annee][1][14]}
                            </td>
                          </tr>,
                        ];
                      })}
                      <tr>
                        <td className="total-libelle">TOTAL</td>
                        <td className="total-cell">
                          {this.state.demandesJanvier}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesFevrier}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesMars}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesAvril}
                        </td>
                        <td className="total-cell">{this.state.demandesMai}</td>
                        <td className="total-cell">
                          {this.state.demandesJuin}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesJuillet}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesAout}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesSeptembre}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesOctobre}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesNovembre}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesDecembre}
                        </td>
                        <td className="total-cell">
                          {this.state.demandesTotal}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={12} style={{ textAlign: "right" }}>
                  <ReactHTMLTableToExcel
                    id="btn-tableau-demandes2009"
                    className="download-table-xls-button btnExtractStats"
                    table="table-demandesDepuis2009"
                    filename={`DICEM2__demandes_depuis_2009_${new Date().getFullYear()}${
                      new Date().getMonth() + 1
                    }`}
                    sheet={`${new Date().getFullYear()}${
                      new Date().getMonth() + 1
                    }`}
                    buttonText="Extraire les statistiques"
                  />
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        </Row>

        <Row>
          <Col className="libelle" xs={12}>
            <b>
              Consultations par les forces de sécurité intérieure depuis 2016
            </b>
          </Col>
        </Row>

        <hr className="stat-divider" />

        <Row>
          <Panel className="stat-accueil">
            <Panel.Body>
              <Row>
                <Col>
                  <Table
                    className="tableau"
                    id="table-consultationsDepuis2016"
                    responsive
                    striped={false}
                    bordered={true}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th className="cell">Janv</th>
                        <th className="cell">Fév</th>
                        <th className="cell">Mars</th>
                        <th className="cell">Avr</th>
                        <th className="cell">Mai</th>
                        <th className="cell">Juin</th>
                        <th className="cell">Juil</th>
                        <th className="cell">Août</th>
                        <th className="cell">Sept</th>
                        <th className="cell">Oct</th>
                        <th className="cell">Nov</th>
                        <th className="cell">Déc</th>
                        <th className="cell">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseConsultations2016"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2016-man collapse-ligne-2016-sys"
                          />
                          {"  "}2016
                        </td>
                        <td className="cell-mois">2197</td>
                        <td className="cell-mois">2026</td>
                        <td className="cell-mois">2763</td>
                        <td className="cell-mois">2632</td>
                        <td className="cell-mois">2661</td>
                        <td className="cell-mois">2689</td>
                        <td className="cell-mois">2166</td>
                        <td className="cell-mois">3371</td>
                        <td className="cell-mois">3293</td>
                        <td className="cell-mois">2528</td>
                        <td className="cell-mois">2331</td>
                        <td className="cell-mois">2035</td>
                        <td className="cell-mois">30692</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2016"
                        id="collapse-ligne-2016-man"
                      >
                        <td className="cell-type">Gendarmerie</td>
                        <td className="cell">426</td>
                        <td className="cell">420</td>
                        <td className="cell">619</td>
                        <td className="cell">569</td>
                        <td className="cell">439</td>
                        <td className="cell">420</td>
                        <td className="cell">290</td>
                        <td className="cell">477</td>
                        <td className="cell">466</td>
                        <td className="cell">409</td>
                        <td className="cell">400</td>
                        <td className="cell">356</td>
                        <td className="cell">5291</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2016"
                        id="collapse-ligne-2016-sys"
                      >
                        <td className="cell-type">Police</td>
                        <td className="cell">1771</td>
                        <td className="cell">1606</td>
                        <td className="cell">2144</td>
                        <td className="cell">2063</td>
                        <td className="cell">2222</td>
                        <td className="cell">2269</td>
                        <td className="cell">1876</td>
                        <td className="cell">2894</td>
                        <td className="cell">2827</td>
                        <td className="cell">2119</td>
                        <td className="cell">1931</td>
                        <td className="cell">1679</td>
                        <td className="cell">25401</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseConsultations2017"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2017-man collapse-ligne-2017-sys"
                          />
                          {"  "}2017
                        </td>
                        <td className="cell-mois">2512</td>
                        <td className="cell-mois">2143</td>
                        <td className="cell-mois">2671</td>
                        <td className="cell-mois">2172</td>
                        <td className="cell-mois">2672</td>
                        <td className="cell-mois">2765</td>
                        <td className="cell-mois">2313</td>
                        <td className="cell-mois">2353</td>
                        <td className="cell-mois">2426</td>
                        <td className="cell-mois">2684</td>
                        <td className="cell-mois">2365</td>
                        <td className="cell-mois">2064</td>
                        <td className="cell-mois">29139</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2017"
                        id="collapse-ligne-2017-man"
                      >
                        <td className="cell-type">Gendarmerie</td>
                        <td className="cell">404</td>
                        <td className="cell">338</td>
                        <td className="cell">426</td>
                        <td className="cell">392</td>
                        <td className="cell">405</td>
                        <td className="cell">171</td>
                        <td className="cell">429</td>
                        <td className="cell">443</td>
                        <td className="cell">420</td>
                        <td className="cell">512</td>
                        <td className="cell">427</td>
                        <td className="cell">301</td>
                        <td className="cell">4668</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2017"
                        id="collapse-ligne-2017-sys"
                      >
                        <td className="cell-type">Police</td>
                        <td className="cell">2108</td>
                        <td className="cell">1805</td>
                        <td className="cell">2245</td>
                        <td className="cell">1780</td>
                        <td className="cell">2267</td>
                        <td className="cell">2594</td>
                        <td className="cell">1884</td>
                        <td className="cell">1909</td>
                        <td className="cell">2006</td>
                        <td className="cell">2172</td>
                        <td className="cell">1938</td>
                        <td className="cell">1763</td>
                        <td className="cell">24471</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseConsultations2018"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2018-man collapse-ligne-2018-sys"
                          />
                          {"  "}2018
                        </td>
                        <td className="cell-mois">2445</td>
                        <td className="cell-mois">2217</td>
                        <td className="cell-mois">2340</td>
                        <td className="cell-mois">2422</td>
                        <td className="cell-mois">2552</td>
                        <td className="cell-mois">2754</td>
                        <td className="cell-mois">2250</td>
                        <td className="cell-mois">2162</td>
                        <td className="cell-mois">2233</td>
                        <td className="cell-mois">2385</td>
                        <td className="cell-mois">1952</td>
                        <td className="cell-mois">1587</td>
                        <td className="cell-mois">27299</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2018"
                        id="collapse-ligne-2018-man"
                      >
                        <td className="cell-type">Gendarmerie</td>
                        <td className="cell">357</td>
                        <td className="cell">273</td>
                        <td className="cell">258</td>
                        <td className="cell">325</td>
                        <td className="cell">262</td>
                        <td className="cell">251</td>
                        <td className="cell">282</td>
                        <td className="cell">319</td>
                        <td className="cell">251</td>
                        <td className="cell">278</td>
                        <td className="cell">284</td>
                        <td className="cell">254</td>
                        <td className="cell">3394</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2018"
                        id="collapse-ligne-2018-sys"
                      >
                        <td className="cell-type">Police</td>
                        <td className="cell">2088</td>
                        <td className="cell">1944</td>
                        <td className="cell">2082</td>
                        <td className="cell">2097</td>
                        <td className="cell">2290</td>
                        <td className="cell">2503</td>
                        <td className="cell">1968</td>
                        <td className="cell">1843</td>
                        <td className="cell">1982</td>
                        <td className="cell">2107</td>
                        <td className="cell">1668</td>
                        <td className="cell">1333</td>
                        <td className="cell">23905</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseConsultations2019"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2019-man collapse-ligne-2019-sys"
                          />
                          {"  "}2019
                        </td>
                        <td className="cell-mois">1959</td>
                        <td className="cell-mois">1966</td>
                        <td className="cell-mois">2018</td>
                        <td className="cell-mois">2198</td>
                        <td className="cell-mois">2341</td>
                        <td className="cell-mois">2541</td>
                        <td className="cell-mois">2245</td>
                        <td className="cell-mois">1940</td>
                        <td className="cell-mois">2108</td>
                        <td className="cell-mois">2073</td>
                        <td className="cell-mois">1784</td>
                        <td className="cell-mois">1477</td>
                        <td className="cell-mois">24650</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2019"
                        id="collapse-ligne-2019-man"
                      >
                        <td className="cell-type">Gendarmerie</td>
                        <td className="cell">316</td>
                        <td className="cell">287</td>
                        <td className="cell">339</td>
                        <td className="cell">400</td>
                        <td className="cell">337</td>
                        <td className="cell">354</td>
                        <td className="cell">347</td>
                        <td className="cell">344</td>
                        <td className="cell">322</td>
                        <td className="cell">322</td>
                        <td className="cell">269</td>
                        <td className="cell">280</td>
                        <td className="cell">3917</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2019"
                        id="collapse-ligne-2019-sys"
                      >
                        <td className="cell-type">Police</td>
                        <td className="cell">1643</td>
                        <td className="cell">1679</td>
                        <td className="cell">1679</td>
                        <td className="cell">1798</td>
                        <td className="cell">2004</td>
                        <td className="cell">2187</td>
                        <td className="cell">1898</td>
                        <td className="cell">1596</td>
                        <td className="cell">1786</td>
                        <td className="cell">1751</td>
                        <td className="cell">1515</td>
                        <td className="cell">1197</td>
                        <td className="cell">20733</td>
                      </tr>
                      <tr>
                        <td className="ligne-mois">
                          <FontAwesomeIcon
                            className="bouton"
                            type="button"
                            icon={faChevronDown}
                            data-toggle="collapse"
                            data-target=".multi-collapseConsultations2020"
                            aria-expanded="false"
                            aria-controls="collapse-ligne-2020-man collapse-ligne-2020-sys"
                          />
                          {"  "}2020
                        </td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                        <td className="cell-mois">TBD</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2020"
                        id="collapse-ligne-2020-man"
                      >
                        <td className="cell-type">Gendarmerie</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                      </tr>
                      <tr
                        className="collapse multi-collapseConsultations2020"
                        id="collapse-ligne-2020-sys"
                      >
                        <td className="cell-type">Police</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                        <td className="cell">TBD</td>
                      </tr>
                      {listeAnnees.map((annee, index) => {
                        return [
                          <tr>
                            <td className="ligne-mois">
                              <FontAwesomeIcon
                                className="bouton"
                                type="button"
                                icon={faChevronDown}
                                data-toggle="collapse"
                                data-target={`.multi-collapseConsultations${annee}`}
                                aria-expanded="false"
                                aria-controls={`collapse-ligne-${annee}-man collapse-ligne-${annee}-sys`}
                              />
                              {" " + annee}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][1] +
                                this.state["consultations" + annee][1][1]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][2] +
                                this.state["consultations" + annee][1][2]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][3] +
                                this.state["consultations" + annee][1][3]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][4] +
                                this.state["consultations" + annee][1][4]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][5] +
                                this.state["consultations" + annee][1][5]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][6] +
                                this.state["consultations" + annee][1][6]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][7] +
                                this.state["consultations" + annee][1][7]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][8] +
                                this.state["consultations" + annee][1][8]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][9] +
                                this.state["consultations" + annee][1][9]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][10] +
                                this.state["consultations" + annee][1][10]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][11] +
                                this.state["consultations" + annee][1][11]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][12] +
                                this.state["consultations" + annee][1][12]}
                            </td>
                            <td className="cell-mois">
                              {this.state["consultations" + annee][0][13] +
                                this.state["consultations" + annee][1][13]}
                            </td>
                          </tr>,
                          <tr
                            className={`collapse multi-collapseConsultations${annee}`}
                            id={`collapse-ligne-${annee}-man`}
                          >
                            <td className="cell-type">Gendarmerie</td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][1]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][2]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][3]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][4]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][5]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][6]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][7]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][8]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][9]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][10]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][11]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][12]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][0][13]}
                            </td>
                          </tr>,
                          <tr
                            className={`collapse multi-collapseConsultations${annee}`}
                            id={`collapse-ligne-${annee}-sys`}
                          >
                            <td className="cell-type">Police</td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][1]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][2]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][3]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][4]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][5]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][6]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][7]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][8]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][9]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][10]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][11]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][12]}
                            </td>
                            <td className="cell">
                              {this.state["consultations" + annee][1][13]}
                            </td>
                          </tr>,
                        ];
                      })}
                      <tr>
                        <td className="total-libelle">TOTAL</td>
                        <td className="total-cell">
                          {this.state.consultationsJanvier}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsFevrier}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsMars}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsAvril}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsMai}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsJuin}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsJuillet}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsAout}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsSeptembre}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsOctobre}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsNovembre}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsDecembre}
                        </td>
                        <td className="total-cell">
                          {this.state.consultationsTotal}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={12} style={{ textAlign: "right" }}>
                  <ReactHTMLTableToExcel
                    id="btn-tableau-consultationsDepuis2016"
                    className="download-table-xls-button btnExtractStats"
                    table="table-consultationsDepuis2016"
                    filename={`DICEM2__consultations_depuis_2016_${new Date().getFullYear()}${
                      new Date().getMonth() + 1
                    }`}
                    sheet={`${new Date().getFullYear()}${
                      new Date().getMonth() + 1
                    }`}
                    buttonText="Extraire les statistiques"
                  />
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        </Row>
      </>
    );
  }
}

export default Statistiques;
