#Stripe Payments Application

This quickstart consists of a basic hasura project with basic Stripe payment app integrated on both Web(using React) and on mobile (using React-native).
Follow along below to learn about how this quickstart works.

## Prerequisites

* Ensure that you have the [hasura cli](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) tool installed on your system.

```sh
$ hasura version
```

Once you have installed the hasura cli tool, login to your Hasura account

```sh
$ # Login if you haven't already
$ hasura login
```

* You should have [Node.js](https://nodejs.org/en/) installed on your system, you can check this by:

```sh
# To check the version of node installed
$ node -v

# Node comes with npm. To check the version of npm installed
$ npm -v
```

* You should also have [git](https://git-scm.com) installed.

```sh
$ git --version
```

## Getting started

```sh
$ # Cloning this project
$ git clone git@github.com:dvkcool/Stripe-backend.git

$ cd Stripe-backend/
```

![Quickstart](https://raw.githubusercontent.com/hasura/hello-nodejs-express/new/assets/quickstart.png "Quickstart")

The `quickstart` command does the following:
1. Creates a new folder in the current working directory called `hello-nodejs-express`
2. Creates a new trial hasura cluster for you and sets that cluster as the default cluster for this project. (In this case, the cluster created is called `bogey45`)
3. Initializes `hello-nodejs-express` as a git repository and adds the necessary git remotes.

## Add a new cluster to this project
1. Delete the contents of `cluster.yaml`
```sh
$ # Create a cluster using following command
$ hasura cluster create --type free

$ # Copy the cluster name from above command and add this cluster to the project
$ # Add the cluster and alias it to an easier name
$ hasura cluster add newcluster12 -c hasura

$ # Also add your ssh-keys to cluster
$ hasura ssh-key add
```

## Deploy app to cluster

```sh
$ # Ensure that you are in the hello-nodejs-express directory
$ # Git add, commit & push to deploy to your cluster
$ git add .
$ git commit -m 'First commit'
$ git push hasura master
```

Once the above commands complete successfully, your project is deployed to your cluster.

You can open up the app directly in your browser by navigating to `https://api.<cluster-name>.hasura-app.io` (Replace `<cluster-name>` with your cluster name, this case `bogey45`)

The URL should return "Hello World".

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
$ hasura microservice logs app
```

## Front end 

### React-native 
An application for android showing the front-end interface is as follows:
 ![screen1](https://github.com/dvkcool/stripe-charge/blob/master/demo/screen1.png?raw=true)
 ![screen2](https://github.com/dvkcool/stripe-charge/blob/master/demo/screen2.png?raw=true)
 ![screen3](https://github.com/dvkcool/stripe-charge/blob/master/demo/screen3.png?raw=true)

The source code can be found [here](https://github.com/dvkcool/stripe-charge/). 

Also the required documentation of front-end can be found [here](https://github.com/dvkcool/stripe-charge/blob/master/demo/README.md?raw=true)
Some more gif demos are included in documentation too.
