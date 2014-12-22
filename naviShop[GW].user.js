// ==UserScript==
// @name            naviShop [GW]
// @description     Заменяет стандартные на соответствующие ссылки в магазины.
// @icon            https://cloud.githubusercontent.com/assets/10257481/5518112/07dffdba-8969-11e4-988b-d20f96f7313c.png
//
// @author	        (Савик) <softmaker2010@gmail.com>
// @namespace       http://github.com/SavGW
// @downloadURL	    https://raw.github.com/SavGW/GW/master/naviShop[GW].user.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2014, by SavGW <softmaker2010@gmail.com>
//
// @include         http://www.ganjawars.ru/shop*
//
// @version         1.0
// @updateURL	    https://raw.github.com/SavGW/GW/master/naviShop[GW].user.js
// @grant	    none
// ==/UserScript==

(function() {
	if (/\/shop.?\.php/.test(document.location.href)){
        var toHTUrl = {
            'shop_pistols':'shop_ppguns_c',
            'shop_ppguns':'shop_ppguns_c',
            'shop_auto':'shop_auto_c',
            'shop_sniper':'shop_snipe_c',
            'shop_shotguns':'shop_shotguns_c',
            'shop_heavy':'shop_heavy_c',
            'shop_grl':'shop_grl_c',
            'shop_armour':'shop_armour_c',
            'shop_helmets':'shop_helmets_c',
            'shop_boots':'shop_boots_c',
            'shop_masks':'shop_masks_c',
            'shop_wear':'shop_wear_c',
            'shop_phones':'shop_misc_c',
            'shop_transport':'shop_transport_c',
            'shop_drugs':'shop_drugs_c',
            'shop_gifts':'shop_misc_c',
            
            'shop_ppguns_c':'shop_ppguns',
            'shop_auto_c':'shop_auto',
            'shop_snipe_c':'shop_sniper',
            'shop_shotguns_c':'shop_shotguns',
            'shop_heavy_c':'shop_heavy',
            'shop_grl_c':'shop_grl',
            'shop_armour_c':'shop_armour',
            'shop_helmets_c':'shop_helmets',
            'shop_boots_c':'shop_boots',
            'shop_masks_c':'shop_masks',
            'shop_wear_c':'shop_wear',
            'shop_misc_c':'shop_phones',
            'shop_transport_c':'shop_transport',
            'shop_drugs_c':'shop_drugs'
        };
        if (getUrlVars()['shop'] != undefined) {
            var links = document.getElementsByTagName('a');
            var temp = null;
            for (var i in links) {
                try {
                    temp = links[i].getAttribute('href');
                    if ((/\/shop.?\.php$/.test(temp)) && (toHTUrl[getUrlVars()['shop']] != undefined)) links[i].setAttribute('href', temp + '?shop=' + toHTUrl[getUrlVars()['shop']]);
                } catch(e){continue;}
            }
        }
	}
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {vars[key] = value;});
        return vars;
    }
})();
