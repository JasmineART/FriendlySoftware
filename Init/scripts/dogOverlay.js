import * as THREE from './scripts/three.module.js';
import { GLTFLoader } from './scripts/GLTFLoader.js';

if (!document.getElementById('dog-3d-overlay')) {
  const overlay = document.createElement('div');
  overlay.id = 'dog-3d-overlay';
  overlay.style.position = 'fixed';
  overlay.style.right = '30px';
  overlay.style.bottom = '15px';
  overlay.style.width = '320px';
  overlay.style.height = '240px';
  overlay.style.zIndex = '99999';
  overlay.style.background = 'rgba(0,0,0,0.0)';
  overlay.style.borderRadius = '12px';
  overlay.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  overlay.style.overflow = 'hidden';
  document.body.appendChild(overlay);

  const container = overlay;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 320/240, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(320, 240);
  container.appendChild(renderer.domElement);
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);
  camera.position.z = 2.5;
  const loader = new GLTFLoader();
  loader.load(chrome.runtime.getURL('assets/demodog.glb'), function(gltf) {
    const model = gltf.scene;
  model.rotation.x = 0;
  model.rotation.y = Math.PI;
  scene.add(model);
  animate();
  }, undefined, function(error) {
    console.error('Error loading GLB:', error);
  });
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
}
