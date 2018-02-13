# Stripe Payments Application

This quickstart consists of a basic hasura project with basic Stripe payment app integrated on both Web(using React) and on mobile (using React-native).
This can be integrated to get any company a running payment portal.
Follow along below to learn about how this quickstart  works.

## Pre-requisites

* [NodeJS](https://nodejs.org)

* [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

* [React-native](https://facebook.github.io/react-native/)

* [yarn packager](https://yarnpkg.com/lang/en/docs/install/)


## Hasura APIs used
1. Auth API
   We used the Auth API for the login/signup part *with OTP*
   ____________________________
   ![login](https://github.com/dvkcool/Stripe/blob/master/demo/login.png)
   ______________________________

2. The Data API
   For storing various data related to transactions and retrieving it, we have used the Data APIs
   This quickstart app comes with seven pre-created tables `author`, `article` (Hasura defaults) and `transactions`

    **transactions**

    column | type
    --- | ---
    user | Text
    transaction_id | Text - primary key  
    amount | Integer
    currency | Text
    paid  | Boolean
    mes  | Text
    count  | Integer(Auto-increament)

    Here mes stands for 'message'

### How this app works(Basic process)
1. The user logs in the application
2. The user enter details of his card
3. A token is generated by stripe
4. This token is then sent to our server to create a charge i.e. to deduct an amount
5. This charge detucted can be viewed on the dashboard, also if the acoount is configured properly with stripe i.e. the Bank Account is verified, it can recieve payments directly to bank if the process completes.
However for verifying this account you need an international account, which currently we lack, Sorry :)
But the app is working currently in test mode. The charges made can be seen as follows:
![pay](https://github.com/dvkcool/Stripe/blob/master/demo/stripe-pay.png?raw=true)

## Front end Demo

### React-native
An application for android showing some of the front-end interface is as follows:

1. Login screen
_____________________
 ![login](https://github.com/dvkcool/Stripe/blob/master/demo/login.gif?raw=true)
 _____________________
 2. OTP screen:
______________________
 ![loginotp](https://github.com/dvkcool/Stripe/blob/master/demo/otp.gif?raw=true)
___________________
3. Card Payment screen:
______________________
![cardpay](https://github.com/dvkcool/Stripe/blob/master/demo/cardpay.gif?raw=true)
___________________
4. Bank Payment screen:
______________________
![bank](https://github.com/dvkcool/Stripe/blob/master/demo/bank.gif?raw=true)
___________________
5. Last Transactions screen:
______________________
![last10](https://github.com/dvkcool/Stripe/blob/master/demo/last10.gif?raw=true)
___________________

The source code can be found in the `native-app` folder of this quickstart.

Also the required documentation of front-end can be found [here](https://github.com/dvkcool/stripe-charge/blob/master/README.md)

### Live link of our Application
Our react-native app can be seen live on expo [here](https://exp.host/@dvkcool/stripepay)

### APK  of our application
The APK can be downloaded from Google Drive from [here](https://drive.google.com/open?id=1Lp7wYVfhbYzU4e5snmriNMXxws4iNcPL)


## Deployment instruction

### Setting up a stripe account
1. Create an account on [Stripe](https://stripe.com)
2. Go to [Dashboard](https://dashboard.stripe.com/account/apikeys) to obtain your API keys:
 ![stripedash](https://github.com/dvkcool/Stripe/blob/master/demo/stripe-dash?raw=true)
3. Copy these keys, as they will be required for further steps.

### Getting the Hasura project
Just run the following commands to get the project running perfectly.

```sh
# Cloning the project
$ hasura quickstart dvk/Stripe-pay --type free
# Add Slack API key to hasura secrets.
$ hasura secrets update secretkey.key  <Your Stripe secret API KEY>
# Get hasura user token for otp
$ hasura user-info
# use the token from above command in next step
$ hasura secrets update notify.hasura.token "<token>"
# Deploy
$ git add . && git commit -m "Deployment commit"
$ git push hasura master
```

### Getting the front end running
Now run the following command to get the cluster name
`$ hasura cluster list`
Sample output:
```sh
$ hasura cluster list
You have created 2 of 2 free clusters.
  # delete clusters that are not required using:
  $ hasura cluster delete [cluster-name]

Clusters available in your account:
NO   NAME        OWNER
1    advance88   you
2    adsorb13   you

Clusters added to this project:
NO   NAME        ALIAS
1    adsorb13   hasura
```
Here the cluster added to the project is adsorb13.
Also add the publishable key of stripe in this file
### Getting the app running
To get the app running, modify the cluster name in `cluster.json` file in `native-app` folder
After modification, it should like:
```sh
{
  "name":"adsorb13",
  "publishable_key": "pk_test_mTGHyef7YcBAZ9qIRcUAHrbO"
}
```
where adsorb13 should be replaced by your cluster name, and your publishable key should be updated too.

Now run following commands to compile the native code for mobile
```sh
# changing to native-app folder
$ cd native-app
# Adding dependencies
$ yarn install
# Loading packager
$ yarn start
# Now depending on your choice ios or android choose a for android, or i for icons
$ a
```
Congratulations you got the app running.

## More on deployment

### Deploying changes

Now, lets make some changes to our backend app and then deploy those changes.

Modify the `server.js` file at `microservices/api/src/service.js` to change your purpose.

Save `server.js`.

To deploy these changes to your cluster, you just have to commit the changes to git and perform a git push to the `hasura` remote.

```sh
$ # Git add, commit & push to deploy to your cluster
$ git add .
$ git commit -m 'Added a new route'
$ git push hasura master
```

To see the changes, open the URL and navigate to specific end point to see changes.

### View Logs

To view the logs for your microservice

```sh
$ # app is the service name
$ hasura microservice logs api
```
## Know the developers.
1. Vidita Kher - React
2. Akash - NodeJS Express
3. Ravikant Verma - NodeJS Express
4. Divyanshu Kumar - React-native

However this app is our collaborative effort, irrespective of our languages.
The react front-end will be updated soon too.

## Found a bug
Please feel free to report a bug [here](https://github.com/dvkcool/Stripe), or mail me at divyanshukumarg@gmail.com
### Known issues
The bank payment doesn't work well due to lack of an international account for verification, we would be glad if you could come up with a solution, we are trying to figure it out too.

___________________
Happy Developing :)
___________________
Divyanshu Kumar
_____
