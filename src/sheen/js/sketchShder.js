// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

var ranges;
let seed = Math.random() * 1241;
var mySize;
let theShader;
let webGLCanvas;
let originalGraphics;

// colors
let colors1 = "e63946-f1faee-a8dadc-457b9d-1d3557"
  .split("-")
  .map((a) => "#" + a);
let colors2 = "264653-2a9d8f-e9c46a-f4a261-e76f51"
  .split("-")
  .map((a) => "#" + a);
let colorsbg = "f123ff-fffC8C-fff8f9".split("-").map((a) => "#" + a);
let color1, color2;
let colorselet = [];
let plus, margin;
let tile_count = 10;
let h_size;
let stroke_weight = 0;

function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  pixelDensity(3);
  randomSeed(seed);
  mySize = 150; //min(windowWidth, windowHeight);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("p5-sketch");

  webGLCanvas = createGraphics(mySize, height, WEBGL);
  originalGraphics = createGraphics(mySize, height);

  margin = (mySize / sqrt(noise())) * 100;
  ranges = 50 / 2;
  stroke_weight = random(sqrt(noise()) * 10, 25);

  plus = 0;
  colorselet[0] = random(colors2);
  colorselet[1] = random(colors2);
  colorselet[2] = random(colors1);
  colorselet[3] = random(colors2);
  colorselet[4] = random(colors2);
  h_size = int(sqrt(noise()) * random(3, 12));
  let filter1 = new makeFilter();
  background(random(colorsbg));
}

function draw() {
  randomSeed(seed);
  frameRate(20);

  webGLCanvas.shader(theShader);
  theShader.setUniform("u_resolution", [mySize / mySize, height / height]);
  theShader.setUniform("u_time", millis() / 1000);
  theShader.setUniform("u_mouse", [mouseX / mySize, mouseY / height]);
  theShader.setUniform("u_tex", originalGraphics);
  webGLCanvas.clear();

  webGLCanvas.rect(-mySize / 2, -height / 2, mySize, height);
  let H = 1 * random(0.25, 0.75);
  let aa = 1 * random(1, 0.8);
  let res = random(1, 5) * random(0.005, 0.001);

  originalGraphics.noFill();
  originalGraphics.strokeWeight(stroke_weight);

  for (let j = 0; j < 4; j++) {
    originalGraphics.push();
    originalGraphics.translate(0, -height + (j * height) / 3);
    randomSeed(seed * j);
    noiseSeed(seed * j);
    for (let i = 0; i < ranges; i++) {
      originalGraphics.stroke(random(colorselet));
      drawingContext.shadowColor = random(colors2);
      drawingContext.shadowOffsetX = 1;
      drawingContext.shadowOffsetY = 1;
      drawingContext.shadowBlur = 0;

      originalGraphics.beginShape();

      for (let x = -mySize * 1; x < mySize * 2; x += 10) {
        let n = noise(x * 0.01, i * 0.01, frameCount * res);
        let y = map(n, 0, 1, height * aa, height * H);
        // vertex(x + 2*(plus+10), y - plus);
        originalGraphics.curveVertex(x + 1 * (plus - 5), y - plus);
      }
      originalGraphics.endShape();
    }
    originalGraphics.pop();
    if (stroke_weight < 0.5) {
      stroke_weight -= 1;
    }
  }

  push();
  for (let i = 0; i < 10; i++) {
    translate(mySize, 0);
    image(webGLCanvas, 0, 0);
  }
  pop();

  image(webGLCanvas, 0, 0);
  if (plus > -height / 2) {
    plus -= 10 * random(0.05, 0.15);
    image(overAllTexture, 0, 0);
  } else {
    strokeWeight(sqrt(noise()) * random(0.1, 0.05));
    stroke(str(random(colors2)) + "1a");
    noStroke;
    noFill();
    drawingContext.setLineDash([1, 1, 1, 1]);
    drawOverPattern();
    //frame
    noFill();
    stroke("#202020");
    noStroke();
    strokeWeight(margin);
    rect(0, 0, mySize, height);
    noLoop();
  }
}

