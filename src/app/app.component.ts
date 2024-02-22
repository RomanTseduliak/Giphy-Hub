import { Component } from '@angular/core';
import { GifsService } from './services/gifs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Giphy Hub';
  isDefaultList = this.gifsService.isDefaultList;

  constructor(private gifsService: GifsService) { }

  ngOnInit() {
    if (this.isDefaultList) {
      this.gifsService
        .getData()
    }
  }
}
