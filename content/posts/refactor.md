---
title: Graphql, replacing REST based architecture.
date: '2019-06-17'
published: true
layout: post
tags: ['django', 'graphql', 'react', 'postgres']
category: example
---

## Why replace REST with Graphql

In early stages of a software project is common to have unintuitive data schemas.
Many improvements over time will hopefully increase the data quality, but meanwhile, the data will be retrieved anyway.
Who has time for technical debt /s.

Every iteration of database improvements, will drag other APIs to change as well.
I think overall, graphql can synchronize the database and the clients with fewer modifications.

## Use case
A common architecture would look roughly like this:
```
Internet Data
\ (ETL)
 --> Database
      \
       --> Data layer (API_1)
            \
             \
              --> Backend (API_2) --> Client (1)
              --> Backend (API_3) --> Client (2)
```

### Technical Keypoints
1. ETL pipelines (Extract Transport Load) extract and organize data.
2. A Data layer (e.g. ORM) queries the Database[^querysys] with API_1.


API\_1 endpoints:
* /select/
* /aggregate/
* /search/
* ...


[^querysys]: The APIs of ORM's, execute SQL statements (selects, joins, etc...). The users of the endpoints of API\_1 can build SQL Statements without worrying about DB connections. This is a layer to separate business logic, from data-source specific logic.


3. After querying and post-processing[^back], the DB Data is exposed in API\_2 and API\_3 endpoints:
    * /countries/
    * /quickfact/environment/
    * /sources/
    * ...
4. Clients use fixed request templates
to obtain data from API\_2 and API\_3 endpoints and display it to the user.

[^back]: The task of the backend, is to build SQL queries using API\_1 Endpoints and transform the response of the queries according to the business logic.

## Problem

I use optimizations in ETL to exemplify a worst case. [^worstCase]

[^worstCase]:  Other actions like feature requests, connecting new data sources or bug fixing, could potentially trigger changes in different parts of the system as well. These changes may or may not trigger changes in other parts of the system.

Consider an ETL pipeline optimization having a cascade effect of 5 changes:
```
ETL optimization
\
 --> Database (change - not from DEV Team)
      \
       --> Data layer (change 1)
            \
             \
              --> Backend (change 2) --> Client (change 3)
              --> Backend (change 4) --> Client (change 5)
```

`y = 2n + 1`

|Clients  |No. of potential changes|
|:--------|:-----------------------------|
| 1       |3                             |
| 2       |5                             |
| 3       |7                             |
| 4       |9                             |
| 5       |11                            |

## Solution


### New Keypoints
1. One backend will expose all the needed fields of the database entities.
2. Instead of multiple endpoints, only one Graphql Schema per table will be exposed.
3. The clients request only what it needs from the schemas.

With the proposed architecture in place, ETL Optimizations will have a different cascade effect.
```
ETL Optimization
\
 --> Database (Tables change)
      \
       --> Backend (Tables models<->Graphql schemas)
            \               change 1
             \
              --> Client 1 (Graphql queries)
                            change 2
              --> Client 2 (Graphql queries)
                            change 3
```

 `n + 2`

better than the previous

`y = 2n + 1`

|Clients  |Potential changes (Graphql)|Potential changes (REST)|
|:--------:|:--------------------------------------:|:-----------------------------:|
| 1       |3                                      |3                             |
| 2       |4                                      |5                             |
| 3       |5                                      |7                             |
| 4       |6                                      |9                             |
| 5       |7                                      |11                            |
| TOTAL   |25                                     |35                            |

## Verdict

#### Positive
* It’s fair to say that GraphQL is a marked improvement over REST in almost every way[^ack].
* Accelerate development time.
* Fewer interfaces, more simple architecture.

[^ack]: Acknowledging REST’s influences, GraphQL design is as an iteration forward. REST has been one of the most influential, foundational building blocks of the modern web, and GraphQL wouldn’t exist without it
#### Negative

* Relatively new, learning curves and ecosystem are less elegant than REST.
* Setup is more time-consuming.
* Improvements mostly notable when multiple clients consume the data.