//save
function keyTyped() {
  //   if (key === "s" || key === "S") {
  //     noLoop();
  //     saveCanvas("0903_Blue Mood_10_2022", "png");
  //   }
}

// filter
function makeFilter() {
  randomSeed(seed);
  colorMode(HSB, sqrt(noise()) * 360, 100, 100, 100);
  drawingContext.shadowColor = color(0, 0, 5, 5);
  overAllTexture = createGraphics(windowWidth, windowHeight);
  overAllTexture.loadPixels();
  for (var i = 0; i < mySize; i++) {
    for (var j = 0; j < height; j++) {
      overAllTexture.set(
        i,
        j,
        color(0, 10, 70, noise(i / 3, j / 3, (i * j) / 50) * random(10, 25))
      );
    }
  }
  overAllTexture.updatePixels();
}

function drawOverPattern() {
  push();
  translate(mySize / 2, height / 2);
  rotate(-PI / 2);

  let s = (mySize / 2) * sqrt(3) - 2;
  let n = 4;

  for (let theta = 0; theta < TWO_PI; theta += TWO_PI / 6) {
    // noprotect
    divideOP(
      0,
      0,
      s * cos(theta),
      s * sin(theta),
      s * cos(theta + TWO_PI / 6),
      s * sin(theta + TWO_PI / 6),
      n
    );
  }
  pop();
}

function prop(x1, y1, x2, y2, k) {
  let x3 = (1 - k) * x1 + k * x2;
  let y3 = (1 - k) * y1 + k * y2;
  return [x3, y3];
}

function divideOP(x1, y1, x2, y2, x3, y3, n) {
  if (n > 1) {
    let [xA, yA] = prop(x1, y1, x2, y2, 1 / 3);
    let [xB, yB] = prop(x1, y1, x2, y2, 2 / 3);
    let [xC, yC] = prop(x2, y2, x3, y3, 1 / 3);
    let [xD, yD] = prop(x2, y2, x3, y3, 2 / 3);
    let [xE, yE] = prop(x3, y3, x1, y1, 1 / 3);
    let [xF, yF] = prop(x3, y3, x1, y1, 2 / 3);
    let [xG, yG] = prop(xF, yF, xC, yC, 1 / 2);
    divideOP(x1, y1, xA, yA, xF, yF, n - 1);
    divideOP(xA, yA, xB, yB, xG, yG, n - 1);
    divideOP(xB, yB, x2, y2, xC, yC, n - 1);
    divideOP(xG, yG, xF, yF, xA, yA, n - 1);
    divideOP(xC, yC, xG, yG, xB, yB, n - 1);
    divideOP(xF, yF, xG, yG, xE, yE, n - 1);
    divideOP(xG, yG, xC, yC, xD, yD, n - 1);
    divideOP(xD, yD, xE, yE, xG, yG, n - 1);
    divideOP(xE, yE, xD, yD, x3, y3, n - 1);
  } else {
    makeTriangle([x1, y1], [x2, y2], [x3, y3]);
  }
}

function makeTriangle(v1, v2, v3) {
  let points = shuffle([v1, v2, v3]);
  let [x1, y1] = points[0];
  let [x2, y2] = points[1];
  let [x3, y3] = points[2];
  let iStep = 1 / pow(2, floor(random(4, 2)));
  noStroke();
  for (let i = 0; i < 1; i += iStep) {
    // noprotect
    let [x4, y4] = prop(x1, y1, x2, y2, 1 - i);
    let [x5, y5] = prop(x1, y1, x3, y3, 1 - i);
    triangle(x1, y1, x4, y4, x5, y5);
  }
}

