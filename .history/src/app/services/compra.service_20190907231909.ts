import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UidService } from './uid.service';
import { Pedido } from '../interfaces/compra.interface';

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

   getDirecciones() {
     return new Promise((resolve, reject) => {
      const dirSub = this.db.object(`usuarios/${this.uid}/direcciones/todas`).valueChanges().subscribe(direcciones => {
        dirSub.unsubscribe();
        resolve(direcciones);
      });
     });
   }

   guardarUltimaDireccion(direccion) {
    this.db.object(`usuarios/${this.uid}/direcciones/ultima`).set(direccion);
  }

   getUltimaDireccion() {
     return new Promise((resolve, reject) => {
      const dirSub = this.db.object(`usuarios/${this.uid}/direcciones/ultima`).valueChanges().subscribe(direccion => {
        dirSub.unsubscribe();
        resolve(direccion);
      });
     });
   }

  async ordenar(pedido: Pedido) {
    this.db.list(`usuarios/${this.uid}/pedidos`).push(pedido);
  }

  esperando() {
    return this.db.list(`usuarios/${this.uid}/repartidor`).valueChanges();
  }

}
