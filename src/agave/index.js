import * as THREE from "three";
import { EffectComposer } from "postprocessing";
import { RenderPass } from "postprocessing";
import { GodraysPass } from "three-good-godrays";

let container, camera, scene, renderer, composer, pointLight;

init();
animate();

function init() {
  // Set up container, scene, camera, and renderer
  container = document.getElementById("container");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 50, 150);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Set up lighting (Godrays source)
  pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.position.set(0, 50, 0);
  scene.add(pointLight);

  // Set up a simple mesh (e.g., a cube) casting shadows
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 10;
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
}

function animate() {
  requestAnimationFrame(animate);
  composer.render();
}
