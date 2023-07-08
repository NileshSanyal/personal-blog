---
title: "Javascript Callback Functions In Depth Guide for 2019"
date: "2019-09-18T11:15:25.000Z"
description: "Javascript callback functions; another important concept you must need to understand. Otherwise, you might face a lot of..."
tags: ["javascript"]
---

![javascript-callback-cover-image](/posts/javascript-callback-cover-image.jpg "javascript-callback-cover-image")

**Javascript callback** functions; another important concept you must need to understand. Otherwise, you might face lot of struggles for becoming a successful javascript developer. But I am sure that after reading this article thoroughly you will be able to overcome any obstacles you previously had with callbacks.

Before, I will talk more about callback function, but at first, you need to have some minimal level of  knowledge about functions. I mean you should know what a function is, how it actually works, what are different types of functions etc.

# A Quick Recap: Javascript Function

## What is a Function?

A function is a logical building block inside of which a set of codes are written in order to perform a specific task. Practically, functions allow writing codes in more organized way that is also easy to debug and maintain. Functions also allow code reuse.

You define function once, and call it when you need to without writing the same codes again and again.

## Syntax for Declaring a Function

We talked a little about what a function is. Now, let's see how to declare a function in javascript.

1. **Using Function Constructor**: In this approach, the function is created with the help of "Function" constructor. Technically, this approach is less efficient than declaring function with the function expression syntax and function declaration statement syntax.

