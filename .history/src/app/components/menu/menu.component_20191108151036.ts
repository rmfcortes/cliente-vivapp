import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  isAnom = true;

  constructor(
    private popController: PopoverController,
  ) { }

  ngOnInit() {
    const tipo = localStorage.getItem('tipo');
    if (tipo === 'anonimo') {
      this.isAnom = true;
    } else {
      this.isAnom = false;
    }
  }

  async salir(data?) {
    await this.popController.dismiss(data);
  }

}
