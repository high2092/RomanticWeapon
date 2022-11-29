package romanticweapon.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import romanticweapon.server.domain.entity.TestEntity;

@Repository
public interface TestRepository extends JpaRepository<TestEntity, Long> {
}
