---
title: "Facts You Need To Know About Javascript This Object Today"
date: "2019-09-28T02:30:00.000Z"
description: "All of us know that javascript supports object-oriented programming features. So we can say that an object is a..."
tags: ["javascript"]
---

![Javascript this object Cover Image](/posts/javascript-this-object-cover-image.jpg "Javascript this object Cover Image")

All of us know that javascript supports object-oriented programming features. So we can say that an object is a basic building block of OOP ( object-oriented programming). There is one special object available in *javascript, "this" object*.

In this article, we will learn how "this" keyword actually works, how the value of "this" object is helpful in different situations.
 
But, before diving more deeply about "this" object, we need to know the fundamentals of how the browser executes js code.

# Understanding Execution Context

As we all know, javascript is a scripting language. So, naturally, the interpreter interprets javascript code. Then that the code gets executed line by line. The scope in which the code is executed is known as the execution context.

Let's understand this concept with an example in real-life scenarios. Suppose you were asked about your role in the project in which you are currently working. Then in response to this question, you will briefly explain your role. So, you gave your answer in the context for which the question was asked. A similar concept is applicable in javascript's execution context.

When any code is executed in javascript, it is evaluated as one of the following.


* Global context: In this environment, your code is run for the first time.

* Function context: It is applicable whenever the flow of execution enters a function body.

* Internal context: Text that will be executed inside the internal eval function falls under this scope.

![javascript-this-execution-context](https://1.bp.blogspot.com/-e4qxeiqA8_k/XY94_CkFc0I/AAAAAAAABd8/oFi_EOoZUdkXTv6LOOapWDIAB7QSQDk2wCLcBGAsYHQ/s640/javascript-this-execution-context.png "Javascript This Execution Context")

In the above screenshot, the red border indicates global context, green one refers to a function or local context. Global context can be accessed from any other context in the javascript code. 

When a function is called it creates a private scope, in which anything declared inside of the function can not be directly accessed from outside the current function scope. 

But, a function can easily access a variable that is declared outside of its current context. This is the fundamental concept of the execution context. 

## Role of Javascript this Object in Execution Context

Now, you have a clear concept on execution context, let's discuss how "this" object plays its role in it.

We already know that javascript is executed as a single thread, that means only one statement will run in the browser. Other actions will be stored in a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) which is known as the execution context.

The execution context is changed depending on the item that is present at the top of this stack. The object that "this"  refers to changes every time when the execution context is changed.

"this" object refers to the global object. Whenever a code is run as part of a function call, then "this" refers to the global object. 

For example, when we run javascript in the browser, the window object is considered a global object. In Node Js environment, a unique object "global" will be the value of "this".

![javascript-this-global-object](https://1.bp.blogspot.com/-In7V5LMpzOI/XY95Zox5XxI/AAAAAAAABeE/ZydaYylaFFQxcHOVKGTOXqqKIQT6t1TwQCLcBGAsYHQ/s640/javascript-this-global-object.png "Javascript This Global Object")

# What Does this in Javascript Mean

The keyword has different meanings and these depend on exactly where "this" keyword is used.

1. It refers to the global object that is global if is called in a Node Js environment and it belongs to the window object if it is executed in the browser environment.

2. At the time when a function is executed as a property of an object, then "this" refers to the parent object.

3. When a function is called with the "new" operator, then "this" refers to the newly created instance.

4. When a function is executed with apply and call method then at that time "this" refers to the value passed as the first parameter of apply or call method.

Let's discuss these use cases one by one.

## Javascript this Object Use Cases

### In IIFE(Immediately Invoked Function Expression) : 

![javascript-this-object-iife](https://1.bp.blogspot.com/-f7qGTW6ZisI/XY951P6WSxI/AAAAAAAABeM/Q8qmHgg3X9Urm0pjICE4M98E8bYEXZJbACLcBGAsYHQ/s640/javascript-this-iife.png "Javascript This Object IIFE")

If you don't know what is IIFE, you can know more about it [here](https://dev.to/nileshsanyal/javascript-callback-functions-in-depth-guide-for-2019-gj7). If "use strict" option is turned on, then the value of "this" will be undefined. Also, the global object refers to undefined in case of the window object.

### Refers To a Current Instance

When we define a class in javascript, and if we define a constructor there, then that constructor will return a new instance of that class. For that scenario, "this" keyword will refer to the current instance of the newly created class.

![javascript-this-object-constructor](https://1.bp.blogspot.com/-FQOC3Rgsd-o/XY96SK9m3nI/AAAAAAAABeU/mS8xtNRt2EwzqToMHb4HrZIDroeES6t4ACLcBGAsYHQ/s640/javascript-this-constructor.png "Javascript This Object Constructor")

### Refers To Parent Object

In javascript, the property of an object can be a value or a simple method. At the time when the method that belongs to an object is called then "this" refers to the object that contains the method which will be executed.

![javascript-this-parent-object](https://1.bp.blogspot.com/-uOJ4j22iIrk/XY96jyK-WKI/AAAAAAAABec/jsZBpMzPUBYv-kcTsgPLsUbweqhen_9-ACLcBGAsYHQ/s640/javascript-this-parent-object.png "Javascript This Parent Object")

In the above code snippet, when **user.showMessge()** method of user instance is called, "this" keyword refers to the user object instead of the global object. That's why it displayed "false" as output. 

 But, when only **showMessage()** method is called, "this" keyword refers to the global object. So, that time "true" is displayed. At the time when **fun1()** is called, it displayed "true" as it was treated as a normal function.

### Uses With call() and apply() Methods

Javascript function is known to have 3 unique functions, those are call(), apply() and bind() functions. With the help of these functions, we can explicitly specify what should be referenced by "this" keyword within the calling function.

![javascript-this-parent-call-and-apply](https://1.bp.blogspot.com/-LfXvdh2XUZo/XY966re7rjI/AAAAAAAABek/vUCy23Xv52ItWMoCEvACR6ey0hfYc5kGwCLcBGAsYHQ/s640/javascript-this-call-and-apply.png "Javascript This Parent Call And Apply")

The main difference between call and apply method is that call() function expects parameters to be passed individually, where apply() function expects them to be passed as an array of parameters.

# Final Words

I hope that I am able to clear all your doubts regarding javascript "this" object. If this article proves beneficial to you, share it among others.