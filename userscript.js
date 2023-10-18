// ==UserScript==
// @name         🅱znz
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

      function checkIfInsideEditor(element) {
         if (element !== null && element.nodeName === "FILE-ATTACHMENT") {
             return true;
         } else {
               if (element !== null && element.parentNode !== undefined) {
                   return checkIfInsideEditor(element.parentNode);
               } else {
                   return false;
               }
         }
     }

     function replace(element) {
        Array.from(element.childNodes.entries(), ([key, value]) => value).map(element => {
                    replace(element);
        });
        var isEditor = checkIfInsideEditor(element);
        if (element.nodeType === Node.TEXT_NODE && (isEditor === false
                                                    && element.nodeName !== "FILE-ATTACHMENT"
                                                    && element.tagName !== "STYLE"
                                                    && element.parentElement.nodeName !== "STYLE"
                                                    && element.tagName !== "SCRIPT"
                                                    && element.parentElement.nodeName !== "SCRIPT" )
           ) {
            element.textContent = element.textContent.replace(/[b🅱]usiness/gi, 'BZNZ');
        }
    }


    // Your code here...
    // Select the node that will be observed for mutations
    const targetNode = document.body;

    replace(targetNode);

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };


    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                Array.from(mutation.addedNodes.entries(), ([key, value]) => value).map(element => {
                    setTimeout(() => {
                        replace(element);
                                     }, 10)
                });
            } else if (mutation.type === "attributes") {
               // console.log(`The ${mutation.attributeName} attribute was modified.`);
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

})();
