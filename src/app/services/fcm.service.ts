import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  currentMessage = new BehaviorSubject(null);
  token;

  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private toastr: ToastrService) { }

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
      (message) => {
        let notify: any;
        notify = (Object.values(message))[2];
        this.toastr.warning
          (notify.body, 'Alarma Activada',
            { timeOut: 0, extendedTimeOut: 0, closeButton: true });
        this.currentMessage.next(message);
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
