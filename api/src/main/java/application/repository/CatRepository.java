package application.repository;

import application.entity.Cat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CatRepository extends JpaRepository<Cat, Integer>, JpaSpecificationExecutor<Cat> {

    Optional<Cat> findByName(String name);

    void deleteByName(String name);
}
