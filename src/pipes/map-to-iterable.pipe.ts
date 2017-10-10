import { Pipe } from '@angular/core';

@Pipe({
  name: 'mapToIterable'
})
export class MapToIterablePipe {
  transform(map: {}): Array<any> {
    if (!map) {
      return null;
    }
    return Object.values(map);
  }
}
