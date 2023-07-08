---
title: "The Best way To Protect Your Application Against Broken Authentication
"
date: "2019-07-29T08:15:20.000Z"
description: "Broken authentication vulnerability is one of the vulnerability listed in OWASP top 10 vulnerabilities. If you don't know about OWASP..."
tags: ["security"]
---

![Broken Authentication](/posts/broken_authentication.jpg "Broken Authentication")

**Broken authentication** vulnerability is one of the vulnerability listed in OWASP top 10 vulnerabilities. If you don't know about OWASP top 10 vulnerabilities, you can read it [here](https://www.devhelperworld.in/2019/06/web-application-security/). It exists in web application due to improper implementation of session management and authentication functions. The consequences due to this ignorance may prove to be severe. 

## Impact Of Broken Authentication Vulnerability


- An attacker can compromise the passwords, keys, or session tokens and then eventually they can gain access any user account.

- This vulnerability allows attacker to attack some or all accounts. After successful execution of this attack, attacker is able to do anything the victim is able to do.


Before we deep dive into the details on this type of vulnerability, we need to have solid understanding of 3 things in particular. These are: Session, Cookie and Authentication.

### Session

So, in simple words, session is a way for the server to identify users and persist users activity across a web application. To achieve this, server maintains a storage for storing all users sessions. 

When users login to their account, that time server generates a session with the help of something that is known as [Session ID](https://en.wikipedia.org/wiki/Session_ID). This step is a must for the server, as the communication between client and server is established with the help of HTTP protocol.

Since, server generates a session id for the user, client (the browser) does not need to provide its information on every subsequent requests. The browser stores the session id inside a cookie. When a new request is sent to the server, the cookie acts as an authenticity on behalf of the client. When user clicks the logout link, the server terminates the user's activity and the cookie residing in the browser is deleted.

### Cookie

Cookie is basically a text file that a web browser stores in the user's computer. The main purpose of a cookie is to maintain application state. Common use cases of cookies are as follows...


1. Keeping user's preferences within the website, so that next time the user visits in the site, he or she can see the content that he or she prefers the most.

2. Storing the information about the browser that is used to browse the site.

3. To remember user's registered login credentials.

### Authentication

Authentication is process of verifying a user's identity. Generally, authentication involves checking email id and password of a user with the correct credentials. Bio metrics is a better approach to implement authentication. As it requires users to verify their identity with their biological characteristics (e.g, fingerprint or retina ).

## Protect Against Broken Authentication


- Avoid using URL query strings for session id or any user or session information.

- Entire session should be transmitted via HTTPS to prevent disclosure of the session id.

- Protect any session information transmitted to or from the client.

- Implement time-out on the server or expire the session when the user is idle.

- Generate random and complex session id that cannot be guessed easily.

- It would be a better choice if a new session is regenerated after authentication is successful.



## Conclusion

I hope after reading this article you have clear concept on **broken authentication**. If you find this article helpful, please share it among with the others. Thank you!
