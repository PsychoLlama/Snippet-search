/*globals hljs*/
(function () {
  'use strict';

  var titles = document.querySelectorAll('.thumbnail h3'),
    descriptions = document.querySelectorAll('.thumbnail p'),
    setDefault,
    i;


  // Set default messages for the code snippet fields
  setDefault = function (nodeList, message) {

    for (i = 0; i < nodeList.length; i += 1) {
      var node = nodeList[i];

      if (node.innerHTML.match(/^\s*$/g)) {
        node.innerHTML = message;
        node.className += " text-muted";
      }
    }
  };

  setDefault(titles, 'No title');
  setDefault(descriptions, 'No description');

  hljs.initHighlightingOnLoad();
}());
