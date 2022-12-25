import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rounder'
})
export class RounderPipe implements PipeTransform {

  transform(value: number | null | string, digits = 0): any {
    return typeof(value) === 'number' ? (value as number).toFixed(digits) : value;
  }

}
