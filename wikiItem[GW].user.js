// ==UserScript==
// @name            wikiItem [GW]
// @description     Добавляет кнопку с ссылкой на предмет в GanjaWiki
// @icon            https://raw.github.com/SavGW/GW/master/32_gw.png
//
// @author			    (Савик) <softmaker2010@gmail.com>
// @namespace       http://github.com/SavGW
// @downloadURL	    https://raw.github.com/SavGW/GW/master/wikiItem[GW].user.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2012, by SavGW <softmaker2010@gmail.com>
//
// @include         http://www.ganjawars.ru/item.php?*
//
// @version         1.1
// @updateURL	    https://raw.github.com/SavGW/GW/master/wikiItem[GW].user.js
// @grant	    none
// ==/UserScript==

(function() {	
	if (/\/item.php/.test(document.location.href)){
		var item_name;
		if (/upg=/.test(document.location.href)) {item_name = />&gt;&nbsp;(.*) \[.*<\/font>/.exec(document.body.innerHTML)[1];}
		else {item_name = />&gt;&nbsp;(.*)<\/font>/.exec(document.body.innerHTML)[1];}
		var fonts = document.body.getElementsByTagName('font');
		for (i in fonts) {
			try{
				if (fonts[i].innerHTML.indexOf(item_name) != -1) {
					var btn = document.createElement('img');
					btn.setAttribute('src','favicon.ico');
					btn.setAttribute('style','cursor:pointer;border:1px solid darkgreen;border-radius:5px;float:right;overflow:hidden;margin:-3px 15px 0 0;');
					btn.setAttribute('title','Найти на GanjaWiki.ru');
					fonts[i].appendChild(btn);
					btn.addEventListener('click', function(){window.open('http://www.ganjawiki.ru/index.php/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Search?search='+item_name);}, false);
				}
			} catch(e){continue;}
		}
	}
})();
