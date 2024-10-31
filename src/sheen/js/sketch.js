const { Engine, World, Body, Bodies, Composite, Constraint, Vector } = Matter;
let dolphin;
let engine,
  world,
  circles = [],
  boundaries = [],
  catapults = [],
  shader,
  shader2,
  shaderGraphics,
  ballGraphics;

const MAX_CIRCLES = 600;
const fragSrc1 = `
// https://editor.p5js.org/jwong/sketches/Cn2z2G-to
precision highp float;
uniform sampler2D tex0;
varying vec2 vTexCoord;
uniform vec2 texelSize;
uniform vec2 canvasSize;
uniform float kernelSize;
const int MAX_KERNEL_SIZE = 100; // arbitrary limit
float getGaussianWeightAt(vec2 pos, float kernelSize) {
	// evenly distributed weights, for testing:
	// return 1.0 / kernelSize;
	// mathy distribution of weights, based on position in kernel:
	// (needs some fixing)
	float sq = pos.x*pos.x + pos.y*pos.y;
	float gaussianCoefficient = exp( -sq / (1.0 * kernelSize * kernelSize) );
	return gaussianCoefficient / (2.0 * 3.14159 * kernelSize);
}
void main() {
	vec2 pos = vTexCoord;
	vec4 accumColor = vec4(0.0);
	float accumWeight = 0.0;
	vec2 neighborOffset = vec2(0.0);
	// progressively sample further out from current position
	for (int j = 0; j < MAX_KERNEL_SIZE; j++) {
		if (j >= int(kernelSize)) break;
		neighborOffset.y = -0.5 * (kernelSize - 1.0) + float(j);
		for (int i = 0; i < MAX_KERNEL_SIZE; i++) {
			if (i >= int(kernelSize)) break;
			neighborOffset.x = -0.5 * (kernelSize - 1.0) + float(i);
			// accumulate neighbor color
			float weight = getGaussianWeightAt(neighborOffset, kernelSize);
			accumColor += weight * texture2D(tex0, pos + neighborOffset * texelSize);
			accumWeight += weight;
		}
	}
	gl_FragColor = accumColor / accumWeight;
}`;
const fragSrc2 = `
precision highp float;
uniform sampler2D tex0;
varying vec2 vTexCoord;
void main() {
  vec4 color = texture2D(tex0, vTexCoord);
  if (color.r > 0.75) {
    color = vec4(1.0, 1.0, 1.0, 1.0);
  } else if (color.r > 0.6) {
    color = vec4(0.2, 0.2, 0.2, 1.0);
  } else if (color.r > 0.4) {
    color = vec4(0.1, 0.1, 0.1, 1.0);
  } else {
    color = vec4(0.0, 0.0, 0.0, 1.0);
  }
  gl_FragColor = color;
}`;

function preload() {
  dolphin = loadImage("./assets/dolphin.png");
}

function setup() {
  let cnv = createCanvas(650, 650, WEBGL);
  cnv.parent("p5-sketch");

  ballGraphics = createGraphics(width, height, WEBGL);
  shaderGraphics = createGraphics(width / 5, height / 5, WEBGL);
  engine = Engine.create();
  world = engine.world;
  catapults.push(new Catapult());
  boundaries.push(new Boundary(-210, -240, 500, 8, 0.3));
  boundaries.push(new Boundary(321, 0, 500, 8, Math.PI / 2));
  boundaries.push(new Boundary(-320, 0, 300, 8, Math.PI / 2));
  boundaries.push(new Boundary(0, 260, 280, 8, 0));
  boundaries.push(new Boundary(-220, 160, 200, 8, 0.1));

  for (let i = 0; i < MAX_CIRCLES; i++) {
    circles.push(
      new Circle(100 * Math.random(), -height / 2 - 150 * Math.random(), 7)
    );
  }
  shader = shaderGraphics.createFilterShader(fragSrc1);
  shader.setUniform("kernelSize", 10);
  shader2 = createFilterShader(fragSrc2);
}

function mouseDragged() {
  circles.push(new Circle(-width / 2 + mouseX, -height / 2 + mouseY, 6));
}

function draw() {
  clear();
  for (let i = circles.length - 1; i >= 0; i--) {
    if (circles[i].body.position.y > height) {
      circles[i].removeFromWorld();
      circles.splice(i, 1);
    }
  }
  if (circles.length < MAX_CIRCLES) {
    let less = MAX_CIRCLES - circles.length;
    for (let i = 0; i < less; i++) {
      circles.push(
        new Circle(10 * Math.random(), -height / 2 - 10 * Math.random(), 7)
      );
    }
  }
  Engine.update(engine);

  ballGraphics.clear();
  ballGraphics.background(255);
  for (let i = 0; i < circles.length; i++) {
    circles[i].show(ballGraphics);
  }
  shaderGraphics.clear();
  shaderGraphics.image(
    ballGraphics,
    -shaderGraphics.width / 2,
    -shaderGraphics.height / 2,
    shaderGraphics.width,
    shaderGraphics.height
  );
  shaderGraphics.filter(shader);
  image(shaderGraphics, -width / 2, -height / 2, width, height);
  filter(shader2);

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
  for (let i = 0; i < catapults.length; i++) {
    catapults[i].show();
  }
}

function Catapult() {
  this.w = 230;
  this.h = 100;
  var catapult = Bodies.rectangle(150, 0, this.w, this.h);
  Composite.add(world, [
    catapult,
    Constraint.create({
      bodyA: catapult,
      pointB: Vector.clone(catapult.position),
      stiffness: 1,
      length: 0,
    }),
  ]);
  this.catapult = catapult;
  this.show = function () {
    let pos = catapult.position;
    let angle = catapult.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    imageMode(CENTER);

    noStroke();
    fill(160);

    image(dolphin, 0, 0, this.w, this.h);
    // rect(0, 0, this.w, this.h);
    pop();
  };
}

function Boundary(x, y, w, h, a) {
  let options = {
    friction: 0,
    restitution: 0.2,
    angle: a,
    isStatic: true,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  Composite.add(world, this.body);

  this.show = function () {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(160);
    rect(0, 0, this.w, this.h);
    pop();
  };
}

function Circle(x, y, r) {
  let options = {
    friction: 0,
    restitution: 0.2,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  Composite.add(world, this.body);

  this.removeFromWorld = function () {
    Composite.remove(world, this.body);
  };

  this.show = function (g) {
    let pos = this.body.position;
    let angle = this.body.angle;
    g.push();
    g.translate(pos.x, pos.y);
    g.rotate(angle);
    g.rectMode(CENTER);
    g.strokeWeight(1);
    g.noStroke();
    g.fill("black");
    g.ellipse(0, 0, this.r * 2);
    g.pop();
  };
}
