console.log(`Alab - Practical use of event loop`);

//Part 1: Stack Overflow
let count = 0;
function incrementCounter() {
    count++;
    console.log(`Counter value: ${count}`);
    incrementCounter(); //recursive call
}
//incrementCounter()//func call to start recursion

// Surround the initial function call in a try/catch block
try {
    incrementCounter();
} catch (error) {
    console.log("Error message: ", error.message)
}

//The error.message property is part of the standard error object in JavaScript
//when an exception is thrown, js creates an error object, it has several properties, one of which is message

//Part 2: Trampolines
//trampolining - eliminates stack overflow issue if implemented correctly.

const factorial = (n) => {
    if (n === 0) return 1; // The base case, to stop recursion
    return n * factorial(n - 1); // The recursive call
}

//console.log(factorial(5));

function flatten(arr) {
    function _flatten(arr, result) {
        if (arr.length === 0) return result;
        const head = arr[0]; // Get the first element
        const tail = arr.slice(1); // Get the rest of the array

        if (Array.isArray(head)) {
            // If head is an array, concatenate it with tail
            return function () {
                return _flatten(head.concat(tail), result);
            };
        } else {
            // If head is not an array, add it to the result
            return function () {
                return _flatten(tail, result.concat(head));
            };
        }
    }

    return trampoline(_flatten(arr, []));
}

function trampoline(fn) {
    let result = fn;
    while (typeof result === 'function') {
        result = result(); // Execute the returned function
    }
    return result;
}


let nestedArray = [1, [2, [3, 4], 5], 6];
let flattenedArray = flatten(nestedArray);
console.log(flattenedArray);



