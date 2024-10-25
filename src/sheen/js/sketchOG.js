let stars = []; // Array to hold all the stars
let time = 0;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("p5-sketch");
  for (let i = 0; i < 200; i++) {
    // Adjust number for more or fewer stars
    stars.push({
      x: random(width), // Random x position
      y: random(height), // Random y position
      size: random(1, 4), // Random size for each star
      phase: random(TWO_PI), // Each star gets a different phase offset
    });
  }
}

function draw() {
  clear();
  time += 0.01; // Increment the time variable slowly for smooth animation

  // Draw each star
  for (let star of stars) {
    // Use the sine wave to calculate brightness
    let brightness = map(sin(time + star.phase), -1, 1, 0, 255);

    noStroke();
    fill(255, brightness); // Set star brightness
    ellipse(star.x, star.y, star.size, star.size); // Draw the star
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
