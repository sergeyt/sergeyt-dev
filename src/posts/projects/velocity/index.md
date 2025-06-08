---
title: Velocity
date: '2020-05-03'
spoiler: Huge project I've ever contributed to
tags: ["project", "telecom"]
---

## What is it?

It is amazing piece of software developed by distributed team of engineers across the globe.
It is called [Velocity](https://www.spirent.com/products/velocity) and owned by [Spirent](https://www.spirent.com).

It helps AT&T and other telecom monsters to manage their labs massively equipped by miscellaneous telecommunication devices.
While being employed by [Xored](http://www.xored.com/) I was part of talented team who doing major part of this system.

## Overview of my role

I had tech lead and team lead duties, but 50% of time helping team with real code. As the team lead, I led a team of 10-15 full-stack engineers doing code review and consulting on daily basis. As the tech lead, I had involved in finding efficient solutions especially to tackle customer-faced scalability issues. I had made initiatives make more scalable development of huge frontend. I had direct communication with customers investigating and fixing incidents on production systems. I was the first point of contact with the product owner and management groups helping solving business problems using the full spectrum of technologies available and knowledge of the product capabilities. And eventually we have made one of the best LaaS (Laboratory as a Service) solutions.

## Scalability Challenges

Like any large-scale enterprise Java project this system has given me and my team quite interesting challenges. This takes about two years of incremental changes to evolve this software from one that having issues to serve 10 operators up to 100-1000 operators running using the same hardware resources.

Changes can be break down into the following categories:

* Database optimizations
  * Concurrent mutations of same table rows using writes with optimistic locking
  * Faster queries. Scheme re-design for some use cases
  * Reduce load on database delegating some tasks into separate micro services like:
    * Search powered by ElasticSearch
    * Large objects moved to S3 by (Minio)[]
* Computational optimizations (i.e. faster algorithms)
  * In-memory computing (faster resolving of abstract topologies)

## Tools

- PostgreSQL
- ElasticSearch
- Apache Kafka
- Spirent iTest
- Java 8
- Java EE
- WildFly JBoss
- Spring
- JavaScript
- ReactJS
- Redux
