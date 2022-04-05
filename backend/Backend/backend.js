/* backend.js
Jessie Newman
Last Updated: 2022-04-03
*/

// Imports (requirements)
import express, { urlencoded } from 'express';
const app = express().use(urlencoded({ extended: true }));
import { request } from 'http';
import { MongoClient } from 'mongodb';
import 'dotenv/config';


// Global constants
const authApiHost = "example.com";
const authApiPath = "/somepath";
const doAuthCheck = false; // override authentication

// Handling difference in port for testing env vs. dynamic
// port assigned by Heroku in env variables
var port = process.env.PORT;
if (port == null || port == "") port = 3000;

// Allowing cross-origin resource sharing (CORS)
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

// userVerify function
// handles the communication with the authentication server
// to ensure the request is coming from the claimed user
function userVerify(userID, req, callback) {
  if(!doAuthCheck)
    callback(true);
  // call the user API to verify this is the claimed user
  const options = {
    host: authApiHost,
    port: 80,
    path: authApiPath,
    method: 'GET',
    headers: req.headers['Authorization']
  };
  valid = false;
  httpReq = request(options, (res) => {
    res.setEncoding("utf-8");
    res.on('data', (body) => {
      body = JSON.parse(body);
      try {
        valid = Boolean(body['valid']);
      } catch (error) {
        console.log("ERROR: could not find 'valid' field in response body");
      }
    });
    res.on('end', () => {
      callback(valid);
    })
  })
  // send request, then end
  httpReq.write({'userID': userID});
  httpReq.end();
}

// initializing collections with global context
var courseCol;
var eventCol;
var taskCol;

// fetching credentials from secret.txt
var creds;
try {
  creds = process.env.LOGIN
}
catch(err) {
  console.log(err);
  process.exit(1)
}
const uri = "mongodb+srv://" + creds + "@cluster0.raicx.mongodb.net/simply-degree?retryWrites=true&w=majority";



// connect to the MongoDB
MongoClient.connect(uri, (err, client) => {
    if (err) throw err;

    const db = client.db('simply-degree');
    courseCol = db.collection('courses');
    eventCol = db.collection('events');
    taskCol = db.collection('tasks');
    
});



/* --- COURSES --- */
/* GET /courses/:courseID
Returns the stored JSON document corresponding to
this courseID if found.
Jessie Newman
Coded: 2022-04-03
Approved: 2022-04-03 by Jessie Newman
------------------------
Parameters:
courseID - the courseID of a Laurier course, ex. CP317
Variables:
id - the courseID fetched from url parameter
req - the request object
res - the response object
result - the result from the database request

Files: None
Error handling capabilities:
- When document corresponding to courseID not found: returns 404 response
- When another error occurs communicating with database: returns 500 response
------------------------
Modifications:
2022-04-03 - Documentation and code clean-up - Jessie Newman
*/
app.get('/courses/:courseID', (req, res) => {
  var id = req.params.courseID;
  // attempt to get document matching this courseID
  var result = courseCol.findOne({'course_id':id});
  result.then(data => {
    if(data) {
      res.status(200).send(JSON.stringify(data));
    }
    else {
      res.status(404).send("Course ID " + id + " was not found.");
    }
  })
  .catch(err => {
    res.status(500).send("An internal error ocurred.");
    throw err;
  });
});

/* GET /courses/prereq/:courseID1/:courseID2
Returns True if one of these courses is dependant on
the other, and False otherwise.
Jessie Newman
Coded: 2022-04-03
Approved: 2022-04-03 by Jessie Newman
------------------------
Parameters:
courseID1 - the first courseID of a Laurier course, ex. CP317
courseID2 - the second courseID of a Laurier course, ex. CP317
Variables:
course1 - the first course object returned from the database
course2 - the second course object returned from the database
id1 - the courseID1 fetched from url parameter
id2 - the courseID2 fetched from url parameter
req - the request object
res - the response object
result - the result from the database request

Files: None
Error handling capabilities:
- When document corresponding to courseID1 or courseID2 not found: returns 404 response
- When another error occurs communicating with database: returns 500 response
------------------------
Modifications:
2022-04-03 - Documentation and code clean-up - Jessie Newman
*/
app.get('/courses/prereq/:courseID1/:courseID2', (req, res) => {
  var id1 = req.params.courseID1;
  var id2 = req.params.courseID2;

  var course1 = null;
  var course2 = null;

  // get the first course from the database
  var result = courseCol.findOne({'course_id':id1});
  result.then(course1 => {
    // if course1 was returned
    if(course1) {
      // get the second course from the database
      result = courseCol.findOne({'course_id':id2});
      result.then(course2 => {
        // if course2 was returned
        if(course2) {
          // if one's id is found in the other's prereq_arr, return True
          if(course1.course_prereq_arr.includes(id2) || course2.course_prereq_arr.includes(id1)) {
            res.status(200).send(true);
          }
          else {
            res.status(200).send(false);
          }
        }
        // Course 2 was not found
        else {
          res.status(404).send("Course ID " + id2 + " was not found.");
        }
      });
    }
    // Course 1 was not found
    else {
      res.status(404).send("Course ID " + id1 + " was not found.");
    }
  })
  // some error occurred
  .catch(err =>{
    res.status(500).send("An internal error ocurred.");
    throw err;
  });
});

