import { SortPipe } from './sort.pipe';
import { TestData } from '../test-data';

describe('Sort Pipe', () => {
  let instance: SortPipe = null;

  beforeEach(() => {
    instance = new SortPipe();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('sorts a list', () => {
    const list = [
      { sortIndex: 3 },
      { sortIndex: 5 },
      { sortIndex: 1 },
      { sortIndex: 2 },
      { sortIndex: 4 }
    ];
    const sortedList = [
      { sortIndex: 1 },
      { sortIndex: 2 },
      { sortIndex: 3 },
      { sortIndex: 4 },
      { sortIndex: 5 },
    ];

    expect(instance.transform(list)).toEqual(sortedList);
  });
});
