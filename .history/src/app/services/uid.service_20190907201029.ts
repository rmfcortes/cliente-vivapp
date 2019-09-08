import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UidService {

  public usuario = {
    nombre: '',
    email: '',
  };

  uid: string;

  constructor() {  }

  setUser(user) {
    this.usuario = user;
  }

  getUser() {
    return this.usuario;
  }

  setUid(uid) {
    this.uid = uid;
  }

  getUid() {
    return this.uid;
  }

}
