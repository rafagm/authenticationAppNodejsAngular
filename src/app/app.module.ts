import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationErrorDialogComponent } from './login/authentication-error-dialog/authentication-error-dialog.component';
import { ConsumerComponent } from './roles/consumer/consumer.component';
import { ModeratorComponent } from './roles/moderator/moderator.component';
import { AdministratorComponent } from './roles/administrator/administrator.component';
import { UnauthorizedComponent } from './roles/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AuthenticationErrorDialogComponent,
    ConsumerComponent,
    ModeratorComponent,
    AdministratorComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    AuthenticationErrorDialogComponent
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
