import { Article, RespuestaTopHeadLines } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';

import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService ) {

  }

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines()
      .subscribe(resp => {

        if (resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.noticias.push(...resp.articles);

        // Ha sido llamado desde el loadData por lo que hay que completar el infiniteScroll
        if (event) {
          event.target.complete();
        }
      });

  }

  loadData(event) {
    this.cargarNoticias(event);
  }
}
