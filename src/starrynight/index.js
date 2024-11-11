import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


let container, camera, scene, renderer, composer, pointLight;
let gltfModel;
const size = 100; // Dimensions of the noise map
let time = 0; // Time variable for animation

init();
animate();

function init() {
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

  if (gltfModel) {
    gltfModel.rotation.y += 0.01; // Spin the model
  }

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
