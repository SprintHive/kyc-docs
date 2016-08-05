package za.co.leroux.kyc.docs.model;

import org.springframework.data.annotation.Id;

/**
 * Created by Dirk le Roux on 2016/07/31.
 */
public class DocumentType {

    @Id
    private String id;
    private String name;
    private String title;
    private boolean singlePage;
    private boolean barcodeScan;
    private String barcodeLabel;
    private String glyphicon;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isSinglePage() {
        return singlePage;
    }

    public void setSinglePage(boolean singlePage) {
        this.singlePage = singlePage;
    }

    public boolean isBarcodeScan() {
        return barcodeScan;
    }

    public void setBarcodeScan(boolean barcodeScan) {
        this.barcodeScan = barcodeScan;
    }

    public String getBarcodeLabel() {
        return barcodeLabel;
    }

    public void setBarcodeLabel(String barcodeLabel) {
        this.barcodeLabel = barcodeLabel;
    }

    public String getGlyphicon() {
        return glyphicon;
    }

    public void setGlyphicon(String glyphicon) {
        this.glyphicon = glyphicon;
    }

    @Override
    public String toString() {
        return "DocumentType{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", singlePage=" + singlePage +
                ", barcodeScan=" + barcodeScan +
                ", barcodeLabel='" + barcodeLabel + '\'' +
                '}';
    }
}
