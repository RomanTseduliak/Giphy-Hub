import { Component } from '@angular/core';
import { Gif } from 'src/app/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  gifsNotFound = this.gifsService.gifsNotFound;
  isLoading = this.gifsService.isLoading;

  constructor(private gifsService: GifsService) {
  }

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }
}
