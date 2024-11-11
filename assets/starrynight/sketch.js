const oilRigs = [];
let oilMatrix;
let currentMode = "twinkle";
let oilRigImg;
let dropdown;
let headerHeight = 52;

function preload() {
  oilRigImg = loadImage("/central-coast/assets/starrynight/oilrig4.jpg");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight - headerHeight);
  cnv.parent("p5-sketch");

  initOilRigs();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  //   noStroke();
  //   fill(0, 100);
  //   rect(0, 0, width, height);
  //   displayStars();
  displayMode();
  for (let i = 0; i < oilRigs.length; i++) {
    oilRigs[i].display();
    oilRigs[i].update();
  }
}

function mousePressed() {
  for (let i = 0; i < oilRigs.length; i++) {
    oilRigs[i].checkMouse();
  }
}

function mouseReleased() {
  for (let i = 0; i < oilRigs.length; i++) {
    oilRigs[i].endDrag();
  }
}

function displayStars() {
  for (let i = 0; i < 100; i++) {
    strokeWeight(1);
    stroke(255);
    point(random(width), random(height));
  }
}

function initDropdown(x, y) {
  // Create a dropdown menu
  dropdown = createSelect();
  dropdown.parent("dropdown-container");
  dropdown.position(x, y);

  // Add options to the dropdown
  dropdown.option("twinkle");
  dropdown.option("swirl");
  dropdown.option("big dipper");

  // Listen for changes
  dropdown.changed(handleDropdownChange);
}

// Handle dropdown changes
function handleDropdownChange() {
  resetPositions();
  currentMode = dropdown.value();

  if (currentMode == "big dipper") {
    setBigDipper();
  }
}

function displayMode() {
  switch (currentMode) {
    case "swirl":
      displaySwirl();
      break;
    case "big dipper":
      displayBigDipper();
      break;
    case "twinkle":
      displayTwinkle();
      break;
    default:
      displaySwirl();
      break;
  }
}

function displaySwirl() {
  const centerX = width / 2;
  const centerY = height / 2;
  const swirlSpeed = 0.05; // Controls the speed of the swirl
  const maxRadius = min(width, height) / 2; // Maximum radius for the swirl effect
  let globalAngle = (frameCount * swirlSpeed) % (2 * PI);

  for (let r = 0; r < oilRigMatrix.length; r++) {
    for (let c = 0; c < oilRigMatrix[r].length; c++) {
      const oilRig = oilRigMatrix[r][c];
      const x = oilRig.getX();
      const y = oilRig.getY();

      // Calculate polar coordinates relative to the center
      const dx = x - centerX;
      const dy = y - centerY;
      const radius = sqrt(dx * dx + dy * dy); // Distance from center
      let angle = atan2(dy, dx); // Angle relative to center

      // determine the distance between the current angle and the global angle

      const distAngle = distanceAngle(globalAngle, angle);

      const intensity = map(distAngle, 0, PI / 2, 255, 0, true); // Adjust as needed
      // Set the light properties for the current oilRig
      oilRig.setLight(intensity);

      // Optionally, you can also move the lights to their new positions
      // Uncomment this line if you want to update their display positions
      // oilRig.setPosition(newX, newY);
    }
  }
}

function displayColumn() {
  const activeColumn = floor(frameCount / 30) % oilRigMatrix[0].length;
  for (let c = 0; c < oilRigMatrix[0].length; c++) {
    for (let r = 0; r < oilRigMatrix.length; r++) {
      if (c == activeColumn) {
        oilRigMatrix[r][c].setLight(255);
      } else {
        oilRigMatrix[r][c].setLight(0);
      }
    }
  }
}

function displayTwinkle() {
  for (const oilRig of oilRigs) {
    const noiseVal = noise(
      oilRig.getX() / 100 + frameCount / 30,
      oilRig.getY() / 100
    );
    const lightVal = map(noiseVal, 0, 1, 0, 300);

    oilRig.setLight(lightVal);
  }
}

function displayTwinkle2() {
  for (const oilRig of oilRigs) {
    const noiseVal = noise(oilRig.seedVal, oilRig.getY() / 100);
    // const lightVal = map(noiseVal, 0, 1, 0, 255);

    let lightVal = 255 / 2 + (255 / 2) * sin(frameCount / 20 + noiseVal * 20);
    oilRig.setLight(lightVal);
  }
}

function displayBigDipper() {
  displayTwinkle();
}

