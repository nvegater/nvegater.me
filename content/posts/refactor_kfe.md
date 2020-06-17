---
title: Replacing Spring boot backend with Django-Graphql
date: '2019-05-18'
published: true
layout: post
tags: ['django', 'graphql', 'react', 'postgres']
category: example
---

## Current state
Our customers can see their database information
through one dashboard and one search engine.
This 2 Web-Clients were built with this architecture:
```
ETL--->DB--(Query)-->DataLayer-(API1)-->BackPP-(API2)-->Client
                                    \
                                     -->BackLDB-(API3)-->Client
```

### Keypoints
1. Data from a variety of sources is loaded and organized in the DB (ETL).

2. The Data layer exposes a query system[^querysys] through the endpoints in API1
  that may look like this:
    * /select/
    * /aggregate/
    * /search/
    * ...
3. The task of the backend, is to build queries using API1 Endpoints based on business logic
and expose the results of these queries in their endpoints.
API2 and API3 endpoints may look like this:
    * /countries/
    * /quickfact/environment/
    * /sources/
    * ...

4. Clients request data through API2 and API3 endpoints and display it.

[^querysys]: The endpoints offer functions, and the parameters of this functions are packed in SQL statements (selects, joins, etc...). The users of the endpoints of API1 need to know how to build this SQL Statements. This is a layer to separate business logic, from data-source specific logic.

## Problem
ETL optimizations will make changes in the DB (hopefully) very often.
This is obviously not the only one reason to trigger changes but
could potentially influence many systems strongly.
Therefore, I use optimizations in ETL to illustrate the problem. [^worstCase]

[^worstCase]:  Other actions like feature requests, connecting new data sources or bug fixing, could potentially trigger changes in different parts of the system as well.


There is potentially a cascade effect with 6 changes:
```
ETL---> DB-(change1)-->API1-(change2)--->API2-(change3)--->(change4)Client
(optimization)                       \
                                      -->API3-(change5)--->(change6)Client
```

## Proposed solution

GraphQL new architecture:
```
ETL-->      DB    -->            Backend
        (DB Tables)       (Models of DB Tables)
                                \
                                 \ exposes
                                  \
                            (Graphql Schemas) ----> (graphql queries) Client1
                                              ----> (graphql queries) Client2
```
### New Keypoints
1. The one backend to rule them all (written in Python-Django).
2. The Backend will have models of the Database Tables.
3. The backend will expose the tables through a Graphql Schema.
4. Instead of sending requests to endpoints, the clients send queries to the Graphql Schemas.

## Solving the problem?

ETL Optimizations and other changes will have a different cascade effect.
```
ETL-->              DB    -->    Backend
(optimization)  (change1)       (change2-Models)
                                        \
                                         \ exposes
                                          \
                                (change3-Schemas) ----> (change4-Queries) Client1
                                                 ----> (change5-Queries) Client2
```

An optimization triggers 5 changes instead of 6 changes with our current approach.
This is not fixing our worst case Scenario. So why bother?


|Change           |No. potential Changes now (max)|No. Changes new (max)|
|:--------        |:-----------------------------:|:-------------------:|
| ETL change      |6                              | 5                   |
| client change   |2                              | 2                   |
| backend change  |3                              | 1                   |
| add new client  |2                              | 1                   |
| TOTAL:          |13                             | 9                   |





Another important advantage (maybe even more important)
is that the models already expose ALL the data from the HANA.
Is up the client to filter out what they don't want through the queries.

The APIs dont expose all the Data from the HANA, only the required



A postgres DB has 3 Schemas
* CORE
    * CORE.TB012\_ST\_INDICATOR\_VALUE
    * CORE.TB013\_ST\_INDICATOR
* RECT
	* RECT.ACLED\_EVENTS
	* RECT.BBC\_NEWS
* \_SYS\_BIC
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/CV\_DM2\_AVG\_GLOBAL
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/CV\_DM2\_AVG\_REGION
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/CV\_DM2\_COUNTRIES
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/CV\_DM2\_GTD\_OVERVIEW
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/CV\_DM2\_LATEST\_VALUES
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/CV\_DM2\_POPULATION
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/SCV\_DM2\_AVG\_ENVIRONMENT
    * \_SYS\_BIC.aa.kfe.cp.ldb.dm2/SCV\_DM2\_SOURCES

