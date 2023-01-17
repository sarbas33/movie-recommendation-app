import {Component, Input, OnInit} from '@angular/core';
import {Movies} from '../../models/movies';
import { AppComponent } from 'src/app/app.component';
import { MovieService } from 'src/app/services/movie.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
   @Input() sliderConfig;
   @Input() movies: Movies;
   @Input() title: string;
   trending: Movies;
   popular: Movies;
  topRated: Movies;
  originals: Movies;
  nowPlaying: Movies;
   subs: Subscription[] = [];
  constructor(private appComponent: AppComponent, private movie: MovieService) { }

  ngOnInit(): void {
    this.subs.push(this.movie.getTrending().subscribe(data => {
      this.trending = data;
    }));
    this.subs.push(this.movie.getPopularMovies().subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTopRated().subscribe(data => this.topRated = data));
    this.subs.push(this.movie.getOriginals().subscribe(data => this.originals = data));
    this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));
  }
  OnClickMovie(a,b)
{
  console.log('https://image.tmdb.org/t/p/original'+a);
  this.appComponent.changeBGURL('https://image.tmdb.org/t/p/original'+a,b);  
}
}
