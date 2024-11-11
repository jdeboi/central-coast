// import Draggable from "../shared/Draggable/Draggable.js";

class OilRig {
  constructor(x, y, w, h, img, p5) {
    this.w = w;
    this.h = h;
    this.p5 = p5;
    this.lightVal = 255;
    this.seedVal = random(100);
    this.isOff = false;
    this.draggableDiv = new Draggable(0, x, y, w, h, p5, img);
  }

  setPos(x, y) {
    this.draggableDiv.x = x;
    this.draggableDiv.y = y;
  }

  resetPosition() {
    this.isOff = false;
    this.draggableDiv.maximizeWindow();
  }

  setOff() {
    this.isOff = true;
  }

  display() {
    if (this.isOff) {
      return;
    }
    const fillVal = color(0, this.lightVal / 3);
    const strokeVal = color(70, this.lightVal);
    this.draggableDiv.displayToolBar(fillVal, strokeVal);

    push();
    tint(255, this.lightVal);
    this.draggableDiv.display(fillVal, fillVal);
    pop();
    //this.displayLight();
  }

  setLight(val) {
    this.lightVal = constrain(val, 0, 255);
  }

  getW() {
    return this.w;
  }

  getH() {
    return this.h + this.draggableDiv.barH;
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
    if (this.isOff) return;
    this.draggableDiv.update();
  }

  drag() {
    if (this.isOff) return;
    this.draggableDiv.drag();
  }

  endDrag() {
    this.draggableDiv.endDrag();
  }

  checkMouse() {
    if (this.isOff) return;
    return this.draggableDiv.checkMouse();
  }
}
