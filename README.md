Welcome to gnavi-mongo demo!
===================

Overview
-------------

This is a 3-tier SPA or Single Page Application demo which is hosted on [Pivotal Web Services](https://run.pivotal.io/) - a [Cloud Foundry](http://www.cloudfoundry.org/) PaaS cloud service.

 1. Presentation tier using AngularJS MVW framework for Web UI.
 2. Logic tier using Node.js including REST API for Web UI, Business Logic to manipulate the data from MongoDB.
 3. Data tier using mongojs to communicate with mongodb instance hosted on mongolab.

----------
Architecture
-------------
###Node.js
![3-tier](https://raw.githubusercontent.com/komushi/gnavi-mongo/master/images/architecture.png)

###With Cloud Foundry
![Scaling the app](https://raw.githubusercontent.com/komushi/gnavi-mongo/master/images/cf.png)

----------
Live Demo
-------------
[Application on PWS](http://gnavi-mongo.cfapps.io/)


----------
Getting started on your laptop
-------------

All you need to do is to clone this repository,
```
git clone https://github.com/komushi/gnavi-mongo
cd gnavi-mongo
```

Remeber to install [node.js and npm](http://nodejs.org/) and then [bower](http://bower.io/) first.
Then, install the dependencies:
```
npm install
```

Then, run the Application:
```
npm start
```

You can access your app at 
```
http://localhost:9000/
```
----------
Deployment to Cloud Foundry
-------------
git clone this repository,
```
git clone https://github.com/komushi/angular-gnavi
cd angular-gnavi
```

Remeber to install [cf cli](https://github.com/cloudfoundry/cli/releases) and then get an account from [Pivotal Web Services](http://run.pivotal.io/).
Then, push the application:
```
cf push
```
You can access your app at 
```
http://gnavi-mongo-${random-word}.cfapps.io
```