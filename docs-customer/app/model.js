"use strict";
var DocumentType = (function () {
    function DocumentType() {
    }
    return DocumentType;
}());
exports.DocumentType = DocumentType;
var DocumentRequest = (function () {
    function DocumentRequest() {
    }
    DocumentRequest.prototype.fulfilled = function () {
        if (this.documentType.singlePage) {
            if (this.documentType.barcodeScan) {
                return this.documents !== null && this.documents.length > 0 && (this.expectedBarcode == null || this.expectedBarcode === this.scannedBarcode);
            }
            else {
                return this.documents !== null && this.documents.length > 0;
            }
        }
        else {
            return this.documents !== null && this.documents.length > 0 && this.status === 'COMPLETE';
        }
    };
    DocumentRequest.prototype.started = function () {
        if (status === 'COMPLETE') {
            return true;
        }
        return this.documents != null && this.documents.length > 0 && this.status === 'BUSY';
    };
    return DocumentRequest;
}());
exports.DocumentRequest = DocumentRequest;
var Application = (function () {
    function Application() {
    }
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=model.js.map