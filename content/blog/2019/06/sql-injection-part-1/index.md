---
title: "SQL Injection Step By Step Part 1"
date: "2019-06-06T02:20:00.800Z"
description: " In order to understand SQL injection step by step, this article provides a set of practical examples, so that you won't find it difficult."
tags: ["security"]
---

If you want to learn SQL Injection step by step, then after reading this article will help you to understand SQL Injection step by step with example completely.



In order to understand SQL injection step by step, this article provides a set of practical examples, so that you won't find it difficult to understand SQL injection step by step with example.



SQL injection is a common vulnerability of a web application. If this vulnerability is not taken care of by the web developer, then it can lead to complete disclosure of all data of the system and the list grows!



In my earlier post, I wrote about what is SQL injection, how it works and what can be done with SQL injection. If you haven't gone through that post, please read it [here](https://www.devhelperworld.in/sql-injection/), and then come back to this article.

## Important Note



Please note that, all the information provided in this post is solely meant for educational purposes only.



Let's see how we can use **sql injection** to an application, but before that, we need to create that application from scratch.

### What We Will Be Creating

We will be building a registration and login page for a web application with PHP.

![Login Page](/posts/app_login.png "Login Page")

### Required Technical Skills

Basic knowledge on following  technologies are necessary.

* HTML
* CSS
* Jquery / Javascript
* Bootstrap
* PHP
* SQL

### Required Tools/Softwares

#### Local Web Server

It is required, as PHP is a server side scripting technology, so in order to run PHP scripts, we need a local web server, as it is very easy to use and it is completely free of cost. I will be using XAMPP as local web server.

#### Text Editor / IDE (Integrated Development Environment)

A text editor / IDE of your choice for writing your code.I personally preferred Sublime text for a long time. But, right now, I started using Visual Studio Code, and I like pretty much everything about it.

### Overall Project Structure

![Overall Project Structure](/posts/project_structure.png "Overall Project Structure")


### Discussion on project structure

*.phpintel* : This file is generated automatically if we use PHPIntel plugin for sublime text.
All other files having .php extensions are self explanatory. E.g, register.php contains HTML markup along-with PHP scripts required for registration etc.





*css* : This folder contains all the necessary css (cascading style sheet) files required for this project.



*js* : It contains all javascript files used in this project.



All other files having .php extensions are self explanatory. E.g, register.php contains HTML markup along-with PHP scripts required for registration etc.

### Creating The Database And Users Table

Open the browser, type in "http://localhost/phpmyadmin" in url, then create a database as "hacking_db" and create a table as "users".

The screenshot for the structure of users table is as follows.


![Users Table Structure](/posts/table_setup.png "Users Table Structure")

Codes for **register.php** is given below.

```php
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>SQL Injection Sample</title>
      <link href="css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
      <link href="css/custom.css" rel="stylesheet">
   </head>
   <body>
      
      
      <div class="sidenav">
         <div class="login-main-text">
            <h2>Application<br> Registration Page</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <form method="post" action="register.php">
                  <?php 
                     $error_message = '';
                     if($error_message != ''){ 
                  ?>
                  <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <!-- <strong>Error!</strong>  -->
                    <?php
                         
                        echo $error_message != '' ? $error_message : ''; 
                     ?>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <?php } ?>

                  <?php
                        $success_message = '';
                        if($success_message != '') {
                  ?>

                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <!-- <strong>Error!</strong>  -->
                    <?php
                         
                        echo $success_message != '' ? $success_message : ''; 
                     ?>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <?php 
                        }
                   ?>
      

                  <div class="form-group">
                     <label>User Name</label>
                     <input type="text" class="form-control" placeholder="User Name" name="username">
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="password" class="form-control" placeholder="Password" name="password">
                  </div>
                  <div class="form-group">
                     <label>Confirm Password</label>
                     <input type="password" class="form-control" placeholder="Password" name="confirm_password">
                  </div>
                  <!-- <button type="submit" class="btn btn-secondary">Go to Login Page</button> -->
                  <a class="btn btn-secondary" href="login.php">Go to Login Page</a>
                  <button type="submit" name="submitBtn" class="btn btn-black">Register Here</button>
               </form>
               <?php
                  $conn = mysqli_connect("localhost", "root", "", "hacking_db");
                  if(!$conn){
                     die("connection error");
                  }

                  if(isset($_POST['submitBtn'])) {
                     $username = $_POST['username'];
                     $password = $_POST['password'];
                     
                     $confirm_password = $_POST['confirm_password']; 
                     if(trim($username) == '') {
                        $error_message = "Username can not be left empty!<br>";
                     }
                     else if(trim($password) == '') {
                        $error_message .= "Password can not be left empty!<br>";
                     }
                     else if(trim($confirm_password) == '') {
                        $error_message .= "Confirm password can not be left empty!<br>";
                     }
                     else if($password != $confirm_password) {
                        $error_message .= "Password and confirm password must be same!<br>";
                     } else {
                        // $password = password_hash($_POST['password'], PASSWORD_BCRYPT) ;
                        $insert_sql = "insert into `users`(username,password) values('$username','$password')";
                        mysqli_query($conn,$insert_sql);
                        if(mysqli_affected_rows($conn) > 0){
                           $success_message = "User registered successfully!<br>";
                        }
                        else{
                           $error_message .= "Error registering user, please try again later<br>";
                        }
                     } 
                  }
               ?>
            </div>
         </div>
      </div>
      
      <script src="js/jquery.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      
   </body>
</html>
```

