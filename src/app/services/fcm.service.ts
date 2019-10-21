import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AlertasService } from '../services/alertas.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  currentMessage = new BehaviorSubject(null);
  token;
  tokenList= [];

  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private toastr: ToastrService,
    private alertsService: AlertasService) { }


  getPermission(userId, userToken) {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        this.token = token;
        if (userToken !== token) {
          this.updateToken(userId, userToken);
        }else{
          this.getTokens(userToken);
        }
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  getTokens(userToken){
    this.alertsService.getTokens().subscribe(tokensVecinos => {
       let i=0;
      tokensVecinos.forEach((tokenVecino)=>
        {
          if(userToken !== tokenVecino.tokenUser){
            this.tokenList[i] = tokenVecino.tokenUser;
            i=i+1;
          }
        });
    });
  }

  updateToken(userId, userToken) {
      this.alertsService.updateTokenUser(userId, this.token);
      this.getTokens(this.token);
     //console.log('existe el token');
      //this.unsub(userToken);
    //this.sub(this.token);
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe(
      (message) => {
        let notify: any;
        notify = (Object.values(message))[2];
        this.toastr.warning
          (notify.body, 'Alarma Activada',
            { timeOut: 0, extendedTimeOut: 0, closeButton: true });
        this.currentMessage.next(message);
      });
  }

  sub(tokenActual) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic: 'alerts', token: tokenActual })
      .subscribe();
  }

  unsub(tokenAnterior) {
    this.fun
      .httpsCallable('unsubscribeFromTopic')({ topic: 'alerts', token: tokenAnterior })
      .subscribe();
  }

}
