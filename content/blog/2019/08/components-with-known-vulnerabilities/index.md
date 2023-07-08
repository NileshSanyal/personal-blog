---
title: "Top Risks Of Components With Known Vulnerabilities in 2019"
date: "2019-08-17T02:30:15.000Z"
description: "Components with known vulnerabilities is of the vulnerability  in the OWASP top 10 vulnerabilities list. It holds 9th position..."
tags: ["security"]
---

![Components with known vulnerabilities](/posts/components_with_known_vulnerabilities.jpg "Components with known vulnerabilities")

**Components with known vulnerabilities** is of the vulnerability  in the OWASP top 10 vulnerabilities list. It holds 9th position in the OWASP list of ten most critical web application security risks.

Lots of open source plugins or components or libraries are already available on the web. Web applications make use of them a lot.  By using these components, developers save some amount of development time.  

## Reasons Behind Components With Known Vulnerabilities

Due to the pressure of quickly delivering at speed, developers often forget to properly check these libraries. This is a common problem for some small and sometimes medium sized companies. They use PHP, Javascript, Python libraries to make their applications interactive or easy to use. 

Developers generally tend to focus on securing their own code, they often don't know about all the code that is running. They forget to check issues tab of any open source project listed on GitHub. Also, they did not check if any issue status is closed or not as seen in the following screen shot.

Closed issue means that issue is fixed by one of contributors of the project.

![Github issues tab](/posts/github_issues_tab.png "Github issues tab")

![Github closed issues](/posts/github_closed_issues.png "Github closed issues")

No one could give any gurantee that any library of an application will be fully secure.  After a library is published, security experts often found security vulnerabilities. Then they add security patches to get rid of that vulnerability. If developer fails to apply that patch the vulnerability exists.


## Impacts Of Components With Known Vulnerabilities

The impact of this attack is dependent on the vulnerable library itself. This could be [cross site scripting](https://www.devhelperworld.in/2019/07/cross-site-scripting/) vulnerability or any other one. But, the attacker may be able to gain control of the whole system.


## Recent Attacks Made Using Components With Known Vulnerability

The [BlackDuck 2018 Open Source Security and Risk Analysis](https://www.blackducksoftware.com/open-source-security-risk-analysis-2018) report states that 8% of the codebases it had audited contained Apache Struts, and that 33% of those still contained the Struts vulnerability more than a year after it was fixed.


## Prevening Against This Attack

- Any web application must try to use few third party libraries as possible. If more and more third party libraries are used, there are greater chance of existence of vulnerabilities in those libraries or components. The developers must remove unnecessary features along with the  dependencies that are linked in that feature. If these are not removed, they may still become the reason behind security flaw.

- Components or libraries from authorized sources must be used. Signed packages will allow to ensure that there exist very less chance of modified and malicious component. 

- Security policies must be established governing component use, such as requiring certain software development practices, passing security tests, and acceptable licenses.

- Keep the components or libraries up to date.

- Monitor the security of these components in public databases, project mailing lists, and security mailing lists.


## Conclusion

I hope after reading this article you properly understood the problems occurred by components with known vulnerabilities. If you like this article share it with others. Thanks!
