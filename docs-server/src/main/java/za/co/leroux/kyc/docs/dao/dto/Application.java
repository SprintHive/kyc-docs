package za.co.leroux.kyc.docs.dao.dto;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
@XmlRootElement
public class Application {

    private String id;
    private String customer_name;
    private String cusomer_id_number;
    private DocumentRequest documentRequest[];


}
