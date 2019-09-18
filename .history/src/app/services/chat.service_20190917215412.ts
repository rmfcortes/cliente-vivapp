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

  getMsg(): Promise<Mensaje[]> {
    return new Promise((resolve, reject) => {
      const msgSub = this.db.list(`usuarios/${this.uid}/chat`).valueChanges().subscribe((msg: Mensaje[]) => {
        msgSub.unsubscribe();
        console.log('Get Msg');
        console.log(msg);
        resolve(msg);
      });
    });
  }

  listenMsg() {
    return this.db.list(`usuarios/${this.uid}/chat`, data => data.limitToLast(1));
  }

  publicarMsg(msg: Mensaje) {
    this.db.list(`usuarios/${this.uid}/chat`).push(msg);
  }

}
