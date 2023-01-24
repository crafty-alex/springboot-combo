package application.service;

import application.entity.Cat;
import application.mapper.CatMapper;
import application.model.CatDTO;
import application.repository.CatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Slf4j
public class CatServiceImpl implements CatService {

    @Value("${animal.sound}")
    private String sound;

    private final CatRepository catRepository;

    private final CatMapper catMapper;


    @Override
    public void catSound() {
        log.info(sound);
    }

    @Override
    public CatDTO saveCat(CatDTO catDTO) {
        Cat cat = catRepository.save(catMapper.catToEntity(catDTO));
        return catMapper.catToDTO(cat);
    }

    @Override
    @Cacheable(value = "cat")
    public CatDTO getCat(String name) {
        return catMapper.catToDTO(catRepository.findByName(name).orElseThrow(() ->
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat introuvable!");
        }));
    }

    @Override
    @CachePut(value = "cat", key = "#name")
    public CatDTO updateCat(String name, CatDTO catDTO) {
        getCat(name);
        Cat cat = catMapper.catToEntity(catDTO);
        return catMapper.catToDTO(catRepository.save(cat));
    }

    @Override
    @Transactional
    @CacheEvict(value = "cat", key = "#name")
    public void deleteCat(String name) {
        getCat(name);
        catRepository.deleteByName(name);
    }
}
