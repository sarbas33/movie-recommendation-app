import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { tvshows } from 'src/app/models/tvshows';
import { AppComponent } from 'src/app/app.component';
import { TvService } from 'src/app/services/tv.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-slider-tv',
  templateUrl: './slidertv.component.html',
  styleUrls: ['./slidertv.component.css']
})
export class SliderTVComponent implements OnInit, OnDestroy {
   @Input() sliderConfig;
   @Input() tvshows: tvshows;
   @Input() title: string;
   populartv: tvshows;
   topRatedtv: tvshows;
   airingTodaytv: tvshows;
   subs: Subscription[] = [];

  constructor(private appComponent: AppComponent, private tv: TvService) { }

  ngOnInit(): void {
    
    this.subs.push(this.tv.getPopularMovies().subscribe(data => this.populartv = data));
    this.subs.push(this.tv.getTopRated().subscribe(data => this.topRatedtv = data));
    this.subs.push(this.tv.getAiringToday().subscribe(data => this.airingTodaytv = data));
  }

  OnClickMovie(a,b)
  {
    console.log('https://image.tmdb.org/t/p/original'+a);
    this.appComponent.changeBGURL('https://image.tmdb.org/t/p/original'+a,b);  
    
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
}

