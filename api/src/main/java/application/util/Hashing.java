package application.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class Hashing {

    private Hashing() {
    }

    public static String getHash(String code, String salt) throws NoSuchAlgorithmException {
        String hash;
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt.getBytes());
        byte[] bytes = md.digest(code.getBytes());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        hash = sb.toString();
        return hash;
    }

}
