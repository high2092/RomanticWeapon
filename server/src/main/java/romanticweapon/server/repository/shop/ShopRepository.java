package romanticweapon.server.repository.shop;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.shop.Shop;

import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findByIdx(Long idx);
}
