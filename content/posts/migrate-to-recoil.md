---
title: Recoil, migrating state management from xState.
date: '2020-12-13'
published: true
layout: post
tags: ['react', 'state']
category: example
---

Using 3rd party libraries for state management can be essential or overkill
(depending on whom you may ask).
Nevertheless, when big players create tool for this purpose,
is interesting to take a look.

Usually I find out about cool libraries when they're hyped and not when I need them, but Recoil was an exception.
My need was simple and recoil's proposed solution was equally simple compared to others.

In this article I will write about particular case where I thought it was worth it to migrate
from xState[^xstate] to [Recoil](https://recoiljs.org/).

[^xstate]: [Xstate](https://xstate.js.org/) is a TypeScript finite state machines library that adheres to the SCXML specification. Way better development experience than Redux + a nice [visualizer](https://xstate.js.org/viz/)

## Indicators Dashboard

Consider an app where a user can visualize
country specific indicators, for example:
> Change in Mexico's GDP from 1950 to 2020
>
> Political Stability of Afghanistan in the latest 5 years

Indicators like `GDP` or `Political stability` are categorised like in a catalogue.
When an indicator is selected, it shows data in a dashboard:

```bash
Indicators from 1950 to 2020 # Title

Mexico >              # countries dropdown

  Governance      # categories
  Environment
  Economy >
    Purchasing # subcategories
    Imports
    Growth >
       NDP  # indicators
       TPP
       GDP >
          DASHBOARD
          # fancy visualisations
```


### Rules
1. Display all categories all the time.
2. Display subcategories only from the selected category.
3. One category and subcategory are always selected showing a list of indicators
   (display "no data available" if no indicators are present).
4. Update the dashboard data only if an indicator is selected.
5. Display one dashboard at once

|Assumptions                                                      |Constraints|
|:----------------------------------------------------------------|:------|
|Only working with categorised indicators                         |Incomplete indicators for some subcategories |
|At least one subcategory available for each category             |One request for all data for all possible dashboards is too slow |

### Use cases

|User changes    |selected indicator|display mode|
|:---------------|:-----------------:|:-----------:|
|Country         |true              |A    |
|                |false             |B    |
|Category        |true              |A    |
|                |false             |B    |
|Subcategory     |true              |A    |
|                |false             |A    |
|Indicator       |true              |A    |
|                |false             |A    |

_A: Indicators from the selected subcategory_

_B: Indicators from 1st subcategory in the list_

### API Endpoints
The best compromise we could come up with while designing the API ended up looking something like this:

````bash
1. countries/all/
2. categoriesAndSubcategories/all/           # From all available countries leaving out uncategorized indicators
3. indicators/{subCategoryName}/             # All indicators belonging to a subcategory (possibly empty)
4. indicatorValues/{country}/{indicatorName} # Indicator Data for a given country (possibly empty)
````

## React-Tree architecture


```react
App.tsx
├── Countries.tsx
│   ├── useCountries.ts       # Retrieve all countries.
│   └── CountriesDropdown.tsx # Display all categories and subcategories.
├── Categories.tsx
│   ├── useCategories.ts      # Retrieve all categories and subcategories.
│   └── CategoriesList.tsx    # Display all categories and subcategories.
├── Indicators.tsx
│   ├── useIndicators.ts      # Retrieve indicators
│   └── IndicatorsList.tsx    # Display indicators of a subcategory
└── Dashboard.tsx
    ├── useDashboard.ts       # Retrieve indicator values
    └── FancyDashboard.tsx    # Use indicator values to Data to show stunning stuff.

```

# WIP





