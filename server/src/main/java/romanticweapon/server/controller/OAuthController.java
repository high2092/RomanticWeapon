package romanticweapon.server.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import romanticweapon.server.domain.dto.request.UserRegisterRequestDto;
import romanticweapon.server.domain.enumm.OAuthType;
import romanticweapon.server.domain.oauth.GoogleOAuth;
import romanticweapon.server.domain.oauth.GoogleOAuthToken;
import romanticweapon.server.domain.oauth.GoogleUser;
import romanticweapon.server.service.OAuthService;
import romanticweapon.server.service.UserService;

import javax.servlet.http.Cookie;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final OAuthService oAuthService;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    private final UserService userService;
    private final GoogleOAuth googleOAuth;

    @GetMapping("/auth/{socialLoginType}")
    public void socialLoginRedirect(@PathVariable(name="socialLoginType") String socialLoginType) {
        OAuthType oAuthType = OAuthType.valueOf(socialLoginType.toUpperCase());
        oAuthService.request(oAuthType);
    }

    @GetMapping("/auth/{socialLoginType}/callback")
    public String callback(
            @PathVariable(name = "socialLoginType") String socialLoginPath,
            @RequestParam(name = "code") String code
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

        System.out.println("token = " + token);

        return "OK";
    }
}
