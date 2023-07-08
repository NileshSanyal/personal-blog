---
title: "A Complete Guide To Passport JS Part 1"
date: "2019-08-24T11:45:10.000Z"
description: "In simple words, passport js is a middleware for the express js framework. It allows developers to integrate different types of..."
tags: ["javascript"]
---

![Complete guide to passport js part 1](/posts/passport_js.jpg "Complete guide to passport js part 1")

In simple words, **passport js** is a middleware for the express js framework. It allows developers to integrate different types of authentication strategies with very little amount of code. For example: developers can add various types of sign in functionality with different services like google, facebook, twitter, github etc, also developers can add their own custom strategy by authenticating users with email and password.

We can also combine all of the strategies so that users can login with any one of the selected strategies. It is much quicker to use passport js rather than building a custom authentication strategy from scratch.


 When I first started working with passport js, it took me several days to fully understand the inner-workings of it. I went through the official documentation, searched for tutorials, looked in stack overflow for help, after doing all these extra work I was able to understand it. 

## Topics Covered In This Article

* Setting up callback function for configuring passport strategy.

* Importance of passport.authenticate() function in callback url.

* Setting up middleware to check if a user is already logged in or not.

* How serializeUser() and deserializeUser() actually works.

Ok, so let's get started.

### Setting up callback function for configuring passport strategy

Take a look at the code below. Here, we have required the module for passport local strategy, we added two routes; one for displaying login page and another for handling the callback url. After "/login" route is called, we request users to enter their email id and password.

 If email id and password submitted by the user matches with these values, we return the email id of the user. If no match is found then we return false to indicate that authentication failed.  

This is possible with the help of done() function. It is an internal passport js function that takes care of supplying user credentials after user is authenticated successfully. This function attaches the email id to the request object so that it is available on the callback url as "req.user".

It will be available for the dashboard route, where you would set the session for the user and then to another part of your web application.

 ### Importance of passport.authenticate() function

This function is internally used by passport js to make sure that users are logged in before they are going to that url directly. It should be used in such a situation when they must be logged in order to access a protected url of the application. For example, to access dashboard page user must be logged in first.

 ### Setting up middleware to check if a user is already logged in or not
 
