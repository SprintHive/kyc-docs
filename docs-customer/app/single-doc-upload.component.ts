import {Component, Input, NgZone, OnInit} from "@angular/core";
import {Application, DocumentRequest} from "./model";
import {ApplicationService} from "./application.service";
import {Router} from "@angular/router-deprecated";
import {UPLOAD_DIRECTIVES} from "ng2-uploader/ng2-uploader";

@Component({
    selector: 'single-doc-upload',
    templateUrl: 'app/single-doc-upload.component.html',
    directives: [UPLOAD_DIRECTIVES],
})
export class SingleDocUploadComponent implements OnInit {
    @Input()
    documentRequest:DocumentRequest;
    @Input()
    application:Application;
    statusMessage:string;
    refreshing = false;
    requesting = false;
    uploadFile:any;
    uploadProgress:number;
    zone:NgZone;
    options:Object;

    constructor(private applicationService:ApplicationService, private router:Router) {
        this.application = new Application;
        this.uploadProgress = 0;
        this.statusMessage = '';
        this.zone = new NgZone({enableLongStackTrace: false});

    }

    ngOnInit() {
        console.log(this.documentRequest);
        this.options = {
            url: 'http://docs2.sprinthive.tech:8080/io/upload/' + this.application.id + '/' + this.documentRequest.documentType.name + '/'
        };
        this.setStatus();
    }

    setStatus() {
        if (this.documentRequest.documentType.singlePage) {
            if (this.documentRequest.fulfilled()) {
                if (this.documentRequest.scannedBarcode != null) {
                    this.statusMessage = "Found: " + this.documentRequest.scannedBarcode;
                } else {
                    if (this.documentRequest.documentType.barcodeScan) {
                        this.statusMessage = "No barcode found in image.";
                    } else {
                        this.statusMessage = "Document uploaded."
                    }
                }
            } else {
                this.statusMessage = "Please provide your " + this.documentRequest.documentType.title;
            }
        }else{
            this.statusMessage = this.documentRequest.documents.length + " documents uploaded.";
        }
    }

    clearStatus() {
        this.uploadProgress = 0;
        this.uploadFile = null;
        this.setStatus();
        console.log('clearStatus2');
    }

    handleUpload(data:any):void {
        this.documentRequest.status = 'BUSY';
        this.uploadFile = data;
        console.log(this.uploadFile)
        this.zone.run(() => {
            this.uploadProgress = data.progress.percent;
            console.log('uploadProgress:' + this.uploadProgress)
        });
        console.log('data');
        console.log(data);
        if (data.status == 200) {
            console.log('in if');
            let documentRequest = JSON.parse(data.response);
            documentRequest.fulfilled = this.documentRequest.fulfilled;
            documentRequest.started = this.documentRequest.started;
            this.documentRequest = documentRequest;
            this.statusMessage = "Upload complete."
            this.clearStatus();
        }
    }

    markAsDone(docRecTypeName: string) {
        var id = this.application.id;
        return this.applicationService.markAsDone(this.application, docRecTypeName)
            .subscribe(
                documentRequest => this.receiveDocumentRequest(documentRequest),
                error => this.handleError(<any>error));
    }

    private receiveDocumentRequest(documentRequest:DocumentRequest) {
        console.log('receiveDocumentRequest');
        console.log(documentRequest);
        documentRequest.fulfilled = this.documentRequest.fulfilled;
        documentRequest.started = this.documentRequest.started;
        this.documentRequest = documentRequest;
        // location.reload();
        return documentRequest;
    }


    private handleError(error:string) {
        this.statusMessage = error;
    }

    showDone():boolean {
        return this.documentRequest.status !== "COMPLETE"
    }

    getGlyphicon(docReq:DocumentRequest){
        if(docReq.fulfilled()){
            return 'glyphicon-ok';
        }else if (docReq.started()){
            return 'glyphicon-floppy-disk';
        }else {
            return 'glyphicon-cloud-upload';
        }
    }

    getPanelStyle(docReq:DocumentRequest){
        if(docReq.fulfilled()){
            return 'panel-success';
        }else if (docReq.started()){
            return 'panel-warning';
        }else {
            return 'panel-primary';
        }
    }

}