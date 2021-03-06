import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { ModalModule } from 'ngx-bootstrap/modal/modal.module';
// import { ModalModule } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from 'src/_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from 'src/_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { AlertifyService } from 'src/_services/alertify.service';
import { UserService } from 'src/_services/user.service';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ListsResolver } from './_resolvers/lists.resolvers';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MessageThreadComponent } from './members/message-thread/message-thread.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AdminManagementComponent } from './admin/admin-management/admin-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { AdminService } from 'src/_services/admin.service';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';

export function getToken() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
   declarations: [
      TimeAgoPipe,
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      MessageThreadComponent,
      AdminPanelComponent,
      HasRoleDirective,
      AdminManagementComponent,
      PhotoManagementComponent,
      RolesModalComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      ModalModule.forRoot(),
      NgxGalleryModule,
      PaginationModule.forRoot(),
      FileUploadModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
        config: {
          tokenGetter: getToken,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AuthGuard,
      AlertifyService,
      UserService,
      PreventUnsavedChanges,
      MemberDetailResolver,
      MemberEditResolver,
      MemberListResolver,
      ListsResolver,
      MessagesResolver,
      AdminService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
    ],
    entryComponents: [
      RolesModalComponent
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
