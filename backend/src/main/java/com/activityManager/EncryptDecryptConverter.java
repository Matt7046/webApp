package com.activityManager;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class EncryptDecryptConverter implements Converter<String, String> {

    private static final String SECRET_KEY = "1234567890123456"; // 16 byte per AES-128
    private static final String ALGORITHM = "AES";

    @Override
    public String convert(String source) {
        try {
            if (source != null) {
                // Criptografa il dato
                return encrypts(source);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return source;
    }

    public String decrypt(String encryptedData) throws Exception {
        if (encryptedData != null) {
            // Decripta il dato
            return decrypts(encryptedData);
        }
        return encryptedData;
    }

    public  String encrypts(String data) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    // Decripta una stringa
    public  String decrypts(String encryptedData) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decodedData = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedData = cipher.doFinal(decodedData);
        return new String(decryptedData);
    }
}
