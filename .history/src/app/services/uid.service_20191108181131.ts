import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UidService {

  nombre: string;
  uid: string;
  token: string;

  constructor() {  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  getNombre() {
    return this.nombre;
  }

  setUid(uid) {
    this.uid = uid;
  }

  getUid() {
    return this.uid;
  }

}
