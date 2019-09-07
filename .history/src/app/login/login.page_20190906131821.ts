import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loader: any;

  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async loginFace() {
    await this.presentLoading();
    try {
      const resp = await this.authService.facebookLogin();
      console.log(resp);
      this.presentSuccess('Ahora puedes publicar anuncios, calificar y compartir tus experiencias en diferentes negocios y mucho más...');
    } catch (error) {
      this.presentAlert(error);
    }
  }

  async loginGoogle() {
    await this.presentLoading();
    try {
      await this.authService.loginGoogle();
      this.presentSuccess('Ahora puedes publicar anuncios, calificar y compartir tus experiencias en diferentes negocios y mucho más...');
    } catch (error) {
      this.presentAlert(error);
    }
  }

  async ingresarConCorreo() {
    await this.presentLoading();
    try {
      await this.authService.loginWithEmail(this.correo, this.pass);
      this.presentSuccess('Ahora puedes publicar anuncios, calificar y compartir tus experiencias en diferentes negocios y mucho más...');
    } catch (error) {
      this.presentAlert(error);
    }
  }

  async generarCuenta() {
    await this.presentLoading();
    try {
      await this.authService.registraUsuario(this.usuario);
      this.presentSuccess('Ahora puedes publicar anuncios, calificar y compartir tus experiencias en diferentes negocios y mucho más...');
    } catch (error) {
        this.presentAlert(error);
    }
  }

  loginEmail() {
    this.loginWithEmail = true;
  }

  crearCuentaEmail() {
    this.loginWithEmail = false;
    this.creaCuenta = true;
  }

  async revisa() {
    const user = await this.authService.revisa();
  }


  regresarEmail() {
    this.loginWithEmail = false;
  }

  regresarCuenta() {
    this.loginWithEmail = true;
    this.creaCuenta = false;
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

  async presentSuccess(mensaje) {
    this.loader.dismiss();
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.router.navigate(['/']);
        }
      }],
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
