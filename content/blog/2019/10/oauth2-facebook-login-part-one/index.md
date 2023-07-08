---
title: "Implementing Oauth2 Social Login With Facebook Part 1"
date: "2019-10-05T08:10:25.000Z"
description: "In this article, you will have a clear understanding of how to use oauth2 authentication to implement facebook login with node js."
tags: ["oauth2", "facebook"]
---

![Oauth2 Facebook Cover Image](/posts/oauth2-facebook-cover-image.jpg "Oauth2 Facebook Cover Image")

In this article, you will have a clear understanding of how to use oauth2 authentication to implement facebook login with node js. Adding social login to your application has a lot of advantages. First of all, users of your application don't need to fill up a long registration form containing 10 or even more input fields. 

Also while attempting to login to any application, they often forget their password. They, don't want to go through the password recovery process, as they find it tedious to do so.

The solution to this problem is if are able to register and login users to our application with their social network accounts in which they already have accounts. We can implement this functionality with the help of an authentication scheme known as [Oauth2](https://en.wikipedia.org/wiki/OAuth#OAuth_2.0).

You can check out my article on the callback function [here](https://www.devhelperworld.in/2019/09/javascript-callback-in-depth/).

## What is Oauth2

As per the official site of Oauth:  *OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 supersedes the work done on the original OAuth protocol created in 2006. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.*

In simple words, it is an authentication and authorization scheme in which users on the internet are able to access their information on other websites, without providing their account credentials ( username and/or password).

Only one requirement exists; that is, the user must authorize the application to access their data for a selected OAuth provider.

### Why OAuth2 is Used

#### Users don't need to remember their credentials

Users can sign up or log in to any application that are using OAuth2 without using any credentials such as email id and/or password. They simply need to authorize the application to access their information for a selected OAuth provider. This step is done for one-time only.


#### Prevents security holes

In the Oauth2 mechanism, the user doesn't provide passwords to sign in or sign up for the application. So, from the development point of view, developers don't need to store a user's password. This, in fact, prevents inappropriate use of storing passwords.


#### Developer friendly

Developers can easily implement oauth2 in an application. They just need to go through the technical documentation for the specific OAuth provider. For example, if sign in and/or sign up with facebook functionality needs to be implemented, the developer needs to visit the official docs page for facebook OAuth provider.


#### Ability to handle non-web clients

In the OAuth2 authorization process, the program that sends requests to the authorization server is known as the client. The client can be a browser, a mobile app or any other device. That's how OAuth2 is able to handle non-web clients also.


### How OAuth2 Works

Before discussing how OAuth2's working principle, it would be better if we discuss the key roles played by each component in this protocol.

1. Resource Owner: It refers to the user who gives permission to authorize an application in order to access their account. The authorization's scope determines the application's access to the user's account.

2. Resource or Authorization Server: The authorization server is responsible for verifying the identity of the user. Resource server refers to a server that hosts the protected user's accounts.

3. Client: It refers to the application that accesses the user's account. But, in order to do so, it must be authorized by the user, and that authorization process must go through a validation process carried by an API.

Now, you know the roles played by each component; let's discuss the overall workflow of OAuth2 in simple words.

![oauth2-facebook-workflow](https://1.bp.blogspot.com/-WimdL8iSRI0/XZhtgYcNMNI/AAAAAAAABjk/EP2PtXgqfKgbKX_IdVH4E6fhfTuCeiBMQCLcBGAsYHQ/s640/oauth2-facebook-workflow.png "OAuth2 Facebook Workflow")

* The client or the application sends requests for authorization to access resources from the resource server.

* If the user accepts the request, the application receives permission to access the user's data as per the scope of the permission.

* The client requests an access token from the authorization server or API representing the authenticity of its own identity. These access tokens life span is very short, think of their life span in terms of hours and minutes.

* If the authorization server authenticates the application's identity, then the server generates an access token to the application.

* The application requests the resource from the resource server or API. Then it sends the access token to the server for authentication.

* If the resource server finds that the access token is valid then it serves the resource to the application.

You need to register your application before using OAuth2 with it. It can be done by visiting the service's website's developer portion. The following details are required in order to do this.

1. Application Name

2. Application Website

3. Callback or redirect URL

#### What is Redirect URL in OAuth2

Redirect URL means where the service will redirect users after they authorize or deny your application. It also points to the route where you will write codes to handle access tokens.


#### What is Client Id in OAuth2

After registering the application, the service issues client credentials in the form of client id that is nothing but a unique string to identify the application and it is used by the service itself. Also, it helps to create an authorization URL that is displayed to the users.

#### What is Client Secret in OAuth2

The client secret's role is to authenticate the identity of the application to the service API when the application requests to access a user's account. The value of the client secret must be kept as a secret and should not be disclosed to anyone.

#### What is Refresh Token in OAuth2

We already discussed that the access token has a very short life-span. When the access token expires then refresh token enables the client to reauthorize without asking the resource owner to reauthenticate.


Alright, we discussed basics about what OAuth actually is, why we need it and what is the internal working principle behind OAuth2. Let's get down to building a node js application having facebook login built inside it that uses OAuth protocol. 

## Creating OAuth2 Facebook Application

At first, we need to create a facebook application, to do so visit the [facebook developers page](https://developers.facebook.com/). Then log in with your Facebook account, this step is necessary because after doing this you will be able to get an application id and application secret that is mandatory for connecting our node js application with Facebook. 

1) After login click on the "Get Started" button, then you will something similar as shown in the screenshot below.

![oauth2-facebook-signup-page](https://1.bp.blogspot.com/-r5jGXDM1a4o/XZhug9U5ocI/AAAAAAAABjw/D53K2bgK-fo-TbMymo52IgJ3kKArF8JQwCLcBGAsYHQ/s640/oauth2-facebook-signup-page.png "OAuth2 Facebook Signup Page")

2) Click on the "Next" button, then you need to choose your job role. Choose "Developer" (recommended).

![oauth2-facebook-your-job-role](https://1.bp.blogspot.com/-DsiVzY2yjBs/XZhuxyvpHQI/AAAAAAAABj4/vlU9Qa7k7Oo_DCf_fboWJTqZHX8jOIp3ACLcBGAsYHQ/s640/oauth2-facebook-your-job-role.png "OAuth2 Facebook Your Job Role")

3) You need to create an app first, the screen-shot for this step is shown below. 

![oauth2-facebook-create-app-id](https://1.bp.blogspot.com/-CSGwBSqdd08/XZhvJHUS3lI/AAAAAAAABkA/Y1b5wOJXcnY1ASru6zQ__TMjFiUve_ywACLcBGAsYHQ/s640/oauth2-facebook-create-app-id.jpg "OAuth2 Facebook Create App Id")

4) Click on "I am not a robot" option checkbox.

![oauth2-facebook-security-check](https://1.bp.blogspot.com/-O9kUW_XEwp4/XZhvqJSed3I/AAAAAAAABkM/zQP8asY76JEfVC9RNZW0d2vA70zsvhxGgCLcBGAsYHQ/s640/oauth2-facebook-security-check.png "OAuth2 Facebook Security Check")

5) After this step, you will be redirected to the "Add Product" page. On that page, click on the "Setup" button.

![oauth2-facebook-add-product](https://1.bp.blogspot.com/-Frk1HrBeyAk/XZhv75SpFzI/AAAAAAAABkU/pCtQpKGVUjEkbOVnPe-ndXTUTvqUdGfrwCLcBGAsYHQ/s640/oauth2-facebook-add-product.jpg "OAuth2 Facebook Add product")

6) Then you need to choose the platform for which you want to add facebook login functionality. Select "www" option.

![oauth2-facebook-choose-platform](https://1.bp.blogspot.com/-DOkswNn7j7w/XZhwPBD8jII/AAAAAAAABkc/m5fjZP6b0WEPuj7QH5rMrpwLmaMhxWWAQCLcBGAsYHQ/s640/oauth2-facebook-choose-platform.png "OAuth2 Facebook Choose platform")

7) Then you need to enter the URL of your website. If you do not have a site in production, you can definitely use "localhost". I used "http://localhost:8000" for my this application. Click the "Save" button.

![oauth2-facebook-website-url](https://1.bp.blogspot.com/-Cn1te5O-VF4/XZhwfdQT2WI/AAAAAAAABkk/kU2xkH-n27QHBdtJ_4JjKO1KzCkV8txiQCLcBGAsYHQ/s640/oauth2-facebook-website-url.png "OAuth2 Facebook Website Url")

8) Then skip the rest of the steps, click the "Settings" option in the left-hand menu.

![oauth2-facebook-settings-menu](https://1.bp.blogspot.com/-YfdEko0rAIY/XZhwx93tsaI/AAAAAAAABks/242qi7NhP_0i34hNGIvZ4iCgzBzyu2ULgCLcBGAsYHQ/s320/oauth2-facebook-settings-menu.png "OAuth2 Facebook Settings Menu")

9) In the Settings page, you need to add redirect URL in order to tell facebook where a user will be redirected back after authorization. Here, again I am using localhost for doing this. I have added "http://localhost:8000/auth/facebook/callback" as the redirect URL. Click on the "Save" Changes button. 

![oauth2-facebook-settings](https://1.bp.blogspot.com/-EPRn4K5oYHg/XZhxKaV_7JI/AAAAAAAABk0/g25AyYaYmPAqvp15RW0U36nhBohEpOw-wCLcBGAsYHQ/s640/oauth2-facebook-oauth-settings.png "OAuth2 Facebook Settings")

10) Then go to the main settings link in the top-left position. That is highlighted in the screen-shot shown below.

![oauth2-facebook-top-settings](https://1.bp.blogspot.com/-14jYNcUERDc/XZhxhLRNDII/AAAAAAAABlA/eBCW3uaB3s4vDOgRUy5rKCrSfyLeYCg4QCLcBGAsYHQ/s320/oauth2-facebooktop-settings.png "OAuth2 Facebook Top Settings")

11) You will see **app id** and **app secret** keys, copy these and paste them somewhere. We will need them later.

![oauth2-facebook-credentials](https://1.bp.blogspot.com/-sO4FDxe18gg/XZhx2eXV6zI/AAAAAAAABlI/OzuNK9NcZ44M904CnjtMwmaSdm_Qt_OEACLcBGAsYHQ/s640/oauth2-facebook-credentials.jpg "OAuth2 Facebook Credentials")

That's it, you have successfully created a facebook application which is the first step for integrating facebook login to the node js application that we will create.

## Conclusion

I hope now you have a clear understanding of how oauth2 can be used to provide facebook login to a node js application. If you find this article helpful, consider sharing it with others. Thank you.