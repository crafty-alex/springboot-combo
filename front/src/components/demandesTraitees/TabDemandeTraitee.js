import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../static/css/table-styles.css";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TabDemandeTraitee = ({
  search,
  totalElementsDemande,
  disabledButtonPreviousDemande,
  disabledButtonNextDemande,
  fetchDataDemandeCustom,
  fetchDataDemande,
  pageDemande,
  totalPagesDemande,
  dataDemande,
  sort,
  loadingDemande,
  complet,
}) => {
  return (
    <>
      {!search ? (
        <div className="results">
          <Badge>{totalElementsDemande}</Badge> demandes{" "}
          {complet ? <>au total</> : <>traitées</>}
        </div>
      ) : (
        <div className="searched-results">
          <Badge>{totalElementsDemande}</Badge> résultats de recherche{" "}
        </div>
      )}

      {dataDemande.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className="buttonPrevious">
            <Button
              disabled={disabledButtonPreviousDemande}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataDemandeCustom(false);
                } else {
                  fetchDataDemande(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pageDemande + 1} sur {totalPagesDemande}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextDemande}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataDemandeCustom(true);
                } else {
                  fetchDataDemande(true);
                }
              }}
            >
              Suivant
            </Button>
          </Col>
        </Row>
      ) : null}

      <div>
        {dataDemande.length > 0 ? (
          <ReactTable
            data={dataDemande}
            nextText="Suivant"
            previousText="Précédent"
            ofText="sur"
            sortable={sort}
            loading={loadingDemande}
            defaultPageSize={20}
            showPagination={false}
            columns={[
              {
                id: "n_demande",
                Header: "N°",
                accessor: "numeroDemande",
                width: 100,
                Cell: (e) => (
                  <NavLink to={`/fiche-demande/${e.value}`}>{e.value}</NavLink>
                ),
              },
              {
                id: "date_soumission",
                Header: "CRÉATION",
                accessor: "dateSoumission",
                width: 100,
                sortMethod: (a, b) => {
                  a = a.split("/").reverse().join("");
                  b = b.split("/").reverse().join("");
                  return a > b ? 1 : a < b ? -1 : 0;
                },
              },
              {
                id: "date_traitement",
                Header: "TRAITEMENT",
                accessor: "dateTraitement",
                width: 100,
                sortMethod: (a, b) => {
                  a = a?.split("/").reverse().join("");
                  b = b?.split("/").reverse().join("");
                  return a > b ? 1 : a < b ? -1 : 0;
                },
              },
              {
                id: "motif_demande",
                Header: "MOTIF",
                accessor: "motifDemande.libelleLong",
                width: 200,
              },
              {
                id: "nom_prenom_usager",
                Header: "USAGER",
                accessor: (value) =>
                  value.contenuDemande.personnePhysique != null
                    ? `${value.contenuDemande.personnePhysique?.nomNaissance} ${value.contenuDemande.personnePhysique?.prenom}`
                    : value.contenuDemande.personneMorale != null
                    ? `${value.contenuDemande.personneMorale?.nomRepresentant} ${value.contenuDemande.personneMorale?.prenomRepresentant}`
                    : value.contenuDemande.typeProprietaire === 2 &&
                      value.contenuDemande.personneMorale == null &&
                      value.usager.personneMorale != null
                    ? `${value.usager.personneMorale?.nomRepresentant} ${value.usager.personneMorale?.prenomRepresentant}`
                    : `${value.usager.personnePhysique?.nomNaissance} ${value.usager.personnePhysique?.prenom}`,
                width: 120,
              },
              {
                id: "denominationSociale",
                Header: "DENOMINATION",
                accessor: (value) =>
                  value.usager.personneMorale != null
                    ? value.usager.personneMorale.denominationRaisonSociale
                    : "N/A",
                width: 120,
              },
              {
                id: "type_traitement",
                Header: "NATURE",
                accessor: "typeTraitement.libelleLong",
                width: 100,
              },
            ]}
          />
        ) : null}
      </div>

      {dataDemande.length > 0 ? (
        <Row>
          <Col xs={4} sm={4} className="buttonPrevious">
            <Button
              disabled={disabledButtonPreviousDemande}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataDemandeCustom(false);
                } else {
                  fetchDataDemande(false);
                }
              }}
            >
              Précédent
            </Button>
          </Col>
          <Col xs={4} sm={4} className="pagination">
            {" "}
            <Button disabled className="buttonPagination">
              Page {pageDemande + 1} sur {totalPagesDemande}
            </Button>
          </Col>
          <Col xs={4} sm={4} className="buttonNext">
            <Button
              disabled={disabledButtonNextDemande}
              className="buttonSearchedResults"
              type="button"
              onClick={() => {
                if (search) {
                  fetchDataDemandeCustom(true);
                } else {
                  fetchDataDemande(true);
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

export default TabDemandeTraitee;
