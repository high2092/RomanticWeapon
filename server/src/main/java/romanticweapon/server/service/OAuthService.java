package romanticweapon.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Service;
import romanticweapon.server.domain.enumm.OAuthType;
import romanticweapon.server.domain.oauth.GoogleOAuth;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final GoogleOAuth googleOAuth;
    private final HttpServletResponse response;

    public void request(OAuthType oAuthType) {
        String redirectURL = null;
        if(oAuthType.equals(OAuthType.GOOGLE)) {
            redirectURL = googleOAuth.getOAuthRedirectURL();
        }
        try {
            response.sendRedirect(redirectURL);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
