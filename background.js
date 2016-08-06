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
    alert('Cool!');
  }
});