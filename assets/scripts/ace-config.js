/*globals ace */
(function () {
  'use strict';

  var input = document.querySelector('input[name="codesnippet"]'),
    editor = ace.edit("ace-editor");

  editor.setTheme("ace/theme/GitHub");
  editor.setShowPrintMargin(false);
  editor.setFontSize(14);

  // TODO: add language dropdown
  // editor.getSession().setMode("ace/mode/javascript");

  editor.getSession().on('change', function () {
    input.value = editor.getValue();
  });
}());
