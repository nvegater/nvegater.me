---
title: Architecture (Graphql vs Rest)
date: '2019-06-17'
published: true
layout: post
tags: ['django', 'graphql', 'react', 'postgres']
category: example
---

## Current state
Our customers can see information from their database
with 2 Web-Clients.
A dashboard and a search engine.
The architecture looks roughly like this:
```
ETL--->DB--(Query)-->DataLayer-(API_1)-->BackPP-(API_2)-->Client
                                    \
                                     -->BackLDB-(API_3)-->Client
```

### Technical Keypoints
1. Data from a variety of sources is loaded and organized in the DB (ETL).
2. The Data layer exposes endpoints for sending queries to the DB[^querysys].
  API\_1 endpoints:
    * /select/
    * /aggregate/
    * /search/
    * ...
3. After querying and post-processing[^back], the DB Data is exposed in API\_2 and API\_3 endpoints:
    * /countries/
    * /quickfact/environment/
    * /sources/
    * ...
4. Clients use fixed request templates
to obtain data from API\_2 and API\_3 endpoints and display it to the user.

[^querysys]: The endpoints offer functions, and the parameters of this functions are packed in SQL statements (selects, joins, etc...). The users of the endpoints of API\_1 can build SQL Statements without worrying about DB connections. This is a layer to separate business logic, from data-source specific logic.
[^back]: The task of the backend, is to build SQL queries using API\_1 Endpoints and transform the response of the queries according to the business logic.

## Problem
ETL optimizations will make changes directly in the DB very often.
This could potentially influence all the elements in the current architecture.
Therefore, I use optimizations in ETL to illustrate the problem (the worst case). [^worstCase]

[^worstCase]:  Other actions like feature requests, connecting new data sources or bug fixing, could potentially trigger changes in different parts of the system as well. These changes may or may not trigger changes in other parts of the system.

Consider an optimization having a cascade effect of 5 changes:
```
ETL---> DB--->API_1-(change1)--->API_2-(change2)--->(change3)Client
(optimization)                       \
                                      -->API_3-(change4)--->(change5)Client
```

### Equation 1
Current changes equation[^formula1]

[^formula1]: For "n" being the number of Web-Clients and "y" being the number of changes necessary to keep the Web-Clients in Sync with the database:

`y = 2n + 1`

|Clients  |No. of potential changes|
|:--------|:-----------------------------|
| 1       |3                             |
| 2       |5                             |
| 3       |7                             |
| 4       |9                             |
| 5       |11                            |

Having 3 Web-clients and one developer,
it can take around week to synchronize the clients after an ETL optimization.
(this is not counting features on the web clients, bug fixing, etc...).

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
1. One backend.
2. The Backend will contain models of the Database Tables.
3. Instead of multiple endpoints, only one Graphql Schema per table will be exposed.
4. Instead of sending requests to endpoints, the clients send queries to the Graphql Schemas.

## Solving the problem?

With the proposed architecture in place, ETL Optimizations will have a different cascade effect.
```
ETL-->              DB    -->    Backend
(optimization)                 (change1: Models-DB Sync)
                                        \
                                         \ exposes
                                          \
                                (change2: Schemas-Models Sync) ----> (change3: Queries) Client1
                                                               ----> (change4: Queries) Client2
```

### Equation 2

With the new architecture:[^formula2]

 `n + 2`

[^formula2]: For "n" being the number of Web-Clients.

Against current changes equation[^formula1]

`y = 2n + 1`



The table showcase the difference a bit clearer:

|Clients  |Potential changes (new)|Potential changes (current)|
|:--------:|:--------------------------------------:|:-----------------------------:|
| 1       |3                                      |3                             |
| 2       |4                                      |5                             |
| 3       |5                                      |7                             |
| 4       |6                                      |9                             |
| 5       |7                                      |11                            |
| TOTAL   |25                                     |35                            |

The improvement is notable.

## Side effects

#### Positive
* It’s fair to say that GraphQL is a marked improvement over REST in almost every way[^ack].
* Accelerate development time.
* Python.
* Less Applications, more simple architecture.
* All DB data available for clients at once.

[^ack]: Acknowledging REST’s influences, GraphQL design is as an iteration forward. REST has been one of the most influential, foundational building blocks of the modern web, and GraphQL wouldn’t exist without it
#### Negative

* Relatively early adoption.
* Learning curves.



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

