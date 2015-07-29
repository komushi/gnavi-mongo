Welcome to gnavi-mongo demo(Microservices Architecture)!
===================

Overview
-------------
Microservices Architecture

This is a 3-tier SPA or Single Page Application demo which is hosted on [Pivotal Web Services](https://run.pivotal.io/) - a [Cloud Foundry](http://www.cloudfoundry.org/) PaaS cloud service.

 1. Presentation tier using AngularJS MVW framework for Web UI.
 2. Logic tier using Node.js including REST API for Web UI, Business Logic to manipulate the data from MongoDB.
 3. Data tier using mongojs to communicate with mongodb instance hosted on mongolab.

----------
Architecture
-------------
###Monolithic Architecuture
![3-tier](https://raw.githubusercontent.com/komushi/gnavi-mongo/msa/images/Slide1.png)

###Microservices Architecture
![Scaling the app](https://raw.githubusercontent.com/komushi/gnavi-mongo/msa/images/Slide2.png)

----------
Live Demo
-------------
[Application on PWS](http://gnavi-msa-pl.cfapps.io/)

----------
Deployment to Cloud Foundry
-------------
Create a mongodb service 'gnavi_mongo' on your Cloud Foundry space.
For Data Crawler:
https://github.com/komushi/mongojs-gnavi

git clone this repository,
```
git clone https://github.com/komushi/gnavi-mongo
cd ./gnavi-mongo
git checkout -b msa origin/msa
```

bower install dependencies:
```
cd ./presentation_layer
bower install
```

Remember to install [cf cli](https://github.com/cloudfoundry/cli/releases).
Then, push the application:
```
cf push
```

You can access your app at 
```
http://gnavi-msa-pl.<your_cf_domain>
```