/* --- EVENTS --- */
/* GET /events/:userID/:year/:month
Return all JSON event documents associated with a 
user in this year and month.
Jessie Newman
Coded: 2022-04-03
Approved: 2022-04-03 by Jessie Newman
------------------------
Parameters:
userID - the numerical id of this user in the database
year - the numerical value of the year ex. 2022
month - the numerical value of the month ex. 4
Variables:
cursor - a document cursor to traverse results from database
id - the userID fetched from url parameter
month - the month fetched from url parameter
req - the request object
res - the response object
result - an array of JSON objects returned from database
timeStart - the UTC time of the start of this month
timeEnd - the UTC time of the end of this month
year - the year fetched from url parameter

Files: None
Error handling capabilities:
- When an error occurs communicating with database: returns 500 response
- When the user is not authorized to access userID's information: returns 403 response
------------------------
Modifications:
2022-04-03 - Documentation and code clean-up - Jessie Newman
*/
app.get('/events/:userID/:year/:month', (req, res) => {
  // validate user first
  userVerify(req.params.userID, req, (valid) => {
    if(!valid) {
      res.status(403).send("Error: not authorized");
      return;
    }
    var result = []; // initialize as empty array
    // getting params
    var id = req.params.userID;
    var year = req.params.year;
    var month = req.params.month;
    // finding start time and end time of this month
    var timeStart = new Date(year, month);
    var timeEnd = new Date(year, month + 1) - 1; // start of next month, minus 1 millisecond

    // find events for this user that start sometime before the end of this month,
    // and end sometime after the start of this month
    var cursor = eventCol.find({"user_id":id, "event_start":{"$lte":timeEnd}, "event_end":{"$gte":timeStart}});
    cursor.forEach(doc => {
      // for every document matching the conditions:
      console.log(doc);
      result.push(doc);
    }, (err) => {
      // when done or an error occured:
      if(err) {
        console.log(err);
        res.status(500).send("An internal error occured.");
      }
      else {
        res.status(200).send(JSON.stringify(result));
      }
    });
  });
});

/* POST /events/:userID/new
Post a new event to the database
Jessie Newman
Coded: 2022-04-03
Approved: 2022-04-03 by Jessie Newman
------------------------
Parameters:
userID - the numerical id of this user in the database
Variables:
req - the request object
res - the response object

Files: None
Error handling capabilities:
- When an error occurs communicating with database: returns 500 response
- When the user is not authorized to access userID's information: returns 403 response
------------------------
Modifications:
2022-04-03 - Documentation and code clean-up - Jessie Newman
*/
app.post('/events/:userID/new', (req, res) => {
  userVerify(req.params.userID, req, (valid) => {
    if(!valid) {
      res.status(403).send("Error: not authorized");
      return;
    }
    console.log(req.body);
    eventCol.insertOne(req.body, (err) => {
      if(err) {
        res.status(500).send("Failed to POST: an internal error occurred.");
      }
      else {
        res.status(200).send("OK");
      }
    });
  });
});

/* POST /events/:userID/:eventID
Updates the event in the database
Jessie Newman
Coded: 2022-04-03
Approved: 2022-04-03 by Jessie Newman
------------------------
Parameters:
userID - the numerical id of this user in the database
eventID - the numerical id of this event in the database
Variables:
eid - the eventID fetched from url parameter
req - the request object
res - the response object
uid - the userID fetched from url parameter

Files: None
Error handling capabilities:
- When an error occurs communicating with database: returns 500 response
- When the user is not authorized to access userID's information: returns 403 response
------------------------
Modifications:
2022-04-03 - Documentation and code clean-up - Jessie Newman
*/
app.post('/events/:userID/update', (req, res) => {
  userVerify(req.params.userID, req, (valid) => {
    if(!valid) {
      res.status(403).send("Error: not authorized");
      return;
    }
    var uid = req.params.userID;
    var eid = req.params.eventID;

    eventCol.replaceOne({'user_id':uid, 'event_id':eid}, req.body, (err) => {
      if(err) {
        res.status(500).send("Failed to POST: an internal error occured.");
      }
      else {
        res.status(200).send("OK");
      }
    });
  });
});

/* DELETE /events/:userID/:eventID
Delete an event in the database
Jessie Newman
Coded: 2022-04-03
Approved: 2022-04-03 by Jessie Newman
------------------------
Parameters:
userID - the numerical id of this user in the database
eventID - the numerical id of this event in the database
Variables:
eid - the eventID fetched from url parameter
req - the request object
res - the response object
uid - the userID fetched from url parameter

Files: None
Error handling capabilities:
- When an error occurs communicating with database: returns 500 response
- When the user is not authorized to access userID's information: returns 403 response
------------------------
Modifications:
2022-04-03 - Documentation and code clean-up - Jessie Newman
*/
app.delete('/events/:userID/:eventID', (req, res) => {
  userVerify(req.params.userID, req, (valid) => {
    if(!valid) {
      res.status(403).send("Error: not authorized");
      return;
    }
    var uid = req.params.userID;
    var eid = req.params.eventID;

    eventCol.deleteOne({'user_id':uid, 'event_id':eid}, (err) => {
      if(err) {
        res.status(500).send("Failed to DELETE");
      }
      else {
        res.status(200).send("OK");
      }
    });
  });
});

/* --- TASKS --- */
// [copy and slightly modify events functions when they are fully complete]

/* Start listening */
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});