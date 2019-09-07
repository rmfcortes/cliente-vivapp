import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(
    private storage: NativeStorage,
    private router: Router
  ) {}

    canActivate() {
      this.storage.setItem('prueba', 'hoy');
      if (localStorage.getItem('isLoggedin')) {
          return true;
      }

      this.router.navigate(['/login']);
      return false;
    }
}
