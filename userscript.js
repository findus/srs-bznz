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

     function replace(element) {
        Array.from(element.childNodes.entries(), ([key, value]) => value).map(element => {
                    replace(element);
        });
        if (element.nodeType === Node.TEXT_NODE && (element.tagName !== "STYLE" && element.parentElement.nodeName !== "STYLE" && element.tagName !== "SCRIPT" && element.parentElement.nodeName !== "SCRIPT" ) ) {
            element.textContent = element.textContent.replace(/business/gi, 'BZNZ');
        }
    }


    // Your code here...
    // Select the node that will be observed for mutations
    const targetNode = document.body;

    replace(targetNode);

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };


    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            console.log(mutation);
            if (mutation.type === "childList") {
               // console.log("A child node has been added or removed.");
                //mutation.addedNodes.map(e => console.log("node"));
                Array.from(mutation.addedNodes.entries(), ([key, value]) => value).map(element => {
                    //replace(element);
                    replace(targetNode);
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
