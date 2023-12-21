function priority(ch) {
    if (ch === '^') return 3;
    else if (ch === '*' || ch === '/') return 2;
    else if (ch === '+' || ch === '-') return 1;
    else return 0;
}

function postfixGen(eqn) {
    let res = "";
    let op = [];
    let len = -1;
    for (let i = 0; i < eqn.length; i++) {
        let ch = eqn.charAt(i);
        if (ch >= '0' && ch <= '9') {
            res += ch + "";
        } else if (ch == '^' || ch == '/' || ch == '*' || ch == '-' || ch == '+') {
            if (len == -1) {
                op[++len] = ch;
            } else {
                while (len != -1 && priority(ch) <= priority(op[len])) {
                    res += op[len] + "";
                    len--;
                }
                op[++len] = ch;
            }
        } else if (ch == '(') {
            op[++len] = ch;
        } else if (ch == ')') {
            while (op[len] != '(') {
                res += op[len--];
            }
            len--;
        } else {
            return "Enter a valid expression";
        }
    }
    while (len >= 0) {
        res += op[len--] + "";
    }
    return res;
}


function postSolver(eqn) {
    var stack = new Array(100);
    var len = -1;
    for (var i = 0; i < eqn.length; i++) {
        var ch = eqn.charAt(i);
        if (ch >= '0' && ch <= '9') {
            stack[++len] = ch - '0';
        } else {
            var a = stack[len--];
            switch (ch) {
                case '+':
                    stack[len] += a;
                    break;
                case '-':
                    stack[len] -= a;
                    break;
                case '*':
                    stack[len] *= a;
                    break;
                case '/':
                    stack[len] /= a;
                    break;
                case '^':
                    stack[len] = Math.pow(stack[len], a);
                    break;
            }
        }
    }
    return stack[len] + "";
}


function calculate(eqn) {
    eqn = eqn.replace(" ", "");
    let post_eqn = postfixGen(eqn);
    let result = postSolver(post_eqn);
    return result;
}
