import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UidService } from './uid.service';
import { Pedido, Direccion } from '../interfaces/compra.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  uid: string;

  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
  ) {
    this.uid = this.uidService.getUid();
    console.log(this.uid);
   }

   guardarDireccion(direccion) {
     this.db.list(`usuarios/${this.uid}/direcciones/todas`).push(direccion);
   }

   getDirecciones(): Promise<Direccion[]> {
     return new Promise((resolve, reject) => {
      const dirSub = this.db.list(`usuarios/${this.uid}/direcciones/todas`).valueChanges().subscribe((direcciones: Direccion[]) => {
        dirSub.unsubscribe();
        resolve(direcciones);
      });
     });
   }

   guardarUltimaDireccion(direccion) {
    this.db.object(`usuarios/${this.uid}/direcciones/ultima`).set(direccion);
  }

   getUltimaDireccion(): Promise<Direccion>  {
     return new Promise((resolve, reject) => {
      const dirSub = this.db.object(`usuarios/${this.uid}/direcciones/ultima`).valueChanges().subscribe((direccion: Direccion) => {
        dirSub.unsubscribe();
        resolve(direccion);
      });
     });
   }

  async ordenar(pedido: Pedido, direccion: Direccion) {
    const id = await this.db.createPushId();
    const orden = {
      pedido,
      direccion
    };
    await this.db.object(`usuarios/${this.uid}/pedidos/${id}`).set(orden);
    const p = {
      orden,
      id
    };
    localStorage.setItem('pedido', JSON.stringify(p));
  }

  esperando(id) {
    return this.db.list(`usuarios/${this.uid}/pedidos/${id}/chofer`).valueChanges();
  }

}
