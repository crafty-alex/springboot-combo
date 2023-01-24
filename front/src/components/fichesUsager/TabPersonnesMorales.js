import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TabPersonnesMorales = ({
  search,
  totalElementsPersonneMorale,
  disabledButtonPreviousPersonneMorale,
  disabledButtonNextPersonneMorale,
  fetchDataPersonneMoraleCustom,
  fetchDataPersonneMorale,
  pagePersonneMorale,
  totalPagesPersonneMorale,
  dataPersonneMorale,
  sort,
  loadingPersonneMorale,
}) => {
  return (
    <>
      {!search ? (
        <div className="results">
          <Badge>{totalElementsPersonneMorale}</Badge> personnes morales au
          total
        </div>
      ) : (
        <div className="searched-results">
          <Badge>{totalElementsPersonneMorale}</Badge> résultats de recherche{" "}
        </div>
      )}

      {dataPersonneMorale.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className="buttonPrevious">
            <Button
              disabled={disabledButtonPreviousPersonneMorale}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonneMoraleCustom(false);
                } else {
                  fetchDataPersonneMorale(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pagePersonneMorale + 1} sur {totalPagesPersonneMorale}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextPersonneMorale}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonneMoraleCustom(true);
                } else {
                  fetchDataPersonneMorale(true);
                }
              }}
            >
              Suivant
            </Button>
          </Col>
        </Row>
      ) : null}

      <div>
        {dataPersonneMorale.length > 0 ? (
          <ReactTable
            data={dataPersonneMorale}
            nextText="Suivant"
            previousText="Précédent"
            ofText="sur"
            sortable={sort}
            loading={loadingPersonneMorale}
            defaultPageSize={20}
            showPagination={false}
            columns={[
              {
                id: "nom_prenom",
                Header: "USAGER",
                accessor: (value) =>
                  value.nomRepresentant != null &&
                  value.prenomRepresentant != null
                    ? `${value.nomRepresentant} ${value.prenomRepresentant}`
                    : value.nomRepresentant != null &&
                      value.prenomRepresentant == null
                    ? `${value.nomRepresentant}`
                    : value.nomRepresentant == null &&
                      value.prenomRepresentant != null
                    ? `${value.prenomRepresentant}`
                    : "N/A",
                width: 100,
              },
              {
                id: "denomination",
                Header: "DENOMINATION",
                accessor: (value) =>
                  `${value.denominationRaisonSociale}|${value.personneMoraleId}`,
                width: 100,
                Cell: (e) => (
                  <NavLink to={`/fiche-usager/2/${e.value.split("|")[1]}`}>
                    {e.value.split("|")[0]}
                  </NavLink>
                ),
              },
              {
                id: "adresse",
                Header: "ADRESSE",
                accessor: (value) => `${value.numeroVoie} ${value.nomVoie}`,
                width: 150,
              },
              {
                id: "commune",
                Header: "COMMUNE",
                accessor: (value) => `${value.commune} (${value.codePostal})`,
                width: 150,
              },
              {
                id: "contact",
                Header: "CONTACT",
                accessor: (value) =>
                  value.usager != null
                    ? `${value.usager.personnePhysique.nomNaissance} ${value.usager.personnePhysique.prenom}`
                    : "N/A",
                width: 150,
              },
              {
                id: "date_naissance",
                Header: "DATE NAISSANCE",
                accessor: (value) =>
                  value.usager != null
                    ? `${value.usager.personnePhysique.dateNaissance}`
                    : "N/A",
                width: 100,
                sortMethod: (a, b) => {
                  a = a.split("/").reverse().join("");
                  b = b.split("/").reverse().join("");
                  return a > b ? 1 : a < b ? -1 : 0;
                },
              },
              {
                id: "commune_naissance",
                Header: "LIEU NAISSANCE",
                accessor: (value) =>
                  value.usager != null &&
                  value.usager.personnePhysique.communeNaissance != null
                    ? `${value.usager.personnePhysique.communeNaissance} (${value.usager.personnePhysique.paysNaissance})`
                    : value.usager != null &&
                      value.usager.personnePhysique.communeNaissance == null
                    ? `${value.usager.personnePhysique.paysNaissance}`
                    : "N/A",
                width: 100,
              },
            ]}
          />
        ) : null}
      </div>
      {dataPersonneMorale.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className="buttonPrevious">
            <Button
              disabled={disabledButtonPreviousPersonneMorale}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonneMoraleCustom(false);
                } else {
                  fetchDataPersonneMorale(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pagePersonneMorale + 1} sur {totalPagesPersonneMorale}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextPersonneMorale}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataPersonneMoraleCustom(true);
                } else {
                  fetchDataPersonneMorale(true);
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

export default TabPersonnesMorales;
