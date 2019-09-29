import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UidService } from './uid.service';
import { Pedido, Direccion, Producto } from '../interfaces/compra.interface';


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
   }

   async guardarDireccion(direccion) {
      const dirRefs =  {};
      dirRefs[`usuarios/${this.uid}/direccion`] = direccion;
      dirRefs[`clientes/${this.uid}/direccion`] = direccion.direccion;
      dirRefs[`clientes/${this.uid}/lat`] = direccion.lat;
      dirRefs[`clientes/${this.uid}/lng`] = direccion.lng;
      await this.db.object(`/`).update(dirRefs);
   }

   getDireccion(): Promise<Direccion>  {
    return new Promise((resolve, reject) => {
     const dirSub = this.db.object(`usuarios/${this.uid}/direccion`).valueChanges().subscribe((direccion: Direccion) => {
       dirSub.unsubscribe();
       resolve(direccion);
     });
    });
  }

   getProductos(): Promise<Producto[]> {
     return new Promise((resolve, reject) => {
      let prods;
      let precios;
      this.uid = this.uidService.getUid();
      console.log(this.uid);
      const prodSub = this.db.object(`solo-lectura/productos`).valueChanges().subscribe((productos: Producto[]) => {
        prodSub.unsubscribe();
        prods = productos;
        const precSub = this.db.object(`solo-lectura/precios-especiales/${this.uid}`).valueChanges().subscribe(price => {
          precSub.unsubscribe();
          precios = price;
          if (precios && Object.values(precios).length > 0) {
            Object.entries(precios).forEach((p: any) => {
              prods[p[0]].precio = p[1];
            });
          }
        });
        resolve(Object.values(prods));
      });
     });
   }

   getPedido(): Promise<Pedido> {
     return new Promise((resolve, reject) => {
      this.uid = this.uidService.getUid();
      const pedidoSub = this.db.list(`usuarios/${this.uid}/pedidos`).valueChanges().subscribe((pedido: Pedido[]) => {
        pedidoSub.unsubscribe();
        resolve(pedido[0]);
      });
     });
   }

  async ordenar(pedido: Pedido): Promise<Pedido> {
    return new Promise(async (resolve, reject) => {
      await this.db.object(`usuarios/${this.uid}/pedidos/${pedido.id}`).set(pedido);
      resolve();
    });
  }

  esperando(id) {
    return this.db.object(`usuarios/${this.uid}/pedidos/${id}/chofer`).valueChanges();
  }

  getStatusPedido(id) {
    return this.db.object(`usuarios/${this.uid}/pedidos/${id}`).valueChanges();
  }

  // Auxiliares

  async generaID(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const id = await this.db.createPushId();
      resolve(id);
    });
  }

}