#### Explanation Of The register.php

In register.php, user is asked to enter his or her username, password and confirm password. Then, we simply check username, password and confirm password fields can not be left empty, if any of the field is left empty then the user is informed to fill out that specific detail. 



User also needs to make sure that password and confirm password fields have same values. If each field is filled out properly and the form is submitted, "User registered successfully!" message is displayed to the user.

Codes for **login.php** is given below.

```php
<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>SQL Injection Sample</title>
   </head>
   <body>
      <link href="css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
      <link href="css/custom.css" rel="stylesheet">
      <script src="js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      <div class="sidenav">
         <div class="login-main-text">
            <h2>Application<br> Login Page</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <form method="post" action="login.php">
                  <div class="form-group">
                     <label>User Name</label>
                     <input type="text" class="form-control" placeholder="User Name" name="username">
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="password" class="form-control" placeholder="Password" name="password">
                  </div>
                  <button type="submit" class="btn btn-black" name="loginBtn">Login Here</button>
                  <a class="btn btn-secondary" href="register.php">Go to Register Page</a>

                  <a href="forgot_password.php?message=Email" class="btn btn-link">Forgot Your Password?</a>
               </form>
               <?php
                  if(isset($_POST['loginBtn'])) {
                     $conn = mysqli_connect("localhost", "root", "", "hacking_db");
                     if(!$conn){
                        die("connection error");
                     }
                     $username = mysqli_real_escape_string($conn, $_POST['username']);
                     $password = mysqli_real_escape_string($conn, $_POST['password']);
                     
                     if(trim($username) == '') {
                        echo "Username can not be left empty!";
                     }
                     else if(trim($password) == '') {
                        echo "Password can not be left empty!";
                     }
                        
                     else{
                        // $hashed_password = password_hash($_POST['password'], PASSWORD_BCRYPT) ;
                        $verify_sql = "select * from `users` where username='$username' and password='$password'";
                        $result = mysqli_query($conn,$verify_sql);
                        
                        $row = mysqli_fetch_array($result);
                        
                        if(mysqli_num_rows($result) > 0){

                           // if (password_verify($password, $row['password'])) {
                              $_SESSION['session_username'] = $username;
                              header('Location: dashboard.php');
                           // }
                           /*else {
                              echo 'Incorrect password, please try again!';
                           }*/
                        }
                        else{
                           echo "No user exists, please register to continue!";
                        }
                        mysqli_close($conn);

                     }
                  }
               ?>
            </div>
         </div>
      </div>
   </body>
</html>
```

#### Explanation of login.php



In login.php, user is asked to enter his or her username and password. Then that credentials are checked with the pre-existing credentials in the MySQL database. If a match is found then username is stored in the session and user is redirected to the dashboard page. If no match is found user is informed to register.

Codes for **dashboard.php** is given below.

