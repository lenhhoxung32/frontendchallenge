import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'mlTimestampToDateFormat'
})
export class MlTimestampToDateFormatPipe implements PipeTransform {
  constructor() { }
  transform(value: number) {
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }
}
