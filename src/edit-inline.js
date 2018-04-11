//flag para determinar se está editando
var editing  = false;
var tag = 'SPAN';
var w;

//cria o botao
if (document.getElementById && document.createElement) {
    var butt = document.createElement('BUTTON');
    var buttext = document.createTextNode('Ready!');
    butt.appendChild(buttext);
    butt.onclick = saveEdit;
}

function catchIt(e) {
    if (editing) return;
    if (!document.getElementById || !document.createElement) return;
    if (!e) var obj = window.event.srcElement;
    else var obj = e.target;
    while (obj.nodeType != 1) {
        obj = obj.parentNode;
    }
    if (obj.tagName == 'INPUT' || obj.tagName == 'A') return;
    while (obj.nodeName != tag && obj.nodeName != 'HTML') {
        obj = obj.parentNode;
    }
    if (obj.nodeName == 'HTML') return;
        w = obj;
    var x = obj.innerHTML;
    var y = document.createElement('INPUT');
    var z = obj.parentNode;
    z.insertBefore(y,obj);
    z.insertBefore(butt,obj);
    z.removeChild(obj);
    y.value = x;
    y.focus();
    editing = true;
}

function saveEdit() {
    var area = document.getElementsByTagName('INPUT')[0];
    var y = w;
    var z = area.parentNode;
    y.innerHTML = area.value;
    z.insertBefore(y,area);
    z.removeChild(area);
    z.removeChild(document.getElementsByTagName('button')[0]);
    editing = false;
}

document.querySelector(".minute").onclick = catchIt;
document.querySelector(".second").onclick = catchIt;
