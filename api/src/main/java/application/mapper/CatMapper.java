package application.mapper;

import application.entity.Cat;
import application.model.CatDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CatMapper {

    Cat catToEntity(CatDTO catDTO);

    CatDTO catToDTO(Cat cat);
}
