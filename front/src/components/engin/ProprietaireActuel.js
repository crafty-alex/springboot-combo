import React from "react";
import { Panel } from "react-bootstrap";
import ProprietaireActuelPersonnePhysique from "./ProprietaireActuelPersonnePhysique";
import ProprietaireActuelPersonneMorale from "./ProprietaireActuelPersonneMorale";
import _ from "lodash";
import { NavLink } from "react-router-dom";

const ProprietaireActuel = ({ engin }) => {
  let id;
  let type;
  let proprietaire = true;
  if (engin.personneMorale != null) {
    id = engin.personneMorale.personneMoraleId;
    type = 2;
  } else if (engin.personnePhysique != null) {
    id = engin.personnePhysique.personnePhysiqueId;
    type = 1;
  } else {
    proprietaire = false;
  }

  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title>
          {proprietaire ? (
            <NavLink to={`/fiche-usager/${type}/${id}`}>
              Propriétaire actuel
            </NavLink>
          ) : (
            <>Propriétaire actuel</>
          )}
        </Panel.Title>
      </Panel.Heading>
      <hr className="divider" />
      <Panel.Body className="proprietaire">
        {_.isEmpty(engin.personneMorale) ? (
          <ProprietaireActuelPersonnePhysique engin={engin} />
        ) : (
          <ProprietaireActuelPersonneMorale engin={engin} />
        )}
      </Panel.Body>
    </Panel>
  );
};

export default ProprietaireActuel;
