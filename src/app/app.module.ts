import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalAyudaComponent } from './components/modal-ayuda/modal-ayuda.component';
import { ModalVecinoComponent } from './components/modal-vecino/modal-vecino.component';
import { ModalAlertasComponent } from './components/modal-alertas/modal-alertas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FcmService } from './services/fcm.service';
import { AuthService } from './services/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ModalAyudaComponent,
    ModalVecinoComponent,
    ModalAlertasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    AngularFireStorageModule,
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ToastrModule.forRoot({
      autoDismiss: false,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [FcmService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
