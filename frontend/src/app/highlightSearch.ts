//our root app component
import { Pipe, PipeTransform} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
@Pipe({
  name: 'highlight'
})
export class HighlightSearch implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, "<mark style='background-color:yellow;'>" + match[0] + "</mark>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }

}
