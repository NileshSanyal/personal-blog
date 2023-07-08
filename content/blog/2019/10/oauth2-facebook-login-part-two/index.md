---
title: "Implementing Oauth2 Social Login With Facebook Part 2"
date: "2019-10-08T10:30:10.000Z"
description: "In the previous part of this article, we discussed what is OAuth2 and how OAuth2 helps to integrate social login to our application..."
tags: ["oauth2", "facebook"]
---

![Oauth2 Facebook Cover Photo](/posts/oauth2-facebook-cover-photo.jpg "Oauth2 Facebook Cover Photo")

In the previous part of this article, we discussed what is OAuth2 and how OAuth2 helps to integrate social login to our application in an easy approach. Also, we discussed how you can use OAuth2 to create a facebook application on their official website that will later come handy to continue building our node js application.

This article is the second part of implementing social login with facebook. If you missed that article, you can read it [here](https://www.devhelperworld.in/2019/10/oauth2-facebook-login-part-one/).

## OAuth2 Workflow For Facebook Login Application

![oauth2-facebook-login-actual-workflow](https://1.bp.blogspot.com/-6kjyMXxWx0A/XZr_YDr0MqI/AAAAAAAABls/vGMmmfW4Fsk368lmVtJR672kkd466SmGgCLcBGAsYHQ/s640/oauth2-facebook-login-actual-workflow.png "OAuth2 Facebook Login Actual Workflow")

Let's discuss the workflow of the application as per the above screenshot. To create the application we require 3 main parties involved. The first one is the angular application, second is the Facebook server itself and last but not least the server which will act as a REST API written in Express JS Framework. 

At first, users will try to login to our application. To do that they will click on the "Login With Facebook" button. Then a dialog will open that will ask the user to enter their Facebook credentials. Finally, the user gives permission to access some of their Facebook data. 

After allowing access, our angular client gets the access token from the Facebook server. For now, we can easily access facebook data from the angular client application.

But, the backend server needs to know that. In order to do so, the angular application sends a request to the backend server with the access token. To verify that token the backend sends a verification request directly to the Facebook server.

If the Facebook server finds the token to be a valid one, it sends back the user's profile information. After receiving that data, the backend express js server verifies that the user profile data is correct and finally creates a new user in the application.

If the user already exists in the backend, the user profile will be updated instead.

Then the backend server will create a JSON web token that will identify the user. Backend returns that token as a response to the client application. The client app will store that token so that when sending requests to the server it can send the token along with the request.

## What We Will Be Building

We will create an application that will have a login with facebook functionality. In order to understand the overall functioning of this app, you need to have fundamental knowledge in Angular and Node JS.

### Building The Frontend With Angular

Let's start building the application's frontend part with Angular. To connect our angular app with Facebook, we need to use Facebook's Javascript SDK. 

For this we need to add the link to that SDK, we can do so with the help of script tag in index.html file as shown below.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>

  <!-- facebook javascript sdk -->
  <script src="//connect.facebook.net/en_US/sdk.js"></script>

</body>
</html>
```

#### Adding Bootstrap To The Project

Open another terminal, navigate to the location of the "frontend" folder. Run *"npm install bootstrap"* command, this will install bootstrap locally. Also, you need to add font-awesome for adding facebook icon to the login button. 

Keep that terminal open, we will need this terminal when we will build our angular application. For doing this, run *"npm install font-awesome"*. Then add that dependency in the angular.json file as shown below in the code snippet.

![oauth2-facebook-login-frontend-dependency](https://1.bp.blogspot.com/-EbtuAvH5d1M/XZsSgWdR20I/AAAAAAAABl4/9y64UsXvB60dEpeoewXRmcWPh0zNuHpxwCLcBGAsYHQ/s640/oauth2-facebook-login-frontend-dependency.png "OAuth2 Facebook Login Frontend Dependency")

#### Creating Login Component For Our OAuth2 Facebook Application

When we will run our application, the user will see the login page. For that purpose, we need to create a login component. Run "ng g c login" in the terminal window. Open login.component.html file and add the following codes for designing the login component.

```html
<div class="container">
    <div class="row">
      <div class="col-md-12 custom-card">
          <div class="card text-center">

              <div class="card-body">
                <h5 class="card-title">Log In With Facebook</h5>
                <p class="card-text">Log in with your existing facebook account</p>
                <button class="btn btn-primary fb-btn" (click)="fbLogin()"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i> Login With Facebook</button>
              </div>
            </div>
      </div>

    </div>
  </div>
```

In the above code snippet, *fbLogin()* method is called when the **"Login with Facebook"** button is clicked. Let's write what will happen when that button will be clicked. 

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  fbLogin() {
    this.userService.fbLogin().then(() => {
      console.log('Called service from login component');
      // console.log(response);
      this.router.navigate(['dashboard']);
    });
  }

}
```

In the above code snippet, the *fbLogin()* method calls user service that performs an API call to our backend server and returns the promise object. After getting that promise object, the user is redirected to the dashboard page.

#### Creating User Service For Our OAuth2 Facebook Application

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    FB.init({
      appId :  'YOUR_FACEBOOK_APP_ID',
      status : false,
      cookie : false,
      xfbml  : false,
      version : 'v4.0'
    });
   }

  fbLogin() {
    return new Promise((resolve, reject) => {

      FB.login(result => {
        if (result.authResponse) {
          return this.http
            .post(`http://localhost:8000/users/auth/facebook`, {access_token: result.authResponse.accessToken})
            .toPromise()
            .then(response => {
            const token = response;
            if (token) {
              localStorage.setItem('id_token', JSON.stringify(token));
            }
            resolve(response);
            })
            .catch(() => reject());
        } else {
          reject();
        }
      }, { scope: 'public_profile,email' });
    });
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:8000/api/auth/me`).toPromise().then(response => {
        resolve(response);
      }).catch(() => reject());
    });
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.clear();
  }

}
```

This user service will communicate with the Facebook server and our backend server. This service is responsible for performing the following tasks.


* Making sure so that users can log in with their Facebook profile.

* Logging users out.

* Checking if users are logged in or not.

* Getting details of currently logged in users.

To create the service issue this command in terminal. *"ng g s user"*.

#### Explanation of the Code Snippet

In the UserService typescript class, a library is initialized from the facebook javascript SDK. Here, we need to replace *"YOUR_FACEBOOK_APP_ID"* with the application id that we got when we created the Facebook application on the facebook's developers website.

In fbLogin method, we are calling FB.login method that will display a dialog window, so that users can log in. If users are not logged in this dialog will be displayed.  This dialog also asks users to allow the application to access user's data.

The response coming from **FB.login** method contains information whether the user is logged in or not and if they have allowed our application to access their data.

After getting response we call our backend to log in to the application. If user is able to log in to the backend, we will get a token as a response from the backend server.

We stored that token in local storage. So that, later when we will send a request to the backend, we are able to send the token alongwith the request. The main role of the token is to identify the current user.

The **getCurrentUser** method gets the data of currently logged in user from the server.

The **logout** method removes the token from the browser's local storage.

#### Creating Dashboard Component For Our OAuth2 Facebook Application

Run *"ng g c dashboard"* in the terminal to create dashboard component. Code snippet for dashboard.component.html is shown below.

```html
<div class="navbar navbar-default navbar-fixed-top">
  <ul class="nav navbar-nav navbar-right">
    <li role="menuitem"><a class="dropdown-item" (click)="logout()">Logout</a></li>
  </ul>
</div>

<div class="page-header"></div>

<div class="container">

  <div class="row">
    <div class="col-lg-8 col-md-7 col-sm-6">
      <div class="panel panel-default">
        <div class="panel-heading text-center">Our Awesome application</div>
        <div class="panel-body" align="center">
          Current User email: {{ currentUser.email }}
        </div>
      </div>
    </div>
  </div>
</div>
```

In the above code snippet, we are displaying currently logged in user's email address.

Let's write the code for getting currently logged in user's details. Code snippet for dashboard.component.ts file is displayed below.

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public currentUser: any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
```

In the code snippet, at the initialization phase of the dashboard component, we are loading user's data. We do so by calling the user service's getCurrentUser method inside **ngOnInit** method. After that we store user's data in currentUser object. 

I guess, you remembered this currentUser object, it is used in dashboard component's html page to access currently logged in user's email address.

In the logout method, we are calling user service's logout method. After user is successfully logged out, they are redirected to the **"login"** route.

#### Creating Guards For Our OAuth2 Facebook Application

Let's assume we want to implement some sort of functionality such that we will allow only those users to visit the dashboard page who are already logged in. 

We won't allow users who are not logged in and will redirect them to the login page when they will try to visit the dashboard page.

To add this functionality to an angular application, a guard is used.

There exist four types of guards in angular, these are as follows.


1. CanActivate: This guard decides whether a route can be activated or not. If this guard returns true navigation will continue to otherwise navigation will not continue to the next route.

2. CanActivateChild: It decides if a child route can be activated.

3. CanDeactivate: It is helpful to decide if a route can be deactivated.

4. CanLoad: It helps to decide whether a module can be lazy-loaded or not.

We need to add two guards in this application.

To create the auth guard type *"ng g g auth"* in the terminal window. The code snippet for AuthGuard is below.

```typescript

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.isLoggedIn().then(() => {
          resolve(true);
      }).catch(() => {
          this.router.navigate(['/welcome']);
          reject(false);
      });
    });
  }

}
```

In the above snippet, AuthGuard checks if the user is logged in or not. This is possible with the help of UserService's isLoggedIn method. If the user is logged in, we will resolve the promise, and allow the user to visit the dashboard page.

Otherwise, the user will be redirected to the login page.

Similarly to create another guard named anonymous, type *"ng g g anonymous"* in the terminal. The code snippet for it is displayed below.

```typescript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this.userService.isLoggedIn().then(() => {
            this.router.navigate(['/dashboard']);
            reject(false);
        }).catch(() => {
            resolve(true);
        });
    });
  }

}
```

In the code above, AnonymousGuard is used for checking if the user is not logged in.  Its functionality is defined in UserService's **isLoggedIn** method. If the user is logged in the user will be redirected to the dashboard page.

#### Defining Routes For Our OAuth2 Facebook Application

```typescript
import { AuthGuard } from './auth.guard';
import { AnonymousGuard } from './anonymous.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

