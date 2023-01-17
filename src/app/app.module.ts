import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './components/slider/slider.component';
import { SliderTVComponent } from './components/slider-tv/slidertv.component';
import {HttpClientModule} from '@angular/common/http';
import { Routes, Router, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'tv', component: SliderTVComponent },
   { path: '', component : SliderComponent},
   {path: 'movies', component: SliderComponent}
,
];

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    SliderTVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    MatIconModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
