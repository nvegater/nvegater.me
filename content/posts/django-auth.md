---
title: Fake Twitter with Django
date: '2019-04-25'
published: true
layout: post
tags: ['django', 'gatsby', 'python', 'faketwitter']
category: example
---

## Backend

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
$ cd tweetwo
$ virtualenv venv
$ source venv/bin/activate
$ python -m pip install Django
$ django-admin startproject authSite
$ cd authSite && python manage.py runserver 127.0.0.1:8001
```
> An app written in Django consists
> of a Python package that follows a certain convention.
> Django generates the basic directory structure of an app.

So I made a so called 'app' (for now making a tweets app).
First making sure im in an activated virtual environment
```bash
cd tweetwo
virtualenv venv
source venv/bin/activate
python manage.py startapp tweets
# or
./manage.py startapp tweets
```

The difference between `tweetwo/urls.py` and `tweets/urls.py` was a bit tricky to discover.

`tweetwo/` calls `tweets/`

 `tweets/` calls a View.

Is not more complicated than that for now.
Just the way is done is weird:

```python
path('tweets/', include('tweets.urls')) # URL Pattern in AuthSite calling tweets: `tweetwo/urls.py`

path('', views.index, name='index') # URL Pattern in tweets calling a View (that has a method called 'index') in `polls/urls.py`
```


## Model (`models.py`)

>A model is the definitive source of truth about the data.
>It contains the ESSENTIAL fields and behaviors of the data.
> DRY...
> The goal is to define your data model in one place and automatically derive things from it.

A tweet model will get translated to a database:

```python
 class Tweet(models.Model):
     # id = models.AutoField(primary_key=True) generated automatically for all the models.
     content = models.TextField(blank=True, null=True)  # in case only image is tweeted.
     image = models.FileField(upload_to='images/')  # save the path to the image
 ```

Users, validators, contenttypes etc... a lot of things come by default with django.
Lets go now to the database.

## Database

After making a model, run this two:

```bash
./manage.py makemigrations
./manage.py migrate
```
> The migrate command creates any necessary database tables
> (by looking INSTALLED_APPS in tweetwo/settings.py file).

Migrations come from `models.py` file.
Migrations synchronize the database schema to match the current models.

## Testing stored data

Looks like python commandline, but is not:
```python
cd tweetwo/tweetwo
./manage.py shell
```
Search for the tweets app, the `models.py` and the Tweet class:
```python
>>> from tweets.models import Tweet
>>> obj = Tweet()
>>> obj.content = "Hello world"
>>> obj.save()
```
This is now persisted in the database :) to prove that, ill go out of the console
```python
>>> exit()
```
Go in again
```python
./manage.py shell
```
Find the object I just persisted
```python
>>> from tweets.models import Tweet
>>> obj = Tweet.objects.get(id=1)
>>> obj.content
'Hello world'
```

Magic. things are being stored now.




## Auto generated Admin page

