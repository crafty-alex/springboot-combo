package application.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;



@Service
public class MailService {

    @Value("${smtp.host}")
    private String host;

    @Value("${smtp.port}")
    private String port;

    @Value("${smtp.auth}")
    private String auth;

    @Value("${smtp.starttls.enable}")
    private String starttls;

    @Value("${smtp.transport.protocol}")
    private String protocol;

    @Value("${smtp.username}")
    private String username;

    @Value("${smtp.password}")
    private char[] password;

    private static final String HEAD_MAIL = "<head>" +
            "    <style> " +
            "img {.margin-top-100 {" +
            "    margin-top: 100px" +
            "    }" +
            "        }" +
            ".text-align-center {text-align:left}" +
            "    </style>" +
            "</head>";


    private static final String BODY_MAIL = "<br/><br/>" +
            "Madame, Monsieur,<br/><br/>" +
            "A la suite de votre d&eacute;claration d'un engin motoris&eacute; non r&eacute;ceptionn&eacute;, nous vous informons que vous avez re&ccedil;u une notification accessible en ligne.<br/><br/>" +
            "Pour la consulter, vous devez acc&eacute;der &agrave; la d&eacute;marche DICEM de gestion des engins non r&eacute;ceptionn&eacute;s en saisissant vos identifiants France Connect, via les liens en ligne sur les sites service-public.fr et demarche.interieur.gouv.fr.<br/><br/>" +
            "Cordialement,<br /> --- <br />" +
            "<b>D&eacute;claration et identification de certains engins motoris&eacute;s (DICEM)</b> <br />" +
            "Bureau national de l'immatriculation des v&eacute;hicules <br />" +
            "Sous-direction de la protection des usagers de la route <br />" +
            "D&eacute;l&eacute;gation &agrave; la s&eacute;curit&eacute; routi&egrave;re" +
            "<table class=\"margin-top-100\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">" +
            "<tr><td align=\"left\">" +
            "<img width=\"15%\" src=\"cid:" + "image_path" + "\">" +
            "</td></tr>" +
            "</table>" +
            "Place Beauvau <br />" +
            "75800 PARIS Cedex 08 <br /> --- <br />" +
            "<div class=\"text-align-center\"><em>Ce message est g&eacute;n&eacute;r&eacute; automatiquement, ne r&eacute;pondez pas &agrave; l'exp&eacute;diteur.<br/>Si vous n'&ecirc;tes pas destinataire(s) de ce message, merci de le d&eacute;truire.</em></div>" +
            "</body>";


    public void sendMail(String emailUsager) throws MessagingException {
        Session session = getSession();
        Message message = new MimeMessage(session);
        message.setSubject("this is the subject");
        setMail(emailUsager, message);
        Transport.send(message);
    }


    private void setMail(String emailUsager, Message message) throws MessagingException {
        message.setFrom(new InternetAddress("email emetteur"));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailUsager));
        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        String head = HEAD_MAIL;
        String body = BODY_MAIL;
        mimeBodyPart.setContent(head + body, "text/html");
        MimeBodyPart mimeBodyPartIMG = new MimeBodyPart();
        mimeBodyPartIMG.setHeader("Content-ID", "<" + "image path" + ">");
        String footerImg = this.getClass().getClassLoader().getResource("image path").getPath();
        DataSource source = new FileDataSource(footerImg);
        mimeBodyPartIMG.setDataHandler(new DataHandler(source));
        mimeBodyPartIMG.setFileName(footerImg);
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        multipart.addBodyPart(mimeBodyPartIMG);
        message.setContent(multipart);
    }


    public Session getSession() {
        Properties prop = new Properties();
        prop.put("mail.smtp.auth", this.auth);
        prop.put("mail.transport.protocol", this.protocol);
        prop.put("mail.smtp.starttls.enable", this.starttls);
        prop.put("mail.smtp.host", this.host);
        prop.put("mail.smtp.port", this.port);
        prop.put("mail.smtp.ssl.trust", this.host);
        final String user = this.username;
        final char[] pass = this.password;
        return Session.getInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, String.valueOf(pass));
            }
        });
    }
}
