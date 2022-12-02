package romanticweapon.server.domain.dto.request;

import lombok.Getter;
import lombok.Setter;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.domain.enumm.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collections;

@Getter
@Setter
public class UserRegisterRequestDto {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String id;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    @Size(min = 2, max = 12, message = "닉네임은 2글자 이상 12글자 이하여야 합니다.")
    private String nickName;

    public User toEntity() {
        return User.builder()
                .userId(id)
                .password(password)
                .nickName(nickName)
                .role(Role.USER)
                .build();
    }
}