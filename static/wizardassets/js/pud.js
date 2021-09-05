function uuid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
} 

// begin: clickoutside 
/*
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");
// end: clickoutside 

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isLocalhost(str)
	{
	var regex = RegExp('https?://localhost(:[0-9]+)?/');
	var returnBoo = false;
	if (regex.test(str))
		{
		returnBoo = true
		}
	else if (regex.test(str + '/'))
		{
		returnBoo = true 
		}
	return returnBoo 
	}

function sortSelect(selElem) { // usage: sortSelect($j('.mySelect')[0])
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function debug(str,background,foreground)
	{
	if (typeof str == 'string')
		{
		console.log('%c' + str,'background: ' + background + '; color: ' + foreground);
		}
	else 
		{
		console.log(str);
		}
	}
	
var SortSelect = function(select) {
    var options = jQuery.makeArray(select.find('option'));
        
    var sorted = options.sort(function(a, b) {
        return (jQuery(a).text() > jQuery(b).text()) ? 1 : -1;
    });
        
    select.append(jQuery(sorted))
          .attr('selectedIndex', 0);
};
	
function showSpinner()
	{
	var spinner = '<div class="spinner la-ball-spin-clockwise la-dark la-sm"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
	return spinner
	}

function setCookie(name,value,days)
{
if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

/*
const iterate = (obj) => {
    Object.keys(obj).forEach(key => {

	if (key == 'then')
		{
		debug('then:');
		debug(obj[key].page);
		}
	else if (key == 'if')
		{
		debug('if: ' + obj[key]);
		}
	else 
		{
	    // debug('key: ' + key);
	    // debug(obj[key]);
		}
    

    if (typeof obj[key] === 'object')
    	{
		iterate(obj[key])
        }
	else 
		{
		console.log('%c done ', 'background: #F00; color: #FFF');
		}
    })
}
*/

function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

function getUrlVars(myurl) // myurl param is optional and defaults to current url
{
	myurl = typeof myurl !== 'undefined' ? myurl : window.location.href;
    var rock = new Object();
    var hashes = myurl.slice(myurl.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
    	rock[hash[0]] = urldecode(hash[1]);
    }
    return rock;
}

function widen()
	{
	var maxWidth = 0;
	$j('.choice').each(function()
		{
		if ($j(this).width() > maxWidth)
			{
			maxWidth = $j(this).width();
			}
		})
	$j('.choice').width(maxWidth);
	}

