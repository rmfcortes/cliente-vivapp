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

  async ordenar(pedido: Pedido) {
    this.db.list(`usuarios/${this.uid}/pedidos`).push(pedido);
  }

  esperando() {
    return this.db.list(`usuarios/${this.uid}/repartidor`).valueChanges();
  }

}
