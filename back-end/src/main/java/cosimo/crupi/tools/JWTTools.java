package cosimo.crupi.tools;

import cosimo.crupi.entities.Utente;
import cosimo.crupi.exceptions.UnAuthorizedException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTTools {
    @Value("${JWT.SECRET}")
    private String secret;
    public String createTokenUtente(Utente utente){
        return Jwts.builder()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .subject(String.valueOf(utente.getId()))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }
    public void verifyToken(String accessToken){
        try{
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build()
                    .parseSignedClaims(accessToken);
        } catch (io.jsonwebtoken.ExpiredJwtException ex){
            throw new UnAuthorizedException("Il token è scaduto! Effettua di nuovo il login.");
        }catch (io.jsonwebtoken.security.SignatureException ex){
            throw new UnAuthorizedException("Token non valido: firma errata!");
        }catch (Exception ex){
            throw new UnAuthorizedException("Token non valido!");
        }
    }
    public String extractIdFromToken(String accessToken){
        return Jwts.parser().
                verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .getSubject();
    }
}
