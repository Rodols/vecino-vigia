import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { messaging } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  currentMessage = new BehaviorSubject(null);
  token;

  constructor(private afMessaging: AngularFireMessaging, private fun: AngularFireFunctions,
    private toastr: ToastrService ) {
    this.afMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  getPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        this.token = token;
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received.', payload);
        this.toastr.warning
        ('Revisa tus alertas alguien necesita ayuda', 'Alarma Activada',
         { timeOut: 0, extendedTimeOut: 0, closeButton: true });
        this.currentMessage.next(payload);
      });
  }

  sub(topic) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic, token: this.token })
      .subscribe();
  }

  unsub(topic) {
    this.fun
      .httpsCallable('unsubscribeFromTopic')({ topic, token: this.token })
      .subscribe();
  }

}
