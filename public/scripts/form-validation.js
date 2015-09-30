/*globals console, $*/
(function () {
  'use strict';
  //
  //  var inputs = document.getElementsByClassName('validate'),
  //    submit = document.querySelector('button[type="submit"]'),
  //    disabled = true,
  //    valid = false,
  //    i,
  //    watchForValid;
  //
  //  watchForValid = function (input) {
  //    input.addEventListener('change', function () {
  //      var value = input.value,
  //        replaced;
  //
  //      if (value.match(/^\s*$/)) {
  //        if (disabled) {
  //          return;
  //        }
  //        submit.className += " disabled";
  //        valid = false;
  //        disabled = true;
  //      } else {
  //        replaced = submit.className.replace(/\s*disabled/, "");
  //        submit.className = replaced;
  //        valid = true;
  //        disabled = false;
  //      }
  //    });
  //  };
  //
  //  for (i = 0; i < inputs.length; i += 1) {
  //    watchForValid(inputs[i]);
  //  }
  //
  //  submit.addEventListener('click', function (event) {
  //    if (!valid) {
  //      event.preventDefault();
  //      event.stopPropagation();
  //    }
  //  });
  //
  //}());


  $('form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serialize(),
      url = $(this).attr('action');
    console.log(url);

    $.post(url, data, function (data) {
      console.log(data);
    }, "json");
  });
}());
