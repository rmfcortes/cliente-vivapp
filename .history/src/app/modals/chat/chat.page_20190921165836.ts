import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
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
  @Input() idVendedor;

  messages: Mensaje[] = [ ];

  newMsg = '';

  constructor(
    private ngZone: NgZone,
    private modalController: ModalController,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.listenMsg();
  }

  sendMessage() {
    const newMsg: Mensaje = {
      isMe: true,
      createdAt: new Date().getTime(),
      msg: this.newMsg,
      vendedor: this.idVendedor,
    };
    this.chatService.publicarMsg(newMsg);
    this.newMsg = '';
  }

  listenMsg() {
    this.chatService.listenMsg().query.ref.on('child_added', snapshot => {
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
