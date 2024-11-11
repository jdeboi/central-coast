import * as THREE from "three";
import { generatePerlinNoise } from "perlin-noise";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { IridescentMaterial } from "./js/IridescentMaterial.js";
import { ThinFilmFresnelMap } from "./js/ThinFilmFresnelMap.js";
import { SkyMaterial } from "./js/SkyMaterial.js";

let container, camera, scene, renderer, composer, pointLight;
let iridescenceLookUp, iridescenceMaterial, torus, plane;
let noiseArray; // Store noise array for use in animation
let gltfModel;
const size = 100; // Dimensions of the noise map
let time = 0; // Time variable for animation

init();
generateTerrain();
animate();

function init() {
  iridescenceLookUp = new ThinFilmFresnelMap();

  // Set up container, scene, camera, and renderer
  container = document.getElementById("container");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera();
  camera.position.set(0, 0, 50);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); // the default

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const skySize = 1000;
  let skyGeom = new THREE.BoxGeometry(skySize, skySize, skySize);
  let radiance = loadCubeMap("/central-coast/assets/sheen/skybox/radiance");
  let irradiance = loadCubeMap("/central-coast/assets/sheen/skybox/irradiance");
  let skyboxMaterial = new SkyMaterial(radiance);
  let skyBox = new THREE.Mesh(skyGeom, skyboxMaterial);
  // scene.add(skyBox);

  let torusGeom = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  iridescenceMaterial = new IridescentMaterial(
    irradiance,
    radiance,
    iridescenceLookUp
  );
  iridescenceMaterial.boost = 7;
  iridescenceMaterial.refractiveIndex = 6;

  // torus = new THREE.Mesh(torusGeom, iridescenceMaterial);
  // scene.add(torus);

  const planeW = window.innerWidth * 0.135;
  const geometry = new THREE.PlaneGeometry(planeW, 30, planeW / 2, 30);

  plane = new THREE.Mesh(geometry, iridescenceMaterial);
  plane.position.set(0, -10, -100);
  plane.rotation.x = -1; //-Math.PI / 2; // Rotate plane to be horizontal
  scene.add(plane);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Add ambient light
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
  light.position.set(100, 200, 100); // Adjust light position
  scene.add(light);

  loadGLTFModel("/central-coast/assets/sheen/oilrig/scene.gltf");

  //   // Handle resizing
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the torus knot for some animation
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;

  applyPerlinNoiseToTerrain(plane.geometry, time);
  time += 0.03;

  if (gltfModel) {
    gltfModel.rotation.y += 0.01; // Spin the model
  }

  // Render the scene
  composer ? composer.render() : renderer.render(scene, camera);
}

function loadCubeMap(path) {
  var files = [
    path + "/posX.jpg",
    path + "/negX.jpg",
    path + "/posY.jpg",
    path + "/negY.jpg",
    path + "/posZ.jpg",
    path + "/negZ.jpg",
  ];

  var loader = new THREE.CubeTextureLoader();
  return loader.load(files);
}

function generateTerrain() {
  // Generate Perlin noise once and store it
  noiseArray = generatePerlinNoise(size, size, {
    amplitude: 10, // Height of the terrain
    frequency: 1.5,
    persistence: 0.8,
    lacunarity: 2,
  });
}

function applyPerlinNoiseToTerrain(geometry, time) {
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);

    // Normalize x and y to fit into noiseArray dimensions
    const nx = Math.floor((x / 200) * size + size / 2) % size;
    const ny = Math.floor((y / 200) * size + size / 2) % size;

    // Ensure nx and ny are within valid range
    const index = nx + ny * size;

    // Modify the z value based on time to create movement effect
    const z = noiseArray[index] * 10 + Math.sin(time + index * 0.1) * 2; // Oscillate terrain height
    position.setZ(i, z);
  }

  position.needsUpdate = true; // Update position buffer
  geometry.computeVertexNormals(); // Update normals for lighting
  geometry.computeTangents();
}

function loadGLTFModel(path) {
  const loader = new GLTFLoader();
  loader.load(
    path,
    function (gltf) {
      gltfModel = gltf.scene;
      gltfModel.position.set(0, -10, 0); // Adjust position as needed
      gltfModel.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
      scene.add(gltfModel);
    },
    undefined,
    function (error) {
      console.error("An error occurred while loading the GLTF model:", error);
    }
  );
}
