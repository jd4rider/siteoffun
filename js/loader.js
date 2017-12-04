document.getElementsByTagName("html")[0].style.visibility = "hidden";

//items to be put straight in dom
var metamobile=document.createElement('meta');
metamobile.name='viewport';
metamobile.content='width=device-width, initial-scale=1';

var meta=document.createElement('meta');
meta.httpEquiv='Content-Type';
meta.content='text/html; charset=utf-8';

var bslink=document.createElement('link');
bslink.href = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css';
bslink.rel = 'stylesheet prefetch';

//scripts needing loaded
var jqlink = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
var babeljs = 'https://unpkg.com/babel-standalone@6/babel.min.js';
var tetherjs = 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.3.2/js/tether.min.js';
var bsjslink = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js';

//ES6 scripts possibly needing transpiled
var stylejs = 'stylejs.js';

var listofelems = [meta, metamobile, bslink];

var list = [ [jqlink, 'jquery', '3.1.1'], [babeljs, 'babel', '6.0'], [tetherjs, 'tether', '1.3.2'], [bsjslink, 'bootstrapjs', '4.0.0']];

var x = 0;

loaders(listofelems);

loopArray(list);


//Helper functions
//------------------

//Load the initial CSS librarys and metadata to DOM 
function loaders(itemlist) {
	for(var i in itemlist){ 
		document.getElementsByTagName('head')[0].appendChild(itemlist[i]);
	}
}

//Load all scripts in sequential order
function loopArray(arr) {
	load(arr[x][0], function(xhr){
		// set x to next item
        makeelement(xhr.responseText);
        x++;

        // any more items in array? continue loop
        if(x < arr.length) {
            loopArray(arr);   
        } else {
        	if(!check()){ //check to see if browser supports ES6... If not Transpile.
                transpile(stylejs); 
            } else {
                notranspileElement('js/'+stylejs);
            }
        }
	});
}


//make element and push to dom  --default is javascript and location is head
function makeelement(output){
	var onew_script = document.createElement('script');
	onew_script.type = 'text/javascript';
	onew_script.textContent = output;
	document.querySelector('head').appendChild(onew_script);
}

//push stylejs.js to DOM without use of Babel as ES6 is supported in 
//Browsers other than chrome
function notranspileElement(src){
    var onew_script = document.createElement('script');
    onew_script.type = 'text/javascript';
    onew_script.src = src;
    document.querySelector('head').appendChild(onew_script);
} 

//use BabelJS to transpile
function transpile(url){
    jQuery.get(url, function(stuff){
       	//use BabelJS to transpile the new ES6 Code, like Template Literals, to working JavaScript
        makeelement(Babel.transform( stuff, { presets: ['es2015', 'stage-2'] }).code);
    });
}

//AJAX call
function load(url, callback) {
    var xhr;
     
    if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
    else {
        var versions = ["MSXML2.XmlHttp.5.0", 
                        "MSXML2.XmlHttp.4.0",
                        "MSXML2.XmlHttp.3.0", 
                        "MSXML2.XmlHttp.2.0",
                        "Microsoft.XmlHttp"]

         for(var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            }
            catch(e){}
         } // end for
    }
     
    xhr.onreadystatechange = ensureReadiness;
     
    function ensureReadiness() {
        if(xhr.readyState < 4) {
            return;
        }
         
        if(xhr.status !== 200) {
            return;
        }

        // all is well  
        if(xhr.readyState === 4) {
            callback(xhr);
        }           
    }
     
    xhr.open('GET', url, true);
    xhr.send('');
}

//Does Browser Support ES6?
function check() {
    "use strict";

    if (typeof Symbol == "undefined") return false;
    try {
        eval("class Foo {}");
        eval("var bar = (x) => x+1");
    } catch (e) { return false; }

    return true;
}

console.log('Does this browser accept ES6: '+check());