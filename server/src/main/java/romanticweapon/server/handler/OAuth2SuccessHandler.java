package romanticweapon.server.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import romanticweapon.server.config.auth.JwtTokenProvider;
import romanticweapon.server.repository.UserRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException, IOException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();

        String email = (String) oAuth2User.getAttributes().get("email");
        String username = (String) oAuth2User.getAttributes().get("name");

        //패스워드 입력하도록 리다이렉트
        response.sendRedirect("/user/oauth/password/"+email+"/"+username);
        username = (String) oAuth2User.getAttributes().get("name");

        //패스워드 입력하도록 리다이렉트
        response.sendRedirect("/user/oauth/password/"+email+"/"+username);
    }
}