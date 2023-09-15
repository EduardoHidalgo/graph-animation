import p5, { Vector } from "p5";
import { Screen } from "../classes/common";

export interface VertexArgs {
  id: string;
  p5: p5;
  screen: Screen;
  x: number;
  y: number;
}

export class Vertex {
  id: string;
  p5: p5;
  screen: Screen;
  x: number;
  y: number;

  position: Vector;
  disp: Vector;

  constructor({ id, p5, screen, x, y }: VertexArgs) {
    this.id = id;
    this.p5 = p5;
    this.screen = screen;
    this.x = x;
    this.y = y;

    this.position = this.p5.createVector(x, y);
    this.disp = this.p5.createVector(0, 0);
  }

  reset() {
    this.disp = this.p5.createVector(0, 0);
  }

  repel(vertices: Array<Vertex>, k: number, rC: number) {
    this.disp = this.p5.createVector(0, 0);

    for (let u of vertices) {
      if (this !== u) {
        let d = p5.Vector.sub(u.position, this.position);
        if (d.mag() === 0) {
          d = p5.Vector.random2D();
          d.setMag(0.01);
        }
        let m = (rC * this.p5.pow(k, 2)) / d.mag();

        if (!isFinite(m)) {
          m = 0.01;
        }

        d.setMag(m);
        this.disp.sub(d);
      }
    }
  }

  update(margin: number) {
    const { height, width } = this.screen;

    this.disp.limit(this.p5.min(width, height) / 4);
    this.position.add(this.disp);

    this.position.x = this.p5.constrain(
      this.position.x,
      margin,
      width - margin
    );
    this.position.y = this.p5.constrain(
      this.position.y,
      margin,
      height - margin
    );
  }

  show() {
    this.p5.stroke("white");
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.circle(0, 0, 30);
    this.p5.stroke("red");
    this.p5.textSize(20);
    this.p5.text(this.id, 0, 0);
    this.p5.pop();
  }
}
