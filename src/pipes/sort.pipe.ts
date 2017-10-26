import { Pipe } from '@angular/core';
import { sort } from '../utils';

@Pipe({
  name: 'sort'
})
export class SortPipe {
  transform(list: Array<any> = []): Array<any> {
    return list.slice().sort(sort);
  }
}
