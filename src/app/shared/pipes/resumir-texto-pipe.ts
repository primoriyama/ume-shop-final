import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumirTexto',
  standalone: true
})
export class ResumirTextoPipe implements PipeTransform {

  transform(value: string, limit: number = 50): string {
    if (!value) {
      return '';
    }

    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
