---
title: "Never Mess With Cross Site Scripting And Here'is The Reason Why
"
date: "2019-07-15T10:15:10.000Z"
description: "A script that visits thousands of websites, can exploit a vulnerability on every web site and drops a stored xss payload."
tags: ["security"]
---

![Cross Site Scripting](/posts/xss.jpg "Cross Site Scripting")

In a **Cross-site Scripting** attack, also known as xss, client-side code is injected into the output of a web page, in form of a  html attribute, and executed within the user’s browser. The impact of successful exploitation varies. 

## Why do I care about Cross-site Scripting?

**Cross-Site Scripting** vulnerabilities may be utilized by an offender to accomplish an extended list of potential wicked goals, including:

1. Steal your session identifier so that they will impersonate you and access the online application.
2. Redirect you to a phishing page that gathers sensitive data.
3. Install malware on your pc (usually needs a zero day vulnerability for your browser and OS).
4. Perform tasks on your behalf (i.e. produce a brand new administrator account with the attacker's credentials).

## Different Types Of Cross-site Scripting Explained

There are 3 types of xss these are as follows...

### Reflected Cross-Site Scripting:

![Reflected Cross-Site Scripting](/posts/reflected_xss.jpg "Reflected Cross-Site Scripting")

In this type of attack, a vulnerable page will be used to execute impulsive code. This type of **xss** doesn't persist the attack code across multiple requests. 

Since an attacker has to send a user to a specially crafted link for the code to run, reflective **XSS** sometimes needs some [social engineering](https://en.wikipedia.org/wiki/Social_engineering_(security)) to execute the attack successfully.

## Real world scenario of reflected cross-site scripting:

Let's assume, Sam is an attacker, he found a refected **xss** vulnerability in *www.site.com*. Jhon is a user of this website, Sam sends a fake email to Jhon that he is the lucky winner of an Iphone and to claim it he needs to click on the link provided in the email.

Jhon clicks the link while logged into *www.site.com*. The script gets executed in Jhon's browser, it steals Jhon's session cookies associated to www.site.com and sends to Sam.

Using the session cookie, Sam can easily access Jhon's personal information and other data such as credit card or debit card data by compromising Jhon's account.

### Stored xss:

![Stored XSS](/posts/stored_xss.jpg "Stored XSS")

In this type attack, malicious data supplied by the attacker will be stored in the server. It is more dangerous compared to reflected **xss** for following reasons.

First, a stored **xss** attack will be automatic. A script  that visits thousands of websites, can exploit a vulnerability on every web site and drops a stored **xss** payload.

Second, victims don’t need to take any action apart from visiting the affected web site. Anyone that visits the affected page on the site will become a victim as a result of the stored malicious code. It happens beacuse the script will load in their browser The victims don't  need to take an extra action.

#### Real world scenario of stored xss:

Suppose, *www.techforum.com* is a forum having thousands of users, users can post on different technical topics, and they can also comment on each post. Sam decides to get user credentials by exploiting the commenting functionality. He, writes few lines as comment and then crafts a malicious link that acts as a read more link.

When users of the forum reads few lines of his comments, and curious to read the rest of it, they will click on read more link. That link will activate a javascript file, that will steal users session cookies.

### DOM Based xss:

![DOM Based XSS](/posts/dom_xss.jpg "DOM Based XSS")

This type of attack generally involves around the DOM(Document Object Model). In other types of attacks, infected code comes from the server-end to the client-end. But, in this type of attack, javascript code is used to manipulate the DOM.

### How DOM Based xss is possible ?

This is possible partially as a result of advanced javaScript-based applications take bits of information from different places and process them. Generally that process ends up in the creation of DOM objects or direct JavaScript execution within the browser.

DOM **xss** comprises of two facts: Source and Sink. Source is something that contains user input. Sink is known as the place where user input gets executed by the browser.

## Conclusion:

In this article, I discussed in brief why you should not neglect **cross site scripting**. I hope, you will find this article helpful for you.