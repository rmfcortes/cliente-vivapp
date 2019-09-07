import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UidService {

  private uid: string;
  public usuario = {
    nombre: '',
    email: '',
  };

  constructor() {  }

  setUser(user) {
    console.log('Usuario set');
    this.usuario = user;
  }

  getUser() {
    return this.usuario;
  }

}