function setBigDipper() {
  const numW = oilRigMatrix[0].length;
  const numH = oilRigMatrix.length;
  const spacing = 12;
  const dipperH = 4 * (oilRigs[0].getH() + spacing) - spacing;
  const dipperW = 6 * (oilRigs[0].getW() + spacing) - spacing;
  const startX = (width - dipperW) / 2;
  const startY = (height - dipperH) / 3;
  const frameW = oilRigs[0].getH() + spacing;

  for (const oilRig of oilRigs) {
    oilRig.isOff = true;
  }
  for (let i = 0; i < 7; i++) {
    oilRigs[i].isOff = false;
    oilRigs[i].setLight(255);
  }
  oilRigs[0].setPos(startX, startY);
  oilRigs[1].setPos(startX + frameW, startY);
  oilRigs[2].setPos(startX + frameW * 2, startY + frameW / 2);
  oilRigs[3].setPos(startX + frameW * 3, startY + frameW * 1.5);
  oilRigs[4].setPos(startX + frameW * 3.25, startY + frameW * 3);
  oilRigs[5].setPos(startX + frameW * 5, startY + frameW * 1.5);
  oilRigs[6].setPos(startX + frameW * 4.75, startY + frameW * 3);
}

function resetPositions() {
  for (const oilRig of oilRigs) {
    oilRig.resetPosition();
  }
}

function mediumDipper() {
  const dipperH = 3;
  const dipperW = 6;
  const startX = floor((numW - dipperW) / 2);
  const startY = floor((numH - dipperH) / 2);
  for (const oilRig of oilRigs) {
    oilRig.setLight(0);
  }
  setOilMatrixLight(startX, startY, 255);
  setOilMatrixLight(startX + 1, startY, 255);
  setOilMatrixLight(startX + 2, startY, 255);
  setOilMatrixLight(startX + 3, startY + 1, 255);
  setOilMatrixLight(startX + 3, startY + 2, 255);
  setOilMatrixLight(startX + 5, startY + 1, 255);
  setOilMatrixLight(startX + 5, startY + 2, 255);
}

function largeDipper() {
  const dipperH = 4;
  const dipperW = 6;
  const startX = floor((numW - dipperW) / 2);
  const startY = floor((numH - dipperH) / 2);
  for (const oilRig of oilRigs) {
    oilRig.setLight(0);
  }
  setOilMatrixLight(startX, startY, 255);
  setOilMatrixLight(startX + 1, startY, 255);
  setOilMatrixLight(startX + 2, startY + 1, 255);
  setOilMatrixLight(startX + 3, startY + 2, 255);
  setOilMatrixLight(startX + 4, startY + 3, 255);
  setOilMatrixLight(startX + 6, startY + 2, 255);
  setOilMatrixLight(startX + 6, startY + 3, 255);
}

function setOilMatrixLight(c, r, val) {
  if (
    r >= 0 &&
    r < oilRigMatrix.length &&
    c >= 0 &&
    c < oilRigMatrix[0].length
  ) {
    oilRigMatrix[r][c].setLight(val);
  }
}

function displaySin() {
  for (const oilRig of oilRigs) {
    const val =
      255 / 2 + (255 / 2) * sin(frameCount / 10 + oilRig.getX() / 100);
    oilRig.setLight(val);
  }
}

function displayTaurus() {
  displaySwirl();
}

function initOilRigs() {
  const borderW = 50;
  const borderH = 50;
  const dimX = 150;
  const dimY = 150;
  const spacing = 12;
  const numX = floor((width - borderW * 2) / (dimX + spacing));
  const numY = floor((height - borderH * 3) / (dimY + spacing));

  const totalW = numX * (dimX + spacing) - spacing;
  const totalH = numY * (dimY + spacing) - spacing;

  const startX = width / 2 - totalW / 2;
  const startY = (height - totalH) / 3;

  initDropdown(width / 2 - 150 / 2, startY + totalH + 26 + 23 / 2 + startY);

  oilRigMatrix = [];

  for (let r = 0; r < numY; r++) {
    oilRigMatrix[r] = [];
  }

  for (let c = 0; c < numX; c++) {
    for (let r = 0; r < numY; r++) {
      const x = startX + c * (dimX + spacing);
      const y = startY + r * (dimY + spacing);
      const oilRig = new OilRig(x, y, dimX, dimX - 26, oilRigImg, this);
      oilRigs.push(oilRig);

      oilRigMatrix[r][c] = oilRig;
    }
  }
}

////////// helpers
function normalizeAngle(angle) {
  // Normalize the angle to be in the range [0, 2π)
  const twoPi = 2 * Math.PI;
  return ((angle % twoPi) + twoPi) % twoPi;
}

function distanceAngle(globalAngle, localAngle) {
  const twoPi = 2 * Math.PI;

  // Normalize both angles to [0, 2π)
  const normalizedGlobal = normalizeAngle(globalAngle);
  const normalizedLocal = normalizeAngle(localAngle);

  // Compute the absolute difference
  const difference = Math.abs(normalizedGlobal - normalizedLocal);

  // Return the shortest distance, considering the wrap-around
  return Math.min(difference, twoPi - difference);
}
