// ==UserScript==
// @name		 Reaper
// @namespace	 http://tampermonkey.net/
// @version		 6.9
// @description	 levans dont look here
// @author		 You
// @match	   https://artofproblemsolving.com/reaper/*
// ==/UserScript==
var randomness = 15;
var skew = 10;
var random = Math.random() * randomness * 2 - randomness;
(async function() {
	'use strict';
	console.log(getSeconds());
})();
function parseTime(x){
	let times = [0, 0, 0];
	let seconds = 0;
	for(let i = 1; i < x.length; i++){
		if(x.charAt(i) == ' ' && x.charAt(i - 1) != ','){
			let stop = false;
			for(let j = i - 1; j >= -1 && !stop; j--){
				if(j == -1 || x.charAt(j) == ' '){
					stop = true;
					let stop2 = false;
					for(let k = i + 1; k <= x.length && !stop2; k++){
						if(x.substring(i + 1, k) == "second"){
							stop2 = true;
							times[2] = x.substring(j + 1, i);
						}
						if(x.substring(i + 1, k) == "minute"){
							stop2 = true;
							times[1] = x.substring(j + 1, i);
						}
						if(x.substring(i + 1, k) == "hour"){
							stop2 = true;
							times[0] = x.substring(j + 1, i);
						}
					}
				}
			}
		}
	}
	for(let i = 0; i < times.length; i ++)
	seconds += Math.pow(60, times.length - 1 - i) * times[i];
	return seconds;
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
	times.forEach(function(item){sum += item;});
	return sum/times.length;
}
function beatReaper(){
	if(getSeconds() >= random + getRecent() + skew){
		document.getElementById('reap-button').click();
		random = Math.random() * randomness * 2 - randomness;
	}
}
window.setInterval(beatReaper, 1000);
