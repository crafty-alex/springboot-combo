package application.service;

import application.model.CatDTO;

public interface CatService {

    void catSound();

    CatDTO saveCat(CatDTO catDTO);

    CatDTO getCat(String name);

    CatDTO updateCat(String name, CatDTO catDTO);

    void deleteCat(String name);

}
