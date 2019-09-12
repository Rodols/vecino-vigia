import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { messaging } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  currentMessage = new BehaviorSubject(null);
  token;

  constructor(private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions
 ) { 
  this.afMessaging.messaging.subscribe(
    (_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    }
  )
 }

getPermission(){
    this.afMessaging.requestToken.subscribe(
      (token) => {
      this.token= token;
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
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
}

sub(topic){
  this.fun
  .httpsCallable('subscribeToTopic')({topic, token: this.token })
  .subscribe();
}

unsub(topic){
  this.fun
  .httpsCallable('unsubscribeFromTopic')({topic, token: this.token })
  .subscribe();
}

}
