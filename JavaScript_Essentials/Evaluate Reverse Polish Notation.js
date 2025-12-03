var evalRPN = function(tokens) {
    let stack = [];

    for (let t of tokens) {
        if (!isNaN(t)) stack.push(Number(t));
        else {
            let b = stack.pop();
            let a = stack.pop();
            switch (t) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(parseInt(a / b)); break;
            }
        }
    }
    return stack.pop();
};
