// ==UserScript==
// @name           mobileConsole
// @version        1.0
// @description    HTML JavaScript console
// @author         hnldesign
// @match          https://*/*
// @run-at         document-start
// @namespace      https://github.com/c-kick/mobileConsole
// @grant          none
// ==/UserScript==

(function () {
  let mobileConsole = document.createElement('script');
  mobileConsole.src = 'https://cdn.jsdelivr.net/gh/c-kick/mobileConsole/hnl.mobileconsole.min.js';
  document.head.appendChild(mobileConsole);
})()