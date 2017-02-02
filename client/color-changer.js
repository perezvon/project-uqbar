var rgb = $('#test').css('backgroundColor');
var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
var brightness = 1;

var r = colors[1];
var g = colors[2];
var b = colors[3];

var ir = Math.floor((255-r)*brightness);
var ig = Math.floor((255-g)*brightness);
var ib = Math.floor((255-b)*brightness);

$('#test').css('color', 'rgb('+ir+','+ig+','+ib+')');
