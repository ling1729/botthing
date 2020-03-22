// ==UserScript==
// @name		 Reaper
// @namespace	 http://tampermonkey.net/
// @version		 6.9
// @description	 levans dont look here
// @author		 You
// @match	   https://artofproblemsolving.com/reaper/*
// ==/UserScript==
var min = -5;
var max =  10;
var random = Math.random() * (max - min) + min;
(async function() {
	'use strict';
	console.log(getSeconds());
})();
function parseTime(e) {
    var t = e.split(",");
    var n = 0;
    for (var r in t) {
        var i = t[r].trim();
        var s = parseInt(i);
        if (i.indexOf("ay") != -1) {
            n += s * 60 * 60 * 24
        } else if (i.indexOf("our") != -1) {
            n += s * 60 * 60
        } else if (i.indexOf("inute") != -1) {
            n += s * 60
        } else if (i.indexOf("econd") != -1) {
            n += s
        }
    }
    return n
}

function unParseTime(e, t) {
    var n = "";
    e = Math.round(e);
    if (e < 0)
        e = 0;
    if (typeof t == "undefined") {
        var t = true
    }
    var r = Math.floor(e / (60 * 60 * 24));
    e -= r * 60 * 60 * 24;
    var i = Math.floor(e / (60 * 60));
    e -= i * 60 * 60;
    var s = Math.floor(e / 60);
    e -= s * 60;
    if (r > 0) {
        n = r + " day" + (r != 1 ? "s" : "");
        if (i == 0 && s == 0 && e == 0) {
            return n
        }
        n += ", ";
        n += i + " hour" + (i != 1 ? "s" : "");
        if (s == 0 && e == 0) {
            return n
        }
        n += ", ";
        n += s + " minute" + (s != 1 ? "s" : "");
        if (e == 0 || !t) {
            return n
        }
        n += ", " + e + " second" + (e != 1 ? "s" : "");
        return n
    }
    if (i > 0) {
        n = i + " hour" + (i != 1 ? "s" : "");
        if (s == 0 && e == 0) {
            return n
        }
        n += ", ";
        n += s + " minute" + (s != 1 ? "s" : "");
        if (e == 0 || !t) {
            return n
        }
        n += ", " + e + " second" + (e != 1 ? "s" : "");
        return n
    }
    if (s > 0) {
        n = s + " minute" + (s != 1 ? "s" : "");
        if (e == 0 || !t) {
            return n
        }
        n += ", " + e + " second" + (e != 1 ? "s" : "");
        return n
    }
    return e + " second" + (e != 1 ? "s" : "")
}

function getSeconds(){
	return parseTime(document.getElementById('last-reap').innerHTML);
}
function getRecent(){
	let times = [];
	for(let i = 1; i < 5; i++){
		let time = document.getElementById('recent-reaps').childNodes[i].innerHTML.match(/gained (.*)/)[1];
		if(/Reap/i.test(time)){
			if(/Double/.test(time)){
				times.push(Math.floor(parseTime(time.match(/(.*) Double/)[1])/2));
			}
			if(/Triple/.test(time)){
				times.push(Math.floor(parseTime(time.match(/(.*) <strong>/)[1])/3));
			}
			if(/Quadruple/.test(time)){
				times.push(Math.floor(parseTime(time.match(/(.*) <strong>/)[1])/4));
			}
			if(/octuple/.test(time)){
				times.push(Math.floor(parseTime(time.match(/(.*) Ultra/)[1])/8));
			}
		} else {
			times.push(parseTime(time));
		}
	}
	let sum = 0;
	times = times.filter(function(value, index, arr){ return value > 5;});
	times.forEach(function(item){sum += item;});
	return sum/times.length;
}
function beatReaper(){
	let average = getRecent();
	document.getElementById('current-game').childNodes[3].innerHTML = "target: " + unParseTime(average);
	if(document.getElementById('reap-button-container').style.display !== 'none' && getSeconds() >= random + average){
		document.getElementById('reap-button').click();
		random = Math.random() * (max - min) + min;
	}
}
window.setInterval(beatReaper, 1000);
