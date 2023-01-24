package application.specs;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ObjDemandeSearch {

    private String numeroDemande;
    private String nomUsager;
    private String prenomUsager;
    private String denominationSociale;
    private LocalDate dateSoumission;
    private Integer motifBlocageId;
    private Integer statutDemandeId;
    private String numeroSerieVin;
    private Integer typeDemandeId;
    private int page;
}
