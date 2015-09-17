(function () {

    var titles = document.querySelectorAll('.thumbnail h3'),
        descriptions = document.querySelectorAll('.thumbnail p'),
        codeBlocks = document.getElementsByTagName('code'),
        placeholder = "window.onload = function () {\n  console.log('Hello world!');\n}";


    // Set default messages for the code snippet fields
    var setDefault = function (nodeList, message) {

        for (var i = 0; i < nodeList.length; i++) {
            var node = nodeList[i];

            if (node.innerHTML.match(/^\s*$/g)) {
                node.innerHTML = message;
            }
        }
    }

    setDefault(titles, 'No title');
    setDefault(descriptions, 'No description');
    setDefault(codeBlocks, placeholder);

    hljs.initHighlightingOnLoad()
}());