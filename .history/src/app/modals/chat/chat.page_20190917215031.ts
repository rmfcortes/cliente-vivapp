import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { Mensaje } from 'src/app/interfaces/chat.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, {static: true}) content: IonContent;

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
    private ngZone: NgZone,
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
      this.messages.concat(msg);
    }
    setTimeout(() => {
      this.content.scrollToBottom(0);
    });
  }

  sendMessage() {
    this.messages.push({
      isMe: true,
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(0);
    });
  }

  listenMsg() {
    this.chatService.listenMsg().query.ref.on('child_added', snapshot => {
      console.log(snapshot.val());
      this.ngZone.run(() => {
        this.messages.push(snapshot.val());
        setTimeout(() => {
      this.content.scrollToBottom(0);
    });
      });
    });
  }

  regresar() {
    this.modalController.dismiss();
  }

}
