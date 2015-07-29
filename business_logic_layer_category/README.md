Welcome to gnavi-msa-bl-category!
===================

Overview
-------------

Business Logic layer for category.

-------------
Deployment to Cloud Foundry
-------------
git clone this repository and this msa branch.

Remember to install [cf cli](https://github.com/cloudfoundry/cli/releases).
After login, push the application:
```
cf push
```

You can access your app at 
```
http://gnavi-msa-bl-category.<your_cf_domain>/api
```

-------------
For Training Steps
-------------
Please check if the MicroServices which act as business logic layers provide expected data to the presentation layer.

Test the 'category' business logic layer which has been deployed on CF:
```
curl -X GET "http://gnavi-msa-bl-category.<your_cf_domain>/api/categories"
curl -X GET "http://gnavi-msa-bl-category.<your_cf_domain>/api/count_by_category"
curl -H "Content-Type: application/json" -X POST "http://gnavi-msa-bl-category.<your_cf_domain>/api/count_by_cat_area" -d '{"areaList":[{"area_code":"AREA110","area_name":"関東"},{"area_code":"AREA120","area_name":"関西"},{"area_code":"AREA130","area_name":"中部"}],"catList":[{"category_l_code":"RSFST03000","category_l_name":"すし・魚料理・シーフード"}]}'
```

Test the 'category' business logic layer which is started locally:
```
cd ./business_logic_layer_category/
npm start
curl -X GET "http://localhost:9000/api/categories"
curl -X GET "http://localhost:9000/api/count_by_category"
curl -H "Content-Type: application/json" -X POST "http://localhost:9000/api/count_by_cat_area" -d '{"areaList":[{"area_code":"AREA110","area_name":"関東"},{"area_code":"AREA120","area_name":"関西"},{"area_code":"AREA130","area_name":"中部"}],"catList":[{"category_l_code":"RSFST03000","category_l_name":"すし・魚料理・シーフード"}]}'
```

Follow the TODOs at the following files.
/business_logic_layer_category/manifest.yml
/business_logic_layer_category/controllers/catsController.js
/business_logic_layer_category/controllers/countByCatController.js
/business_logic_layer_category/controllers/countByCatAreaController.js