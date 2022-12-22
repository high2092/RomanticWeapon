package romanticweapon.server.domain.dto.response.ranking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRank {
    private int rank;
    private String username;
    private Long upgrade;
    private Long gold;

}
