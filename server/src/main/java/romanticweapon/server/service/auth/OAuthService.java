package romanticweapon.server.service.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import romanticweapon.server.config.auth.JwtTokenProvider;
import romanticweapon.server.domain.enumm.auth.OAuthType;
import romanticweapon.server.domain.dto.oauth.GoogleOAuth;
import romanticweapon.server.domain.dto.oauth.GoogleOAuthToken;
import romanticweapon.server.domain.dto.oauth.GoogleUser;

import javax.servlet.http.HttpServletResponse;

import static romanticweapon.server.domain.enumm.auth.OAuthType.GOOGLE;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final GoogleOAuth googleOAuth;
    private final HttpServletResponse response;

    private final JwtTokenProvider jwtTokenProvider;

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    public void request(OAuthType oAuthType) {
        String redirectURL = null;
        if(oAuthType.equals(GOOGLE)) {
            redirectURL = googleOAuth.getOAuthRedirectURL();
        }
        try {
            response.sendRedirect(redirectURL);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ResponseEntity<String> requestUserInfo(GoogleOAuthToken oAuthToken) {
        String GOOGLE_USERINFO_REQUEST_URL="https://www.googleapis.com/oauth2/v1/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer "+oAuthToken.getAccess_token());

        //HttpEntity를 하나 생성해 헤더를 담아서 restTemplate으로 구글과 통신하게 된다.
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity(headers);
        ResponseEntity<String> response=restTemplate.exchange(GOOGLE_USERINFO_REQUEST_URL, HttpMethod.GET,request,String.class);
        System.out.println("response.getBody() = " + response.getBody());
        return response;
    }

    public GoogleUser getUserInfo(ResponseEntity<String> userInfoRes) throws JsonProcessingException {
        GoogleUser googleUser=objectMapper.readValue(userInfoRes.getBody(),GoogleUser.class);
        return googleUser;
    }

}
