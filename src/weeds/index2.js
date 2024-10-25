import * as THREE from "three";
import { EffectComposer } from "postprocessing";
import { RenderPass } from "postprocessing";
import { GodraysPass } from "three-good-godrays";

import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

let container, camera, scene, renderer, composer, pointLight;

let controls;
let mesh, texture;
const worldWidth = 256,
  worldDepth = 256;
const clock = new THREE.Clock();

init();
animate();

function init() {
  // Set up container, scene, camera, and renderer
  container = document.getElementById("container");

  scene = new THREE.Scene();
  const col = 0x002244;
  scene.background = new THREE.Color(col);
  scene.fog = new THREE.FogExp2(col, 0.0025);

  const data = generateHeight(worldWidth, worldDepth);
  //   camera = new THREE.PerspectiveCamera(
  //     60,
  //     window.innerWidth / window.innerHeight,
  //     1,
  //     10000
  //   );

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  //   camera.position.set(0, 50, 150);

  camera.position.set(100, 800, -800);
  camera.lookAt(-100, 810, -800);

  const geometry = new THREE.PlaneGeometry(
    7500,
    7500,
    worldWidth - 1,
    worldDepth - 1
  );
  geometry.rotateX(-Math.PI / 2);

  const vertices = geometry.attributes.position.array;

  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 1] = data[i] * 10;
  }

  texture = new THREE.CanvasTexture(
    generateTexture(data, worldWidth, worldDepth)
  );
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ map: texture })
  );
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 10; // 150;
  controls.lookSpeed = 0.05;

  // Set up lighting (Godrays source)
  pointLight = new THREE.PointLight(col, 1, 100);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.position.set(-100, 810, -800);
  scene.add(pointLight);

  // Set up a simple mesh (e.g., a cube) casting shadows
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0, 810, -800);
  cube.castShadow = true;
  scene.add(cube);

  // Set up the ground plane
  const planeGeometry = new THREE.PlaneGeometry(200, 200);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  // Set up postprocessing
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Set up Godrays pass
  const godraysPass = new GodraysPass(pointLight, camera, {
    density: 1 / 128,
    maxDensity: 0.5,
    edgeStrength: 2,
    edgeRadius: 2,
    distanceAttenuation: 2,
    color: new THREE.Color(0xffffff),
    raymarchSteps: 60,
    blur: true,
    gammaCorrection: true,
  });
  godraysPass.renderToScreen = true;
  composer.addPass(godraysPass);

  // Handle resizing
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update(clock.getDelta());
  composer.render();
}

function generateHeight(width, height) {
  let seed = Math.PI / 4;
  window.Math.random = function () {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const size = width * height,
    data = new Uint8Array(size);
  const perlin = new ImprovedNoise(),
    z = Math.random() * 100;

  let quality = 1;

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = ~~(i / width);
      data[i] += Math.abs(
        perlin.noise(x / quality, y / quality, z) * quality * 1.75
      );
    }

    quality *= 5;
  }

  return data;
}

function generateTexture(data, width, height) {
  let context, image, imageData, shade;

  const vector3 = new THREE.Vector3(0, 0, 0);

  const sun = new THREE.Vector3(1, 1, 1);
  sun.normalize();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext("2d");
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  image = context.getImageData(0, 0, canvas.width, canvas.height);
  imageData = image.data;

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
    vector3.x = data[j - 2] - data[j + 2];
    vector3.y = 2;
    vector3.z = data[j - width * 2] - data[j + width * 2];
    vector3.normalize();

    shade = vector3.dot(sun);

    imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
    imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
    imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
  }

  context.putImageData(image, 0, 0);

  // Scaled 4x

  const canvasScaled = document.createElement("canvas");
  canvasScaled.width = width * 4;
  canvasScaled.height = height * 4;

  context = canvasScaled.getContext("2d");
  context.scale(4, 4);
  context.drawImage(canvas, 0, 0);

  image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
  imageData = image.data;

  for (let i = 0, l = imageData.length; i < l; i += 4) {
    const v = ~~(Math.random() * 5);

    imageData[i] += v;
    imageData[i + 1] += v;
    imageData[i + 2] += v;
  }

  context.putImageData(image, 0, 0);

  return canvasScaled;
}
