import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {FullscreenDirective} from "../../directives/fullscreen/fullscreen.directive";

@NgModule({
  declarations: [
    MenuComponent,
    FullscreenDirective
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenuModule {
}
