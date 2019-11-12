import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, IonSlides, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild (IonSlides, {static: false}) slide: IonSlides;

  loader: any;

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

  haveAccount = false;

  constructor(
    private modalCtrl: ModalController,
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
      await this.authService.facebookLogin();
      this.loader.dismiss();
      this.router.navigate(['/']);
    } catch (error) {
      this.presentAlert('Error', 'Algo salió mal, por favor intenta de nuevo' + error);
    }
  }

  async ingresarConCorreo() {
    await this.presentLoading();
    try {
      this.correo = this.correo.trim() + '@azulpura.com';
      await this.authService.loginWithEmail(this.correo, this.pass);
      this.loader.dismiss();
      this.router.navigate(['/']);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        this.presentAlert('Usuario no registrado', 'Por favor registra una cuenta antes de ingresar');
      } else {
        this.presentAlert('Error', 'Algo salió mal, por favor intenta de nuevo');
      }
    }
  }

  async generarCuenta() {
    if (this.usuario.pass !== this.usuario.passConfirm) {
      this.presentAlert('Error', 'La contraseña de confirmación debe ser igual a la contraseña');
      return;
    }
    this.usuario.correo = this.usuario.correo.trim() + '@azulpura.com';
    await this.presentLoading();
    try {
      await this.authService.registraUsuario(this.usuario);
      this.loader.dismiss();
      this.router.navigate(['/']);
    } catch (error) {
      switch (error) {
        case 'auth/email-already-exists':
          this.presentAlert('Usuario registrado', 'El usuario que intentas registrar corresponde a una cuenta existente. Intenta con otro');
          break;
        case 'auth/invalid-email':
          this.presentAlert('Usuario inválido', 'El usuario que intentas registrar no es un valor válido');
          break;
        case 'auth/invalid-password':
          this.presentAlert('Contraseña insegura', 'La contraseña debe tener al menos 6 caracteres');
          break;
        default:
          this.presentAlert('Error', 'Algo salió mal, por favor intenta de nuevo');
          break;
      }
    }
  }

  async resetPass() {
    if (!this.correo) {
      this.presentAlert('Ingresa tu correo', 'Enviaremos un enlace a tu correo, en el cuál podrás restaurar tu contraseña');
      return;
    }
    this.presentLoading();
    try {
      await this.authService.resetPass(this.correo);
      this.presentAlert('Listo', 'Por favor revisa tu correo, hemos enviado un enlace para que puedas restaurar tu contraseña');
    } catch (error) {
      this.presentAlert('Error', 'Por favor intenta de nuevo más tarde. Estamos teniendo problemas técnicos');
    }
  }


  // Auxiliares

  mostrarFormularioCuenta() {
    this.slide.lockSwipes(false);
    this.slide.slideNext();
    this.slide.lockSwipes(true);
  }

  regresar() {
    this.slide.lockSwipes(false);
    this.slide.slidePrev();
    this.slide.lockSwipes(true);
  }

  async presentAlert(title, msg) {
    if (this.loader) { this.loader.dismiss(); }
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
