import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'mlTimestampToDateFormat'
})
export class MlTimestampToDateFormatPipe implements PipeTransform {
  constructor() { }
  transform(value: number) {
    const date = new Date(value);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
}
