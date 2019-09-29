import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UidService } from './uid.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private platform: Platform,
    public authFirebase: AngularFireAuth,
    private uidService: UidService,
  ) { }

  facebookLogin() {
    return new Promise((resolve, reject) => {
      this.authFirebase.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {
          console.log('You have been successfully logged in!');
          resolve(result);
      }).catch((error) => {
          console.log(error);
          reject(error);
      });
    });
  }

  async loginGoogle() {
    return new Promise(async (resolve, reject) => {
      try {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.authFirebase.auth.signInWithPopup(provider);
        const usuario =  {
          nombre: credential.user.displayName,
          foto: credential.user.photoURL,
          uid: credential.user.uid
        };
        this.guardaUsuarioStorage(usuario);
        resolve(true);
      } catch (err) {
        console.log(err);
        reject(false);
      }
    });
  }


  async loginWithEmail(email, pass) {
    return new Promise(async (resolve, reject) => {
    try {
        await this.authFirebase.auth.signInWithEmailAndPassword(email, pass);
        const user = this.authFirebase.auth.currentUser;
        const u =  {
          nombre: user.displayName,
          uid: user.uid
        };
        this.guardaUsuarioStorage(u);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async registraUsuario(usuario) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.authFirebase.auth.createUserWithEmailAndPassword(usuario.correo, usuario.pass);
        if (!res) { return; }
        await this.authFirebase.auth.signInWithEmailAndPassword(usuario.correo, usuario.pass);
        const user = this.authFirebase.auth.currentUser;
        await user.updateProfile({displayName: usuario.nombre});
        const u =  {
          nombre: usuario.nombre,
          uid: user.uid
        };
        this.guardaUsuarioStorage(u);
        resolve(true);
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          reject('Este correo ya está registrado. Intenta con otro');
        } else {
          reject('Error al registrar. Intenta de nuevo');
        }
      }
    });
  }

  guardaUsuarioStorage(usuario) {
    return new Promise (async (resolve, reject) => {
      if ( this.platform.is('cordova') ) {
        // Celular
        // this.storage.setItem('usuario', JSON.stringify(usuario));
        this.uidService.setUser(usuario);
        this.uidService.setUid(usuario.uid);
        resolve();
      } else {
        // Escritorio
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.uidService.setUser(usuario);
        console.log('Save ' + usuario.uid);
        this.uidService.setUid(usuario.uid);
        resolve();
      }
    });
  }

  async revisaFireAuth() {
    return new Promise((resolve, reject) => {
      const authSub = this.authFirebase.authState.subscribe(user => {
        authSub.unsubscribe();
        console.log(user);
        if (user) {
          const usuario =  {
            nombre: user.displayName,
            foto: user.photoURL,
            uid: user.uid
          };
          this.guardaUsuarioStorage(usuario);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async logout() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.authFirebase.auth.signOut();
        if ( this.platform.is('cordova') ) {
          // this.storage.remove('usuario');
          this.uidService.setUser(null);
        } else {
          localStorage.removeItem('usuario');
          this.uidService.setUser(null);
          this.uidService.setUid(null);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


}
