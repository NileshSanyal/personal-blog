---
title: "Four Ways To Stop Security Misconfiguration in 2019"
date: "2019-08-03T11:15:25.000Z"
description: "Security misconfiguration vulnerability is one of top 10 vulnerability of OWASP. If you missed the whole list of OWASP, you can..."
tags: ["security"]
---

![Security Misconfiguration](/posts/security-misconfiguration.jpg "Security Misconfiguration")

## What is Security Misconfiguration Vulnerability

**Security misconfiguration** vulnerability is one of top 10 vulnerability of OWASP. If you missed the whole list of OWASP, you can read it [here](https://www.devhelperworld.in/2019/06/web-application-security/).It happens when the security settings are implemented, configured as default settings. Generally, the web application requires many different components in order to function correctly. It requires various resources that are as follows. 

1. A web server to host the application.
2. An application framework to simplify management, the complexity and maintainability of the codebase.                                                        
3. A database for storing application specific data in either relational or non-relational way. 
Also, it may require additional resources that may vary depending on the type and complexity of the web application.

Any level of an organization's application stack can become main reason to cause a configuration flaw. If more levels are involved in the stack, the greater chances are there for a mistake leading to a vulnerability.

So, **security misconfiguration** can happen at any level of the web application stack whether be it the framework, application server, database etc.


## Security Misconfiguration With Example

As the application grows, it becomes hard to clear the issues regarding the **security misconfiguration**. It can occur in developer's own code, or in the preexisting features. Sometimes, developers create credentials to test the functionality of a web application. But, after test is done successfully, they often forget to remove the test accounts. The consequences of this mistake can lead to misconfiguration vulnerability. Attacker can exploit this and can cause severe damage the web application, thus affecting the financial growth of a business.

Sometimes, unused and unnecessary features can cause a lot of trouble to the application. For example, developers had enabled debugging mode during development phase. After the application goes live, they forgot to turn off this mode, this could prove fatal. The debugging mode displays a lot of internal information regarding the application. So an attacker can easily discover more vulnerabilities with the help of this information.

Other example of unused features could be the use of unused ports that are enabled during development phase. If these features are not turned off or they are poorly maintained, it enables attackers to further exploit the application by gaining more information and causing massive attacks on the application.

Another example could be such that directory traversal is not disabled on the server where the application is hosted. Attacker could exploit this feature by traversing through the files on server, then they could be able to access configuration files on the server. This allows them to [gather more information](https://www.slideshare.net/rockkotak/information-gathering-30615448) and exploit the application.


## What is Impact Of Security Misconfiguration

The root cause of this vulnerability can leave an application completely open to attackers. In some situations, it may leave data without any need for an attack.

One notable incident of this attack happened on October 2014. Security journalist Brian Krebs reported vulnerability in the website of [MBIA Inc](https://krebsonsecurity.com/2014/10/huge-data-leak-at-largest-u-s-bond-insurer/). Main reason of that attack was misconfigured database server. That allowed search engines to index hundreds of user account statements. Which allowed the data to be easily accessible  by a simple web search.

Also, this vulnerability could result in full takeover by the attacker. That could mean sensitive data would be stolen and  it would cost a lot of money to recover from such loss.


## How To Prevent Security Misconfiguration


- The root cause of **security misconfiguration** is due to human error, rather than  other attack factors. If a properly maintained and well-structured development cycle is used, it will definitely help to encounter with this vulnerability.  A proper process cycle should be used in order to secure and test during the development phase.

- To deal with inconsistent configuration issues, you need to use the same configuration options for different phases of development (e.g, development, staging and production).

- It is a good practice to perform scans and audits on a regular basis.

- Plan the architecture and then setup the system in such a way so that it will be easy enough to deploy software updates and patches. Also follow good guidelines for security configurations.

> If you are interested to learn more about ethical hacking, visit [here](https://www.vpnmentor.com/blog/ultimate-guide-to-ethical-hacking/).

## Final Words

I hope you find this article on security misconfiguration as helpful. It would be great to share this content among the others if you think this post provides some value to you. Thank you!
