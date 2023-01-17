import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tvshows } from '../models/tvshows';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MapType } from '@angular/compiler';

const enum endpoint {
  airing_today = '/tv/airing_today',
  popular = '/tv/popular',
  top_rated = '/tv/top_rated'
}

@Injectable({
  providedIn: 'root'
})
export class TvService {

  private URL = 'https://api.themoviedb.org/3';
  // tslint:disable-next-line:variable-name
  private api_key = environment.api;

  constructor(private http:HttpClient) {} 
   

  getAiringToday(): Observable<tvshows> {
    return this.http.get<tvshows>(`${this.URL}${endpoint.airing_today}`, {
      params: {
        api_key: this.api_key
      }
    });
  }


  getPopularMovies(): Observable<tvshows> {
    return this.http.get<tvshows>(`${this.URL}${endpoint.popular}`, {
      params: {
        api_key: this.api_key
      }
    });
  }

  getTopRated(): Observable<tvshows> {
    return this.http.get<tvshows>(`${this.URL}${endpoint.top_rated}`, {
      params: {
        api_key: this.api_key
      }
    });
  }

}