To check if someone is logged in we need to check if req.session.user value is set. Then we need to use this function as [middleware](https://www.tutorialspoint.com/expressjs/expressjs_middleware.htm) on GET route(s) that we want to grant access to only logged in users. The code for middleware is given below.

```javascript
const LocalStrategy = require('passport-local').Strategy;

app.get('/login', (req, res) => {
        res.render('login');
});

app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard'
}));

passport.use(new LocalStrategy(
     (username, password, done) => {
         if(username === 'test@gmail.com' && password === '1234') {
             return done(null, {username: 'test@gmail.com'});
         } else {
             return done(null, false);
         }
      }
 ));

function isLoggedIn(req ,res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    return res.redirect('/login');
}

```

In the above code, we checked to see if the user is authenticated or not using passport js's built in **isAuthenticated()** function. If user is authenticated, the request continues as **next()** function is called. Otherwise, user is redirected to login page.

We want to allow only logged in users to visit the dashboard page, the code for doing so is given below.

```javascript
 app.get('/dashboard', isLoggedIn, (req, res) => {
      res.render('dashboard');
 });
```

In the code above, we have added the isLoggedIn() function that we created earlier to the dashboard route. It will act as a middleware to allow only logged in users to visit the dashboard page.

 ### How serializeUser() and deserializeUser() actually works 

After successful authentication, passport attaches user's email id to the req.user object. It is possible due to the existence of serializeUser() and deserializeUser() functions.

Previously, when we configured passport js by setting up the callback function, we passed the email value in done() callback function. This step was necessary, as passport needs to take the email id and store it internally in req.session.passport object which is passport's way of keeping track of things.

For accomplishing this task, serializeUser() function must be defined. The code for this function is provided below.

```javascript
passport.serializeUser(function(user, done) {
    done(null, user.username);
});
```

In the deserializeUser() function, the email id is given as the first parameter which is same email id that was passed in the serializeUser() function. Then this function makes a request to the database to find email id of the user by invoking done() function. After this step, the email id of the user is attached to the req.user object.

```javascript
passport.deserializeUser((username, done) => {
    done(null, {username: username});
}); 
```

## Finally, The Application That We Will Build

We will be building a simple web application that will explain how to work with passport local module which is a package provided by passport js itself. We won't be storing user credentials in any database. We are doing this intentionally so that you can focus on the essential concepts related to passport js. But, in real world application, a database must be used.

### Overall Project Structure

![Passport Js Part 1 Overall Project Structure](https://1.bp.blogspot.com/-8llA9KDciUs/XWECx2eN20I/AAAAAAAABUE/xHmNB0_cUJoybmzIxF4j7qNQj0D_Kxm4ACLcBGAs/s400/passport_js_overall_project_structure.png "Passport Js Part 1 Overall Project Structure")

### Discussion on project structure

* app.js file: The main gateway to our express js application. Here, we will set all the dependencies, all middlewares required for the application and error handling codes etc.

* routes/index.js file: In this file, we are storing all the routes for our application. 

* views folder: It stores all the dynamic pages for our application. For generating dynamic content for our pages, we are using handlebars as the template engine. For now, it contains two pages i.e, dashboard.hbs and login.hbs.

* public folder: This folder stores all the  static resource files(i.e, css,js, image files etc) required by the dashboard.hbs and login.hbs pages.

* package.json file: It stores various modules that are required for building the application.

### Creating The Node Server

```javascript
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app = express();
const port = 8000;

// setup for body-parser module
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// express session middleware setup
app.use(session({
    secret: 'W$q4=25*8%v-}UV',
    resave: true,
    saveUninitialized: true
}));

// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize());
app.use(passport.session());

// setup for loading static resources from 'public' directory
app.use(express.static(path.join(__dirname,'public')));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'views'));

require('./routes/index')(app, passport);

app.listen(port, () => console.log(`Server is running on port ${port}`));
```

**Explanation of the app.js file**

In app.js, we need to store all the references to third party modules that are used for the application. Then we need to configure them accordingly. One **important note** I would like to mention here, if we are using express-session module in our application, then we must configure passport middleware just after express-session middleware setup.

### Configuring Passport

```javascript
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app, passport) => {

    app.get('/dashboard', isLoggedIn, (req, res) => {
        res.render('dashboard');
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard'
    }));

    passport.use(new LocalStrategy(
        (username, password, done) => {
            if(username === 'test@gmail.com' && password === '1234') {
                return done(null, {username: 'test@gmail.com'});
            } else {
                return done(null, false);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        done(null, {username: username});
    }); 

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/login');
        }
    }
};
```

I already explained how this configuration actually works. If you want to revisit that section, go to the heading entitled **"Topics Covered In This Article"**.

### Creating The Login Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Material Login Form</title>

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
 
    <link rel="stylesheet" href="css/login-style.css">

</head>
<body>
    
    <div class="materialContainer">
       
   <div class="box">
      <div class="title">LOGIN</div>
      <form action="/login" method="post">
        <div class="input">
            <label for="name">Email</label>
            <input type="text" name="username" id="name">
            <span class="spin"></span>
        </div>

        <div class="input">
            <label for="pass">Password</label>
            <input type="password" name="password" id="pass">
            <span class="spin"></span>
        </div>

        <div class="button login">
            <button><span>Log In</span> <i class="fa fa-check"></i></button>
        </div>

      </form>  

   </div>

</div>

    <script src="js/jquery.min.js"></script>
    <script src="js/script.js"></script>

</body>
</html>
```

### Creating The Dashboard Page

```html

<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Material Admin</title>
  <link rel="stylesheet" href="css/materialdesignicons.min.css">

  <link rel="stylesheet" href="css/style.css">
  <link rel="shortcut icon" href="images/favicon.png" />
</head>

<body>
  <div class="body-wrapper">
    <aside class="mdc-persistent-drawer mdc-persistent-drawer--open">
      <nav class="mdc-persistent-drawer__drawer">
        <div class="mdc-persistent-drawer__toolbar-spacer">
          <a href="javascript:void(0);" class="brand-logo">
						<img src="images/logo.svg" alt="logo">
					</a>
        </div>
        <div class="mdc-list-group">
          <nav class="mdc-list mdc-drawer-menu">
            <div class="mdc-list-item mdc-drawer-item">
              <a class="mdc-drawer-link" href="javascript:void(0);">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">desktop_mac</i>
                Dashboard
              </a>
            </div>
            <div class="mdc-list-item mdc-drawer-item">
              <a class="mdc-drawer-link" href="#">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">track_changes</i>
                Forms
              </a>
            </div>
            <div class="mdc-list-item mdc-drawer-item" href="javascript:void(0);" data-toggle="expansionPanel" target-panel="ui-sub-menu">
              <a class="mdc-drawer-link" href="#">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">dashboard</i>
                UI Features
                <i class="mdc-drawer-arrow material-icons">arrow_drop_down</i>
              </a>
              <div class="mdc-expansion-panel" id="ui-sub-menu">
                <nav class="mdc-list mdc-drawer-submenu">
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      Buttons
                    </a>
                  </div>
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      Typography
                    </a>
                  </div>
                </nav>
              </div>
            </div>
            <div class="mdc-list-item mdc-drawer-item">
              <a class="mdc-drawer-link" href="javascript:void(0);">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">grid_on</i>
                Tables
              </a>
            </div>
            <div class="mdc-list-item mdc-drawer-item">
              <a class="mdc-drawer-link" href="javascript:void(0);">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">pie_chart_outlined</i>
                Charts
              </a>
            </div>
            <div class="mdc-list-item mdc-drawer-item" href="#" data-toggle="expansionPanel" target-panel="sample-page-submenu">
              <a class="mdc-drawer-link" href="#">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">pages</i>
                Sample Pages
                <i class="mdc-drawer-arrow material-icons">arrow_drop_down</i>
              </a>
              <div class="mdc-expansion-panel" id="sample-page-submenu">
                <nav class="mdc-list mdc-drawer-submenu">
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      Blank Page
                    </a>
                  </div>
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      403
                    </a>
                  </div>
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      404
                    </a>
                  </div>
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      500
                    </a>
                  </div>
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      505
                    </a>
                  </div>
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      Login
                    </a>
                  </div>
                  <div class="mdc-list-item mdc-drawer-item">
                    <a class="mdc-drawer-link" href="javascript:void(0);">
                      Register
                    </a>
                  </div>

                </nav>
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </aside>
    <!-- partial -->
    <!-- partial:partials/_navbar.html -->
    <header class="mdc-toolbar mdc-elevation--z4 mdc-toolbar--fixed">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <a href="#" class="menu-toggler material-icons mdc-toolbar__menu-icon">menu</a>
          <span class="mdc-toolbar__input">
            <div class="mdc-text-field">
              <input type="text" class="mdc-text-field__input" id="css-only-text-field-box" placeholder="Search anything...">
            </div>
          </span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <div class="mdc-menu-anchor">
            <a href="#" class="mdc-toolbar__icon toggle mdc-ripple-surface" data-toggle="dropdown" toggle-dropdown="notification-menu" data-mdc-auto-init="MDCRipple">
              <i class="material-icons">notifications</i>
              <span class="dropdown-count">3</span>
            </a>
            <div class="mdc-simple-menu mdc-simple-menu--right" tabindex="-1" id="notification-menu">
              <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
                <li class="mdc-list-item" role="menuitem" tabindex="0">
                  <i class="material-icons mdc-theme--primary mr-1">email</i>
                  One unread message
                </li>
                <li class="mdc-list-item" role="menuitem" tabindex="0">
                  <i class="material-icons mdc-theme--primary mr-1">group</i>
                  One event coming up
                </li>
                <li class="mdc-list-item" role="menuitem" tabindex="0">
                  <i class="material-icons mdc-theme--primary mr-1">cake</i>
                  It's Aleena's birthday!
                </li>
              </ul>
            </div>
          </div>
          <div class="mdc-menu-anchor">
            <a href="#" class="mdc-toolbar__icon mdc-ripple-surface" data-mdc-auto-init="MDCRipple">
              <i class="material-icons">widgets</i>
            </a>
          </div>
          <div class="mdc-menu-anchor mr-1">
            <a href="#" class="mdc-toolbar__icon toggle mdc-ripple-surface" data-toggle="dropdown" toggle-dropdown="logout-menu" data-mdc-auto-init="MDCRipple">
              <i class="material-icons">more_vert</i>
            </a>
            <div class="mdc-simple-menu mdc-simple-menu--right" tabindex="-1" id="logout-menu">
                <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
                  {{!-- <li class="mdc-list-item" role="menuitem" tabindex="0">
                    <i class="material-icons mdc-theme--primary mr-1">settings</i>
                    Settings
                  </li> --}}
                  <li class="mdc-list-item" role="menuitem" tabindex="0">
                    <i class="material-icons mdc-theme--primary mr-1">power_settings_new</i>
                    <a href="/logout">Logout</a>
                  </li>
                </ul>
            </div>
          </div>
        </section>
      </div>
    </header>
    <!-- partial -->
    <div class="page-wrapper mdc-toolbar-fixed-adjust">
      <main class="content-wrapper">
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
              
            </div>
           
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-4">
              <div class="mdc-card d-flex flex-column">
                <div class="mdc-layout-grid__inner flex-grow-1">
                  <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3"></div>
                  <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6 d-flex align-item-center flex-column">
                    <h2 class="mdc-card__title mdc-card__title--large text-center mt-2 mb-2">Time, Practice</h2>
                    <div id="currentBalanceCircle" class="w-100"></div>
                  </div>
                  <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3"></div>
                </div>
                <div class="mdc-layout-grid__inner">
                  <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
                    <section class="mdc-card__action-footer mt-4 bg-red w-100">
                      <div class="col mdc-button" data-mdc-auto-init="MDCRipple">
                        <i class="mdi mdi-store icon-md"></i>
                      </div>
                      <div class="col mdc-button" data-mdc-auto-init="MDCRipple">
                        <i class="mdi mdi-phone-plus icon-md"></i>
                      </div>
                      <div class="col mdc-button" data-mdc-auto-init="MDCRipple">
                        <i class="mdi mdi-share-variant icon-md"></i>
                      </div>
                      <div class="col mdc-button" data-mdc-auto-init="MDCRipple">
                        <i class="mdi mdi-autorenew icon-md"></i>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-4">
              <div class="mdc-card card--with-avatar">
                <section class="mdc-card__primary">
                  <div class="card__avatar"><img src="images/faces/face1.jpg" alt=""></div>
                  <h1 class="mdc-card__title">Daniel Russel</h1>
                  <h2 class="mdc-card__subtitle">@danielrussel</h2>
                  <span class="social__icon-badge mdc-twitter mdi mdi-twitter"></span>
                </section>
                <section class="mdc-card__supporting-text pt-1">
                  <p class="mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum sem non mauris euismod hendrerit.Aliquam condimentum sem non mauris euismod hendrerit.</p>
                  <p class="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum.</p>
                </section>
                <section class="mdc-card__social-footer bg-blue">
                  <div class="col">
                    <small>TWEETS</small>
                    <p>768.8k</p>
                  </div>
                  <div class="col">
                    <small>FOLLOWING</small>
                    <p>186.8k</p>
                  </div>
                  <div class="col">
                    <small>FOLLOWING</small>
                    <p>25.8k</p>
                  </div>
                </section>
              </div>
            </div>
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-8">
              <div class="mdc-card px-2 py-2">
                <div id="js-legend" class="chartjs-legend mb-2"></div>
                <canvas id="dashboard-monthly-analytics" height="205"></canvas>
              </div>
            </div>
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
              <div class="mdc-card table-responsive">
                <div class="table-heading px-2 px-1 border-bottom">
                  <h1 class="mdc-card__title mdc-card__title--large">Employee status</h1>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="text-left">Product</th>
                      <th>Cost</th>
                      <th>Sales amount</th>
                      <th>Shipping cost</th>
                      <th>Units sold</th>
                      <th>Profit generated</th>
                      <th>Left in stock</th>
                      <th>Returns</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">T-shirts</td>
                      <td>250</td>
                      <td>300</td>
                      <td>60</td>
                      <td>3453</td>
                      <td>76</td>
                      <td>453643</td>
                      <td>300</td>
                      <td><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-heart text-blue"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-forum text-yellow"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-delete text-red"></i></div></td>
                    </tr>
                    <tr>
                      <td class="text-left">Baseball Hat</td>
                      <td>457</td>
                      <td>204</td>
                      <td>35</td>
                      <td>6754</td>
                      <td>35</td>
                      <td>345623</td>
                      <td>546</td>
                      <td><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-heart text-blue"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-forum text-yellow"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-delete text-red"></i></div></td>
                    </tr>
                    <tr>
                      <td class="text-left">Tennis Racket</td>
                      <td>250</td>
                      <td>350</td>
                      <td>38</td>
                      <td>3289</td>
                      <td>45</td>
                      <td>54662</td>
                      <td>278</td>
                      <td><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-heart text-blue"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-forum text-yellow"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-delete text-red"></i></div></td>
                    </tr>
                    <tr>
                      <td class="text-left">Gloves</td>
                      <td>250</td>
                      <td>300</td>
                      <td>60</td>
                      <td>3453</td>
                      <td>76</td>
                      <td>453643</td>
                      <td>300</td>
                      <td><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-heart text-blue"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-forum text-yellow"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-delete text-red"></i></div></td>
                    </tr>
                    <tr>
                      <td class="text-left">Shoes</td>
                      <td>673</td>
                      <td>457</td>
                      <td>56</td>
                      <td>4467</td>
                      <td>98</td>
                      <td>345723</td>
                      <td>350</td>
                      <td><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-heart text-blue"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-forum text-yellow"></i></div><div class="col mdc-button" data-mdc-auto-init="MDCRipple"><i class="mdi mdi-delete text-red"></i></div></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <!-- partial:partials/_footer.html -->
      <footer>
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6">
              <span class="text-muted">Copyright © 2018 <a class="text-green" href="javascript:void(0);" target="_blank">Bootstrap Dash</a>. All rights reserved.</span>
            </div>
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6 d-flex justify-content-end">
              <span class="mt-0 text-right">Hand-crafted &amp; made with <i class="mdi mdi-heart text-red"></i></span>
            </div>
          </div>
        </div>
      </footer>
      <!-- partial -->
    </div>
  </div>
  <!-- body wrapper -->
  <!-- plugins:js -->
  <script src="js/material-components-web.min.js"></script>
  <script src="js/jquery3.4.1.min.js"></script>
  <!-- endinject -->
  <!-- Plugin js for this page-->
  <script src="js/Chart.min.js"></script>
  <script src="js/progressbar.min.js"></script>
  <!-- End plugin js for this page-->
  <!-- inject:js -->
  <script src="js/misc.js"></script>
  <script src="js/material.js"></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <script src="js/dashboard.js"></script>
  <!-- End custom js for this page-->
</body>

</html>
```

## Conclusion

Thank you for going through this article. If you learn something new and exciting, please share this article among others.

