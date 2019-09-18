import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  async muestraDirecciones() {
    const modal = await this.modalController.create({
      component: DireccionesModalPage,
      componentProps: { direccion: this.direccion }
    });
    modal.onDidDismiss().then(resp => {
      console.log(resp.data);
      if (resp.data) {
        this.direccion = resp.data.direccion;
        this.dirReady = true;
        this.zoom = 18;
        this.presentToast('De ser necesario, puedes mover el pin a tu ubicación exacta');
      }
    });
    return await modal.present();
  }

  async generarPedido() {
    try {
      const prods = this.productos.filter(p => p.cantidad);
      const items: ProductoPedido[] = [];
      prods.forEach(p => {
        const x: ProductoPedido = {
          cantidad: p.cantidad,
          id: p.id,
        };
        items.push(x);
      });
      const id = await this.compraService.generaID();
      this.pedido = {
        direccion: this.direccion,
        productos: items,
        id
      };
      await this.compraService.ordenar(this.pedido);
      this.slide.lockSwipes(false);
      this.slide.slideNext();
      this.slide.lockSwipes(true);
      this.pedidoActivo = true;
      this.enProceso = false;
      this.escucharCambios();
    } catch (error) {
      console.log(error);
    }
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
