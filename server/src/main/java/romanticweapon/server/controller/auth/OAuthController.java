package romanticweapon.server.controller.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import romanticweapon.server.domain.dto.request.auth.UserRegisterRequestDto;
import romanticweapon.server.domain.enumm.auth.OAuthType;
import romanticweapon.server.domain.dto.oauth.GoogleOAuth;
import romanticweapon.server.domain.dto.oauth.GoogleOAuthToken;
import romanticweapon.server.domain.dto.oauth.GoogleUser;
import romanticweapon.server.service.auth.OAuthService;
import romanticweapon.server.service.auth.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@Slf4j
@Deprecated
public class OAuthController {

    private final OAuthService oAuthService;
    private final UserService userService;
    private final GoogleOAuth googleOAuth;

    @GetMapping("/auth/{socialLoginType}")
    public void socialLoginRedirect(@PathVariable(name="socialLoginType") String socialLoginType) {
        OAuthType oAuthType = OAuthType.valueOf(socialLoginType.toUpperCase());
        oAuthService.request(oAuthType);
    }

    @GetMapping("/auth/{socialLoginType}/callback")
    public ResponseEntity<?> callback(
            @PathVariable(name = "socialLoginType") String socialLoginPath,
            @RequestParam(name = "code") String code,
            HttpServletResponse response
            ) throws Exception {
        ResponseEntity<String> stringResponseEntity = googleOAuth.requestAccessToken(code);
        GoogleOAuthToken accessToken = googleOAuth.getAccessToken(stringResponseEntity);

        ResponseEntity<String> userInfoResponseEntity = oAuthService.requestUserInfo(accessToken);
        GoogleUser userInfo = oAuthService.getUserInfo(userInfoResponseEntity);

        String token = userService.register(UserRegisterRequestDto.builder()
                .id(userInfo.getId())
                .password(userInfo.getId())
                .isOAuth(true)
                .username(userInfo.getName())
                .build());
        Cookie cookie = new Cookie("accessToken", token);
        cookie.setMaxAge(24 * 60 * 60); // 1 day
        cookie.setHttpOnly(true);
        cookie.setPath("/");


        response.addCookie(cookie);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
