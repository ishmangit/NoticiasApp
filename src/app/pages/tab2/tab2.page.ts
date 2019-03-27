import { Component, OnInit, ViewChild } from '@angular/core';

import { Article } from './../../interfaces/interfaces';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  // TODO: Mejorar la paginación estableciendo una variable página por categoria

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];

    this.cargarNoticias(this.segment.value);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
      .subscribe(resp => {

        if (resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.noticias.push(...resp.articles);

        if (event) {
          event.target.complete();
        }
      });
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }
}
