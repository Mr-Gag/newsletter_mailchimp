//jshint esversion:6
const express = require("express");
const bodyPareser = require("body-parser");
const request = require("request");

const port = 3000;

const app = express();
app.use(express.static('public'));
app.use(bodyPareser.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    let jsonData = JSON.stringify(data);
    let option = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/9ba969281a',
        method: 'POST',
        headers: {
            "Authorization": "************"
        },
       body: jsonData

    };
    request(option, (error, response, body) => {
        if (error) {
            res.sendFile(__dirname+'/failure.html');
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname+'/success.html');
            } else {
                res.sendFile(__dirname+'/failure.html');
            }
        }
    });
});

app.post('/failure', (req,res)=>{
    res.redirect('/');
});


app.listen(process.env.PORT || port, () => {
    console.log('server is running on port 3000');
});