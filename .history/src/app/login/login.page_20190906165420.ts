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

  usuario = {
    nombre: '',
    pass: '',
    passConfirm: '',
    correo: '',
  };

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
      console.log(error);
      this.presentAlert('Error', 'Algo salió mal, por favor intenta de nuevo');
    }
  }

  async loginGoogle() {
    await this.presentLoading();
    try {
      const respt = await this.authService.loginGoogle();
      console.log(respt);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      this.presentAlert('Error', 'Algo salió mal, por favor intenta de nuevo');
    }
  }

  async ingresarConCorreo() {
    await this.presentLoading();
    try {
      await this.authService.loginWithEmail(this.correo, this.pass);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        this.presentAlert('Usuario no registrado', 'Por favor registra una cuenta antes de ingresar');
      } else {
        this.presentAlert('Error', 'Algo salió mal, por favor intenta de nuevo');
      }
    }
  }

  async generarCuenta() {
    await this.presentLoading();
    try {
      await this.authService.registraUsuario(this.usuario);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      this.presentAlert('Error', 'Algo salió mal, por favor intenta de nuevo');
    }
  }


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

  async presentAlert(title, msg) {
    this.loader.dismiss();
    const alert = await this.alertController.create({
      header: title,
      message: msg,
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
