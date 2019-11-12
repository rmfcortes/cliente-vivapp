import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private popController: PopoverController,
  ) { }

  ngOnInit() {}

  async salir(data?) {
    await this.popController.dismiss(data);
  }

}
