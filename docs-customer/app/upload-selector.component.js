"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var model_1 = require('./model');
var single_doc_upload_component_1 = require('./single-doc-upload.component');
var multi_doc_upload_component_1 = require('./multi-doc-upload.component');
var UploadSelectorComponent = (function () {
    function UploadSelectorComponent() {
    }
    UploadSelectorComponent.prototype.ngOnInit = function () {
        var documentType = this.documentRequest.documentType;
        if (documentType.singlePage && documentType.barcodeScan) {
            this.scannedDoc = this.documentRequest;
        }
        else if (documentType.singlePage) {
            this.singleDoc = this.documentRequest;
        }
        else {
            this.multiDoc = this.documentRequest;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.DocumentRequest)
    ], UploadSelectorComponent.prototype, "documentRequest", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.Application)
    ], UploadSelectorComponent.prototype, "application", void 0);
    UploadSelectorComponent = __decorate([
        core_1.Component({
            selector: 'upload-selector',
            templateUrl: 'app/upload-selector.component.html',
            directives: [single_doc_upload_component_1.SingleDocUploadComponent, multi_doc_upload_component_1.MultiDocUploadComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], UploadSelectorComponent);
    return UploadSelectorComponent;
}());
exports.UploadSelectorComponent = UploadSelectorComponent;
//# sourceMappingURL=upload-selector.component.js.map