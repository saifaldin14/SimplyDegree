# SimplyDegree
Simply Degree is a complete visual degree management system for students to plan their courses, establish clear study routines and effectively take control of their semesters. 
Simply Degree provides a simple and easy-to-use user interface (UI) to allow students to quickly visualize their courses and their requirements in an editable flow-chart view. 
Simply Degree also comes with a set of tools to allow for simple planning such as visually showing which courses need to be taken to ensure progression, a lecture time planner, an API to fetch course information and many more. 
In short, Simply Degree allows for students to effortlessly manage their degree planning and build better study habits by providing a graphical interface from which they can design their semester the way they want.
  

# Project Demo
Simply Degree is a website and the easiest way to use the application is through the URL.

## Project URL
https://simplydegree.web.app/login

## Running a local instance of the project

If you don't wish to run the project using the published URL and instead want to run the project in localhost the following instructions assume you already have forked or otherwise copied the files in this repository to your local machine.

1. First, install [Node.js](https://nodejs.org/en/).

2. Afterwards, in a command prompt navigate to the SimplyDegree-main folder and then navigate to the frontend folder using `cd frontend` 
3. Run `npm install` which will automatically install all dependencies listed in the package.json file.
4. Finally run the command `npm start` to run the project locally. 

The project should run in port 3000, however if it's already in use the command prompt will allow you to run the project in another prompt.

# How to use the Application
This is a guide to use the features within Simply Degree

## Authentication
* You can create an account through the sign up button on the homepage. Simply follow the instructions on screen and after the account is created you will be automatically signed in
* You can sign in through the homepage where you provide your email and password

## The Course Graph
* When you sign in you will see all of the existing courses arranged in a rectangular fashion
* To create a course simply press the plus button on the top of the accordion view
* To delete a course click on the course node in the graph and press the backspace key
* To add a link between 2 courses click the black dot at either end of the node and drag it to the back dot of another course

## The Weekly Study Plan
* To add an event in the view simply double click anywhere on the calendar and the add event pop up window will appear
* To edit an event you can click on the event box in the calendar and a small window will appear. Click on the pencil icon and you will be taken to another pop up window
* To delete an event you can click on the event box in the calendar and a small window will appear. Click on the trash icon and a confirmation dialog will appear, once you accept the event will be deleted
* Another method to edit an event is to drag and drop it elsewhere on the calendar. Simply click on the event and drag it to where you want it to be placed

## The Monthly Calendar
* To add a task in the view simply double click anywhere on the calendar and the add task pop up window will appear
* To edit a task you can click on the task box in the calendar and a small window will appear. Click on the pencil icon and you will be taken to another pop up window
* To delete a task you can click on the task box in the calendar and a small window will appear. Click on the trash icon and a confirmation dialog will appear, once you accept the event will be deleted
* Another method to edit a task is to drag and drop it elsewhere on the calendar. Simply click on the event and drag it to where you want it to be placed


# Completed Features
The following are the completed features of the application
* Sign-up/login authentication flow
* Saving data to the database for data persistence
* API to validate courses (to see if they actually exist in WLU) and to prevent duplicate courses
* Course Graph view visible and editabble (you can move courses and links around)
* Add, delete and edit Course
* Linking Courses
* Weekly Study Plan view visible and editabble (you can move events around)
* Add, delete and edit events
* Graphically edit events by drag and drop
* Monthly Calendar view visible and editabble (you can move tasks around)
* Add, delete and edit tasks
* Graphically edit tasks by drag and drop
