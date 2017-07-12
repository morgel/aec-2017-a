import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ownToken'
})
export class OwnTokenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
