---
title: "Command Injection In A Nutshell"
date: "2019-06-21T09:40:10.000Z"
description: "Command injection is a technique used by the attacker to attack a server via it's operating system commands."
tags: ["security"]
---

![command-injection-intro-pic](/posts/command-injection-intro-pic.jpg "command-injection-intro-pic")


**Command injection** is a technique used by the attacker to attack a server via it's operating system commands. This type of attack took place when the web application is utilizing system commands to provide some sort of functionality to a web application.

## What Can Be Done By Using it ?

This type of attack can lead to massive damage as the attacker is able to take control of the server's operating system by executing it's system commands. Attacker can view internal configuration files of the server, can modify or even delete data, or even worse can setup a backdoor that can access server resources remotely.


## Important Note
Please note that, all the information provided in this post is solely meant for educational purposes only.


## Command Injection : In Action
To explain this attack, at first we will create an application, which will get the IP (Internet Protocol) address for a particular DNS ([Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System)). As, we are using windows operating system to locally host our application, so we need to enter only windows shell commands to launch this attack. If the application is hosted on a linux server, then we are required to use linux shell commands.


### Getting List Of All Directories Of Application's Root Location

![](/posts/getting_all_directories.png "")

### Creating A File In Application's Root Location

![](/posts/creating_new_file.png "")

###  Verifying If File is Created Successfully Or Not

![](/posts/check_new_file.png "")

## Protecting Application From Command Injection

To protect this application against this type of attacks, we will use php's built-in [escapeshellcmd()](https://www.php.net/manual/en/function.escapeshellcmd.php) function. It allows to escape special characters by a backslash.

Make the following changes in index.php file as shown in the below screen shot.

![Protecting Against Command Injection](/posts/command_injection_prevention_code.png "Protecting Against Command Injection")

After that change, if we try to do **command injection**, we won't see it's effect anymore.

![Proof Of Protecting Against Command Injection](/posts/command_injection_prevention.png "Proof Of Protecting Against Command Injection")

## Final Words

I hope you find helpful information after reading this post about command injection in detail, please share it among the others and tell us what you think in comments. Thank you!
