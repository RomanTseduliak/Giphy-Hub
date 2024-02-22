import { Component, Input } from '@angular/core';
import { Gif } from 'src/app/interfaces/gifs.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() public gif!: Gif;
  
}
