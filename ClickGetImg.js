var clickGetImg = (function() {
  var count = 3;

  return function(event) {
    count--;
    if(event.target.src) {
      chrome.runtime.sendMessage({image: event.target.src});
      count = -1;
    }
    if(count <= 0){
      document.removeEventListener('click', clickGetImg);
      document.removeEventListener('mousemove', showSpotlight);
      // fade slowly if image clicked, but quickly if canceled
      spotlight.style.animation = `fadeOut ${count==-1?2:0.5}s`;
      spotlight.addEventListener('animationend', function() {
        document.body.removeChild(spotlight);
        document.head.removeChild(spotlightStyle);
      });
      document.body.style.cursor = 'auto';
    }
    event.preventDefault(); // if the image is a link, don't follow it
  }

})(); // closure/IIFE to hide count
document.addEventListener('click', clickGetImg, false);

document.body.style.cursor = 'crosshair';


var spotlight = document.createElement('div');
spotlight.id = 'spotlight';

var spotlightStyle = document.createElement('style');
spotlightStyle.type = 'text/css';
spotlightStyle.innerHTML = '.spotlight { \
  position: fixed; height: 100%; width: 100%; top: 0; left: 0; \
  z-index: 10; pointer-events: none; animation: fadeIn 1s; } \
  @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} } \
  @keyframes fadeOut { from {opacity: 1;} to {opacity: 0;} }';
  //pointer-events: none to click through spotlight div to element below
document.head.appendChild(spotlightStyle);
spotlight.className = 'spotlight';

document.body.appendChild(spotlight);

var showSpotlight = function(event) {
  const FULL_WHITE_RADIUS = 30, // GRADIENT_START_RADIUS
        BEGIN_FULL_GREY_RADIUS = 100, // GRADIENT_END_RADIUS
        DARKNESS = 0.5;
        document.getElementById('spotlight').style = `background: \
          radial-gradient(circle at ${event.x}px ${event.y}px, \
          transparent 0, transparent ${FULL_WHITE_RADIUS}px, \
          rgba(0, 0, 0, ${DARKNESS}) ${BEGIN_FULL_GREY_RADIUS}px);`;
}
document.addEventListener('mousemove', showSpotlight, false);
// display spotlight when the browser action is first invoked
document.dispatchEvent(new MouseEvent('mousemove', {
  'clientX': window.outerWidth-45,
  'clientY': 0
}));
