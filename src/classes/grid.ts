import p5 from "p5";
import { Cell } from "./cell";
import { CellState, GridState, Screen, removeItem } from "./common";

export interface GridArgs {
  cellSize: number;
  p5: p5;
  screen: Screen;
}

export class Grid {
  private p5: p5;

  private cols: number;
  private rows: number;
  private cellSize: number;
  private visited: Array<Cell>;
  private queued: Array<Cell>;
  private source!: Cell;
  private destination!: Cell;
  private state: GridState;

  private grid!: Array<Array<Cell>>;
  private cost: number = 1;

  constructor({ cellSize, p5, screen }: GridArgs) {
    this.p5 = p5;

    this.cellSize = cellSize;
    this.cols = Math.trunc(screen.height / cellSize);
    this.queued = [];
    this.rows = Math.trunc(screen.width / cellSize);
    this.state = GridState.searching;
    this.visited = [];
  }

  setup() {
    this.p5.rectMode("corner");
    this.p5.background(255);

    this.grid = [];

    this.fillGrid();
    this.fillNeighbors();
    this.initCellPoints();
  }

  draw() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.grid[r][c].draw();
      }
    }

    if (this.state !== GridState.searching) return;

    this.applyAStarAlgorithm();

    console.log({ state: this.state, queued: this.queued });
  }

  debug() {
    console.log(this);
  }

  private addVisited(cell: Cell) {
    if (cell.state != CellState.source && cell.state != CellState.destination)
      this.grid[cell.x][cell.y].state = CellState.visited;
    this.visited.push(cell);
  }

  private addQueued(cell: Cell) {
    if (cell.state != CellState.source && cell.state != CellState.destination)
      this.grid[cell.x][cell.y].state = CellState.queued;
    this.queued.push(cell);
  }

  private removeQueued(cell: Cell) {
    this.queued = removeItem(this.queued, cell);
  }

  private fillGrid() {
    for (let r = 0; r < this.rows; r++) {
      let row: Array<Cell> = [];

      for (let c = 0; c < this.cols; c++) {
        const x = r;
        const y = c;
        row.push(new Cell({ cellSize: this.cellSize, p5: this.p5, x, y }));
      }

      this.grid.push(row);
    }
  }

  private fillNeighbors() {
    this.grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (x < this.rows - 1) {
          const neighbor = this.grid[x + 1][y];
          cell.addNeighbor(neighbor);
        }

        if (x > 0) {
          const neighbor = this.grid[x - 1][y];
          cell.addNeighbor(neighbor);
        }

        if (y < this.cols - 1) {
          const neighbor = this.grid[x][y + 1];
          cell.addNeighbor(neighbor);
        }

        if (y > 0) {
          const neighbor = this.grid[x][y - 1];
          cell.addNeighbor(neighbor);
        }
      });
    });
  }

  private initCellPoints() {
    this.source = this.grid[0][0];
    this.destination = this.grid[this.rows - 1][this.cols - 1];
    this.addQueued(this.source);
    this.grid[this.source.x][this.source.y].state = CellState.source;
    this.grid[this.destination.x][this.destination.y].state =
      CellState.destination;
  }

  private applyAStarAlgorithm() {
    const nearest = this.getNearestQueuedCell();

    if (nearest) {
      this.evaluateNeighbors(nearest);
    }
  }

  private getNearestQueuedCell(): Cell | null {
    if (this.queued.length > 0) {
      let nearestIndex = 0;

      for (let i = 0; i < this.queued.length; i++) {
        if (this.queued[i].costs.f < this.queued[nearestIndex].costs.f) {
          nearestIndex = i;
        }
      }

      const nearest: Cell = this.queued[nearestIndex];

      if (nearest.state === CellState.destination) {
        this.state = GridState.found;
        return null;
      }

      this.removeQueued(nearest);
      this.addVisited(nearest);

      return nearest;
    } else {
      this.state = GridState.failed;
      return null;
    }
  }

  private evaluateNeighbors(current: Cell) {
    const neighbors: Array<Cell> = current.neighbors;

    for (let n = 0; n < neighbors.length; n++) {
      const neighbor = neighbors[n];

      if (this.visited.includes(neighbor) === false) {
        let tempG = current.costs.g + 1;

        if (this.queued.includes(neighbor)) {
          if (tempG < current.costs.g) {
            current.costs.g = tempG;
          }
        } else {
          current.costs.g = tempG;
          this.addQueued(neighbor);
        }

        neighbor.costs.h = this.calculateHeuristic(neighbor);
        neighbor.costs.f = neighbor.costs.g + neighbor.costs.h;
        neighbor.previous = current;
      }
    }
  }

  private calculateHeuristic(cell: Cell) {
    return this.p5.dist(cell.x, cell.y, this.destination.x, this.destination.y);
  }
}
