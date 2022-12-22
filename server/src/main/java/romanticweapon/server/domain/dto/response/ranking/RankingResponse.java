package romanticweapon.server.domain.dto.response.ranking;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RankingResponse {
    private List<UserRank> ranks = new ArrayList<>();
    private int totalPage;
    private long totalCount;
}
