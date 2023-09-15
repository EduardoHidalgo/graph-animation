import p5 from "p5";
import { CellState } from "./common";

export interface CellArgs {
  cellSize: number;
  p5: p5;
  x: number;
  y: number;
}

export class Cell {
  private p5: p5;
  private cellSize: number;

  costs: {
    f: number;
    h: number;
    g: number;
  };
  state: CellState;
  x: number;
  y: number;
  neighbors: Array<Cell>;
  previous: Cell | null;

  constructor({ cellSize, p5, x, y }: CellArgs) {
    this.cellSize = cellSize;
    this.neighbors = [];
    this.p5 = p5;
    this.previous = null;
    this.state = CellState.empty;
    this.x = x;
    this.y = y;

    this.costs = {
      f: 0,
      g: 0,
      h: 0,
    };
  }

  draw() {
    switch (this.state) {
      case CellState.destination:
        this.p5.fill("blue");
        break;
      case CellState.empty:
        this.p5.fill("white");
        break;
      case CellState.queued:
        this.p5.fill("green");
        break;
      case CellState.source:
        this.p5.fill("purple");
        break;
      case CellState.visited:
        this.p5.fill("red");
        break;
    }

    this.p5.stroke(0);
    this.p5.rect(
      this.x * this.cellSize,
      this.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  addNeighbor(cell: Cell) {
    this.neighbors.push(cell);
  }
}
