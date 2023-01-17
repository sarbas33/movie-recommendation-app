import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Movies} from './models/movies';
import {MovieService} from './services/movie.service';
import { TvService } from './services/tv.service';
import { Router } from '@angular/router';
import { tvshows } from './models/tvshows';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title="MovieAppProject";
  sticky = false;
  subs: Subscription[] = [];
  trending: Movies;
  public headerTitle: string;
  populartv: tvshows;
  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };
  @ViewChild('stickHeader') header: ElementRef;
  headerBGUrl: string;

  constructor( private movie: MovieService, private tv: TvService,private router: Router) {
  }
  OnClickTV(){
    console.log("Hello")
    this.router.navigate(['tv']);
    this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.populartv.results[0].backdrop_path;
    this.headerTitle = this.populartv.results[0].original_name;
    window.scrollTo(0,0);
  }
  OnClickMovie(){
    console.log("Hello")
    this.router.navigate(['']);
    this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[0].backdrop_path;
    this.headerTitle = this.trending?.results[0].title;
    window.scrollTo(0,0);
  }
  ngOnInit(): void {
    this.subs.push(this.movie.getTrending().subscribe(data => {
      this.trending = data;
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[0].backdrop_path;
      this.headerTitle = this.trending?.results[0].title;
      console.log( 'https://image.tmdb.org/t/p/original' + this.trending.results[0].backdrop_path);
    }));
    this.subs.push(this.tv.getPopularMovies().subscribe(data => this.populartv = data));
  }
  public changeBGURL(s: string, tit: string): void{
    this.headerBGUrl = s;
    this.headerTitle = tit;
    window.scrollTo(0,0)
  }
  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }


}