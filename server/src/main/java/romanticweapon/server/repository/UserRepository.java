package romanticweapon.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.User;

import javax.persistence.Id;
import javax.swing.text.html.Option;
import java.lang.reflect.Member;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String username);
}
