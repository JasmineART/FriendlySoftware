// Content script to inject a floating 3D dog viewer overlay at the bottom right
// Inject dogOverlay.js as a module script to avoid inline script CSP issues
const script = document.createElement('script');
script.type = 'module';
script.src = chrome.runtime.getURL('scripts/dogOverlay.js');
document.body.appendChild(script);
