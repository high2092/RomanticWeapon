package romanticweapon.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import romanticweapon.server.domain.enumm.OAuthType;
import romanticweapon.server.domain.oauth.GoogleOAuth;
import romanticweapon.server.service.OAuthService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping("/auth/{socialLoginType}")
    public void socialLoginRedirect(@PathVariable(name="socialLoginType") String socialLoginType) {
        OAuthType oAuthType = OAuthType.valueOf(socialLoginType.toUpperCase());
        oAuthService.request(oAuthType);
    }
}
