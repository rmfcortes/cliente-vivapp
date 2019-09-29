import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UidService } from './uid.service';
import { Mensaje } from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  uid: string;

  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
  ) {
    this.uid = this.uidService.getUid();
  }

  listenMsg() {
    return this.db.list(`usuarios/${this.uid}/chat/mensajes`, data => data.limitToLast(1));
  }

  publicarMsg(msg: Mensaje, idVendedor) {
    this.db.list(`usuarios/${this.uid}/chat/${idVendedor}/mensajes`).push(msg);
  }

  setSeen(idVendedor) {
    this.db.object(`usuarios/${this.uid}/chat/${idVendedor}/msgPend`).remove();
  }

}
