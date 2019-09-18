import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UidService } from './uid.service';
import { Pedido, Direccion, PedidoActivo, Producto } from '../interfaces/compra.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  uid: string;
  idPedido: string;

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

   getProductos(): Promise<Producto[]> {
     return new Promise((resolve, reject) => {
      let prods;
      let precios;
      const prodSub = this.db.object(`solo-lectura/productos`).valueChanges().subscribe((productos: Producto[]) => {
        prodSub.unsubscribe();
        prods = productos;
        const precSub = this.db.object(`usuarios/${this.uid}/precio`).valueChanges().subscribe(price => {
          precSub.unsubscribe();
          precios = price;
        });
        if (Object.values(precios).length > 0) {
          Object.entries(precios).forEach((p: any) => {
            console.log(p);
            console.log(prods);
            prods[p[0]].precio = p[1].precio;
          });
        }
        resolve(Object.values(prods));
      });
     });
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

  async ordenar(pedido: Pedido[], direccion: Direccion): Promise<PedidoActivo> {
    return new Promise(async (resolve, reject) => {
      this.idPedido = await this.db.createPushId();
      const orden = {
        pedido,
        direccion
      };
      await this.db.object(`usuarios/${this.uid}/pedidos/${this.idPedido}`).set(orden);
      const p: PedidoActivo = {
        pedido,
        direccion,
        id: this.idPedido
      };
      localStorage.setItem('pedido', JSON.stringify(p));
      resolve(p);
    });
  }

  esperando(id) {
    return this.db.object(`usuarios/${this.uid}/pedidos/${id}/chofer`).valueChanges();
  }

  getIdPedido() {
    return this.idPedido;
  }

}
