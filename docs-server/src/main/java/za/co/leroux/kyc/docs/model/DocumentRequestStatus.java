package za.co.leroux.kyc.docs.model;

import com.google.gson.annotations.SerializedName;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
@XmlEnum(String.class)
public enum DocumentRequestStatus {
    @XmlEnumValue("new") @SerializedName("new")NEW("new"),
    @XmlEnumValue("busy") @SerializedName("busy")BUSY("busy"),
    @XmlEnumValue("complete") @SerializedName("complete")COMPLETE("complete");

    private final String descr;

    DocumentRequestStatus(String descr) {
        this.descr = descr;
    }

    public String getDescription() {
        return descr;
    }

    @Override
    public String toString() {
        return getDescription();
    }
}
