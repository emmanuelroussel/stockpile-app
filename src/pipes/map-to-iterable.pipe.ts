import { Pipe } from '@angular/core';

@Pipe({
  name: 'mapToIterable'
})
export class MapToIterablePipe {
  transform(map: {}): Array<any> {
    if (!map) {
      return null;
    }
    return Object.keys(map).map(key => map[key]);
  }
}
