// Editor Settings (Provided by C9)
var editor = ace.edit("editor");
var base = 'http://petr-lee.github.io/docs/code/';
editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.session.setMode("ace/mode/c_cpp");

$.get(base + 'main_lite.cpp', function(data) {
	editor.setValue(data);
	editor.clearSelection();
});

$(document).ready(function() {
	$('li').click(function() {
		if(!($(this).hasClass('selected'))) {
			$('li.selected').removeClass('selected');
			$(this).addClass('selected');
			$.get(base + $(this).attr('file'), function(data) {
				editor.session.setValue(data);
				editor.clearSelection();
			});
		}
	});
});
