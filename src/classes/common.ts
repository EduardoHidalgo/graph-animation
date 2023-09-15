export interface Screen {
  height: number;
  width: number;
}

export enum CellState {
  destination = "destination",
  empty = "empty",
  queued = "queued",
  source = "source",
  visited = "visited",
}

export enum GridState {
  failed = "failed",
  found = "found",
  searching = "searching",
}

export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
