// import Button from "./Button.js";

class Draggable {
  constructor(id, x, y, w, h, p5, content) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.origX = this.x;
    this.origY = this.y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.toolbarH = 25;
    // this.opacity = p5.map(this.id, 0, 20, 0, 1);
    this.startDrag = { x: 0, y: 0 };
    this.startDragCoords = { x: 0, y: 0 };

    this.dragging = false;
    this.locked = false;

    this.closed = false;
    this.minimized = false;

    this.barH = 26;
    this.bRad = 0; //10;

    let xp = 15;
    let yp = 12;
    let sp = 20;
    this.closeButton = new Button(xp, yp, p5);
    this.minButton = new Button(xp + sp, yp, p5);
    this.maxButton = new Button(xp + sp * 2, yp, p5);

    this.content = content;
    // this.mask;
    // this.initMask();
  }

  initMask() {
    this.mask = this.p5.createGraphics(this.w, this.h + this.barH);
    this.mask.background(0);
    this.mask.fill(255);
    this.mask.noStroke();
    // this.mask.rect(0, 0, this.w, this.h, this.bRad, this.bRad);
    this.mask.ellipse(this.w / 2, this.h / 2, 50, 50);
    if (this.content && this.content.width > 0) {
      this.content.mask(this.mask);
    }
  }

  display(fillVal, strokeVal) {
    if (!fillVal) fillVal = color(0, 0);
    if (!strokeVal) strokeVal = color(0);
    this.p5.push();
    this.p5.translate(this.x, this.y);
    if (!this.closed) {
      if (!this.minimized) this.displayContent(fillVal, strokeVal);
    }
    this.p5.pop();
  }

  displayToolBar(fillVal, strokeVal) {
    if (!fillVal) fillVal = color(0);
    if (!strokeVal) strokeVal = color(255);

    this.p5.push();
    this.p5.translate(this.x, this.y);
    const dy = 0; //10;
    if (!this.closed) {
      this.p5.fill(fillVal);
      this.p5.noStroke();
      if (!this.minimized) this.p5.rect(0, dy, this.w, this.barH - dy);
      this.p5.rect(0, 0, this.w, this.barH, this.bRad);

      // let gx = globalConfig.x * globalConfig.scaler;
      // let gy = globalConfig.y * globalConfig.scaler;
      // let mx = this.p5.mouseX + userX - gx - this.p5.windowWidth / 2 - this.x;
      // let my = this.p5.mouseY + userY - gy - this.p5.windowHeight / 2 - this.y;
      // let mx = this.p5.mouseX;
      // let my = this.p5.mouseY;
      this.closeButton.display(this.x, this.y, fillVal, strokeVal);
      this.minButton.display(this.x, this.y, fillVal, strokeVal);
      this.maxButton.display(this.x, this.y, fillVal, strokeVal);
    }
    this.p5.pop();
  }

  displayContent(fillVal, strokeVal) {
    if (!fillVal) fillVal = color(0, 0);
    if (!strokeVal) strokeVal = color(0, 255);
    // this.p5.fill(255);
    this.p5.push();

    this.p5.translate(0, this.barH);
    this.p5.image(this.content, 0, 0, this.w, this.h);
    this.p5.pop();
    this.displayFrame(strokeVal);
  }

  displaySolidBack(col) {
    this.p5.fill(col);
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.rect(0, 0, this.w, this.h + this.barH, this.bRad);
  }

  displayFrame(strokeVal) {
    this.p5.noFill();
    this.p5.stroke(strokeVal);
    this.p5.strokeWeight(2);
    this.p5.rect(0, 0, this.w, this.h + this.barH, this.bRad);
  }

  checkButtons() {
    if (this.closed) return false;
    // let mouse = mouseToWorld({x: userX, y: userY}, this.p5);
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };
    // mouse.x -= this.x;
    // mouse.y -= this.y;
    if (this.closeButton.mouseOver(this.x, this.y)) {
      this.closeWindow();
      return true;
    } else if (this.minButton.mouseOver(this.x, this.y)) {
      this.toggleMinimze();
      return true;
    } else if (this.maxButton.mouseOver(this.x, this.y)) {
      this.maximizeWindow();
      return true;
    }
    return false;
  }

  checkMouse() {
    if (this.checkButtons()) {
      return true;
    } else if (this.checkDragging()) {
      return true;
    }
    return false;
  }

  checkDragging() {
    if (this.closed) return false;
    // let mouse = mouseToWorld({x: userX, y: userY}, this.p5);
    // let mouse = {x: this.p5.mouseX, y: this.p5.mouseY};
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.overToolBar()) {
      // console.log("over toolbar");
      // this.draggingOn(mx, my);
      this.dragging = true;
      this.startDrag.x = this.p5.mouseX;
      this.startDrag.y = this.p5.mouseY;
      this.startDragCoords.x = this.x;
      this.startDragCoords.y = this.y;
      return true;
    }
    return false;
  }

  overToolBar() {
    const mx = this.p5.mouseX;
    const my = this.p5.mouseY;
    // console.log(mx, my, this.x, this.y);
    return (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.barH
    );
  }

  // draggingOn(mx, my) {
  //   // dragging.dragging = true;
  //   this.offsetX = this.p5.mouseX - this.startDrag.x;
  //   this.offsetY = this.p5.mouseY - this.startDrag.y;
  // }

  endDrag() {
    this.dragging = false;
  }

  update() {
    if (this.dragging) {
      this.offsetX = this.p5.mouseX - this.startDrag.x;
      this.offsetY = this.p5.mouseY - this.startDrag.y;

      this.x = this.startDragCoords.x + this.offsetX;
      this.y = this.startDragCoords.y + this.offsetY;
    }
  }

  toggleCloseWindow(div) {
    this.locked = !this.locked;
    this.closeWindow(div);
  }

  openWindow() {
    this.closed = false;
    this.minimized = false;
    this.locked = false; // ? what does this do
  }

  closeWindow() {
    // div.style("display", "none");
    this.closed = true;
  }

  maximizeWindow() {
    this.x = this.origX;
    this.y = this.origY;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  resetWindow(div = this.div) {
    this.x = this.origX;
    this.y = this.origY;
    this.locked = false;
    this.closeWindow(div);
    div.position(this.x, this.y);
    div.style("display", "block");
    this.minimized = false;
    this.minimizeWindow(this.content);
    this.setSize(400);
  }

  toggleMinimze() {
    this.minimized = !this.minimized;
  }
}
