const { auto } = require('async')
const { json } = require('body-parser')
const { escapeXML } = require('ejs')
const express = require('express')

//this is the last part of the app where we want to secure our api's using the .env extension.
const dotenv = require('dotenv')
dotenv.config();
// syntax of express
const app= express();
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    //this "render" function used to  display the html file in the browser and link the html file with js file.
    res.render("homepage.ejs");
})

// read this line 10 when we want to add api's og omdb in our route.
const request = require('request')

app.get("/aboutme",(req,res)=>{
    res.render("aboutme.ejs")
})
// ignore right now line 7 and 8
app.get("/",(req ,res)=>{
    //console.log(req) this is to find about the request.
    res.send("hello");
    // res.send("new number")
})
app.get("/result",(req,res)=>{
    console.log(req.query.MovieName)
    const url=`http://www.omdbapi.com/?apikey=b22a3539&s=${req.query.MovieName}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){      
            const data=JSON.parse(body)
            //console.log(data)
            //res.send(data)
            res.render("result",{moviedata : data});

        }else{
            res.send("uh oh error");
        }
    });
});
app.get("/result/:id",(req,res)=>{
    console.log(process.env.API_KEY)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){      
            const data=JSON.parse(body)
            console.log(data)
            //res.send(data)
            res.render("moreaboutmovie",{moviedata1 : data});
        }else{
            res.send("uh oh error");
        }
    });
});
app.get("*",(req , res)=>{
    res.send("Error");
});
app.listen(process.env.PORT, ()=>{
    console.log(`server is started at the PORT ${process.env.PORT}`);
});

