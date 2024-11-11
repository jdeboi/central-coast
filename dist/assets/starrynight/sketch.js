const oilRigs = [];
let oilMatrix;
let currentMode = "swirl";
let oilRigImg;
let dropdown;

function preload() {
  oilRigImg = loadImage("/central-coast/assets/starrynight/oilrig4.jpg");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("p5-sketch");

  initOilRigs();
  initDropdown();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  noStroke();
  fill(0, 100);
  rect(0, 0, width, height);
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

function initDropdown() {
  // Create a dropdown menu
  dropdown = createSelect();
  dropdown.parent("dropdown-container");
  dropdown.position(50, 50);

  // Add options to the dropdown
  dropdown.option("swirl");
  dropdown.option("taurus");
  dropdown.option("twinkle");

  // Listen for changes
  dropdown.changed(handleDropdownChange);
}

// Handle dropdown changes
function handleDropdownChange() {
  currentMode = dropdown.value();
}

function displayMode() {
  switch (currentMode) {
    case "swirl":
      displaySwirl();
      break;
    case "taurus":
      displayTaurus();
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

      // Add time-based rotation to the angle
      angle += swirlSpeed * frameCount;

      // Calculate new Cartesian coordinates for the swirl
      const newX = centerX + radius * cos(angle);
      const newY = centerY + radius * sin(angle);

      // Determine light intensity based on distance from center
      const intensity = map(radius, 0, maxRadius, 255, 0); // Adjust as needed

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
  const dimX = 100;
  const dimY = 100;
  const spacing = 20;
  const numX = floor((width - borderW * 2) / (dimX + spacing));
  const numY = floor((height - borderH * 2) / (dimY + spacing));

  const startX = width / 2 - (numX * (dimX + spacing)) / 2;
  const startY = height / 2 - (numY * (dimY + spacing)) / 2;
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
