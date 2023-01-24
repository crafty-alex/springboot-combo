package application.service;

import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Service
public class PDFService {

    private String bodyBeginning;
    private String formulePolitesse;
    private Document document;


    public InputStream createPDF() throws IOException {
        generateNecessaryFields();
        ByteArrayOutputStream out = generateDocument();
        generateHeaderImages();
        createHeader();
        createGreeting();
        createBody();
        createSignature();
        createFooter();
        document.close();
        return new ByteArrayInputStream(out.toByteArray());
    }


    private ByteArrayOutputStream generateDocument() {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        document = new Document(pdfDoc);
        document.setFontSize(10);
        document.setLeftMargin(50);
        document.setRightMargin(50);
        return out;
    }


    private void generateHeaderImages() throws IOException {
        String imageFile = this.getClass().getClassLoader().getResource("image path").getPath();
        ImageData imgData = ImageDataFactory.create(imageFile);
        Image img = new Image(imgData);
        img.scaleAbsolute(150, 110);
        float[] pointColumnWidths = {330F, 330F};
        Table table = new Table(pointColumnWidths);
        table.addCell(new Cell().add(img).setBorder(Border.NO_BORDER));
        Cell cell = new Cell().add(new Paragraph(new Text("Délégation à la sécurité routière").setFontSize(12).setBold())).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER);
        File file = new File("image path");
        imgData = ImageDataFactory.create(FileUtils.readFileToByteArray(file));
        Image imgQr = new Image(imgData);
        imgQr.scaleAbsolute(150, 110);
        imgQr.setHorizontalAlignment(HorizontalAlignment.RIGHT);
        imgQr.setBackgroundColor(ColorConstants.WHITE);
        cell.add(imgQr);
        table.addCell(cell);
        document.add(table);
    }


    private void createHeader() throws IOException {

        float[] pointColumnWidths = {330F, 330F};
        Table table = new Table(pointColumnWidths);
        table.addCell(new Cell().add(new Paragraph(new Text("text")
                .setFont(getFontSpectral()).setBold()).setMultipliedLeading(0).setFixedLeading(12)).setTextAlignment(TextAlignment.LEFT)).setFontSize(8);

        table.addCell(new Cell().add(new Paragraph(new Text("Référence dossier: " + "numero de demande").setItalic().setFontSize(8))));
        table.addCell(new Cell().setTextAlignment(TextAlignment.RIGHT).add(new Paragraph(new Text("Paris, le 12/12/21").setItalic()
                .setFontSize(9))
                .setHorizontalAlignment(HorizontalAlignment.RIGHT)));

        for (IElement c : table.getChildren()) {
            ((Cell) c).setBorder(Border.NO_BORDER);
        }
        document.add(table);
    }


    private void createGreeting() throws IOException {
        Paragraph paragraph = new Paragraph();
        paragraph.add(new Text("Madame,"));
        paragraph.setMarginTop(20);
        paragraph.setMarginLeft(40);
        paragraph.setMultipliedLeading(1.5f);
        document.add(paragraph.setFont(getFontSpectral()).setFontSize(9));
    }


    private void createBody() throws IOException {
        document.setFont(getFontSpectral());
        Paragraph paragraph = new Paragraph().setTextAlignment(TextAlignment.JUSTIFIED);
        paragraph.add(bodyBeginning + formulePolitesse);
        document.add(paragraph);
    }


    private void createSignature() throws IOException {
        Paragraph paragraph = new Paragraph();
        paragraph.add("signature");
        paragraph.setMarginLeft(90);
        paragraph.setTextAlignment(TextAlignment.CENTER);
        document.add(paragraph.setFont(getFontSpectral()).setBold());
    }


    private void createFooter() throws IOException {
        Paragraph paragraph = new Paragraph();
        paragraph.setFont(getFontSpectral());
        paragraph.setFontSize(7);
        paragraph.add("texte").setMultipliedLeading(0).setFixedLeading(8);
        document.add(paragraph.setFont(getFontSpectral()));
        paragraph = new Paragraph();
        paragraph.setFont(getFontSpectral());
        paragraph.setFontSize(6);
        document.add(paragraph.setFont(getFontSpectral()));
    }


    private void generateNecessaryFields() {
        String dateString;
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        dateString = date.format(formatter);
        bodyBeginning = "Par correspondance du " + dateString;
        formulePolitesse = "Je vous prie d’agréer mes salutations distinguées.";
    }


    private PdfFont getFontSpectral() throws IOException {
        String spectral = this.getClass().getClassLoader().getResource("chemin font").getPath();
        FontProgram fontProgram = FontProgramFactory.createFont(spectral);
        return PdfFontFactory.createFont(fontProgram);
    }

}


