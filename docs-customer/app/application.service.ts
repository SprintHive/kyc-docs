import {Injectable} from '@angular/core';
import {Application, DocumentRequest, DocumentType} from './model';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from '@angular/http';

@Injectable()
export class ApplicationService {
    private getApplicationUrl =       'http://docs2.sprinthive.tech:8080/io/application/';  // URL to web API
    private markDocReqAsCompleteUrl =    'http://docs2.sprinthive.tech:8080/io/markDocReqAsComplete/';  // URL to web API

    constructor(private http:Http) {
    }

    getApplication(applicationId:string):Observable<Application> {
        let url = this.getApplicationUrl+applicationId;
        console.log(url);
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

   

    private extractData(res:Response) {
        let body = res.json();
        return body;
    }

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    markAsDone(application:Application, docRecTypeName: string) {
        var id = application.id;
        let url =  this.markDocReqAsCompleteUrl + id+"/"+docRecTypeName;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }



}