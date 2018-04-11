//flag para determinar se está editando
var editing  = false;
var tag = 'SPAN';
var w;

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
    y.setAttribute('type','number');
    y.setAttribute('maxlength','2');
    y.setAttribute('min','0');
    y.onblur = saveEdit;
    z.insertBefore(y,obj);
    z.removeChild(obj);
    y.value = x;
    y.focus();
    editing = true;
}

function saveEdit() {
    var field = document.querySelector('input[type=number]');
    var y = w;
    var z = field.parentNode;
    y.innerHTML = ('00'+field.value).substring(field.value.length);
    z.insertBefore(y,field);
    z.removeChild(field);
    editing = false;
}

document.querySelector(".minute").onclick = catchIt;
document.querySelector(".second").onclick = catchIt;
