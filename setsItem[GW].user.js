// ==UserScript==
// @name            setsItem [GW]
// @description     Отображает таблицу с сетами, привязанными к предмету
// @icon            https://cloud.githubusercontent.com/assets/10257481/5518112/07dffdba-8969-11e4-988b-d20f96f7313c.png
//
// @author	        (Савик) <softmaker2010@gmail.com>
// @namespace       http://github.com/SavGW
// @downloadURL	    https://raw.github.com/SavGW/GW/master/setsItem[GW].user.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2014, by SavGW <softmaker2010@gmail.com>
//
// @include         http://www.ganjawars.ru/item.php?*
//
// @version         1.2
// @updateURL	    https://raw.github.com/SavGW/GW/master/setsItem[GW].user.js
// @grant	    none
// ==/UserScript==

(function() {	
    var Loader = {}
    Loader.request = new XMLHttpRequest();
    Loader.Get = function (url) {this.request.open("GET", url, false);this.request.send(null);if (this.request.readyState == 4 && this.request.status == 200) {return this.request.responseText;}else if (this.request.readyState == 4 && this.request.status != 200) {return null;}}
	if (/\/item.php/.test(document.location.href)){
		var sets = Loader.Get('http://www.ganjawars.ru/sets.php').match(/<tr bgcolor=#...... onMouseOver=['"]?this.bgColor=['"]?#......['"]?;['"]? onMouseOut=['"]?this.bgColor=['"]?#......['"]?;['"]?>(.*?)<\/tr>/gi);
        var item_name;
		if ((/upg=/.test(document.location.href))||(/m=/.test(document.location.href))) {item_name = />&gt;&nbsp;(.*?) \[.*</i.exec(document.body.innerHTML)[1];}
        else {item_name = />&gt;&nbsp;(.*?)</i.exec(document.body.innerHTML)[1];}
        var re = new RegExp(item_name+'[^ ]', 'i')
        var tsets = '';
        for (var i in sets) {if (re.test(sets[i])) tsets += '<tr class=txt>' + sets[i] + '</tr>';}
        if (tsets.length > 0) {
            var ts = document.createElement('table');
            ts.setAttribute('align','center');ts.setAttribute('cellspacing','1');ts.setAttribute('cellpadding','4');ts.setAttribute('width','700px');
            ts.innerHTML = '<tr bgcolor=#d0eed0><td>&nbsp;<b>#</b>&nbsp;</td><td width=55%  align=center><b>Набор вещей</b></td><td width=30% align=center><b>Ожидаемый эффект</b><td width=15%><b>Мин.Уровень</b></td></tr>' + tsets;
            document.body.appendChild(ts);
        }
	}
})();
