import { Component } from '@angular/core';
import { GifsService } from './services/gifs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Giphy Hub';
  gifsNotFound = this.gifsService.gifsNotFound;

  constructor(private gifsService: GifsService) { }

  ngOnInit() {
    if (!this.gifsNotFound) {
      this.gifsService
        .getData()
    }
  }
}
