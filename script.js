console.log(`Alab - Practical use of event loop`);

//#############Part 1: Stack Overflow
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


//#########Part 2: Trampolines
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


//#############Part-3: Deferred Execution
//Create a simple HTML element to hold text. Cache this HTML element into a JavaScript variable.
//Write a function that takes a parameter n and adds a list of all prime numbers between one and n to your HTML element.
//Once complete, use the alert() method to alert the user that the calculation is finished.

const pEle = document.getElementById('prime');

function isPrime(num) {
    if (num <= 1) { return false; }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) { return false; }
    }
    return true;
}
function displayPrimes(num, current = 1, primes = []) {
    //let primes = [];
    if (current > num) {
        pEle.textContent = primes.join(', ');
        alert('Calculation complete!');
        return;
    }
    if (isPrime(current)) {
        primes.push(current);
    }
    pEle.textContent = primes.join(', ');

    setTimeout(() => displayPrimes(num, current + 1, primes), 0);
}
//prompt user for n value
const n = parseInt(prompt(`Enter a number: `));
if (!isNaN(n) && n > 0) {
    displayPrimes(n);
} else {
    alert(`Please enter a valid positive number.`);
}

//setTimeout - scheduling a function to be executed after a specified delay. The delay of 0ms, which means "as soon as possible" but after the current execution context is finished. 0ms is the Minimum Delay.



