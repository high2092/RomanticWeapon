package romanticweapon.server.controller.ranking;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import romanticweapon.server.repository.auth.UserRepository;
import romanticweapon.server.service.ranking.RankingService;

@RestController
@Slf4j
@RequiredArgsConstructor
public class RankingController {
    private final RankingService rankingService;

    @GetMapping("/ranking")
    public ResponseEntity ranking(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "5") int size) {
        return new ResponseEntity(rankingService.getRanking(page, size), HttpStatus.OK);
    }
}
