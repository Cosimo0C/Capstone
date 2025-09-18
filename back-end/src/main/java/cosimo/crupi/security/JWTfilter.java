package cosimo.crupi.security;

import cosimo.crupi.entities.Utente;
import cosimo.crupi.exceptions.UnAuthorizedException;
import cosimo.crupi.services.UtenteService;
import cosimo.crupi.tools.JWTTools;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JWTfilter extends OncePerRequestFilter {
    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private UtenteService utenteService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new UnAuthorizedException("Inserisci il token nell'Authorization Header nel formato corretto!");

        String accessToken =authHeader.replace("Bearer ", "");
        jwtTools.verifyToken(accessToken);
        UUID utenteId = UUID.fromString(jwtTools.extractIdFromToken(accessToken));
        Utente utenteAttivo = this.utenteService.findUtenteById(utenteId);
        Authentication authentication = new UsernamePasswordAuthenticationToken(utenteAttivo, null, utenteAttivo.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request){
        AntPathMatcher pathMatcher = new AntPathMatcher();
        return pathMatcher.match("/auth/**", request.getServletPath()) || pathMatcher.match("/utente/annunci", request.getServletPath());
    }
}
