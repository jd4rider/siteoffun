//var name = prompt('What is your name?');
var names = 'Name Here';

var htmlstuff = function(names='placeholder'){
  return `<div>Hello ${names}</div>`
}

var name = `<input class="form-control"  id='name' value='${names}'></input>`

function movehtmltodom () {
  $('hello').html(htmlstuff(names));
  $('name').html(name);
}


function hotreload(){
  names = $('#name').val();
  $('hello').html(htmlstuff(names));
}

$(document).ready(function(){
  movehtmltodom();
});

$(document).on('input', function(){
  hotreload();
});

$(document).on('change', function(){
  hotreload();
});