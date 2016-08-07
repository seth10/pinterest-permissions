var clickGetImg = (function() {
  var count = 3;

  return function(event) {
    count--;
    if(event.target.src) {
      chrome.runtime.sendMessage({image: event.target.src});
      count = 0;
    }
    if(count == 0){
      document.removeEventListener('click', clickGetImg);
      document.body.style.cursor = 'auto';
    }
  }

})();

document.addEventListener('click', clickGetImg, false);
document.body.style.cursor = 'crosshair';
