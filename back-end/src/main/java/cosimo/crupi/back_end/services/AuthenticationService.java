package cosimo.crupi.back_end.services;

import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.exceptions.UnAuthorizedException;
import cosimo.crupi.back_end.payloads.LoginDTO;
import cosimo.crupi.back_end.tools.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private UtenteService utenteService;

    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private PasswordEncoder bcrypt;

    public String checkAccessAndGenerateToken(LoginDTO body){
        Utente fnd = this.utenteService.findUtenteByEmail(body.email());
        if (bcrypt.matches(body.password(), fnd.getPassword())){
            String accessToken = jwtTools.createTokenUtente(fnd);
            return accessToken;
        }else {
            throw new UnAuthorizedException("Password errata!");
        }
    }
}
