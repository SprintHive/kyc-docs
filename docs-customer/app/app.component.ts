import {Component}       from '@angular/core';
import {WelcomeComponent} from './welcome.component';
import {UploadListComponent} from './upload-list.component';
import {ApplicationService} from './application.service';
import { HTTP_PROVIDERS } from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
@Component({
    selector: 'my-app',
    template: `
      <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        ApplicationService
    ]
})
@RouteConfig([
    {
        path: '/welcome',
        name: 'Welcome',
        component: WelcomeComponent,
        useAsDefault: true
    }, {
        path: '/upload-list/:applicationId',
        name: 'UploadList',
        component: UploadListComponent
    }
])
export class AppComponent {
}