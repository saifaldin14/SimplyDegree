# simplydegree-api
The api to be used with the simply degree frontend  

If you want to access the Simply Degree API follow this path: https://simply-degree.herokuapp.com/  
Try a sample query: https://simply-degree.herokuapp.com/courses/CP317  

# How to install and run
Prof. Zia Ud Din: our project will be hosted on the internet, and this is the simplest way to test the running capabilities of our application. Running locally requires reconfiguration that may take more time to get working, so we recommend using our hosted website, but if you wish to locally install details are provided below

The following instructions assume you already have forked or otherwise copied the files in this repository to your local machine.
## backend.js
First, install [Node.js](https://nodejs.org/en/).

Afterwards, in a command prompt navigate to the simplydegree-api folder and run `npm install` which will automatically install all dependencies listed in the package.json file.

A LOGIN environment variable in the format `LOGIN="username:password"` is needed to be set with the login details for the MongoDB database.

Prof. Zia Ud Din: a .env file with this variable will be in our submission. Please put this in the Backend directory if you wish to run the program locally.

Anyone else: you will need to modify backend.js to use your own MongoDB database by changing the `uri` constant accordingly.

If no other port is specified in the PORT env variable, the default port is 3000.
