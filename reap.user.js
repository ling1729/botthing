// ==UserScript==
// @name         Reap
// @namespace    http://tampermonkey.net/
// @version      6.9
// @description  Levans dont look here
// @author       You
// @match        https://artofproblemsolving.com/reaper

//*function getSeconds(){
    let minutes = (document.getElementById('last-reap').innerHTML.match(/^(.*?) minute/)||[0,0])[1];
    let seconds = (minutes == 0) ? 
        (document.getElementById('last-reap').innerHTML.match(/^(.*?) second/)[1]) : 
        (((document.getElementById('last-reap').innerHTML.match(/, (.*)/)||["0 second","0 second"])[1].match(/^(.*?) second/)||[0,0])[1]);
    return +60*minutes + +seconds;
}*/
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
var random = 270 + Math.random() * 20;
function beatReaper(){
    if(getSeconds() >= random){
    	document.getElementById('reap-button').click();
	random = 270 + Math.random() * 20;
    }
}
window.setInterval(beatReaper, 1000);
