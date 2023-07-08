---
title: "Promises In Javascript A Complete Guide For 2019"
date: "2019-09-14T09:30:00.000Z"
description: "Promises in javascript is an important concept that is essential for a javascript developer to understand. If this concept is clear..."
tags: ["javascript"]
---

![Promises In Javascript Cover Image](/posts/promises-in-javascript-cover-image.jpg "Promises In Javascript Cover Image")

**Promises in javascript** is an important concept that is essential for a javascript developer to understand. If this concept is clear, the developer can utilize this in a variety of ways in their day-to-day lives. 

There are lot of articles, tutorials available on the web about promises. But, very few of them act as a comprehensive guide to make use of promises. In this article, I will try to elaborate promises in depth. So you won't need to go through other resources.

# What is a promise?

As per MDN documentation:  **A promise is an object that represents the eventual completion or failure of an asynchronous operation, and it's resulting value**. 

# Why Do We Use Promises In JavaScript?

Generally speaking, javascript is a scripting language that is synchronous in nature. In order to perform asynchronous operations, promises are of great help. Before promises were invented, when dealing with multiple asynchronous tasks, [callbacks](https://www.devhelperworld.in/2019/09/javascript-callback-in-depth/) were used a lot.

But multiple callback functions lead to unmanageable code that produced something known as callback hell. To solve this issue, promises are used.

*That's a lot of technical jargon, right! But, I think you would understand promises better if the discussion goes in a non technical approach*.

# How Does Promises in Javascript Actually Work?

You can think of javascript promises similar to promises you make in real life.

Imagine, you made a promise to your girlfriend that you will buy her an expensive gift. You don't know whether you will be able to keep your promise. May be you will be able to keep your promise or may be not.

So, if you promised but still didn't manage to purchase the gift, the promise is in pending state. If you are able to keep your promise, then your promise is fulfilled. But, if for some reason, you are unable to do so, your promise is in rejected state.

# When Was Promise Introduced in Javascript?

 Promises aren't a brand-new concept. In fact, they have been around since 1976, when the term was first introduced. In the starting of 2011, the concept of it were made popular by jQuery deferred objects. The concept of deferred objects  are similar to promises, but they do not follow the exact technical specification as stated in the ECMA script 2015 for promises.

Finally, promises were officially added in the ECMA script 2015 specification and has also implemented in all of the latest browsers and in Node Js.

# Different States In A Promise

The same concepts apply to promises as well. A promise has any one of the following states. These are as follows:

1. Pending : The task relating to the promise hasn't fulfilled or rejected yet.

2. Fulfilled: The task relating to the promise succeeded.

3. Rejected: The task relating to the promise failed.

One important point to note here is that, the function that creates the promise is able to keep track of the promise states.

# Getting To Know More About The Promise Object

```javascript
var isPossibleToPurchaseGift = true;
var giftPromise = new Promise(function(resolve, reject) {
  if(isPossibleToPurchaseGift) {
     resolve('You are able to keep your promise');
  } else {
     reject('You are unable to keep your promise');
  }
});
console.log(giftPromise);
```

In the code above, we created a promise, if the value of variable "**isPossibleToPurchaseGift**" is set to true then the promise is resolved. Finally, we are displaying that promise's resolved state in the browser's console window.

If we look closer in the console window, we are able to expand the Promise object, then if we expand the highlighted portion as shown in the screen shot below, we are able to get same as shown in the screen shot below.

![javascript-promise-object-in-depth-part-one](https://1.bp.blogspot.com/-GZOYWtwYeMk/XXzAjrtQLuI/AAAAAAAABWM/OsBgVWbtqf0EriX5iZaVf92kn7alq20JQCLcBGAsYHQ/s640/javascript-promises-object-in-depth-two.png "Javascript Promise Object In Depth Part One")

If we expand further, we will see something similar as shown below. Note, the highlighted portions in the image.

![javascript-promise-object-in-depth-part-two](https://1.bp.blogspot.com/-qDYHH0SbOJo/XXzBA-EggEI/AAAAAAAABWU/er4iJkiHkLotgMe57uhdwO7b8EJGl07ewCLcBGAsYHQ/s640/javascript-promises-object-in-depth-three.png "Javascript Promise Object In Depth Part Two")

## Static Methods in Promise Object

*Promise.all(promises)* : It waits for all promises to resolve and returns the array of all the results of the promises. Important point to note here is that, if any of the promises is not fulfilled, then that becomes the error of the Promise.all and all other results are ignored.

*Promise.allSettled(promises)* : It is recently added method. It's purpose is to wait for all promises to settle and return their results as array of objects with state ( that could be either 'fulfilled' or 'rejected' ) and value ( if fulfilled ) or reson (if rejected).

*Promise.race(promises)* : It waits for the first promise to resolve and its outcome or error becomes the result.

*Promise.resolve(value)* : It produces a resolved promise with the given value.

*Promise.reject(error)* : It generates a rejected promise with the given error.

# Creating A Promise In Javascript

```javascript
var isPossibleToPurchaseGift = true;

var willGetNewGift = new Promise(function(resolve, reject) {
    if(isPossibleToPurchaseGift) {
      var gift = {
         ring: true,
         flowers: true
      };
       resolve(gift);
    } else {
       var error = new Error('Left my wallet!!');
       reject(error);
    }
});
```
In the code above, we have created a promise called "**willGetNewGift**". The promise constructor takes two parameters, first is resolve function and the second one is reject function.

## What is Promise Resolve in Javascript?

In simple words, resolve function indicates if the promise is succeeded then the promise object is resolved with a given value. So, in the above code snippet, if "**willGetNewGift**" variable is set to true then the promise will return a gift object.

## What is Promise Reject in Javascript ?

The reject function returns a promise object that is rejected with an error message. In, the above code snippet if "**willGetNewGift**" variable is set to false, then this promise will return an error object.

# Invoking The Promise In Javascript

```javascript
var getNewGift = function() {
  willGetNewGift
    .then(function(gift) {
    console.log(gift);
    
  })
  .catch(function(error) {
    console.log(error.message);
  });
}; 
 
getNewGift();
```
In the code above, we are calling the promise named "**willGetNewGift**" and then in order to get the value of the fulfilled promise we are using then() function. We set the variable "**isPossibleToPurchaseGift**" to true. If the value is true we are considering that the promise is resolved. So, that we are able to display the gift object inside then() function. The complete code of it is shown below.

```javascript
var isPossibleToPurchaseGift = false;
var willGetNewGift = new Promise(function(resolve, reject) {
  if(isPossibleToPurchaseGift) {
    var gift = {
      ring: true,
      flowers: true
    };
    resolve(gift);
  } else {
    var error = new Error('Left my wallet!!');
    reject(error);
  }
});

var getNewGift = function() {
  willGetNewGift
    .then(function(gift) {
      console.log(gift);
    })
    .catch(function(error) {
      console.log(error.message);
    });
};

getNewGift();
```

# Chaining Promises in Javascript

## Non Technical Point of View

Let's assume after making a promise to your  girlfriend to buy her an expensive gift, then you would also like to attend dinner with her and finally you would love to go on a long drive with her. Imagine, the situation here, after keeping your first promise, you will have to keep your second and third promise too.

To handle these kind of situations you would need to chain multiple promises together. So promise chanining comes handy in these situations.

## Technical Point of View

1. The promise object is capable of performing asynchronous tasks in javascript. Each asynchronous task will return a promise object and each promise object will have a then function that can take two parameters, a success handler and an error handler.

2. The *then* function will also return a promise, so that it is possible to chain multiple promises. 

3.  Each of the handlers (success or error) can also return a value, which will be passed to the next function as a parameter, in the chain of promises. 

4.  If a handler returns a promise, then the next handler will be called only after that request is finished. 

Let's justify what we said earlier with an example.

### Implementing Promise Chaining in Javascript

```javascript
var isPossibleToPurchaseGift = true;

var willGetNewGift = new Promise(function(resolve, reject) {
    if(isPossibleToPurchaseGift) {
      var gift = {
         ring: true,
         flowers: true
      };
       resolve(gift);
    } else {
       var error = new Error('Left my wallet!!');
       reject(error);
    }
});

var willAttendDinner = function(expensiveGift) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your promise by giving her an expensive ring';
    resolve(message);
  });
};

var willGoOnALongDrive = function(dinnerAttended) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your last promise by going on a long drive!';
    resolve(message);
  });
};

var getNewGift = function() {
  willGetNewGift
    .then(willAttendDinner)
    .then(willGoOnALongDrive)
    .then(function(longDrive) {
    console.log(longDrive);
  });
};

getNewGift();
```

In the above code snippet, we defined 3 separate functions, first function "**willGetNewGift**" returns a promise object, the other functions also return promises.

Let me explain exactly what happened.  At first, "**willGetNewGift**" function is called that returns a promise then that promise object is passed to the next function "**willAttendDinner**", similarly it also returns a promise object.  Again, that object is passed to "**willGoOnALongDrive**" function. Finally, the result of the function is displayed on the console. That's why you will be able to see "You kept your last promise by going on a long drive!" this message.

## What is Promise.all()?

In simple words, promise.all() is a method that is beneficial when we have multiple promises and we have to wait for each individual promises to complete before the next promise can be executed.

As per MDN documentation:  *The Promise.all() method returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects*. 

So, one fact is clear from the documentation that, if any one of the promise object in the array gets rejected, the entire Promise.all() method gets rejected.

### How Does Promise.all() Work?

From the MDN docs, we know that Promise.all() method takes an iterable object. By iterable object, it means that the object can be iterated easily. String and arrays are examples of such kind of iterable objects.

Generally, this method returns a pending promise object that gets resolved or rejected in an asynchronous way as soon as the promise in the given iterable object have resolved or rejected. 

After promise is resolved successfully, the values of the respective promises will be there in same order at the time they are passed in the promise all method.  If any of the promises in the iterable gets rejected, all the promises gets rejected. This incident will take place even if rest of the promises are resolved successfully.

### Implementing Promise.all() in Javascript

```javascript
var isPossibleToPurchaseGift = true;
var willGetNewGift = function() {
   return new Promise(function(resolve, reject) {
    if(isPossibleToPurchaseGift) {
      var gift = {
         ring: true,
         flowers: true
      };
       resolve('You bought an expensive ring and flowers');
    } else {
       var error = new Error('Left my wallet!!');
       reject(error);
    }
  });
};
var willAttendDinner = function(expensiveGift) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your promise';
    resolve(message);
  });
};
var willGoOnALongDrive = function(dinnerAttended) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your last promise by going on a long drive!';
    resolve(message);
  });
};
var getNewGift = function() {
  Promise.all([
    willGetNewGift(),
    willAttendDinner(),
    willGoOnALongDrive()
  ]).then(function(result) {
    console.log(result);
  });
};
getNewGift();
```

In the above code snippet, we created 3 functions each of them returns a promise object. Then we called each of them in Promise.all() function, which returned result of the promises inside an array. The output of this is shown below.

![javascript-proimise-all-first-output](https://1.bp.blogspot.com/-yB3yHC3njEE/XXzvcs4u4EI/AAAAAAAABWs/Edyx9qLK-fc894ngB_8JBmJE-cHlXc8xQCLcBGAsYHQ/s1600/javascript-promises-object-promise-all.png "Javascript Proimise All First Output")

If any one of the promise fails to resolve, the result will generate an error. The code snippet is shown below.

```javascript
var isPossibleToPurchaseGift = false;
var willGetNewGift = function() {
   return new Promise(function(resolve, reject) {
    if(isPossibleToPurchaseGift) {
      var gift = {
         ring: true,
         flowers: true
      };
       resolve('You bought an expensive ring and flowers');
    } else {
       var error = new Error('Left my wallet!!');
       reject(error);
    }
  });
};
var willAttendDinner = function(expensiveGift) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your promise';
    resolve(message);
  });
};
var willGoOnALongDrive = function(dinnerAttended) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your last promise by going on a long drive!';
    resolve(message);
  });
};
var getNewGift = function() {
  Promise.all([
    willGetNewGift(),
    willAttendDinner(),
    willGoOnALongDrive()
  ]).then(function(result) {
    console.log(result);
  }).catch(function(error){
    console.log(error.message);
  });
};
getNewGift();
```
The output of the code is shown below.

![javascript-promise-all-second-output](https://1.bp.blogspot.com/-XB4TCsCBDs4/XXzwhzejenI/AAAAAAAABW4/pps15OM8SW8-YDeeMPh1DkURFOtYAoDRgCLcBGAsYHQ/s640/javascript-promises-object-promise-all-output.png
 "Javascript Promise All Second Output")

## What is Promise.race()?

If we need to return the result of the first resolved promise or rejected promise as soon as it is available, then we should use this function.

As per MDN documentation, *The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise*. 

### Implementing Promise.race() in Javascript

```javascript
var isPossibleToPurchaseGift = true;
var willGetNewGift = function() {
   return new Promise(function(resolve, reject) {
    if(isPossibleToPurchaseGift) {
      var gift = {
         ring: true,
         flowers: true
      };
      setTimeout(function(){
       resolve('You bought an expensive ring and flowers'); 
      }, 500);
       
    } else {
       var error = new Error('Left my wallet!!');
       reject(error);
    }
  });
};
var willAttendDinner = function(expensiveGift) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your promise';
     setTimeout(function(){
        resolve(message);
     }, 2000);
  });
};
var willGoOnALongDrive = function(dinnerAttended) {
  return new Promise(function(resolve, reject) {
    var message = 'You kept your last promise by going on a long drive!';
    setTimeout(function(){
       resolve(message);
    },3000);
  });
};
var getNewGift = function() {
  Promise.race([
    willGetNewGift(),
    willAttendDinner(),
    willGoOnALongDrive()
  ]).then(function(result) {
    console.log(result);
  }).catch(function(error){
    console.log(error.message);
  });
};
getNewGift();
```

In above code snippet, we can see that from the 3 functions that return promise objects upon successful execution, only *willGetNewGift()* function took 500 milliseconds to execute. So the result of this promise is returned after running this code block.

![javascript-promise-race-output](https://1.bp.blogspot.com/-O0yHCcm0YWg/XXzyQv1FkPI/AAAAAAAABXQ/tEAPqdtVfeMrJslmjOMkkVBpgUA2_B2HQCLcBGAsYHQ/s640/javascript-promises-object-promise-race-output.png "Javascript Promise Race Output")

# Are Javascript Promises Synchronous or Asynchronous?

At first, you should know that javascript is a single threaded scripting language. Single threaded means that it must execute one block of code before moving to execute the next code block. In simple words, javascript code is always blocking in nature. 

Sometimes we need to perform some tasks, and we are not sure exactly when that task will be complete and it's result will be returned. But, at the same time we need to guarantee that some blocks of code must be executed when we get a successful result or if failure occurs we need to handle that scenario too.

To tackle these situations, we need to write asynchronous codes in javascript. Promises allow writing codes in asynchronous way. So, obviously we can say that promises are asynchronous.

Let's justify with an example that promises are asynchronous.

```javascript
var isPossibleToPurchaseGift = true;

// willGetNewGift promise definition

// willAttendDinner promise definition

// willGoOnALongDrive promise definition

var getNewGift = function() {
  console.log('Before giving gift');
  willGetNewGift
    .then(willAttendDinner)
    .then(willGoOnALongDrive)
    .then(function(longDrive) {
    console.log(longDrive);
  });
   console.log('After giving gift');
};

// call our promise
getNewGift();
```

Probably, you expected following output.

* Before giving gift
* You kept your last promise by going on a long drive!
* After giving gift

But, the actual output is shown in the screen shot below.

![javascript-promises-are-asynchronous](https://1.bp.blogspot.com/-c3kKyUFGSa0/XXzz7V1x0OI/AAAAAAAABXc/vbiPhjoBjWkWh_BSS7XM48tD21oaIu1zQCLcBGAsYHQ/s640/asynchronous-javascript-promises-example.png "Javascript Promises Are Asynchronous")

# Implementing Javascript Promises in Cleaner Way

All the examples in this article uses the syntax of promise wrapper. We used this syntax so that you can understand promises easily, but practically we can write promises in a lot of better way. If we write promises in that approach, maintaining promises for complex tasks will be lot easier.

Let me explain what I mean by promise wrapper. In promise wrapper, you write codes that resolves or rejects a promise depending on whether a promise successfully executed or not.

```javascript
return new Promise(function(resolve, reject){
      // codes to execute
});
```

Above code snippet is the example of promise wrapper.

Following code snippet explains how you can write promises in a better way.

```javascript
var isPossibleToPurchaseGift = true;
//var isPossibleToPurchaseGift = false;
var willGetNewGift = function() {
    if(isPossibleToPurchaseGift) {
       return Promise.resolve('It is possible to purchase gift');
    } else {
       var error = new Error('Left my wallet!!');
       return Promise.reject(error);
    }
};

var willAttendDinner = function(purchasedGift) {
//   purchasedGift = false;
  if(purchasedGift) {
    return Promise.resolve('It is possible to attend dinner');
  } else {
    return Promise.reject(new Error('Unable to attend dinner!!'));
  }
  
};

var willGoOnALongDrive = function(attendedDinner) {
//   attendedDinner = false;
  if(attendedDinner) {
    return Promise.resolve('It is possible to go on a long drive');
  } else {
    return Promise.reject(new Error('Unable to go on a long drive!!'));
  }
  
};

willGetNewGift()
  .then(willAttendDinner)
  .then(willGoOnALongDrive)
  .then(function(response){
  console.log(response);
}).catch(function(error){
  console.log(error.message);
});
```

Try uncommenting each of the commented statement one at a time, then run the codes again. I am sure you will understand the differences pretty easily.

# Writing Javascript Promises With ES6/ES2015, ES7

ES6 or ES2015 introduced "let", "const" and "fat arrow" syntax. Using that you can write promises in a better way. 

We can rewrite previous example in a better way with ES6. The code snippet is shown below.

```javascript
const isPossibleToPurchaseGift = true;
// const isPossibleToPurchaseGift = false;
var willGetNewGift = ()=> {
    if(isPossibleToPurchaseGift) {
       return Promise.resolve('It is possible to purchase gift');
    } else {
       const error = new Error('Left my wallet!!');
       return Promise.reject(error);
    }
};

var willAttendDinner = (purchasedGift)=> {
//   purchasedGift = false;
  if(purchasedGift) {
    return Promise.resolve('It is possible to attend dinner');
  } else {
    return Promise.reject(new Error('Unable to attend dinner!!'));
  }
  
};

var willGoOnALongDrive = (attendedDinner) => {
//   attendedDinner = false;
  if(attendedDinner) {
    return Promise.resolve('It is possible to go on a long drive');
  } else {
    return Promise.reject(new Error('Unable to go on a long drive!!'));
  }
  
};
 
willGetNewGift()
  .then(willAttendDinner)
  .then(willGoOnALongDrive)
  .then(response =>console.log(response))
  .catch(error =>console.log(error.message));
```

You can play around the code snippet better if you uncomment the commented lines.

ES7 introduced async and await syntax. After applying this to our ES6 code it would be easier for us to understand. Also, we don't need to use then and catch functions. For error handling you need to use try...catch syntax of javascript.

```javascript
const isPossibleToPurchaseGift = true;
// const isPossibleToPurchaseGift = false;
var willGetNewGift = ()=> {
    if(isPossibleToPurchaseGift) {
       return Promise.resolve('It is possible to purchase gift');
    } else {
       const error = new Error('Left my wallet!!');
       return Promise.reject(error);
    }
};

var willAttendDinner = (purchasedGift)=> {
  // purchasedGift = false;
  if(purchasedGift) {
    return Promise.resolve('It is possible to attend dinner');
  } else {
    return Promise.reject(new Error('Unable to attend dinner!!'));
  }
  
};

var willGoOnALongDrive = (attendedDinner) => {
  // attendedDinner = false;
  if(attendedDinner) {
    return Promise.resolve('It is possible to go on a long drive');
  } else {
    return Promise.reject(new Error('Unable to go on a long drive!!'));
  }
  
};
async function callFunctions() {
  try {
    willGetGift = await willGetNewGift();
    attendDinner = await willAttendDinner(willGetGift);
    willGoOnALongDrive = await willGoOnALongDrive(attendDinner);
     console.log(willGoOnALongDrive); 
    
  } catch(error) {
    console.log(error.message);
  }
} 

callFunctions();
```

Again, to understand the code better I would advise you to uncomment commented codes one at a time. This way you will understand better.

# Conclusion

I hope after reading this article you will understand javascript promises in depth. If you find this article as helpful, don't forget to share it among others. Thank you!
