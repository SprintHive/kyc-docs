export class DocumentType {
    id:string;
    name:string;
    title:string;
    singlePage:boolean;
    glyphicon:string;
    barcodeScan:boolean;
    barcodeLabel:string;
}

export class DocumentRequest {
    id:string;
    documents:string[];
    documentType:DocumentType;
    expectedBarcode:string;
    scannedBarcode:string;
    status:string;
    fulfilled(){
        if(this.documentType.singlePage){
            if(this.documentType.barcodeScan){
                return this.documents !== null && this.documents.length > 0 && (this.expectedBarcode == null || this.expectedBarcode === this.scannedBarcode);
            }else{
                return this.documents !== null && this.documents.length > 0;
            }
        }else{
            return this.documents !== null && this.documents.length > 0 && this.status === 'COMPLETE';
        }
    }

    started(){
        if(status === 'COMPLETE'){
            return true;
        }
        return this.documents != null && this.documents.length > 0 && this.status === 'BUSY';
    }
}

export class Application {
    id:string;
    customerName:string;
    customerEmail:string;
    cusomerIdNumber:string;
    documentRequests:DocumentRequest[];
}

