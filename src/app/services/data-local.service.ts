import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage) { }

  guardarNoticia(noticia: Article) {

    // Chequeamos por título que la noticia no exista ya
    const existe = this.noticias.find(item => item.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }

  }

  cargarFavoritos() {

  }
}
