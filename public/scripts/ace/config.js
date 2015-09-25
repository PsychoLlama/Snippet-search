/*globals ace */
(function () {
  'use strict';

  var input = document.querySelector('input[name="codesnippet"]'),
    submit = document.querySelector('button[type="submit"]'),
    editor = ace.edit("ace-editor"),
    disabled = true,
    valid = false;

  editor.setTheme("ace/theme/GitHub");
  editor.setShowPrintMargin(false);
  editor.setFontSize(14);

  // TODO: add language dropdown
  // editor.getSession().setMode("ace/mode/javascript");

  editor.getSession().on('change', function () {
    var value = editor.getValue(),
      replaced;

    if (value.match(/^\s*$/)) {
      if (disabled) {
        return;
      }
      submit.className += " disabled";
      valid = false;
      disabled = true;
    } else {
      replaced = submit.className.replace(/\s*disabled/, "");
      submit.className = replaced;
      valid = true;
      disabled = false;
    }
    input.value = value;
  });

  submit.addEventListener('click', function (event) {
    if (!valid) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}());