In the route file, we define what component angular will load when a specific route is being accessed by the user. For example, for visiting the login route the LoginComponent will load. When a user visits the application without any path, in that scenario, the LoginComponent will be loaded by default.

#### Explaining The AppModule

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        headerName: 'x-auth-token'

      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In the above code snippet, we have used a new module named "auth0/angular-jwt", so that we can automatically attach a JSON web token as an authorization header. The browser attaches this header when the application sent the HTTP request. 

The main role of **tokenGetter** function is to get the JSON web token from the of the current user from the browser's local storage. Angular fetches this token with the key *"id_token"*.

### Building The Backend With Express JS

Let's create the backend part of our application. We will be using the Express Js framework for creating the REST API. For storing user information we will use a MongoDB database. 

#### Project Dependencies At a Glance

We are using the lightweight non-opinionated framework of Node i.e, Express Js. The *body-parser* module will take care of handling incoming request bodies with a middleware. The *"jsonwebtoken"* module will handle the JSON web token.

*"passport"* module will take care of authentication and *"passport-facebook-token"* will specifically handle the Facebook authentication. "mongoose" will communicate with MongoDB database. The *"dotenv"* module facilitates the use of environmental variables and the *"cors"* module will help to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on our server.

#### Creating The Node Server

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();
const router = express.Router();
const cors = require('cors');
const User = require('./models/user');

