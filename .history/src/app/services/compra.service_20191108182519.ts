import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UidService } from './uid.service';
import { Pedido, Direccion, Producto } from '../interfaces/compra.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CompraService {

  uid: string;
  nombre: string;

  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
    private authService: AuthService,
  ) { }

  getProductos(): Promise<Producto[]> {
    return new Promise((resolve, reject) => {
     let prods;
     let precios;
     const prodSub = this.db.object(`solo-lectura/productos`).valueChanges().subscribe(async (productos: Producto[]) => {
       prodSub.unsubscribe();
       prods = productos;
       this.uid = localStorage.getItem('uid');
       console.log(this.uid);
       if (this.uid) {
          this.uidService.setUid(this.uid);
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
        } else {
          const p = await this.login(prods);
          resolve(Object.values(p));
        }
     });
    });
  }

  async login(prods) {
    return new Promise(async(resolve, reject) => {
      const user: any = await this.authService.checkStatus();
      if (user) {
        this.uid = user.uid;
        const precSub = this.db.object(`clientes/${this.uid}/precio/`).valueChanges().subscribe(price => {
          precSub.unsubscribe();
          if (price && Object.values(price).length > 0) {
            Object.entries(price).forEach((p: any) => {
              prods[p[0]].precio = p[1];
            });
          }
        });
        resolve(prods);
      } else {
        resolve(prods);
        this.uid = await this.authService.anonimoLogin();
      }
    });
  }

   async guardarDireccion(direccion) {
    const resSub = this.db.object(`clientes/${this.uid}/ultimaCompra`).valueChanges().subscribe(resumen => {
      resSub.unsubscribe();
      if (!resumen) {
        this.db.object(`clientes/${this.uid}`).update({
          acumulado: 0,
          ultimaCompra: 0,
          createdAt: Date.now(),
          cliente: this.uid,
          nombre: this.nombre
        });
      }
    });
    await this.db.object(`clientes/${this.uid}/direccion`).update(direccion);
    await this.db.object(`busqueda/clientes/${this.nombre}`).update({
      id: this.uid,
      nombre: this.nombre
    });
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

   getPedido(): Promise<Pedido> {
     return new Promise((resolve, reject) => {
      this.uid = this.uidService.getUid();
      if (!this.uid) {
        return resolve(null);
      }
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
    return this.db.object(`carga/${idChofer}/ubicacion`).valueChanges();
  }

  calificar(id, calificaion) {
    return this.db.object(`usuarios/${this.uid}/pedidos/${id}/calificacion`).set(calificaion);
  }

  pedidoCompletado() {
    return this.db.object(`usuarios/${this.uid}/pedidos`).remove();
  }

  pedidoRef() {
    return this.db.object(`usuarios/${this.uid}/pedidos`);
  }

  // Auxiliares

  async generaID(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const id = await this.db.createPushId();
      resolve(id);
    });
  }

  errores(error) {
    this.db.list(`errores/al-generar pedido`).push(error);
  }

}
