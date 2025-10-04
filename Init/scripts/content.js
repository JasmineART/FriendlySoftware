// Content script for multimedia and screen interaction
console.log('Content script loaded.');

// Example: Add overlay to page
if (!document.getElementById('multimedia-overlay')) {
  const overlay = document.createElement('div');
  overlay.id = 'multimedia-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '10px';
  overlay.style.right = '10px';
  overlay.style.zIndex = '9999';
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.color = '#fff';
  overlay.style.padding = '10px';
  overlay.style.borderRadius = '8px';
  overlay.innerText = 'Extension Active';
  document.body.appendChild(overlay);
}
