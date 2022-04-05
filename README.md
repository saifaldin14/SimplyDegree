# SimplyDegree
Simply Degree is a complete visual degree management system for students to plan their courses, establish clear study routines and effectively take control of their semesters. 
Simply Degree provides a simple and easy-to-use user interface (UI) to allow students to quickly visualize their courses and their requirements in an editable flow-chart view. 
Simply Degree also comes with a set of tools to allow for simple planning such as visually showing which courses need to be taken to ensure progression, a lecture time planner, an API to fetch course information and many more. 
In short, Simply Degree allows for students to effortlessly manage their degree planning and build better study habits by providing a graphical interface from which they can design their semester the way they want.
  

# Project Demo
Simply Degree is a website and the easiest way to use the application is through the URL.

## Project URL
https://simplydegree.web.app/

The following instructions assume you already have forked or otherwise copied the files in this repository to your local machine.
## backend.js
First, install [Node.js](https://nodejs.org/en/).

Afterwards, in a command prompt navigate to the simplydegree-api folder and run `npm install` which will automatically install all dependencies listed in the package.json file.

A LOGIN environment variable in the format `LOGIN="username:password"` is needed to be set with the login details for the MongoDB database.

Prof. Zia Ud Din: a .env file with this variable will be in our submission. Please put this in the Backend directory if you wish to run the program locally.

Anyone else: you will need to modify backend.js to use your own MongoDB database by changing the `uri` constant accordingly.

If no other port is specified in the PORT env variable, the default port is 3000.
