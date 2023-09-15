import p5 from "p5";
import "./style.css";

import { MainLoop } from "./classes/mainLoop";

const sketch = (p5: p5) => {
  let main: MainLoop = new MainLoop({ p5 });

  p5.setup = () => {
    main.setup();
  };

  p5.draw = () => {
    main.draw();
    main.update();
  };

  p5.windowResized = () => {
    main.windowResized({
      height: p5.windowHeight,
      width: p5.windowWidth,
    });
  };

  p5.mousePressed = () => {
    main.mousePressed();
  };

  p5.keyPressed = () => {
    main.keyPressed();
  };
};

new p5(sketch, document.getElementById("app")!);
