$(function() {
  var editor = $('#editor');

  $.get('code/main_lite.cpp', function(data) {
    editor.html(Prism.highlight(data, Prism.languages.cpp));
  });

  $('li').click(function() {
    if(!($(this).hasClass('selected'))) {
      $('li.selected').removeClass('selected');
      $(this).addClass('selected');
      $.get('code/' + $(this).attr('file'), function(data) {
     		editor.html(Prism.highlight(data, Prism.languages.cpp));
     	});
    }
  });
});
