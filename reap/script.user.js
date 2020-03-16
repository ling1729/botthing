// ==UserScript==
// @name         Reaper
// @namespace    http://tampermonkey.net/
// @version      6.9
// @description  levans dont look here
// @author       You
// @match      https://artofproblemsolving.com/reaper/*
// ==/UserScript==

var random = 270 + Math.random() * 20;
(async function() {
    'use strict';
    console.log(getSeconds());
})();

function getSeconds(){
    let x = document.getElementById('last-reap').innerHTML;
    let times = [];
    let seconds = 0;
    for(let i = 1; i < x.length; i++){
        if(x.charAt(i) == ' ' && x.charAt(i - 1) != ','){
            let stop = false;
            for(let j = i - 1; j >= -1 && !stop; j--){
                if(j == -1 || x.charAt(j) == ' '){
                    stop = true;                
                    times.push(x.substring(j + 1, i));
                }
            }
        }
    }
    for(let i = 0; i < times.length; i ++)
	seconds += Math.pow(60, times.length - 1 - i) * times[i];
    return seconds;
}
function beatReaper(){
    if(getSeconds() >= random){
    	document.getElementById('reap-button').click();
	random = 270 + Math.random() * 20;
    }
}
window.setInterval(beatReaper, 1000);
