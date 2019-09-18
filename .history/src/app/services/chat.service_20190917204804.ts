import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UidService } from './uid.service';
import { Mensaje } from '../interfaces/chat.interface';
import { Mensaje } from 'src/app/interfaces/chat.interface';

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
      this.db.list(`usuarios/${this.uid}/chat`).query.ref.once('value', (msg: any) => {
        console.log('Get Msg');
        console.log(msg);
        resolve(msg);
      });
    });
  }

  listenMsg() {
    return this.db.list(`usuarios/${this.uid}/chat`);
  }

  publicarMsg() {

  }

}
