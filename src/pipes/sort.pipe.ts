import { Pipe } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe {
  transform(list: Array<any> = []): Array<any> {
    return list.slice().sort((a, b) => a.sortIndex - b.sortIndex);
  }
}
