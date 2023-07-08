---
title: "3 Challenges You Could Be Faced By Xml External Entity Injection"
date: "2019-08-10T09:35:10.000Z"
description: "There are many ways to store and transport data for both human readable format and machine-readable format. Web services, web or..."
tags: ["security"]
---

![XML External Entity Injection Cover Image](/posts/xml-external-entity-injection.jpg "XML External Entity Injection Cover Image")

## What is XML External Entity Injection?

There are many ways to store and transport data for both human readable format and machine-readable format. Web services, web or mobile applications, content management systems (CMS) uses extensible markup language(XML). It is the responsibility of the developer to properly validate the XML data that is used for input. 

In simple words, XML external entity injection is an attack that is generally done to compromise the logic of an XML application. This injection attack is one vulnerability listed in OWASP top 10 vulnerabilities. If you want to know more about the other vulnerabilities, you can read about it [here](https://www.devhelperworld.in/2019/06/web-application-security/). 

## What Can Be Done With XML External Entity Injection?

Attacker can use this injection attack to cause various types of attacks, which are as follows.

Viewing files stored on the application server:
Attacker will be able to view files stored in the server if the [xml parser](http://www.stylusstudio.com/xml/parser.html) is able to process external entities. Then the web server may return contents of a file on the system containing sensitive data.

The shocking fact is, attacker is not limited to system files. They can also steal source codes if they know the location and structure of the web application. Some xml parser may also allow attackers to send HTTP requests to files on the local network.

### Performing Denial Of Service (DOS) attack:
Another name of this attack is known as Billion Laugh Attack. The attacker writes the XML document in such a way so that the XML parser continues to expand each entity within itself. This process keeps on going until it overloads the server and finally brings down it. 

### Performing Server-side Request Forgery attack:
In some situations, web applications need to fetch data from external resources or some resources that can be internal services. For example, if developer wants to get weather data he or she may use a third party web api such as "open weather map api". 

 For example, to get current weather of London with this web api, the developer can use following URL: [https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22](https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22)
  
If somehow the attacker is able to change the url parameter to localhost, then he or she will be able to view the resources that are hosted locally on the server. This would cause the web application vulnerable to server-side request forgery (SSRF).

## What are different Types Of XML Injection Attacks?
There are two different types of XXE attacks, namely: in-band XXE and out-of-band XXE.

1. **In-band XXE:** After performing this type of XXE attack, attacker is able to get an immediate response to the XXE [payload](https://en.wikipedia.org/wiki/Payload_(computing)).

2. **Out-of-band XXE:** This type of XXE attack does not return any immediate response from the web application on which this attack is performed.

## Where XML Injections are Possible In a XML Document?

1. In the CDATA section.
2. In the attributes of the nodes.
3. In the node values.

## How To Prevent Against XML Injection Attacks

You should disable your application's xml parsing capabilities that your application don't intend to use. You should consult the documentation of your xml parsing library for details on how to disable those features. For a quick reference, you can consult [this cheat sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.md) maintained by OWASP.

## Final Words

If you find this article about **XML external entity injection** as helpful, please share it among others. Thank you!