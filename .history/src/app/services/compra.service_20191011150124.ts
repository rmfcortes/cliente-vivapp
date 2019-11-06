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
      await this.db.object(`clientes/${this.uid}/direccion`).update(direccion);
   }

  getDireccion(): Promise<Direccion>  {
    return new Promise((resolve, reject) => {
     const dirSub = this.db.object(`clientes/${this.uid}/direccion`).valueChanges().subscribe((direccion: Direccion) => {
       dirSub.unsubscribe();
       resolve(direccion);
     });
    });
  }

  getTelefono(): Promise<string>  {
    return new Promise((resolve, reject) => {
     const telSub = this.db.object(`clientes/${this.uid}/telefono`).valueChanges().subscribe((telefono: string) => {
       telSub.unsubscribe();
       resolve(telefono);
     });
    });
  }

  async guardarTelefono(tel) {
    await this.db.object(`clientes/${this.uid}/telefono`).set(tel);
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
        const precSub = this.db.object(`clientes/${this.uid}/precio/`).valueChanges().subscribe(price => {
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

   isOpen() {
      return this.db.object(`solo-lectura/abierto`).valueChanges();
  }

   getHorario(): Promise<string> {
    return new Promise((resolve, reject) => {
     const horSub = this.db.object(`solo-lectura/horario`).valueChanges().subscribe((abierto: string) => {
       horSub.unsubscribe();
       resolve(abierto);
     });
    });
  }

  async ordenar(pedido: Pedido): Promise<Pedido> {
    return new Promise(async (resolve, reject) => {
      await this.db.object(`usuarios/${this.uid}/pedidos/${pedido.id}`).set(pedido);
      resolve();
    });
  }

  getChofer(id) {
    return this.db.object(`usuarios/${this.uid}/pedidos/${id}/chofer`).valueChanges();
  }

  getStatusPedido(id) {
    return this.db.object(`usuarios/${this.uid}/pedidos/${id}/entregado`).valueChanges();
  }

  getUbicacionChofer(idChofer) {
    console.log(idChofer);
    return this.db.object(`realtime/ubicacion/${idChofer}`).valueChanges();
  }

  calificar(id, calificaion) {
    return this.db.object(`usuarios/${this.uid}/pedidos/${id}/calificacion`).set(calificaion);
  }

  pedidoCompletado() {
    return this.db.object(`usuarios/${this.uid}/pedidos`).remove();
  }

  // Auxiliares

  async generaID(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const id = await this.db.createPushId();
      resolve(id);
    });
  }

}
