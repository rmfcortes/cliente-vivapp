import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild (IonSlides, {static: false}) slide: IonSlides;

  loader: any;
  showForm = false;
  crearCuenta = false;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    loop: false,
    centeredSlides: true,
    speed: 800
  };

  correo: string;
  pass: string;

  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.slide.lockSwipes(true);
  }

  async loginFace() {
    await this.presentLoading();
    try {
      const resp = await this.authService.facebookLogin();
      console.log(resp);
      this.router.navigate(['/']);
    } catch (error) {
      this.presentAlert(error);
    }
  }

  async loginGoogle() {
    await this.presentLoading();
    try {
      await this.authService.loginGoogle();
      this.router.navigate(['/']);
    } catch (error) {
      this.presentAlert(error);
    }
  }

  async ingresarConCorreo() {
    await this.presentLoading();
    try {
      await this.authService.loginWithEmail(this.correo, this.pass);
      this.router.navigate(['/']);
    } catch (error) {
      this.presentAlert(error);
      console.log(error);
    }
  }

  // async generarCuenta() {
  //   await this.presentLoading();
  //   try {
  //     await this.authService.registraUsuario(this.usuario);
  //      this.router.navigate(['/']);
  //   } catch (error) {
  //       this.presentAlert(error);
  //   }
  // }


  // Auxiliares

  mostrarFormulario() {
    this.slide.lockSwipes(false);
    this.slide.slideNext();
    this.slide.lockSwipes(true);
    this.showForm = true;
  }

  mostrarFormularioCuenta() {
    this.slide.lockSwipes(false);
    this.slide.slideNext();
    this.slide.lockSwipes(true);
    this.showForm = true;
    this.crearCuenta = true;
  }

  regresar() {
    this.slide.lockSwipes(false);
    this.slide.slidePrev();
    this.showForm = false;
    this.crearCuenta = false;
    this.slide.lockSwipes(true);
  }

  async presentAlert(mensaje) {
    this.loader.dismiss();
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: mensaje,
      message: 'Por favor intenta de nuevo o utiliza un proveedor distinto',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
     spinner: 'crescent'
    });
    return await this.loader.present();
  }

}
