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
