package romanticweapon.server.domain.dto.request.weapon;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RefineRequestDto {
    private List<Integer> use = new ArrayList<>();
}