const frag_functions_default = `
  #define PI 3.141592653589793
  #define TAU 6.283185307179586
	
	float rand(vec2 c){
		return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}

	mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
	}

	mat2 scale2d(vec2 _scale){
			return mat2(_scale.x,0.0,
									0.0,_scale.y);
	}

	vec2 tile (vec2 _st, float _zoom) {
			_st *= _zoom;
			return fract(_st);
	}

	//	Classic Perlin 3D Noise 
	//	by Stefan Gustavson

	vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
	vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
	vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

	float cnoise(vec3 P){
		vec3 Pi0 = floor(P); // Integer part for indexing
		vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
		Pi0 = mod(Pi0, 289.0);
		Pi1 = mod(Pi1, 289.0);
		vec3 Pf0 = fract(P); // Fractional part for interpolation
		vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
		vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
		vec4 iy = vec4(Pi0.yy, Pi1.yy);
		vec4 iz0 = Pi0.zzzz;
		vec4 iz1 = Pi1.zzzz;

		vec4 ixy = permute(permute(ix) + iy);
		vec4 ixy0 = permute(ixy + iz0);
		vec4 ixy1 = permute(ixy + iz1);

		vec4 gx0 = ixy0 / 7.0;
		vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
		gx0 = fract(gx0);
		vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
		vec4 sz0 = step(gz0, vec4(0.0));
		gx0 -= sz0 * (step(0.0, gx0) - 0.5);
		gy0 -= sz0 * (step(0.0, gy0) - 0.5);

		vec4 gx1 = ixy1 / 7.0;
		vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
		gx1 = fract(gx1);
		vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
		vec4 sz1 = step(gz1, vec4(0.0));
		gx1 -= sz1 * (step(0.0, gx1) - 0.5);
		gy1 -= sz1 * (step(0.0, gy1) - 0.5);

		vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
		vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
		vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
		vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
		vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
		vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
		vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
		vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

		vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
		g000 *= norm0.x;
		g010 *= norm0.y;
		g100 *= norm0.z;
		g110 *= norm0.w;
		vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
		g001 *= norm1.x;
		g011 *= norm1.y;
		g101 *= norm1.z;
		g111 *= norm1.w;

		float n000 = dot(g000, Pf0);
		float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
		float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
		float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
		float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
		float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
		float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
		float n111 = dot(g111, Pf1);

		vec3 fade_xyz = fade(Pf0);
		vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
		vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
		float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
		return 2.2 * n_xyz;
	}
	
	
float noise(vec2 p, float freq ){
	float unit = 1./freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(PI*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

	
	float pNoise(vec2 p, int res){
		// p+=u_noise_pan;
		float persistance = .5;
		float n = 0.;
		float normK = 0.;
		float f = 4.;
		float amp = 1.;
		int iCount = 0;
		//noprotect
		for (int i = 0; i<50; i++){
			n+=amp*noise(p, f);
			f*=2.;
			normK+=amp;
			amp*=persistance;
			if (iCount == res) break;
			iCount++;
		}
		float nf = n/normK;
		return nf*nf*nf*nf;
	}

	vec2 random2( vec2 p ) {
			return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
	}

`;

const frag = `
	precision highp float;

	uniform vec2 u_resolution;
	uniform vec2 u_mouse;
	uniform float u_time;
	uniform vec3 u_lightDir;
	uniform vec3 u_col;
	uniform mat3 uNormalMatrix;
	uniform float u_pixelDensity;
	uniform sampler2D u_tex;

	//attributes, in
	varying vec4 var_centerGlPosition;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

	${frag_functions_default}

	void main(){
		vec2 st = var_vertTexCoord.xy /u_resolution; 

    st.x += cnoise( vec3(st*2., 1.) )/50.0;  
    st.y += cnoise( vec3(st*5., 1.) )/50.0;  
		
		st.x += pNoise( st, 5 );
		st.y += pNoise( st, 5 );
			
		vec3 color = vec3(0.);
		vec4 texColor = texture2D(u_tex, st);
		
		
		
		gl_FragColor= vec4(color,1.0)+texColor;
	}
`;

//ref 3d shader from https://www.openprocessing.org/sketch/881537

const vert = `
	precision highp float;

    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;
		varying vec4 var_centerGlPosition;//原点
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;
		uniform float u_time;


    void main() {
      vec3 pos = aPosition;
			vec4 posOut = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
      gl_Position = posOut;

      // set out value
      var_vertPos      = pos;
      var_vertNormal   =  aNormal;
      var_vertTexCoord = aTexCoord;
			var_centerGlPosition = uProjectionMatrix * uModelViewMatrix * vec4(0., 0., 0.,1.0);
    }
`;
