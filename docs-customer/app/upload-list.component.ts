///<reference path="model.ts"/>
import {Component} from "@angular/core";
import {DocumentRequest, Application} from "./model";
import {ApplicationService} from "./application.service";
import {Router} from "@angular/router-deprecated";
import {UploadSelectorComponent} from './upload-selector.component';
import {OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

@Component({
    selector: 'upload-list',
    templateUrl: 'app/upload-list.component.html',
    directives: [UploadSelectorComponent]
})
export class UploadListComponent implements OnInit {
    application:Application;
    mainMessage:string;
    secondaryMessage:string;
    errorMessage:string;
    refreshing = false;
    requesting = false;

    constructor(private applicationService:ApplicationService, private router:Router, private routeParams:RouteParams) {
        this.mainMessage = 'Loading your application status';
    }

    ngOnInit() {
        this.getApplication();
    }

    getApplication() {
        let id = this.routeParams.get('applicationId');
        if (id !== null) {
            this.requesting = true;
            this.applicationService.getApplication(id)
                .subscribe(
                    application => this.newStateReceived(application),
                    error => this.handleError(<any>error));
        }
    }


    private newStateReceived(application:Application) {
        this.application = application;
        console.log(application);
        this.requesting = false;
        let noCompleted = 0;
        let length = this.application.documentRequests == null ? 0 : this.application.documentRequests.length;
        let dr = new DocumentRequest();
        for(var i= 0, l = length; i< l; i++){
            application.documentRequests[i].fulfilled = dr.fulfilled;
            application.documentRequests[i].started = dr.started;
        	console.log(this.application.documentRequests[i]);

            if(this.application.documentRequests[i].fulfilled()){
                noCompleted++;
            }
        }
        let name = this.application.customerName;
        this.mainMessage = 'Hi '+ name+', you have provided '+noCompleted+' of '+ length+' documents.';
        this.secondaryMessage = 'You can take a picture or upload a file.';
    }

    private handleError(error:any) {
        this.mainMessage = 'Problems loading your application status';
        this.errorMessage = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.requesting = false
    }

    getButtonStyle(docReq:DocumentRequest){
        if(docReq.fulfilled()){
            return 'panel-success';
        }else if (docReq.started()){
            return 'panel-warning';
        }else {
            return 'panel-primary';
        }
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
}