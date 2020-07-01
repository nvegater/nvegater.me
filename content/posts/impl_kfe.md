---
title: Implementation (Graphql vs Rest)
date: '2019-07-01'
published: true
layout: post
tags: ['django', 'graphql', 'react', 'postgres']
category: example
---

## Current state

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

I want to make this schemas available in a Graphql API and request any combination of this data from the frontend.

