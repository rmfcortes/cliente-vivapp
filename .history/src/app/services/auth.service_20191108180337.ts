import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { UidService } from './uid.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public authFirebase: AngularFireAuth,
    private uidService: UidService,
  ) { }

  // Registro

  anonimoLogin(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authFirebase.auth.signInAnonymously()
        .then(resp => {
          const uid = resp.user.uid;
          this.uidService.setUid(uid);
          localStorage.setItem('uid', uid);
          localStorage.setItem('tipo', 'anonimo');
          resolve(uid);
        })
        .catch(err => {
          console.log(err);
          resolve(null);
        });
    });
  }

  facebookLogin() {
    return new Promise((resolve, reject) => {
      this.authFirebase.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(async (result) => {
          await this.guardaUsuarioStorage(result);
          resolve(result);
      }).catch((error) => {
          console.log(error);
          reject(error);
      });
    });
  }

  async loginWithEmail(email, pass) {
    return new Promise(async (resolve, reject) => {
    try {
        const resp = await this.authFirebase.auth.signInWithEmailAndPassword(email, pass);
        this.guardaUsuarioStorage(resp);
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
        this.guardaUsuarioStorage(user);
        resolve(true);
      } catch (err) {
        switch (err.code) {
          case 'auth/email-already-exists':
            reject('El usuario ya está registrado en una cuenta');
            break;
          case 'auth/invalid-email':
            reject('El usuario no correponde a un email válido');
            break;
          case 'auth/invalid-password':
            reject('Contraseña insegura. La contraseña debe tener al menos 6 caracteres');
            break;
          default:
            reject('Error al registrar. Intenta de nuevo');
            break;
        }
        if (err.code === 'auth/email-already-in-use') {
          reject('Este usuario ya está registrado. Intenta con otro');
        } else {
          reject('Error al registrar. Intenta de nuevo');
        }
      }
    });
  }

  // Reset password

  async resetPass(email) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.authFirebase.auth.sendPasswordResetEmail(email);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Guardar info en Storage

  guardaUsuarioStorage(data) {
    return new Promise (async (resolve, reject) => {
        const usuario =  {
          nombre: data.user.displayName,
          uid:  data.user.uid
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('uid', usuario.uid);
        localStorage.setItem('tipo', 'registrado');
        this.uidService.setUser(usuario);
        this.uidService.setUid(usuario.uid);
        resolve();
    });
  }

  // Check nombre

  checkNombre(): Promise<string> {
    return new Promise((resolve, reject) => {
      const user = this.authFirebase.auth.currentUser;
      resolve(user.displayName || null);
    });
  }

  // Salida

  async logout() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.authFirebase.auth.signOut();
        localStorage.removeItem('uid');
        localStorage.removeItem('tipo');
        localStorage.removeItem('usuario');
        this.uidService.setUser(null);
        this.uidService.setUid(null);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


}
