// ==UserScript==
// @name            translit [GW]
// @description     Переводит сообщения, написанные транслитом.
// @icon            https://cloud.githubusercontent.com/assets/10257481/5518112/07dffdba-8969-11e4-988b-d20f96f7313c.png
//
// @author	        (Савик) <softmaker2010@gmail.com>
// @namespace       http://github.com/SavGW
// @downloadURL	    https://raw.github.com/SavGW/GW/master/translit[GW].user.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2014, by SavGW <softmaker2010@gmail.com>
//
// @include         http://www.ganjawars.ru/threads.php*
// @include         http://www.ganjawars.ru/messages.php*
//
// @version         1.2
// @updateURL	    https://raw.github.com/SavGW/GW/master/translit[GW].user.js
// @grant	    none
// ==/UserScript==

(function() {	
    if (/\/messages.php/.test(document.location.href)){
		var tds = document.getElementsByTagName('td');
        for (var i = 0; i < tds.length; i++) {
            if (/cella_\d+/i.test(tds[i].getAttribute('id'))) {
                var msgEl = tds[i].nextSibling.getElementsByTagName('td')[4];
                var clearMsg = msgEl.innerHTML;
                if (!/[а-яА-ЯёЁ]+/.test(clearMsg)) {
                    var trn = document.createElement('span');
                    trn.setAttribute('style', 'border:1px solid #D0EED0; border-radius:5px; padding:3px; background-color:#F5FFF5; cursor:pointer; font-size:12px; top: 17px; left: 15px; position:relative;');
                    trn.innerHTML = 'Это транслит?';
                    if ((msgEl.innerHTML[msgEl.innerHTML.length-1] != '>') && (msgEl.innerHTML[0] != '<'))
                        msgEl.parentNode.appendChild(trn);
                    trn.addEventListener('click', function() {
                        var text = this.previousSibling;
                        var spText = text.innerHTML.split(/<.*?>/g);
                        var spTags = text.innerHTML.match(/<.*?>/g);
                        if (spText[0] == '') spText.splice(0,1);                        
                        var fText = '';
                        for (var n = 0; n < spText.length; n++) {
                            if (spTags != null) {
                                if (text.innerHTML[0] != '<') fText += translit(spText[n], true) + (spTags[n] != null ? spTags[n] : '');
                                else fText += (spTags[n] != null ? spTags[n] : '') + translit(spText[n], true);
                            } else {
                                fText = translit(text.innerHTML, true);
                                break;
                            }
                        }
                        text.innerHTML = fText;
                        this.parentNode.removeChild(this);
                    });
                }
            }
        }
	}
})();

translit = (
	function() {
		var
			rus = "делай дают больше брежн кажи эти жит щ   ш  я  ч  Ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
			eng = "delay daut bolshe bregn kagi eti zit sch sh ja ch Ch cz yu ya yo zh \" y  e' a b v g d e z i j k l m n o p r s t u f h '".split(/ +/g)
		;
		return function(text, engToRus) {
			var x;
			for(x = 0; x < rus.length; x++) {
				text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
				text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());	
			}
			return text;
		}
	}
)();
