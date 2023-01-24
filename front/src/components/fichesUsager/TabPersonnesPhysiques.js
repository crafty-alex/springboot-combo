import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TabPersonnesPhysiques = ({
  search,
  totalElementsPersonnePhysique,
  disabledButtonPreviousPersonnePhysique,
  disabledButtonNextPersonnePhysique,
  fetchDataPersonnePhysiqueCustom,
  fetchDataPersonnePhysique,
  pagePersonnePhysique,
  totalPagesPersonnePhysique,
  dataPersonnePhysique,
  sort,
  loadingPersonnePhysique,
}) => {
  return (
    <>
      {!search ? (
        <div className="results">
          <Badge>{totalElementsPersonnePhysique}</Badge> personnes physiques au
          total
        </div>
      ) : (
        <div className="searched-results">
          <Badge>{totalElementsPersonnePhysique}</Badge> résultats de recherche{" "}
        </div>
      )}

      {dataPersonnePhysique.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className="buttonPrevious">
            <Button
              disabled={disabledButtonPreviousPersonnePhysique}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonnePhysiqueCustom(false);
                } else {
                  fetchDataPersonnePhysique(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pagePersonnePhysique + 1} sur {totalPagesPersonnePhysique}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextPersonnePhysique}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonnePhysiqueCustom(true);
                } else {
                  fetchDataPersonnePhysique(true);
                }
              }}
            >
              Suivant
            </Button>
          </Col>
        </Row>
      ) : null}

      <div>
        {dataPersonnePhysique.length > 0 ? (
          <ReactTable
            data={dataPersonnePhysique}
            nextText="Suivant"
            previousText="Précédent"
            ofText="sur"
            sortable={sort}
            loading={loadingPersonnePhysique}
            defaultPageSize={20}
            showPagination={false}
            columns={[
              {
                id: "nom_prenom",
                Header: "USAGER",
                accessor: (value) =>
                  `${value.nomNaissance} ${value.prenom}|${value.personnePhysiqueId}`,
                width: 150,
                Cell: (e) => (
                  <NavLink to={`/fiche-usager/1/${e.value.split("|")[1]}`}>
                    {e.value.split("|")[0]}
                  </NavLink>
                ),
              },
              {
                id: "date_naissance",
                Header: "DATE NAISSANCE",
                accessor: "dateNaissance",
                width: 100,
                sortMethod: (a, b) => {
                  a = a.split("/").reverse().join("");
                  b = b.split("/").reverse().join("");
                  return a > b ? 1 : a < b ? -1 : 0;
                },
              },
              {
                id: "lieu_naissance",
                Header: "LIEU NAISSANCE",
                accessor: (value) =>
                  value.communeNaissance != null
                    ? `${value.communeNaissance} (${value.paysNaissance})`
                    : `${value.paysNaissance}`,
                width: 150,
              },
              {
                id: "adresse",
                Header: "ADRESSE",
                accessor: (value) =>
                  value.numeroVoie != null && value.nomVoie != null
                    ? `${value.numeroVoie} ${value.nomVoie}`
                    : value.numeroVoie == null && value.nomVoie != null
                    ? `${value.nomVoie}`
                    : value.numeroVoie != null && value.nomVoie == null
                    ? `${value.numeroVoie}`
                    : "N/A",
                width: 250,
              },
              {
                id: "commune",
                Header: "COMMUNE",
                accessor: (value) =>
                  value.commune != null && value.codePostal != null
                    ? `${value.commune} (${value.codePostal})`
                    : value.commune != null && value.codePostal == null
                    ? `${value.commune}`
                    : value.commune == null && value.codePostal != null
                    ? `${value.codePostal}`
                    : "N/A",
                width: 200,
              },
            ]}
          />
        ) : null}
      </div>
      {dataPersonnePhysique.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className="buttonPrevious">
            <Button
              disabled={disabledButtonPreviousPersonnePhysique}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonnePhysiqueCustom(false);
                } else {
                  fetchDataPersonnePhysique(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pagePersonnePhysique + 1} sur {totalPagesPersonnePhysique}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextPersonnePhysique}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonnePhysiqueCustom(true);
                } else {
                  fetchDataPersonnePhysique(true);
                }
              }}
            >
              Suivant
            </Button>
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default TabPersonnesPhysiques;
