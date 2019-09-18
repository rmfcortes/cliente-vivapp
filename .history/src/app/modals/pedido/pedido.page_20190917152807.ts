import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Chofer } from 'src/app/interfaces/compra.interface';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  @Input() pedido;

  chofer: Chofer = {
    nombre: '',
    telefono: '',
    foto: '../../../assets/img/chofer.png',
    lat: 0,
    lng: 0
  };

  choferReady = false;

  icon = '../../../assets/img/pin.png';
  truck = '../../../assets/img/truck.png';

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
  ) { }

  ngOnInit() {
    this.getChofer();
  }

  getChofer() {
    const chofer = JSON.parse(localStorage.getItem('chofer'));
    if (chofer) {
      this.chofer = chofer;
      this.choferReady = true;
      this.getStatus();
      console.log(chofer);
    } else {
      this.escucharCambios();
    }
  }

  escucharCambios() {
    const espSub = this.compraService.esperando(this.pedido.id).subscribe((chofer: any) => {
      console.log(chofer);
      if (!chofer) {
        return;
      }
      this.chofer = chofer;
      if (!this.chofer.foto) {
        this.chofer.foto = '../../../assets/img/chofer.png';
      }
      this.choferReady = true;
      localStorage.setItem('chofer', JSON.stringify(chofer));
      espSub.unsubscribe();
      this.getStatus();
    });
  }

  getStatus() {
    const stSub = this.compraService.getStatusPedido(this.pedido.id).subscribe(async (status: any) => {
      console.log(status);
      if (status.pedido !== 'entregado') {
        return;
      }
      await this.compraService.deletePedido(this.pedido.id);
      this.choferReady = false;
      this.pedido = null;
      this.presentToast('Pedido entregado. ¡¡Gracias por su preferencia!!');
      stSub.unsubscribe();
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }


}
