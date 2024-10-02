package com.example.pbl4Version1.configuration;

import java.text.ParseException;
import java.util.Objects;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.IntrospectRequest;
import com.example.pbl4Version1.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;

@Component
public class CustomJwtDecoder implements JwtDecoder {
	@Value("${jwt.signerKey}")
	protected String SIGNER_KEY;

	@Autowired
	private AuthenticationService authenticationService;
	private NimbusJwtDecoder nimbusJwtDecoder = null;
	
	@Override
	public Jwt decode(String token) throws JwtException {
		try {
			var response = authenticationService.introspect(IntrospectRequest
					.builder().token(token).build());
			
			if (!response.isValid()) 
				throw new JwtException("Token invalid");
		} catch (JOSEException | ParseException e) {
			throw new JwtException(e.getMessage());
		}
		
		if (Objects.isNull(nimbusJwtDecoder)) {
			SecretKeySpec spec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
			nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(spec)
					.macAlgorithm(MacAlgorithm.HS512)
					.build();
		}
		return nimbusJwtDecoder.decode(token);
	}
}
