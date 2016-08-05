package za.co.leroux.kyc.docs.exception;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
public class DataLoadException extends Exception {
    public DataLoadException() {
    }

    public DataLoadException(String message) {
        super(message);
    }

    public DataLoadException(String message, Throwable cause) {
        super(message, cause);
    }

    public DataLoadException(Throwable cause) {
        super(cause);
    }
}
