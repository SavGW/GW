// ==UserScript==
// @name            mapAnchor [GW]
// @description     Добавляет значки якорей в портовых секторах
// @icon            https://cloud.githubusercontent.com/assets/10257481/5518112/07dffdba-8969-11e4-988b-d20f96f7313c.png
//
// @author	        (Савик) <softmaker2010@gmail.com>
// @namespace       http://github.com/SavGW/GW.git
// @downloadURL	    https://raw.github.com/SavGW/GW/master/mapAnchor[GW].user.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2012, by SavGW <softmaker2010@gmail.com>
//
// @include         http://www.ganjawars.ru/map.php*
//
// @version         1.3
// @updateURL	    https://raw.github.com/SavGW/GW/master/mapAnchor[GW].user.js
// @grant	        none
// ==/UserScript==

(function() {	
	if (/\/map.php/.test(document.location.href)){
		var sectr = document.getElementsByTagName('a');
		for (var i = 0; i < sectr.length; i++) {
			if ((/map.php\?sx=\d+&sy=\d+$/.test(sectr[i].getAttribute('href'))) && 
				((sectr[i].parentNode.getAttribute('class') == 'wbr') || 
				(sectr[i].parentNode.getAttribute('class') == 'wbmap') || 
				(sectr[i].parentNode.getAttribute('class') == 'wbb'))) {
				var coord = /map.php\?sx=(\d+)&sy=(\d+)$/.exec(sectr[i].getAttribute('href'));
				var pos = getOffsetRect(sectr[i]);
				if (coord[1] == 47) {
					if (coord[2] == 49) sectr[i].appendChild(crAnchor(pos));
					if (coord[2] == 52) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 49) { 
					if (coord[2] == 53) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 50) {
					if (coord[2] == 47) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 52) {
					if (coord[2] == 50) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 53) {
					if (coord[2] == 53) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 99) {
					if (coord[2] == 100) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 125) {
					if (coord[2] == 75) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 149) {
					if (coord[2] == 149) sectr[i].appendChild(crAnchor(pos));
					if (coord[2] == 152) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 151) {
					if (coord[2] == 150) sectr[i].appendChild(crAnchor(pos));
					if (coord[2] == 152) sectr[i].appendChild(crAnchor(pos));
				} else if (coord[1] == 152) {
					if (coord[2] == 148) sectr[i].appendChild(crAnchor(pos));
				}
			}
		}
	}
	function getOffsetRect(elem) {
		var box = elem.getBoundingClientRect();
		var map = elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect();
		var body = document.body;
		var docElem = document.documentElement;
		var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
		var clientTop = docElem.clientTop || body.clientTop || 0;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;
		var top  = box.top - map.top +  scrollTop - clientTop -28;
		var left = box.left - map.left + scrollLeft - clientLeft +9;
		return { top: Math.round(top), left: Math.round(left) };
	}    
	function crAnchor(pos) {
		var anc = document.createElement('img');
		anc.setAttribute('src','https://cloud.githubusercontent.com/assets/10257481/5518076/ca8c5c20-8967-11e4-89a2-a321dd96fa94.png');
		anc.setAttribute('style','cursor:pointer;overflow:hidden;top:'+pos.top+'px;left:'+pos.left+'px;position:absolute;display:table-row;');
		return anc;
	}
})();
