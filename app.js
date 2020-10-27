const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { static } = require("express");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res){
    console.log(req.body.Firstname);
    var FirstName = req.body.Firstname;
    var LastName = req.body.Lastname;
    var email = req.body.email;
    var data = {
        members : [
            {
            email_address : email,
            status : "subscribed",
            merge_fields : {
                FNAME : FirstName,
                LNAME : LastName
            }
            }
        ]
    };

    var jsonDATA = JSON.stringify(data);
    const listID = "ec792ed7aa";
    var url = "https://us2.api.mailchimp.com/3.0"+"/lists/"+listID;
    const options = {
        method : "POST",
        auth : "anoo6627:5h944368352b8c76b0f995bf58e6c0a3d-us2"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonDATA);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server up and running at 3000");
})


//API key
// 5944368352b8c76b0f995bf58e6c0a3d-us2

//unique ID
//ec792ed7aa