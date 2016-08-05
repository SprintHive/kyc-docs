import { Component, Input } from '@angular/core';
import { DocumentRequest, Application } from './model';
import { SingleDocUploadComponent } from './single-doc-upload.component';
import { MultiDocUploadComponent } from './multi-doc-upload.component';

@Component({
  selector: 'upload-selector',
    templateUrl: 'app/upload-selector.component.html',
        directives: [SingleDocUploadComponent, MultiDocUploadComponent]
    })
export class UploadSelectorComponent {
    @Input()
    documentRequest : DocumentRequest;
    @Input()
    application : Application;
    singleDoc : DocumentRequest;
    multiDoc : DocumentRequest;
    scannedDoc : DocumentRequest;

    ngOnInit() {
        let documentType = this.documentRequest.documentType;
        if(documentType.singlePage && documentType.barcodeScan){
            this.scannedDoc = this.documentRequest;
        }else if (documentType.singlePage){
            this.singleDoc = this.documentRequest;
        }else{
            this.multiDoc = this.documentRequest;

        }
    }
}