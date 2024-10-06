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
