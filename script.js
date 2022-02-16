
let t = '0';

const nu = document.querySelectorAll('.number');
const op = document.querySelectorAll('.operator');
const scr = document.getElementById('screen');
const eq = document.getElementById('equals');
const cl = document.getElementById('clear');
const zer = document.getElementById('zero');
const pc = document.getElementById('perc');
const sg = document.getElementById('sign');
const dot = document.getElementById('dot');
scr.innerText = t;
nu.forEach(e => e.addEventListener('click', function (){
    if(last(t)[0] == '0'){
        t = subst(t, '').trimStart();
    }
    t = t + e.value;
    scr.innerText = lastnumb(t);
}));

op.forEach(p => p.addEventListener('click', function (){
    if(!(isoperand(last(t)[0]))) {
        t = t + ' ' + p.value + ' ';
        return;
    }
    if(!(last(t)[0] == p.value)){
        t = subst(t, p.value);
    } else return;
}));

eq.addEventListener('click', function(){
    if(isoperand(last(t)[0])){
        t = subst(t, '').trim();
    }
    t = calc(t).toString();
    scr.innerText = lastnumb(t);
});

cl.addEventListener('click', function(){
    t = '0';
    scr.innerText = t;
});

sg.addEventListener('click', function(){
    if(!isoperand(last(t)[0])){
        let n = Number(last(t)[0]) * (-1);
        if(last(t)[1]==0){
            t = subst(t, n).trim();
        } else t = subst(t, n);
    }
    scr.innerText = t;
});

pc.addEventListener('click', function(){
    if(!isoperand(last(t)[0])){
        let n = parseFloat((Number(last(t)[0]) * 0.01).toPrecision(12));
        if(last(t)[1]==0){
            t = subst(t, n).trim();
        } else t = subst(t, n);
    }
    scr.innerText = lastnumb(t);
});

dot.addEventListener('click', function(){
    if(isoperand(last(t)[0]) || hasdot(last(t)[0])){
        return;
    }

    t = t + dot.value;
    scr.innerText = lastnumb(t);
});

zer.addEventListener('click', function(){
    if(last(t)[0] == '0') return;
    t = t + zer.value;
    scr.innerText = lastnumb(t);
});
window.addEventListener('keydown', function(tyi) {
    const au = document.querySelector(`button[data-t="${tyi.keyCode}"]`);
    if(au.classList.contains('number')){
        if(last(t)[0] == '0'){
           t = subst(t, '').trimStart();
        }
        t = t + au.value;
        scr.innerText = lastnumb(t);
        return
    }
    if(au.classList.contains('operator')){
        if(!(isoperand(last(t)[0]))) {
            t = t + ' ' + au.value + ' ';
            return;
        }
        if(!(last(t)[0] == au.value)){
            t = subst(t, au.value);
        } else return;
        return;
    }
    if(au.getAttribute('id') == 'equals'){
        if(isoperand(last(t)[0])){
            t = subst(t, '').trim();
        }
        t = calc(t).toString();
        scr.innerText = lastnumb(t);
        return;
    }
    if(au.getAttribute('id') == 'clear'){
        t = '0';
        scr.innerText = t;
        return;
    }
    if(au.getAttribute('id') == 'sign'){
        if(!isoperand(last(t)[0])){
            let n = Number(last(t)[0]) * (-1);
            if(last(t)[1]==0){
                t = subst(t, n).trim();
            } else t = subst(t, n);
        }
        scr.innerText = lastnumb(t);
        return;
    }
    if(au.getAttribute('id') == 'perc'){
        if(!isoperand(last(t)[0])){
            let n = Number(last(t)[0]) * 0.01;
            if(last(t)[1]==0){
                t = subst(t, n).trim();
            } else t = subst(t, n);
        }
        scr.innerText = lastnumb(t);
        return;
    }
    if(au.getAttribute('id') == 'dot'){
        if(isoperand(last(t)[0]) || hasdot(last(t)[0])){
            return;
        }
    
        t = t + dot.value;
        scr.innerText = lastnumb(t);
        return;
    }
});

const sum = function()  {
    let c = 0;
    for(let i in arguments) {
    c = c + arguments[i];
    }
    return c;
};

const multiply = function() {
    let d = 1;
    for(let i in arguments) {
        d = d * arguments[i];
        }
    return d;
};

function calc(a) {
    let arr = a.split(' ');
    for(let i = 1; i < arr.length; i=i+2){
        if(arr[i]=='*'){
            arr[i-1] = multiply(Number(arr[i-1]), Number(arr[i+1]));
            arr.splice(i, 2);
            i = i-2;
            continue;
        }
        if(arr[i]=='/'){
            arr[i-1] = multiply(Number(arr[i-1]), 1/Number(arr[i+1]));
            arr.splice(i, 2);
            i = i-2;
        }
    }
    console.log(arr)
    for(let i = 1; i < arr.length; i=i+2){
        if(arr[i]=='+'){
            arr[i-1] = sum(Number(arr[i-1]), Number(arr[i+1]));
            arr.splice(i, 2);
            i = i-2;
            continue;
        }
        if(arr[i]=='-'){
            arr[i-1] = sum(Number(arr[i-1]), (0-Number((arr[i+1]))));
            arr.splice(i, 2);
            i = i-2;
        }
    }
    if(arr[0] === Infinity || arr[0] === -Infinity || isNaN(arr[0])) return "ERROR"
    return arr[0]
}

function last(b) {
    if(b[b.length-1] == null) return;
    for(let i = b.length-2; i >-1; i = i-1){
        if(b[i] == ' '){
            return [b.slice(i).trim(), i]
        } 
    }
    return [b.trim(), 0];
}

function subst(o, s){
    let po = o.slice(0, last(o)[1]);
    if(isoperand(last(o)[0])){
        return po + ' ' + s + ' ';
    } else return (po + ' ' + s);
}

function isoperand(k){
    if(k == '/' || k == '*' || k == '+' || k == '-'){
        return true;
    } else return false;
}

function hasdot(q){
    if(q == null) return;
    for(let i = 0; i < q.length; i++){
        if(q[i] == '.'){
            return true;
        } 
    }
    return false;
}

function lastnumb(g){
    if(isoperand(last(g)[0])){
        let gf = subst(g, '').trim();
        return last(gf);
    } else return last(g)[0];
}