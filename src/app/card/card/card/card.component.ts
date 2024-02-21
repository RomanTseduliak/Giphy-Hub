import { Component, Input } from '@angular/core';
import { Gif } from 'src/app/interfaces/gifs.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() public gif!: Gif;
  
   formatDate(inputDate: Gif) {
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date: Date = new Date(inputDate.import_datetime);
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    const formatted =  `${month} ${day} ${year}`;
    console.log('formatted: ', formatted);
  }
}
