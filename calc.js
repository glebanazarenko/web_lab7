function clearScreen() {
    document.getElementById("result").value = "";
}

function display(value) {
    document.getElementById("result").value += value;
}


function calculate() {
    let p = document.getElementById("result").value;
    let q = count(p);
    document.getElementById("result").value = q;
}

function chekForUnaryMinus(p) {
    p = '(' + p + ')';
    let loop = p.length - 3;
    for (let i = 0; i < loop; i++) {
        if ((p[i] === '(') && (p[i + 1] === '-') && (typeof Number(p[i + 2]) === "number")) {
            p = p.substring(0, i+1) + '0' + p.substring(i + 1);
            loop += 1;
        }
    }
    return p;
}

function count(p) {

    p = chekForUnaryMinus(p);

    processSymbol('(')

    for (let i = 0; i < p.length; i++) {
        processSymbol(p[i])
    }

    processSymbol(')')

    let ans = numStack;
    numStack = [];
    operStack = [];
    num = '';
    return ans;

}

const priority = new Map([
    ['+', 1],
    ['-', 1],
    ['*', 2],
    ['/', 2],
]);

var numStack = [];
var operStack = [];

var num = '';


function processSymbol(c) {
    let typeC = symType(c);
    switch (typeC) {
        case 'leftBracket':
            Addnum();
            operStack.push(c);
            break;
        case 'rightBracket':
            Addnum();
            processSuspendedSymbols(c);
            operStack.pop();
            break;
        case 'operationSign':
            Addnum();
            processSuspendedSymbols(c);
            operStack.push(c);
            break;
        case 'number':
            nextOther(c);
            break;
    }
}

function symType(c) {
    switch (true) {
        case (c === '+' || c === '-' || c === '/' || c === '*'):
            return 'operationSign';
        case (c === '('):
            return 'leftBracket';
        case (c === ')'):
            return 'rightBracket';
        default:
            return 'number';
    }
}

function getPriority(key) {
    return priority.get(key);
}


function processSuspendedSymbols(c) {
    while (precedes(operStack[operStack.length - 1], c))
        nextOper(operStack.pop());
}

function precedes(a, b) {

    if (symType(a) === 'leftBracket') return false;
    if (symType(b) === 'rightBracket') return true;

    return (getPriority(a) >= getPriority(b));
}

function nextOper(c) {
    let second = Number(numStack.pop());
    let first = Number(numStack.pop());

    switch (c) {
        case '+':
            numStack.push(first + second);
            break;
        case '-':
            numStack.push(first - second);
            break;
        case '*':
            numStack.push(first * second);
            break;
        case '/':
            numStack.push(first / second);
            break;
    }
}


function nextOther(c) {
    num += c;
}

function Addnum() {
    if (num === "") {

    } else {
        numStack.push(num);
        num = "";
    }
}

//операнды расположены перед знаками операций