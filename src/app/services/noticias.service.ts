import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private httpClient: HttpClient) { }

  getTopHeadlines() {
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${environment.apiKey}`);
  }
}
