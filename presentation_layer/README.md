Welcome to gnavi-msa-pl!
===================

Overview
-------------

Presentation layer using AngularJS MVW framework for Web UI.

-------------
Preparation
-------------
Because there is no Service Registry applied, you need to edit the presentation_layer/js/services/services.js file.

```
var areaServiceURI = "http://gnavi-msa-bl-area.<your_cf_domain>";
var catServiceURI = "http://gnavi-msa-bl-category.<your_cf_domain>";
var indexServiceURI = "http://gnavi-msa-bl-index.<your_cf_domain>";
```

-------------
Deployment to Cloud Foundry
-------------
bower install dependencies:
```
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

-------------
Local Test
-------------
npm install dependencies:
```
npm start
```

You can access your app at 
```
http://localhost:8000
```