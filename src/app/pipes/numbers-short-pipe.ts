import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbersShort',
})
export class NumbersShortPipe implements PipeTransform {
  transform(value: string): string {
    const numericValue = parseInt(value, 10);
    if (numericValue >= 1000000000) {
      return (numericValue / 1000000000).toFixed(1) + 'B' + ' viewers';
    }
    if (numericValue >= 1000000) {
      return (numericValue / 1000000).toFixed(1) + 'M' + ' viewers';
    }
    if (numericValue >= 1000) {
      return (numericValue / 1000).toFixed(1) + 'K' + ' viewers';
    }
    return numericValue === 1 ? '1 viewer' : value + ' viewers';
  }
}

