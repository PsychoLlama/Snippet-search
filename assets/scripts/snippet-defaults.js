/*globals hljs*/
(function () {
  'use strict';

  var titles = document.querySelectorAll('.thumbnail h3'),
    descriptions = document.querySelectorAll('.thumbnail p'),
    deleteButtons = document.querySelectorAll('.thumbnail button.btn-danger'),
    clicked = false,
    setDefault,
    button,
    warn,
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

  warn = function (e) {
    if (clicked) {
      return;
    }
    e.target.innerHTML = "Are you sure?";
    e.preventDefault();
    e.stopPropagation();
    clicked = true;
  };

  for (i = 0; i < deleteButtons.length; i += 1) {
    button = deleteButtons[i];
    button.addEventListener('click', warn);
  }

  setDefault(titles, 'No title');
  setDefault(descriptions, 'No description');

  hljs.initHighlightingOnLoad();
}());
