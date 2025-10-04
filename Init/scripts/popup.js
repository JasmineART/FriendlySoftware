document.getElementById('play-audio').onclick = function() {
  const audio = new Audio('assets/sample.mp3');
  audio.play();
};

document.getElementById('play-video').onclick = function() {
  const output = document.getElementById('output');
  output.innerHTML = '<video src="assets/sample.mp4" controls width="300"></video>';
};

document.getElementById('capture-screen').onclick = async function() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.width = 300;
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').appendChild(video);
  } catch (err) {
    alert('Screen capture failed: ' + err);
  }
};

// 3D Dog Model Integration
let dogModel, mixer, actions = {};
const dogContainer = document.getElementById('dog-3d-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320/240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(320, 240);
dogContainer.appendChild(renderer.domElement);
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);
camera.position.z = 2.5;

const loader = new THREE.GLTFLoader();
loader.load('assets/dog.glb', function(gltf) {
  dogModel = gltf.scene;
  scene.add(dogModel);
  if (gltf.animations && gltf.animations.length) {
    mixer = new THREE.AnimationMixer(dogModel);
    gltf.animations.forEach((clip) => {
      actions[clip.name] = mixer.clipAction(clip);
    });
  }
  animate();
}, undefined, function(error) {
  console.error('Error loading dog model:', error);
});

function animate() {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(0.016);
  renderer.render(scene, camera);
}

// Dog Bark Audio
const dogBarkAudio = new Audio('assets/dog-bark.mp3');

// Dog Action Button
const dogActionBtn = document.getElementById('dog-action');
dogActionBtn.onclick = function() {
  // Pick a random animation from available actions
  const animNames = Object.keys(actions);
  if (animNames.length) {
    const randomAnim = animNames[Math.floor(Math.random() * animNames.length)];
    for (const name in actions) actions[name].stop();
    actions[randomAnim].reset().play();
    if (randomAnim.toLowerCase().includes('bark')) dogBarkAudio.play();
  } else {
    // Fallback: just play bark audio
    dogBarkAudio.play();
  }
};
