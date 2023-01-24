package application.service;

import org.springframework.stereotype.Service;

@Service
public class ObjDemandeSearchService {

/*    public Page<ObjDemande> fetchCustomDemandeList(ObjDemandeSearch demande) {

        checkEmptyFieldsDemandes(demande);

        Specification spec1 = ObjDemandeSpecs.numeroDemandeEquals(demande.getNumeroDemande());
        Specification spec2 = ObjDemandeSpecs.nomUsagerEquals(demande.getNomUsager());
        Specification spec3 = ObjDemandeSpecs.prenomUsagerEquals(demande.getPrenomUsager());
        Specification spec4 = ObjDemandeSpecs.dateSoumissionEquals(demande.getDateSoumission());
        Specification spec5 = ObjDemandeSpecs.motifBlocageIdEquals(demande.getMotifBlocageId());
        Specification spec6 = ObjDemandeSpecs.statutDemandeIdEquals(demande.getStatutDemandeId());
        Specification spec7 = ObjDemandeSpecs.numeroSerieVinEquals(demande.getNumeroSerieVin());
        Specification spec8 = ObjDemandeSpecs.premiereDeclarationEquals(demande.getTypeDemandeId());
        Specification spec9 = ObjDemandeSpecs.denominationSocialeEquals(demande.getDenominationSociale());
        Specification spec10 = ObjDemandeSpecs.demandesEnCours();

        Specification specs = Specification.where(spec1).and(spec2).and(spec3).and(spec4).and(spec5).and(spec6).and(spec7).and(spec8).and(spec9).and(spec10);
        PageRequest pageRequest = PageRequest.of(demande.getPage(), 20, SORT_DATE_HEURE_ASC);
        return demandeRepository.findAll(specs, pageRequest);
    }*/
}
