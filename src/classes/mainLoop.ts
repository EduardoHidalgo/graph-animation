import p5 from "p5";
import { Screen } from "./common";
import { Grid } from "./grid";
import { ForcedDirectedGraph } from "../graph/fdg";

export interface MainLoopArgs {
  p5: p5;
}

export class MainLoop {
  private p5: p5;
  private screen!: Screen;
  private grid!: Grid;
  private fdg!: ForcedDirectedGraph;

  constructor({ p5 }: MainLoopArgs) {
    this.p5 = p5;
  }

  setup() {
    this.screen = { height: this.p5.windowHeight, width: this.p5.windowWidth };
    this.p5.createCanvas(this.screen.width, this.screen.height);

    //this.gridSetup();
    this.fdgSetup();
  }

  draw() {
    //this.gridDraw();
    this.fdgDraw();
  }

  update() {}

  private fdgSetup() {
    this.fdg = new ForcedDirectedGraph({
      p5: this.p5,
      screen: this.screen,
    });
    this.fdg.setup();
  }

  private fdgDraw() {
    this.fdg.draw();
  }

  private gridSetup() {
    this.grid = new Grid({ p5: this.p5, cellSize: 60, screen: this.screen });
    this.grid.setup();
    this.grid.debug();
  }

  private gridDraw() {
    this.grid.draw();
  }

  windowResized(screen: Screen) {
    this.screen = screen;
    this.p5.resizeCanvas(this.screen.width, this.screen.height);
  }

  mousePressed() {
    this.fdg.mousePressed();
  }

  keyPressed() {
    this.fdg.keyPressed();
  }
}
