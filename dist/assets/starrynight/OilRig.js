// import Draggable from "../shared/Draggable/Draggable.js";

class OilRig {
  constructor(x, y, w, h, img, p5) {
    this.w = w;
    this.h = h;
    this.p5 = p5;
    this.lightVal = 255;
    this.draggableDiv = new Draggable(0, x, y, w, h, p5, img);
  }

  display() {
    const fillVal = color(50, 0, 155, 50);
    const strokeVal = color(50, 0, 155, 150);
    this.draggableDiv.displayToolBar(fillVal, strokeVal);

    push();
    tint(255, this.lightVal);
    this.draggableDiv.display(fillVal, strokeVal);
    pop();
    //this.displayLight();
  }

  setLight(val) {
    this.lightVal = constrain(val, 0, 255);
  }

  displayLight() {
    //const alphaVal = 255 / 2 + (255 / 2) * sin(frameCount / 30);
    fill(255, this.lightVal);
    noStroke();
    push();
    translate(50, 50);
    ellipse(this.getX(), this.getY(), 8, 8);
    pop();
  }

  getX() {
    return this.draggableDiv.x;
  }

  getY() {
    return this.draggableDiv.y;
  }

  update() {
    this.draggableDiv.update();
  }

  drag() {
    this.draggableDiv.drag();
  }

  endDrag() {
    this.draggableDiv.endDrag();
  }

  checkMouse() {
    return this.draggableDiv.checkMouse();
  }
}
