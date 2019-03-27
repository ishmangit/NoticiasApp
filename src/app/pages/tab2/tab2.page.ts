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

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];

    this.cargarNoticias(this.segment.value);
  }

  cargarNoticias(categoria: string) {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
      .subscribe(resp => {
        this.noticias.push(...resp.articles);
      });
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }
}
