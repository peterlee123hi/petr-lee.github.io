// Editor Settings (Provided by C9)
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.session.setMode("ace/mode/c_cpp");

jQuery.get('http://petr-lee.github.io/docs/code/main_lite.cpp', function(data) {
	editor.setValue(data);
	editor.clearSelection();
});
