package romanticweapon.server.domain.dto.request;

import lombok.Data;

@Data
public class UserLoginRequestDto {
    private String userId;
    private String password;
}
