const { response } = require('express');
const express = require('express')
const bodyParser = require('body-parser') // just a package we have to include
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: '0',
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: '0',
            joined: new Date()
        }
    ]
}


const app = express();
app.use(bodyParser.json()); // this is just something we have to do

app.get('/', (req, res)=> {
    res.send("This is the get response gabagoo");
})

//Signin route
app.post('/signin', (req, res)=> {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json("successfully signed in!")
        }
    else {
        res.status(400).json("error logging in");
    }
})

app.listen(3000, ()=> {
    console.log("app is running on port 3000")
})

// THE ABOVE IS JUST DEFAULT CODE TO RUN EXPRESS

/* 
PLANNING THE API
    root route -> responds with "this is working"
    signin route -> POST request since we adding
        user information to some dataset. It should
        respond with either "success" or "fail"
        QUESTION: why would we use POST if we are not creating
            something new? Well that's because POST is better at keeping
            passwords more hidden than other http requests. So we can better
            avoid man-in-the-middle attacks.
    register route -> POST request since we want to add
        the users' information to our database
        we respond with with the new user info that was just created
    profile/:userID route -> GET request. Gets the user's information
        given their username or userID
    image route -> PUT request which updates the users' score
        and then checks their score vs all others' score to see who has highest
        responds with the updated users' score

    WE ARE GOING TO TEST ALL OF THESE WITH POSTMAN TO MAKE SURE
    THEY'RE WORKING
*/