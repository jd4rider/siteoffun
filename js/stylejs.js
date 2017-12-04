//var name = prompt('What is your name?');
var names = 'Name Here';

var data = {
 name: "Jonathan David Forrider",
 age: 30
};

/*
*/
var htmlstuff = function(names='placeholder', dataname='placeholder', dataage='placeholder'){
  return `<div>Hello ${names}</div><div>${dataname} ${dataage}</div>`
}

var name = `<input class="form-control"  id='name' value='${names}'></input>`

var newhtm = `<div id="form">
                <input type="text" id="nameer" value='${data.name}'/>
                <input type="range" id="age" value=${data.age} />
              </div>`

function movehtmltodom () {
  $('hello').html(htmlstuff(names, data.name, data.age));
  $('name').html(name);
  $('newhtm').html(newhtm);
}



function hotreload(){
  names = $('#name').val();
  data.name = $('#nameer').val();
  data.age = $('#age').val();
  $('hello').html(htmlstuff(names, data.name, data.age));  
}

$(document).ready(function(){
  function makedomvisibile () {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
  }

  setTimeout(movin, 1);
    

  function movin(){
    $.when(movehtmltodom()).then(makedomvisibile());
        //makedomvisibile();
  }
});

$(document).on('input', function(){
  hotreload();
});

$(document).on('change', function(){
  hotreload();
});