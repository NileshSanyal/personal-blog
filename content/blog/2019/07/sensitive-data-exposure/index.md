---
title: "7 Ways To Put An End To Sensitive Data Exposure in 2019
"
date: "2019-07-30T11:25:30.000Z"
description: "This post is the final part of the cross site scripting series."
tags: ["security"]
---
![Sensitive Data Exposure Cover Image](/posts/sensitive-data-exposure-cover-image.jpg "Sensitive Data Exposure Cover Image")

## What Is Sensitive Data Exposure Vulnerability

**Sensitive data exposure** [vulnerabilities](https://www.devhelperworld.in/2019/06/web-application-security/) can occur when an application does not adequately protect sensitive information. This is also known as data breach. Depending on the type  of web application the data can vary and anything from credit card details, session tokens, passwords etc can be exposed.

In most data breach cases, files, documents, sensitive information are involved. At the time of building the web application, many of the web developers down prioritize protection of sensitive information. They mostly give preference to making an application that is functionally working and correct. After completely building the application, they simply forget to add protection, or they skip that step.

## What are The Causes Of This Attack


- Lack of implementation of input sanitization.

- Missing of required browser headers while sensitive information is sent to the browser.

- Implementation of faulty key management.

- Implementation of outdated or obsolete cryptographic algorithms.

- Sensitive data is either sent or stored in the plain text format.

 This attack can be caused by external or internal manner, a dissatisfied employee could cause more threat than an outsider. As the employee is already aware of the company's internal matters and has access to company's information. 

## Impact Of Sensitive Data Exposure

This attack compromises user accounts and data.  After the successful execution of this attack, the data is exposed to the attacker, so he or she can do whatever he or she wants to do with it. 

An attacker can also apply his or her social engineering skills to lure the victim to click malicious links that may install some malware in the victim's computer.

This attack can be financially devastating to a website or business. It may cause reputation damage too.  In 2019, [885 million records containing bank transaction data were compromised](https://gizmodo.com/885-million-sensitive-records-leaked-online-bank-trans-1835016235) as a result of data breaches.

## How To Prevent Sensitive Data Exposure

i) Avoid storing or transmitting data in plain text format 

You should never use plain text format when storing some sensitive data like credit card numbers, password etc. You need to encrypt the data using strong algorithms, and ensure your website algorithm utilizes hashing for storing passwords.


ii) Make use of SSL Certificates

Install SSL certificate on your website, to protect the data as it transfers from your site to the server. Popular browsers like google chrome and firefox identifies sites without SSL as "insecure", so it's a good practice to put your visitors' minds at ease.


iii) Use Strong Passwords

Make sure you use passwords that are hard to guess and very strong. Also, change your passwords in a regular basis.


iv) Keep a Backup Of The Stored Data Separately From Your Website's Server

If somehow your server is breached, any data stored on your site, will be at risk. If you keep a backup of the data then if one copy of the data is compromised, the other isn't. So you can easily restore your site from a clean and secure copy.


v) Use a Web Application Firewall (WAF)

Attackers often use automated bots to launch attacks against the web site. To prevent them from doing so use WAF.


vi) Use a Vulnerability And Malware Scanner

Attackers often uses backdoor files that enables them to find and exploit sensitive data. Use malware scanner to check and remove the backdoor successfully.


vii) Never Allow Browsers To Store Sensitive Data

Make sure that browser headers do not use caching and save login or other credentials. 

## Final Words

I hope this article helps you to understand **sensitive data exposure** in depth. If you find this article as helpful, don't forget to share with others. Thank you!

