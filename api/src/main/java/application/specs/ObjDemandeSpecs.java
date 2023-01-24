package application.specs;

public class ObjDemandeSpecs {

    private ObjDemandeSpecs() {
    }


 /*   public static Specification<ObjDemande> numeroDemandeEquals(String numeroDemande) {
        return (root, query, builder) ->
                numeroDemande == null ?
                        builder.conjunction() :
                        builder.like(root.get("numeroDemande"), "%" + numeroDemande + "%");
    }

    public static Specification<ObjDemande> denominationSocialeEquals(String denominationSociale) {
        return Specification.where(
                (root, query, builder) -> {
                    if (denominationSociale == null) {
                        builder.conjunction();
                    } else {
                        final Join<ObjDemande, ObjIdentifiantUsager> joinIdent = root.join("objIdentifiantUsagerByFkIdentifiantUsagerId", JoinType.LEFT);
                        final Join<ObjIdentifiantUsager, ObjPersonneMorale> joinPM = joinIdent.join("objPersonneMoraleByFkPersonneMoraleId", JoinType.LEFT);
                        return builder.like(joinPM.get("denominationRaisonSociale"), "%" + denominationSociale + "%");
                    }
                    return null;
                }
        );
    }

    public static Specification<ObjDemande> nomUsagerEquals(String nomUsager) {
        return Specification.where(
                (root, query, builder) -> {
                    if (nomUsager == null) {
                        builder.conjunction();
                    } else {
                        final Join<ObjDemande, ObjIdentifiantUsager> joinIdent = root.join("objIdentifiantUsagerByFkIdentifiantUsagerId", JoinType.LEFT);
                        final Join<ObjIdentifiantUsager, ObjPersonnePhysique> joinPP = joinIdent.join("objPersonnePhysiqueByFkPersonnePhysiqueId", JoinType.LEFT);
                        final Join<ObjIdentifiantUsager, ObjPersonneMorale> joinPM = joinIdent.join("objPersonneMoraleByFkPersonneMoraleId", JoinType.LEFT);
                        return builder.or(
                                builder.like(builder.function("jsonb_extract_path_text", String.class, root.<String>get("contenuDemande"), builder.literal("personnePhysique"), builder.literal("nomNaissance")), "%" + nomUsager + "%"),
                                builder.like(joinPP.get("nomNaissance"), "%" + nomUsager + "%"),
                                builder.like(joinPM.get("nomRepresentant"), "%" + nomUsager + "%")
                        );
                    }
                    return null;
                }
        );
    }

    public static Specification<ObjDemande> prenomUsagerEquals(String prenomUsager) {
        return Specification.where(
                (root, query, builder) -> {
                    if (prenomUsager == null) {
                        builder.conjunction();
                    } else {
                        final Join<ObjDemande, ObjIdentifiantUsager> joinIdent = root.join("objIdentifiantUsagerByFkIdentifiantUsagerId", JoinType.LEFT);
                        final Join<ObjIdentifiantUsager, ObjPersonnePhysique> joinPP = joinIdent.join("objPersonnePhysiqueByFkPersonnePhysiqueId", JoinType.LEFT);
                        final Join<ObjIdentifiantUsager, ObjPersonneMorale> joinPM = joinIdent.join("objPersonneMoraleByFkPersonneMoraleId", JoinType.LEFT);
                        return builder.or(
                                builder.like(builder.function("jsonb_extract_path_text", String.class, root.<String>get("contenuDemande"), builder.literal("personnePhysique"), builder.literal("prenom")), "%" + prenomUsager + "%"),
                                builder.like(joinPP.get("prenom"), "%" + prenomUsager + "%"),
                                builder.like(joinPM.get("prenomRepresentant"), "%" + prenomUsager + "%")
                        );
                    }
                    return null;
                }
        );
    }

    public static Specification<ObjDemande> dateSoumissionEquals(LocalDate dateSoumission) {
        return (root, query, builder) ->
                dateSoumission == null ?
                        builder.conjunction() :
                        builder.equal(root.get("dateSoumission"), dateSoumission);
    }

    public static Specification<ObjDemande> motifBlocageIdEquals(Integer motifBlocageId) {
        return (root, query, builder) ->
                motifBlocageId == null ?
                        builder.conjunction() :
                        builder.equal(root.join("jntDemandeMotifBlocagesByDemandeId").get("refMotifBlocageByFkMotifBlocageId").get("motifBlocageId"), motifBlocageId);
    }

    public static Specification<ObjDemande> statutDemandeIdEquals(Integer statutDemandeId) {
        return (root, query, builder) ->
                statutDemandeId == null ?
                        builder.conjunction() :
                        builder.equal(root.get("fkStatutDemandeId"), statutDemandeId);
    }

    public static Specification<ObjDemande> numeroSerieVinEquals(String numeroSerieVin) {
        return (root, query, builder) ->
                numeroSerieVin == null ?
                        builder.conjunction() :
                        builder.like(builder.function("jsonb_extract_path_text", String.class, root.<String>get("contenuDemande"), builder.literal("engin"), builder.literal("numeroSerieVin")), "%" + numeroSerieVin + "%");
    }

    public static Specification<ObjDemande> premiereDeclarationEquals(Integer typeDemandeId) {
        return (root, query, builder) ->
                typeDemandeId == null ?
                        builder.conjunction() :
                        typeDemandeId == 1 ?
                                builder.equal(root.get("fkMotifDemandeId"), 1) :
                                builder.conjunction();
    }

    public static Specification<ObjDemande> demandesEnCours() {
        return (root, query, builder) -> builder.in(root.get("fkStatutDemandeId")).value(1).value(2).value(3).value(4);
    }*/
}
