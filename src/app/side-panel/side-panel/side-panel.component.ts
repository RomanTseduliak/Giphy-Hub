import { Component } from '@angular/core';
import { GifsService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  constructor( private gifsService: GifsService) {}

  get tags(): string[] {
    return [...this.gifsService.tagsHistory]
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

}
