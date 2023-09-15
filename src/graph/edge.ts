import p5, { Vector } from "p5";
import { Vertex } from "./vertex";

export interface EdgeArgs {
  p5: p5;
  u: Vertex;
  v: Vertex;
}

export class Edge {
  private p5: p5;
  u: Vertex;
  v: Vertex;
  weight: number;
  reduceFactor = 40;

  constructor({ p5, u, v }: EdgeArgs) {
    this.p5 = p5;
    this.u = u;
    this.v = v;
    this.weight = 0;
  }

  attract(k: number, aC: number) {
    let d = Vector.sub(this.u.position, this.v.position);

    if (d.mag() === 0) {
      d = p5.Vector.random2D();
      d.setMag(0.01);
    }

    let m = (aC * this.p5.pow(d.mag(), 2)) / k;

    if (!isFinite(m)) {
      m = 0.01;
    }

    d.setMag(m);

    this.u.disp.sub(d);
    this.v.disp.add(d);
  }

  show() {
    this.weight = Math.trunc(
      this.p5.dist(
        this.u.position.x,
        this.u.position.y,
        this.v.position.x,
        this.v.position.y
      ) / this.reduceFactor
    );

    let midPoint = this.p5
      .createVector(this.u.position.x, this.u.position.y)
      .add(this.v.position);
    midPoint.div(2);

    this.p5.stroke("white");
    this.p5.line(
      this.u.position.x,
      this.u.position.y,
      this.v.position.x,
      this.v.position.y
    );
    this.p5.stroke("red");
    this.p5.textSize(24);
    this.p5.text(this.weight, midPoint.x, midPoint.y);
  }
}
