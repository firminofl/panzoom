import {Directive, HostListener} from '@angular/core';
import screenplay from 'screenfull';

@Directive({
  selector: '[toggleFullscreen]'
})
export class FullscreenDirective {

  @HostListener('click')
  onClick() {
    if (screenplay.isEnabled) {
      screenplay.toggle();
    }
  }
}
