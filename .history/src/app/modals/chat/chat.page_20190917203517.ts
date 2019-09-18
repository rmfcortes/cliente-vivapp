import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Mensaje } from 'src/app/interfaces/chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages: Mensaje[] = [
    {
      user: 'yo',
      createdAt: 1554090856000,
      msg: 'Hey whats up mate?'
    },
    {
      user: 'repartidor',
      createdAt: 1554090956000,
      msg: 'Working on the Ionic mission, you?'
    },
    {
      user: 'yo',
      createdAt: 1554091056000,
      msg: 'Doing some new tutorial stuff'
    }
  ];

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  regresar() {
    this.modalController.dismiss();
  }

}