![javascript-callback-function-constructor-syntax](https://1.bp.blogspot.com/-fY4ognZ_mjY/XYJvYeFQOxI/AAAAAAAABZA/mK5P3Cg4Uo0hZvMU7w26U3KJ_BoocVbxACLcBGAsYHQ/s640/javascript-callback-function-constructor-syntax.png "Javascript Callback Function Constructor Syntax")

2. **Using Function Expression**: Typically, this approach is same as variable assignment. In simple words, the function body is considered as an expression and that expression is assigned to a variable. Functions defined with this syntax can be either named or anonymous.

A function that have no name is known as anonymous function. Anonymous function are self invoked, means it calls itself automatically. This behavior is also known as immediately invoked function expression(IIFE).

![javascript-callback-function-expression-named-syntax](https://1.bp.blogspot.com/-7EcJXpTpzu0/XYJtZU-X52I/AAAAAAAABYU/335Wk61hWgoC7hCF-s2-oUBjl9PZkgpWgCLcBGAsYHQ/s640/javascript-callback-function-expression-named-syntax.png "Javascript Callback Function Expression Named Syntax")

![javascript-callback-function-expression-anonymous-syntax](https://1.bp.blogspot.com/-nA--Vxpnsj0/XYJtr-HevbI/AAAAAAAABYc/i62S98ivMLQjfQbdCnVvIpaFWSAoTmbCQCLcBGAsYHQ/s640/javascript-callback-function-expression-anonymous-syntax.png "javascript Callback Function Expression Anonymous Syntax")

3. **Using Function Declaration Statement**: Actually, this method is the old school method that is used commonly in javascript. Here, after the keyword "function" you have to specify the name of the function. After that, if the function accepts multiple parameters or arguments; you need to mention them too. Although this part is completely optional. 

In the body of the function, the function must return a value to the caller. After a return statement is found, the function will stop executing. Inside the function, the parameters will act as a local variable.

Also, the variables that are declared inside the function will be local to that function. Local variables can be accessed within that function only, so variables with the same name can easily be used in different functions. 

![javascript-callback-function-declaration-syntax](https://1.bp.blogspot.com/-vh59QjIzPLs/XYJt29sAjeI/AAAAAAAABYg/U4I46S849xEty6UvPrAqD61OF5lKDjKpgCLcBGAsYHQ/s640/javascript-callback-function-declaration-syntax.png "javascript Callback Function Declaration Syntax")

## Invoking a Function

The function declared before will be invoked when any one of the following occurs:

* When an event occurs for example, user clicks on a button or user selects some option from the dropdown list etc.

* When the function is called from the javascript code.

* The function can also be invoked automatically, we already discussed that in anonymous function expression.

The () operator invokes the function.

# What is Javascript Callback Function?

As per MDN:  *A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action*. 

I know after reading this technical definition, you are confused and hardly able to understand what is actually a callback function.

Let me clarify this with simple words, a callback function is a function that will be executed just after another function has finished executing. Callback function is a function that is passed as an argument to another javascript function. That callback function is executed inside of the function it was passed into.

In javascript, functions are treated as first-class objects. By saying first-class object, we mean that a number or a function or a variable, can be treated as same as any other entity in the language. Being a first-class object, we can pass functions to other functions as variables and functions can be returned from other functions too.

Functions that can do this is known as higher order functions. A callback function is actually a pattern. The word "*pattern*"  means some sort of proven methodology to solve a common problem in software development. There it is better to call the use of callback function as a callback pattern.

# Why We Need Javascript Callback?

The client-side javascript runs in browser and the main browser process is a single threaded event loop. If we try to execute long-running operations within a single-threaded event loop, the process is blocked. This is technically bad because the process stops processing other events while waiting for your operation to complete.

For example, "alert" statement is considered as one of the blocking codes in javascript in the browser. If you run alert; you can no longer do any interaction within the browser, until you close the alert dialog window. In order to prevent blocking on long-running operations, callback is used. 

Let's dive deep so that you will understand exactly in which scenario callback is used.

![javascript-callback-function-usage-scenario](https://1.bp.blogspot.com/--N7eR5j1C9g/XYJuEecqIAI/AAAAAAAABYo/RAFBbuY0xNY-Qujp2pvCwoHMMaA5EkzlQCLcBGAsYHQ/s640/javascript-callback-function-usage-scenario.png "javascript Callback Function Usage Scenario")

In the above code snippet, getMessage() function is executed at first and then displayMessage() is executed. Both displayed a message in the browser's console window and both of them executed immediately.

But in certain situations, some codes are not executed immediately. For example, if we assume that getMessage() function performs an API call where we have to send the request to server and wait for the response, then how we will be able to deal with it ?

Simple, to handle that kind of scenario, we need to use callback functions in javascript.

# How To Use Javascript Callback Function?

Rather than telling you about the syntax of javascript callback functions, I think it would be better if we try to implement callback function on our previous example. The code snippet is shown below in the following screen shot.

![javascript-callback-function-how-to](https://1.bp.blogspot.com/-5i-urIeXOwg/XYJuOvKEhLI/AAAAAAAABYw/nZ9t3PKhXN4Xn0aaBew2bZWQIJSv5DyTACLcBGAsYHQ/s640/javascript-callback-function-how-to.png "javascript Callback Function How To")

In order to use callback function, we need to perform some sort of task that will not be able to display results immediately. To emulate this behavior, we are using javascript's setTimeout() function. That function will take 2 seconds to display the message "Hi, there" to the console window. 

After this message is displayed, then "Displayed message" will be shown in the console window of browser. So in this scenario, at first we are waiting for the getMessage() function and after this function is executed successfully, we are executing displayMessage() function.

# How Javascript Callback Works?

Let me explain what actually happened behind the scene in the previous example. 

As you can see from the previous example, in the getMessage() function, we are passing two arguments; first argument is the "msg" variable which gets displayed in the browser's console window and second argument is the "callback" function.

Now, you may wonder why "callback" function is passed as the argument. It's because to implement callback function, we must pass a function as an argument to another function.

After getMessage() function finishes it's task, we are calling that "callback()" function. After that when we are calling getMessage() function, we passed reference to  "displayMessage()" function, which is treated as a callback function.

Note carefully that, when getMessage() function is called, we are only passing the reference to the "displayMessage" function. That's why, you will not see the function invoke operator i.e, "()" beside it.

# Is Javascript Callback Asynchronous?

Javascript is considered as a single threaded scripting language. By the term "single threaded" it means that javascript execute one code block at a time. When javascript is busy executing one block, it is not possible for it to move to next block.

In other words, we can say that javascript code is always blocking in nature. But this blocking nature, prevents us to write code in certain situations when we are not able to get immediate result after running some specific tasks.

I am talking about tasks such as following. 

* Sending API call to certain endpoint for getting data.

* Sending network request to get some resource (for example, text file, image file, binary file etc. ) from a remote server.

To handle these situations, we must write asynchronous codes and callback function is one approach to deal with these situations. So, callback functions are asynchronous in nature.

# What is Javascript Callback Hell ?

Callback hell occurs when multiple asynchronous functions are executed one after another.  It is also known as **pyramid of doom**.

Let's assume, you want to get list of all github users, then among the users you want to search for only top contributors for javascript repository. Then among the persons, you want to get details of the person whose name is Jhon.

To implement this functionality with the help of callbacks, the code snippet will be similar as shown below.

```javascript
http.get('https://api.github.com/users', function(users) {
  /* Display all users */
  console.log(users);
  http.get('https://api.github.com/repos/javascript/contributors?q=contributions&order=desc', function(contributors) {
  /* Display all top contributors */
    console.log(contributors);
    http.get('https://api.github.com/users/Jhon', function(userData) {
    /* Display user with username 'Jhon' */
      console.log(userData);
    });
  });
});
```

From the above code snippet, you can see that the code becomes harder to understand, harder to maintain and also harder to modify. This happens due to nesting of all the callback functions.

# How do you stop Callback Hell?

Multiple techniques can be used to avoid callback hell there are as follows.



1. By using [promises](https://www.devhelperworld.in/2019/09/javascript-promises-definitive-guide/).

2. With the help of async await.

3. By using async.js library.

I have already discussed, how to work with promises and how async await can be helpful to avoid callback hell.

## By Using Async.js Library

Let's talk about working with async.js library in order to avoid callback hell.

As per the official website of async.js :  *Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript*. 

Async.js provides near about 70 functions in total. For now, we will discuss only two of them i.e, **async.waterfall()** and **async.series()**.

### async.waterfall()

It is useful when you want to run some tasks one after the other and then pass the result from the previous task to the next task. It takes an array of functions "tasks" and a final "callback" function that is called after all functions in "tasks" array have completed or a "callback" is called with an error object.

```javascript
var async = require('async');
async.waterfall([
    function(callback) {
      /*  
        Here, the first argument value is null, it indicates that
        the next function will be executed from the array of functions.
        If the value was true or any string then final callback function
        will be executed, other remaining functions in the array 
        will not be executed.
      */
        callback(null, 'one', 'two');
    },
    function(param1, param2, callback) {
        // param1 now equals 'one' and param2 now equals 'two'
        callback(null, 'three');
    },
    function(param1, callback) {
        // param1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    /*
      This is the final callback function.
      result now equals 'done'
    */
});
```

### async.series()

This function is helpful when you want to run functions and then you need to get the results after all the functions have executed successfully. Main difference between async.waterfall() and async.series() is that async.series() dont pass the data from one function to another function.

```javascript
async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});
```

## Javascript Callback vs Closure

### Closure

In technical terms, a closure is the combination of a function that are bundled together having references to its surrounding state.

Simply saying, a closure allows access to outer function's scope from an inner function.

To use a closure, we need to define a function inside another function. Then we need to return it or pass it to another function.

### Callback

Conceptually callbacks are similar to closure. A callback is basically where a function accepts another function as an argument. 

# Final Words

I hope this article clears all your doubts on javascript callback functions. If you find this article as helpful, share it among others.
