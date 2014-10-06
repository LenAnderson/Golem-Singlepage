// ==UserScript==
// @name           Golem  - Singlepage
// @namespace      https://github.com/LenAnderson/
// @downloadURL    https://github.com/LenAnderson/Golem-Singlepage/raw/master/golem_singlepage.user.js
// @version        1.0
// @match          http://www.golem.de/news/*
// ==/UserScript==

function getPages() {
    var txt = document.querySelector('article > .formatted');
    var before = txt.nextSibling;
    var aa = document.querySelectorAll('#list-jtoc a');
    var i = -1;
    insertPN(1, txt);
    loadPage();
    
    function insertPN(n, page) {
        page.style.position = 'relative';
        var pn = document.createElement('div');
        pn.style.position = 'absolute';
        pn.style.position = 'sticky';
        pn.style.marginLeft = '-3.125em';
        pn.style.top = '0';
        pn.style.width = '3em';
        pn.style.height = 0;
        pn.style.textAlign = 'right';
        pn.style.fontSize = '6em';
        pn.style.color = 'rgb(152,152,152)';
        pn.style.fontFamily = "'Droid Sans', arial, sans-serif";
        pn.innerHTML = n;
        page.insertBefore(pn, page.children[0]);
    }
    
    function loadPage() {
        if (++i >= aa.length) return;
        var a = aa[i];
        if (a.id == "jtoc_next") {
            loadPage();
            return;
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', a.href, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            var div = document.createElement('div');
            div.innerHTML = xhr.responseText;
            var page = div.querySelector('.formatted');
            txt.parentNode.insertBefore(page, before);
            insertPN(a.innerHTML, page);
            loadPage();
        };
        xhr.send();
    }
}
getPages();
