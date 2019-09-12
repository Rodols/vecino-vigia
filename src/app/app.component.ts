import { Component } from '@angular/core';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vecino-vigia';

  constructor(public fcm: FcmService){
    fcm.receiveMessage();
  }
}

