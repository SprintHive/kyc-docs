package za.co.leroux.kyc.docs.exception;

/**
 * Created by Dirk le Roux on 2016/05/22.
 */
public class StorageException extends Exception {
    public StorageException() {
    }

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }

    public StorageException(Throwable cause) {
        super(cause);
    }
}
