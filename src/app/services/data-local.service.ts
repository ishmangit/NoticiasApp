import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {

    // Chequeamos por título que la noticia no exista ya
    const existe = this.noticias.find(item => item.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);

      this.presentToast('La noticia ha sido añadida a favoritos');
    } else {
      this.presentToast('La noticia ya se encuentra en favoritos');
    }

  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(item => item.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('La noticia ha sido eliminada de favoritos');
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}
