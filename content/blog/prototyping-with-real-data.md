---
title: 'Creating a prototype app using production data'
'description': Designers often live in "best case scenario" land, adding the best images or copy to their mocks. This makes for pretty picture but when engineers start putting things together it can quickly fall apart.
heroSmallUrl: '/post-header-proddata-small.png'
heroLargeUrl: '/post-header-proddata-large@2x.png'
draft: false
---

## What is production data?

Production data is data that is either a clone or the direct source of data that is used to power your exisiting apps. Typically your apps will receive data from "endpoints" which have been designed to return particular data. For example, your currenty app  may call `yourapp.com/api/countries` to get a list of `Countries`.

The key here is the connection the content being used to compose a designers mock and what we will end up showing to our users. Maintaining this connection means that what we deliver is consistent with what was proposed and user tested against.

### Benefits of using production data

1. Designers are exposed to back end systems, if only endpoints of an API. They are aware of the limitations, which are important to designing realistic pieces given time constraints.
2. Content gaps are exposed early by user testing.
3. The transition from prototype code to production code is minimal meaning release time is considerably less.

## Two things you need to make this happen

Everybody will have a different production setup and I hope this article is more of a conversation starter than a tutorial. I will go through a high level overview of what a setup could look like.

### 1. Modern front end library (React/Vue)

If your production environment uses a modern front end library such as React/Vue, then use that in your prototyping app. If you are not blessed with a modern production front end then I would suggest switching to a modern library for your prototype app. You will be able to build things so much faster by using props and all the powerful templating patterns.

The only down side is you won't have the ability to easily move code from prototype to production.

*Bonus points for having your organisations design system written in your favourite front end frame work*

### 2. Node Server

Node is fast enough, easy enough, reliable enough to recommend using to create your prototyping app. You will use this app to compose your components into views and populate them with data from your production endpoints. In this app, you will define routes which map back to production APIs to give back the data your composed views need.

The routes you define will be determined by your design. Say for example you work for a company that makes a Fantasy Football app and you want to display a uses profile. The engineers would most likely already have an endpoint that returns this kind of data, therefore you would create a route in your Node app to call this endpoint and return its data. Something like this:

{{< highlight go >}}
  app.get('/profile/:user', (req, res) => {
    // In here show how to call prod data
  })
{{< / highlight >}}

Now with that route defined, we can go to our browser and type `localhost:8080/profile/1` with `1` being the user id for the profile we want to look at. This will then call our server, get the data we want and populate our components. As long as we have styled our design how we want then we are now seeing exactly what you would see in production!
