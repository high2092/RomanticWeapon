package romanticweapon.server.service.ranking;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import romanticweapon.server.domain.dto.response.ranking.RankingResponse;
import romanticweapon.server.domain.dto.response.ranking.UserRank;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.weapon.Weapon;
import romanticweapon.server.repository.auth.UserRepository;
import romanticweapon.server.repository.weapon.WeaponRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RankingService {
    private final WeaponRepository weaponRepository;
    public RankingResponse getRanking(int page, int size) {
        Page<Weapon> pageWeapon = weaponRepository.findAll(PageRequest.of(page, size, Sort.Direction.DESC, "upgrade", "user.gold"));
        System.out.println(pageWeapon.getTotalPages());
        RankingResponse rankingResponse = new RankingResponse();
        int idx = 1;
        for (Weapon weapon : pageWeapon) {
            User currentUser = weapon.getUser();
            UserRank userRank = new UserRank(page * size + idx, currentUser.getUsername(), weapon.getUpgrade() ,currentUser.getGold());
            rankingResponse.getRanks().add(userRank);
        }
        rankingResponse.setTotalPage(pageWeapon.getTotalPages());
        rankingResponse.setTotalCount(pageWeapon.getTotalElements());

        return rankingResponse;
    }
}