```php
<?php session_start(); ?>
<?php
    if($_SESSION['session_username'] !='' && !empty($_SESSION['session_username'])){
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Dashboard Page</title>
		<link href="css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
		<link href="css/dashboard.css" rel="stylesheet">
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
			<button class="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
			<div class="collapse navbar-collapse" id="navbarResponsive">
				<ul class="navbar-nav navbar-sidenav">
					<a class="nav-link navlogo text-center" href="dashboard.php">
						<img src="images/WS_Logo.png">
					</a>
					<li class="nav-item">
						<a class="nav-link sidefrst active-nav-item" href="dashboard.php">
							<span class="textside">  Dashboard</span>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link sidesecnd" href="posts.php">
							<span class="textside">  Posts</span>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link sidesthrd" href="add_comment.php">
							<span class="textside">  Comments</span>
						</a>
					</li>
				</ul>
				
				<ul class="navbar-nav2 ml-auto">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome <?php echo $_SESSION['session_username']; ?></a>
						<ul class="dropdown-menu">
							<li class="resflset"><a href="logout.php"><i class="fa fa-fw fa-power-off"></i> Logout</a></li>
						</ul>
					</li>
				</ul>
				
			</div>
		</nav>
		<div class="content-wrapper">
			<div class="container-fluid">
				<div class="row">
					<!-- Icon Cards-->
					<div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
						<div class="inforide">
							<div class="row">
								<div class="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
									<img src="images/WS_Logo.png">
								</div>
								<div class="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
									<h4>Posts</h4>
										<?php 
											$conn = mysqli_connect("localhost", "root", "", "hacking_db");
						                    if(!$conn){
						                        die("connection error");
						                    }
						                    $posts_count_sql = "SELECT * FROM `posts`";

										   if ($posts = mysqli_query($conn,$posts_count_sql)){
										      $postsCount = mysqli_num_rows($posts);
										 ?>
									<h2>

										<?php 	
												echo $postsCount;
											}

										    mysqli_close($conn);

										 ?>
									</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
						<div class="inforide">
							<div class="row">
								<div class="col-lg-3 col-md-4 col-sm-4 col-4 ridetwo">
									<img src="images/WS_Logo.png">
								</div>
								<div class="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
									<h4>Comments</h4>
										<?php 
											$conn = mysqli_connect("localhost", "root", "", "hacking_db");
						                    if(!$conn){
						                        die("connection error");
						                    }
						                    $comments_count_sql = "SELECT * FROM `comments`";

										   if ($comments = mysqli_query($conn,$comments_count_sql)){
										      $commentsCount = mysqli_num_rows($comments);
										 ?>
									<h2>

										<?php 	
												echo $commentsCount;
											}

										    mysqli_close($conn);
										    
										 ?>
									</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		
	</body>
</html>
<?php } else {
	header('Location: login.php');
} ?>
```

#### Explanation of dashboard.php

In dashboard.php, it is checked to see if the user is already logged in or not. It is done by checking if the session is not empty. But, if it is found that user is not logged in, then the user is redirected back to the login page.


Now, the remaining functionality left is the logout functionality. The code for **logout** is given below.

```php
<?php 
 
 session_start();
 session_unset();
 session_destroy();
 header('location: login.php');

 ?>
```

#### Explanation of logout.php

To implement the logout functionality, we need to start the session just like we already did that in registration and dashboard pages. Next, we need to destroy the session variable used to store the session data and finally we destroy the entire session by calling destroy function. Last but not the least, we redirect the user back to the login page.

### Bypassing the Login Page

We, have completed creating the application. Now, let's see how to exploit this application by bypassing the login page and gaining access to the dashboard page.


![Bypassing The Login Page](/posts/sql_inject_1.png "Bypassing The Login Page")

As shown in the above picture, if we type, **"admin' or '1'='1';#"** (without the double quotes) as username and any text in the password field, we can bypass the login screen easily.


#### Explanation Of How login bypass Works

In username field what we wrote goes straight to the database engine in the following format.

```sql
select * from users where username='admin' or '1'='1';# and password='1234' LIMIT 1;
```

Here, we wrote an expression that is always true (i.e, 1=1) and then 'or' operator is used to write that expression where either username is admin or 1=1. As, always 1=1 is true so it does not matter to the database engine if admin is not the username.

After the condition, the statement is terminated using the semicolon (;) and rest of the statement that checks for password matching is ignored as the hash symbol (#) is used.

## Conclusion


If you like this post, please comment about what you think and share it with others.
