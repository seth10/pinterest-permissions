document.addEventListener('click', function clickGetImg(){
  if(event.target.src) {
    chrome.runtime.sendMessage({image: event.target.src})
    document.removeEventListener('click', clickGetImg);
  }
}, false);