// mongoose connection defined as IIFE( immediately invoked function expression)
(async function() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to mongodb successfully');
    } catch(error) {
        console.log('Error connecting to mongodb');
    }
})();

const app = express();

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// middleware for handling token
const authenticate = expressJwt({
    secret: process.env.EXPRESS_JWT_SECRET,
    requestProperty: 'auth',
    getToken: (req) => {
        if(req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

const getCurrentUser = async (req, res, next) => {
    try {   
        const user = await User.findById(req.auth.id);
        req.user = user;
        next();
    } catch(error) {
        next(error);
    }
};

const getSingle = (req, res) => {
    const user = req.user.toObject();
    delete user['facebook'];
    delete user['__v'];
    res.json(user);
};

app.use('/users', require('./routes/users'));

router.route('/auth/me')
      .get(authenticate, getCurrentUser, getSingle);

app.use('/api', router);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
```

In the above code snippet, at first all the dependencies are declared, then while configuring the CORS middleware in line number 23, we make sure that the *"x-auth-token"* header is visible to the angular client.

This step is necessary otherwise our angular client would ignore this custom header. It is done with the **"exposedHeaders"** property.

To connect with the MongoDB database, in line number 12, we have used the IIFE (Immediately Invoked Function Expression). If you don't know what it is, you can know more about it [here](https://dev.to/nileshsanyal/javascript-callback-functions-in-depth-guide-for-2019-gj7).

In line number 36, we want to validate JWT(JSON Web Token)  in every frontend request. If we find that the JSON Web Token is valid, then *"req.auth"* will be set with the decoded JSON object. Later the middleware that will perform authorization will use this object.

In line number 47, the user data is fetched by user id, and then that user data is stored in the request object within the *"user"* property. Finally in line 57, to extract only selected data from the user object, we removed two properties namely *"facebook"* and *"__v"*.

#### Creating The user Routes File

```javascript
const express = require('express');
const router = express.Router();
const passport = require('passport');
var passportConfig = require('../config/passport');

//setup configuration for facebook login
passportConfig();

const userController = require('../controllers/users');

router.route('/auth/facebook')
      .post(passport.authenticate('facebookToken', { session: false }), userController.facebookOAuth);

module.exports = router;
```

In line number 8, we invoked the **passportConfig** function, which has the actual implementation of how passport js module will handle facebook login functionality.

In this file, we have defined the route where we have configured to use passport js's token-based strategy for authenticating with Facebook login. That's why, in line number 13, you will notice that we have set to authenticate with *"facebookToken"*, we set "session" as false.

Then we invoked the userController's **facebookOAuth** function.

#### Creating The passport.js File

```javascript
const passport = require('passport');
const facebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/user');
module.exports = function () {
    passport.use('facebookToken', new facebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            const existingUser = await User.findOne({ 'facebook.id': profile.id });

            if(existingUser) {
                return done(null, existingUser);
            }

            const newUser = new User({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value,
                    token: accessToken
                }
            });

            await newUser.save();
            done(null, newUser);

        } catch(error) {
            done(error, false);
        }
    }));
};
```

In this file, we are checking if any user exists in the database, if one user is found, we simply return the user object. Otherwise, we create a new user and then return that user object instead.

#### Creating users Controller File

```javascript
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

createToken = auth => {
    return JWT.sign({
        id: auth.id
    }, JWT_SECRET, { expiresIn: 60 * 120 });
}

module.exports = {
    facebookOAuth: async (req, res, next) => {

        if(!req.user) {
            return res.send(401, 'User not authenticated');
        }

        req.token = createToken(req.user);
        res.setHeader('x-auth-token', req.token);
        res.status(200).json(req.token);
    }
};
```

In the above code snippet, we are storing the user's id in a token. That token is known as JSON Web Token (JWT). After generating JWT, we send it to the frontend (i.e, angular application). We send the token with the help of a custom header i.e, *"x-auth-token"*.

#### Creating user Model File

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    method: {
        type: String,
        enum: ['facebook'],
        required: true
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String
        },
        token: {
            type: String
        },
        select: false
    }
});

var User = mongoose.model('User', userSchema);

module.exports.User = User;
```

## Conclusion

Finally, you have a complete application that enables users to login with their existing Facebook account. You have created that app that follows the OAuth2 protocol in order to build this application.

For developing the frontend part we used Angular. Then the frontend will communicate with a backend that is built using Express Js. If you find this article helpful, consider sharing this with others. Thank you!