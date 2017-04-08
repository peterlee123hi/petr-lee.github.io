$(function() {
  var base = 'https://raw.githubusercontent.com/petr-lee/petr-lee.github.io/master/code/';
  var editor = $('#editor');

  $.get(base + 'main_lite.cpp', function(data) {
    editor.html(Prism.highlight(data, Prism.languages.cpp));
  });

  $('li').click(function() {
    if(!($(this).hasClass('selected'))) {
      $('li.selected').removeClass('selected');
      $(this).addClass('selected');
      $.get(base + $(this).attr('file'), function(data) {
     		editor.html(Prism.highlight(data, Prism.languages.cpp));
     	});
    }
  });
});