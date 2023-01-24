import React from "react";
import { Route, Switch } from "react-router-dom";
import Accueil from "./Accueil";
import FicheDemande from "../demande/FicheDemande";
import ListeEngins from "../fichesEngin/ListeEngins";
import ListeUsagers from "../fichesUsager/ListeUsagers";
import FicheEngin from "../engin/FicheEngin";
import ListeDemandesRejetees from "../demandesRejetees/ListeDemandesRejetees";
import ListeDemandesTraitees from "../demandesTraitees/ListeDemandesTraitees";
import ListeDemandes from "../demandesAtraiter/ListeDemandes";
import FicheUsager from "../usager/FicheUsager";
import ListeSearchAvancee from "../fichesAvancee/ListeSearchAvancee";
import ListeTraces from "../traces/ListeTraces";
import Statistiques from "../statistiques/Statistiques";
import NouveauDossier from "../nouveauDossier/NouveauDossier";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Accueil} />

    <Route exact path="/nouveau-dossier" component={NouveauDossier} />

    <Route exact path="/liste-demandes/:id/:type" component={ListeDemandes} />

    <Route
      exact
      path="/liste-demandes-traitees"
      component={ListeDemandesTraitees}
    />

    <Route
      exact
      path="/liste-demandes-rejetees"
      component={ListeDemandesRejetees}
    />

    <Route exact path="/liste-engins/:id" component={ListeEngins} />

    <Route exact path="/liste-usagers" component={ListeUsagers} />

    <Route path="/fiche-demande/:id" component={FicheDemande} />

    <Route path="/fiche-usager/:type/:id" component={FicheUsager} />

    <Route exact path="/fiche-engin/:id" component={FicheEngin} />

    <Route exact path="/advanced-search" component={ListeSearchAvancee} />

    <Route exact path="/statistiques" component={Statistiques} />

    <Route exact path="/liste-traces" component={ListeTraces} />
  </Switch>
);

export default Main;
