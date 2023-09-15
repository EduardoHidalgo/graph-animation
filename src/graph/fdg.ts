import p5 from "p5";
import { Screen } from "../classes/common";
import { Vertex } from "./vertex";
import { Edge } from "./edge";

export interface ForcedDirectedGraphArgs {
  p5: p5;
  screen: Screen;
}

/**
 * @see https://editor.p5js.org/creativecoding/sketches/k6FAVofEd
 */
export class ForcedDirectedGraph {
  private p5: p5;
  private screen: Screen;

  vertices: Array<Vertex>;
  edges: Array<Edge>;

  area!: number;
  k: number;
  rC: number;
  aC: number;
  margin: number;

  constructor({ p5, screen }: ForcedDirectedGraphArgs) {
    this.p5 = p5;
    this.screen = screen;

    this.area = screen.height * screen.width;
    this.vertices = [];
    this.edges = [];
    this.k = 0;
    this.rC = 0.01;
    this.aC = 0.01;
    this.margin = 100;
  }

  setup() {
    this.p5.textAlign("center", "center");
    this.p5.noCursor();
    this.p5.stroke(255);
    this.p5.fill(255, 100);

    if (window) {
      window.alert(
        "click into the screen to create new graph nodes. Press F key to freeze the animation."
      );
    }

    this.addVertex(this.screen.width / 2, this.screen.height / 2);
  }

  draw() {
    this.p5.background(0);

    for (let v of this.vertices) {
      v.update(this.margin);
      v.reset();
    }

    for (let v of this.vertices) {
      v.repel(this.vertices, this.k, this.rC);
    }

    for (let e of this.edges) {
      e.attract(this.k, this.aC);
    }

    for (let e of this.edges) {
      e.show();
    }

    this.initialRandomGeneration();

    for (let v of this.vertices) {
      v.show();
    }
  }

  private initialRandomGeneration() {
    if (this.vertices.length <= 15 && this.p5.random(100) > 90)
      this.addRandomVertex();
  }

  private addRandomVertex() {
    const { height, width } = this.screen;
    // Create a new vertex at a random x,y position.
    // The new vertex should be near the canvas center.
    let x = width / 2 + (width / 6) * this.p5.randomGaussian();
    let y = height / 2 + (height / 6) * this.p5.randomGaussian();

    // Constrain the new position to be in bounds.
    x = this.p5.constrain(x, 10, width - 10);
    y = this.p5.constrain(y, 10, height - 10);

    this.addVertex(x, y);
  }

  private addVertex(x: number, y: number) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Create the new vertex at the new position.
    let vertex = new Vertex({
      id: alphabet[this.vertices.length],
      x,
      y,
      p5: this.p5,
      screen: this.screen,
    });

    // Before adding the vertex, check if there are any other
    // vertices we should connect it to with an edge.
    if (this.vertices.length > 0) {
      // Randomly pick a number of existing vertices to connect to
      let numToConnect =
        1 + this.p5.int(this.p5.random(this.vertices.length / 3));

      // Construct a temporary array of indexes we can use to ensure
      // that we only ever connect the new vertex to any existing
      // vertex once.
      let vxIndices = [];
      for (let i = 0; i < this.vertices.length; i++) {
        vxIndices.push(i);
      }

      for (let i = 0; i < numToConnect; i++) {
        // Randomly choose the index of a vertex to connect.
        let connectIndex = this.p5.int(this.p5.random(vxIndices.length));

        // Create a new edge connecting the two vertices.
        this.edges.push(
          new Edge({
            p5: this.p5,
            u: this.vertices[vxIndices[connectIndex]],
            v: vertex,
          })
        );

        // Remove that index so it doesn't get connected again
        vxIndices.splice(connectIndex, 1);
      }
    }

    // Finally, add the vertex to the list of vertices.
    this.vertices.push(vertex);

    // Recalculate k because the number of vertices has changed
    this.k = this.p5.sqrt(this.area / this.vertices.length);
  }

  mousePressed() {
    this.addVertex(this.p5.mouseX, this.p5.mouseY);
    this.p5.loop();
  }

  keyPressed() {
    if (this.p5.key === " ") {
      this.p5.loop();
    }

    if (this.p5.key === "f") {
      this.p5.noLoop();
    }
  }
}
