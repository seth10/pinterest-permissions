function clickGetImg(event) {
  if(event.target.src) {
    chrome.runtime.sendMessage({image: event.target.src})
    document.removeEventListener('click', clickGetImg);
  }
}

document.addEventListener('click', clickGetImg, false);
