(function($) {
  var editor = ace.edit("editor");
  var base = 'https://raw.githubusercontent.com/petr-lee/petr-lee.github.io/master/assets/docs/code/';
  editor.setTheme("ace/theme/monokai");
  editor.setShowPrintMargin(false);
  editor.session.setMode("ace/mode/c_cpp");
  editor.setOptions({
    fontSize: "10pt"
  });

  $.get(base + 'main_lite.cpp', function(data) {
    editor.setValue(data);
    editor.clearSelection();
  });

  $('li').click(function() {
    if(!($(this).hasClass('selected'))) {
      $('li.selected').removeClass('selected');
      $(this).addClass('selected');
      $.get(base + $(this).attr('file'), function(data) {
        editor.session.setValue(data);
        editor.clearSelection();
      });
      editor.session.setMode("ace/mode/" + $(this).attr('language'));
    }
  });
}(jQuery));
