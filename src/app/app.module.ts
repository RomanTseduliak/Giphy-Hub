import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchFieldComponent } from './search-field/search-field/search-field.component';
import { SidePanelComponent } from './side-panel/side-panel/side-panel.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { CardListComponent } from './card/card-list/card-list/card-list.component';
import { CardComponent } from './card/card/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SearchFieldComponent,
    SidePanelComponent,
    HomePageComponent,
    CardListComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
