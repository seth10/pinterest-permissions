/* background.js
 *
 * Copyright (c) 2016 Seth T
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'Snip it!',
    id: 'p^3 context menu',
    contexts: ['image']
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if(info.menuItemId == 'p^3 context menu') {
    snip(info.srcUrl);
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: 'ClickGetImg.js'
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    snip(request.image);
  });

function snip(imgUrl) {
  chrome.notifications.create({
    type: 'image',
    title: 'Snipped!',
    message: 'I like it.',
    iconUrl: 'icons/icon128.png',
    imageUrl: imgUrl,
    buttons: [
      { title: 'Me too!' },
      { title: 'Oops, undo that' }
    ]
  });
}
