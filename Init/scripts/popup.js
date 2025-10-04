import * as THREE from './scripts/three.module.js';
import { GLTFLoader } from './scripts/GLTFLoader.js';

// Render Pug.glb in popup using Three.js
const container = document.getElementById('dog-3d-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320/240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(320, 240);
container.appendChild(renderer.domElement);
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);
camera.position.z = 2.5;

const loader = new GLTFLoader();
loader.load('assets/Pug.glb', function(gltf) {
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
