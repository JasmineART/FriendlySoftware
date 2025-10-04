// Render 6616.stl in popup using Three.js
const container = document.getElementById('dog-3d-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320/240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(320, 240);
container.appendChild(renderer.domElement);
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);
camera.position.z = 70;

const loader = new THREE.STLLoader();
loader.load('assets/6616.stl', function (geometry) {
	const material = new THREE.MeshPhongMaterial({ color: 0x888888, specular: 0x111111, shininess: 200 });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.x = -0.5 * Math.PI;
	scene.add(mesh);
	animate();
}, undefined, function (error) {
	console.error('Error loading STL:', error);
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
