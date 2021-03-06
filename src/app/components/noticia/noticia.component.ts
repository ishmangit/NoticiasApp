import { Component, Input, OnInit } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';
import { Article } from './../../interfaces/interfaces';
import { DataLocalService } from './../../services/data-local.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let opcionDinamica;

    if (this.enFavoritos) {
      opcionDinamica = {
        text: 'Eliminar de favoritos',
        icon: 'trash',
        cssClass: 'actionDark',
        handler: () => {
          this.eliminarNoticia();
        }
      };
    } else {
      opcionDinamica = {
        text: 'Guardar en favoritos',
        icon: 'star',
        cssClass: 'actionDark',
        handler: () => {
          this.guardarNoticia();
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'actionDark',
        handler: () => {
          this.compartirNoticia();
        }
      },
      opcionDinamica,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'actionDark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  compartirNoticia() {
    this.socialSharing.share(
      this.noticia.title,
      this.noticia.source.name,
      '',
      this.noticia.url
    );
  }

  guardarNoticia() {
    this.dataLocalService.guardarNoticia(this.noticia);
  }

  eliminarNoticia() {
    this.dataLocalService.borrarNoticia(this.noticia);
  }

}
