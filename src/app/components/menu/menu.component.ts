import {Component, Input, OnInit} from '@angular/core';

export interface IMenu {
  icon: string;
  tooltip: string;

  invokeMethod: () => any;
  fullscreen?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input('items') items: IMenu[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  executeEvent() {

  }

}
