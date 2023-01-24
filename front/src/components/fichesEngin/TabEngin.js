import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TabEngin = ({
  search,
  totalElementsEngin,
  dataEngin,
  disabledButtonPreviousEngin,
  disabledButtonNextEngin,
  fetchDataEnginCustom,
  fetchDataEngin,
  pageEngin,
  totalPagesEngin,
  sort,
  loadingEngin,
}) => {
  return (
    <>
      {!search ? (
        <div className="results">
          <Badge>{totalElementsEngin}</Badge> engins au total
        </div>
      ) : (
        <div className="searched-results">
          <Badge>{totalElementsEngin}</Badge> résultats de recherche{" "}
        </div>
      )}

      {dataEngin.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className=".buttonPrevious">
            <Button
              disabled={disabledButtonPreviousEngin}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataEnginCustom(false);
                } else {
                  fetchDataEngin(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pageEngin + 1} sur {totalPagesEngin}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextEngin}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataEnginCustom(true);
                } else {
                  fetchDataEngin(true);
                }
              }}
            >
              Suivant
            </Button>
          </Col>
        </Row>
      ) : null}

      <div>
        {dataEngin.length > 0 ? (
          <ReactTable
            data={dataEngin}
            nextText="Suivant"
            previousText="Précédent"
            ofText="sur"
            sortable={sort}
            loading={loadingEngin}
            defaultPageSize={20}
            showPagination={false}
            columns={[
              {
                id: "n_identification",
                Header: "N°IDENTIFICATION",
                accessor: "numeroIdentification",
                width: 100,
                Cell: (e) => (
                  <NavLink to={`/fiche-engin/${e.value}`}>{e.value}</NavLink>
                ),
              },
              {
                id: "date",
                Header: "DATE",
                accessor: "datePremiereDeclaration",
                width: 100,
                sortMethod: (a, b) => {
                  a = a.split("/").reverse().join("");
                  b = b.split("/").reverse().join("");
                  return a > b ? 1 : a < b ? -1 : 0;
                },
              },
              {
                id: "marque",
                Header: "MARQUE",
                accessor: "marque.libelleLong",
                width: 100,
              },
              {
                id: "modele",
                Header: "MODELE",
                accessor: "modele",
                width: 100,
              },
              {
                id: "n_serie",
                Header: "N°SERIE",
                accessor: "numeroSerieVin",
                width: 100,
              },
              {
                id: "proprietaire",
                Header: "PROPRIETAIRE",
                accessor: (a) =>
                  a.personneMorale != null
                    ? `${a.personneMorale?.nomRepresentant} ${a.personneMorale?.prenomRepresentant}`
                    : a.personneMorale == null && a.personnePhysique != null
                    ? `${a.personnePhysique?.nomNaissance} ${a.personnePhysique?.prenom}`
                    : "N/A",
                width: 200,
              },
              {
                id: "statut",
                Header: "STATUT",
                accessor: "statutEngin.libelleLong",
                width: 140,
              },
            ]}
          />
        ) : null}
      </div>

      {dataEngin.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className=".buttonPrevious">
            <Button
              disabled={disabledButtonPreviousEngin}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataEnginCustom(false);
                } else {
                  fetchDataEngin(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pageEngin + 1} sur {totalPagesEngin}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextEngin}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataEnginCustom(true);
                } else {
                  fetchDataEngin(true);
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

export default TabEngin;
