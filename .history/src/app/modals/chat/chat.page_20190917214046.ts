import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { Mensaje } from 'src/app/interfaces/chat.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  messages: Mensaje[] = [
    {
      isMe: true,
      createdAt: 1554090856000,
      msg: 'Hey whats up mate?'
    },
    {
      isMe: false,
      createdAt: 1554090956000,
      msg: 'Working on the Ionic mission, you?'
    },
    {
      isMe: true,
      createdAt: 1554091056000,
      msg: 'Doing some new tutorial stuff'
    }
  ];

  newMsg = '';

  constructor(
    private modalController: ModalController,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.getMessages();
    this.listenMsg();
  }

  async getMessages() {
    const msg = await this.chatService.getMsg();
    if (msg.length > 0) {
      this.messages = msg;
    }
  }

  sendMessage() {
    this.messages.push({
      isMe: true,
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg = '';
    this.content.scrollToBottom(200);
  }

  listenMsg() {
    this.chatService.listenMsg().query.ref.on('child_added', snapshot => {
      this.messages.push(snapshot.val());
      this.content.scrollToBottom(200);
    });
  }

  regresar() {
    this.modalController.dismiss();
  }

}
