import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-finish',
  templateUrl: './star-finish.component.html',
  styleUrls: []
})
export class StarFinishComponent implements OnInit {
  starList = [];
  public positionSelected: number = 4;
  constructor() { }

  ngOnInit() {
    this.starList = [
      {class: 'icon-star-filled', position: 1},
      {class: 'icon-star-filled', position: 2},
      {class: 'icon-star-filled', position: 3},
      {class: 'icon-star-filled', position: 4},
      {class: 'icon-star', position: 5},
    ]
  }

  public selectStart(position: number) {
    this.positionSelected = position;
    this.starList.forEach(row => {
      if(row.position <= position) {
        row.class = 'icon-star-filled';
      } else {
        row.class = 'icon-star';
      }
    });
  }

}
