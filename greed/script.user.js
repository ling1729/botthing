// ==UserScript==
// @name         Greed control
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aops greed control is so random lmao
// @author       You
// @match        https://artofproblemsolving.com/greedcontrol
// @grant GM.getValue
// @grant GM.setValue
// ==/UserScript==
var day;
var min = 10;
var max =  50;
(async function() {
    'use strict';
    day = new Date().getDay();
    await GM.setValue("date", day);
    console.log(await GM.getValue("date"));
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    document.getElementById('input-number').value = randomNumber;
    document.getElementById('submit-button').click()
})();

setInterval(checkDay,10000);

async function checkDay(){
    if(new Date().getDay() != await GM.getValue("date")){
        await GM.setValue("date", new Date().getDay());
        location.reload();
    }
}