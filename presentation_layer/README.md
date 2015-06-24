Welcome to gnavi-msa-pl!
===================

Overview
-------------

Presentation tier using AngularJS MVW framework for Web UI.

----------
Architecture
-------------
###Node.js
![3-tier](https://raw.githubusercontent.com/komushi/gnavi-mongo/master/images/architecture.png)

###With Cloud Foundry
![Scaling the app](https://raw.githubusercontent.com/komushi/gnavi-mongo/master/images/cf.png)

-------------
Deployment to Cloud Foundry
-------------
git clone this repository and this msa branch,
```
git clone https://github.com/komushi/gnavi-mongo
cd gnavi-mongo
```

bower install dependencies,
```
bower install
```

Remember to install [cf cli](https://github.com/cloudfoundry/cli/releases) and then get an account from [Pivotal Web Services](http://run.pivotal.io/).
Then, push the application:
```
cf push
```

You can access your app at 
```
http://gnavi-mongo-${random-word}.cfapps.io
```