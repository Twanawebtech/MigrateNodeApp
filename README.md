# Migrate an app from Azure to Bluemix  


Bluemix is an implementation of IBM’s Open Cloud Architecture, leveraging Cloud Foundry to enable developers to rapidly build, deploy, and manage applications and services. Although Microsoft Azure, another popular PaaS platform, shares quite a few similarities with Cloud Foundry, several elements still need to be addressed when porting Microsoft Azure applications to IBM Bluemix.  

This tutorial will take you step by step from creating a NodeJS app on Azure and then migrating that app onto IBM Bluemix, this will also give you the key differences between Microsoft Azure and IBM Bluemix from a developer’s point of view. This demo focuses on a simple node.js app and services are not discussed in this first tutorial.  

Few things to be aware of when porting a Microsoft Azure application to IBM Bluemix:  

* The environment variables for service binding. In Bluemix, all the bound service credentials are stored in an environment variable named VCAP_SERVICES. However, for Microsoft Azure, the environment variables for service binding can be different depending on the services. To address this gap, the environment variables must be reconfigured so that they can be mapped correctly, and the original Microsoft Azure application needs to be modified before migrating to Bluemix.  

* Different sets of services. When porting an application to IBM Bluemix, you need to consider services. IBM Bluemix has a very big catalog of services from both IBM services and open source services. When porting your app to Bluemix you need to consider the services available to you and configure the service within your app. IBM strongly bets on this to keep expand their services catalog to help developers to developer faster and better apps.
 

* When porting your app to IBM Bluemix I recommend to add a Manifest.yml file where you declare the application setup, see below under the step 3 how this is done. 
 

* On Bluemix we are using Node version 4.2.6 but you have the flexibility to use the version you want, you just need to specify in the package.JSON file where on Azure Node version 4.2.3 is used.  


### Finish App
  ![](https://github.com/IBM-Bluemix/Migrate-Node-App/blob/master/public/images/gitImages/Screenshot-2016-01-27-13.40.18-1024x614.png)

Source code of this application: 
[can be found here.](https://github.com/IBM-Bluemix/Migrate-Node-App)  

Following is a step-by-step process describing how to migrate a sample application from Microsoft Azure to IBM Bluemix. The sample Azure application, named MigrateNodeApp, is a NodeJS application, it consumes a JSON Data file as the back-end data to retrieve the app data.  
  
  
###Migration requirements:
* A [Bluemix](https://console.ng.bluemix.net/registration/?cm_mmc=developerWorks-_-dWdevcenter-_-bluemix-_-lp&cm_mc_uid=09081209147114537995720&cm_mc_sid_50200000=1453980223)  ID, to log in and run the application in Bluemix
* The [Cloud Foundry](http://docs.cloudfoundry.org/devguide/installcf/?cm_mc_uid=09081209147114537995720&cm_mc_sid_50200000=1453980223) Command [Line Tool (CLI)](https://github.com/cloudfoundry/cli/releases?cm_mc_uid=09081209147114537995720&cm_mc_sid_50200000=1453980223) to push our app to Bluemix


####Migrate to Bluemix
In order to migrate our app from Azure to Bluemix we need to make few small changes to the source code and then we will be good to go.    
######Step 1
Make sure Node engine is specified in the package.json file, see below how its done:  
```
{
  "name": "NodejsStarterApp01",
  "version": "0.0.1",
  "auther": "Twana Dnaiel",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "ejs": "~2.3.3",
    "express": "~4.13.1",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0"
  },
  "repository": {},
  "engines": {
    "node": "4.2.x"
  }
}
```

######Step 2
Add a manifest.yml file to your root of your application. The manifest.yml contains the application configurations in which will be running on Bluemix, to read more on manifest file [click here](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html?cm_mc_uid=09081209147114537995720&cm_mc_sid_50200000=145398022 ), for our example the manifest files is as follow:
```  
applications:
- path: .
  memory: 256M
  instances: 1
  domain: mybluemix.net
  name: DeveloperNodeApp01
  host: developernodeapp01
  disk_quota: 1024M
```

######Step 3
Connection to the Database (Optional) - For our sample demo we are loading the data from a JSON file but if your application is connected to a database and reads and writes to the database then the environment variables must be reconfigured so that they can be mapped correctly. In Bluemix, all the bound service credentials are stored in an environment variable named VCAP_SERVICES. However, for Microsoft Azure, the environment variables for service binding can be different depending on the services. If you want to see working sample code with connection to a database then checkout the reference links below how to deploy a Node app with Cloudant.

######Step 4
Navigate to the folder directory and push the app to Bluemix  
-> Make sure the name of the folder is the same name in which you have it named in your manifest file, for our example our web app is called “MigrateNodeApp“.  
-> Run the following commands to login, navigate to your space on Bluemix and push your app to Bluemix:   
```
$ cd MigrateNodeApp (Navigate to the application directory)
$ cf login (Login to Bluemix and navigate to your space)
$ cf push MigrateNodeApp (Pushing app to Bluemix and can be accessed on generated staging domain at xxxxxx.mybluemix.net)
```

###Done!  
We should now be in action, access your application staging domain, in my case been: 
[http://migratenodeapp.mybluemix.net/](http://migratenodeapp.mybluemix.net/)  

If you have any questions or need support then contact me at @twanawebtech or leave a comment below.


###Troubleshooting

The primary source of debugging information for your Bluemix app is the logs. To see them, run the following command using the Cloud Foundry CLI:

  ```
  $ cf logs <application-name> --recent
  ```
For more detailed information on troubleshooting your application, see the [Troubleshooting section](https://www.ng.bluemix.net/docs/troubleshoot/tr.html) in the Bluemix documentation.



### Useful links
[Creating apps with Node (official documentation)](https://www.ng.bluemix.net/docs/?cm_mc_uid=09081209147114537995720&cm_mc_sid_50200000=1453980223#starters/nodejs/index.html#nodejs)  
[Sample Node App with Cloudant (blog)](https://cloudant.com/blog/building-apps-using-node-js-and-cloudant-on-ibm-bluemix/?cm_mc_uid=09081209147114537995720&cm_mc_sid_50200000=1453980223#.VqlNWVOLSis)  
[Migrate an app from Heroku to Bluemix (blog)](http://www.ibm.com/developerworks/cloud/library/cl-bluemix-heroku-migrate-app/)  


###Whats next?   

On our next article we will bind a Cloudant database service to load the data from where at the moment we are loading data from a JSON data file.  
