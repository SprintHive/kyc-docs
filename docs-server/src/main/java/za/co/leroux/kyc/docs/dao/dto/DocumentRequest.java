package za.co.leroux.kyc.docs.dao.dto;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
@XmlRootElement
public class DocumentRequest {

    private String id;
    private String name;
    private String title;
    private boolean singlePage;
    private boolean barcodeScan;
    private String barcodeLabel;
    private String documents[];
    private String status;

    public DocumentRequest() {
    }

}
