import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private httpClient: HttpClient) { }

  getTopHeadlines() {
    return this.httpClient.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${environment.apiKey}`);
  }
}
