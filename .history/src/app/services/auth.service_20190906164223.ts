import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UidService } from './uid.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { reject } from 'q';

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
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  AuthLogin(provider) {
    return this.authFirebase.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!');
    }).catch((error) => {
        console.log(error);
    })
  }

  async loginGoogle() {
    try {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.authFirebase.auth.signInWithPopup(provider);
      const usuario =  {
        nombre: credential.user.displayName,
        foto: credential.user.photoURL,
        uid: credential.user.uid
      };
      this.guardaUsuarioStorage(usuario);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }


  async loginWithEmail(email, pass) {
    try {
      return new Promise(async (resolve, reject) => {
        const resp = await this.authFirebase.auth.signInWithEmailAndPassword(email, pass);
        console.log(resp);
        const user = this.authFirebase.auth.currentUser;
        const u =  {
          nombre: user.displayName,
          uid: user.uid
        };
        this.guardaUsuarioStorage(u);
        resolve();
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
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

  logout() {
    this.authFirebase.auth.signOut();
    if ( this.platform.is('cordova') ) {
      // this.storage.remove('usuario');
      this.uidService.setUser('inactivo');
      this.uidService.setUid(null);
    } else {
      localStorage.removeItem('usuario');
      this.uidService.setUser('inactivo');
      this.uidService.setUid(null);
    }
  }


}