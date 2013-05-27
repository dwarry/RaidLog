# Raid Log
A simple web app to track a Project's Risks, Assumptions, Issues and Dependencies 
(and some other stuff, like open queries, design decisions &c).

This is mainly being done to explore the [Durandal Single Page Application 
framework](http://durandaljs.com/index.html) and the 
[ASP.Net MVC4 Web API](http://www.asp.net/web-api). I may try replacing the 
WebAPI bits with something like [ServiceStack](http://www.servicestack.net/) 
if I get the chance, to compare and contrast. 

Data access is using the [Dapper micro-ORM](https://code.google.com/p/dapper-dot-net/), 
to see how it compares with using NHibernate.

##Tasks
- <span style="text-decoration:line-through">Initial set-up</span>
- Project List
- Add Project
- Edit Project
- Project Details
    - Risks
    - Assumptions
    - Issues
    - Dependencies
    - Queries
- Risk Evaluation History
- MI
    - Charts of open items over time

##Licence
This is released under the [MIT Licence](http://opensource.org/licenses/MIT).