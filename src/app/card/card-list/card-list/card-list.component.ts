import { Component, Input } from '@angular/core';
import { Gif } from 'src/app/interfaces/gifs.interfaces';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  constructor() {}

  @Input() public gifs: Gif[] = [];
}
