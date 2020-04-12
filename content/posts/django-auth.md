---
title: Authentication with Django
date: '2019-04-12'
published: true
layout: post
tags: ['django', 'gatsby', 'python', 'authentication']
category: example
---

## Backend

So lets get right to it with a nice soundtrack.
(I will be adding soundtrack to the next posts, since it improves my memory. God knows I need it)[^soundtrack]

[^soundtrack]: Soundtrack: Words from Neil Young. Vincent from Don McLean. I'll be Around from Yo la tengo. Pancakes from Marvin Pontiac

Firstly lets check the [docs](https://docs.djangoproject.com/en/3.0/intro/install/).
I want to add Postgresql later, but for now I will stick to the included SQLLite that comes with Django.
It will be relevant later, so Ill keep the [link to the database installation](https://docs.djangoproject.com/en/3.0/topics/install/#database-installation)
and the [tutorial on how to do that](https://docs.djangoproject.com/en/3.0/intro/tutorial02/).

I needed a hardcore reminder of how to work with Python. [This guide](https://docs.python-guide.org/dev/virtualenvs/)
helped a lot as a refreshment.
After installing/updating pip, pipx, virtualenv, virtualenvwrapper and doing this:
 ```bash
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
source /usr/local/bin/virtualenvwrapper.sh
```

I create a Django project following the [tutorial](https://docs.djangoproject.com/en/3.0/intro/tutorial01/):
```bash
$ cd api-auth-django
$ virtualenv venv
$ source venv/bin/activate
$ python -m pip install Django
$ django-admin startproject authSite
$ cd authSite && python manage.py runserver 127.0.0.1:8001
```
> An app written in Django consists
> of a Python package that follows a certain convention.
> Django generates the basic directory structure of an app.

So I made a so called 'app' (for now making a poll app, later I will add an auth app):
```bash
python manage.py startapp polls
```

The difference between `authSite/urls.py` and `polls/urls.py` was a bit tricky to discover.

`authSite/` calls `polls/`

 `polls/` calls a View.

Is not more complicated than that for now.
Just the way is done is weird:

```python
path('polls/', include('polls.urls')) # URL Pattern for Polls `authSite/urls.py`

path('', views.index, name='index') # URL Pattern for a View (that has a method called 'index') in `polls/urls.py`
```


## Model (`models.py`)

>A model is the definitive source of truth about the data.
>It contains the ESSENTIAL fields and behaviors of the data.
> DRY...
> The goal is to define your data model in one place and automatically derive things from it.

## Database

```bash
python manage.py migrate
```
> The migrate command creates any necessary database tables
> (by looking INSTALLED_APPS in authSite/settings.py file).

Migrations come from `models.py` file.
They are a history
to synchronize the database schema to match the current models.

## Auto generated Admin page

