
// this is the code to use that package in our file.
const { auto } = require('async')
const { json } = require('body-parser')
const { escapeXML } = require('ejs')
const express = require('express')

//this is the last part of the app where we want to secure our api's using the .env extension.
const dotenv = require('dotenv')
dotenv.config()


// syntax of express
const app= express()
/*
this ejs is similar to html but with some more features.
*/
/*
this is the syntax of middleware. middleware is used to check the input given by the user and then response. 
*/
app.set("view engine","ejs")
app.get("/",(req,res)=>{
    //this "render" function used to  display the html file in the browser and link the html file with js file.
    res.render("homepage.ejs")
})

// read this line 10 when we want to add api's og omdb in our route.
const request = require('request')

app.get("/aboutme",(req,res)=>{
    res.render("aboutme.ejs")
})
// ignore right now line 7 and 8
app.get("/",(req ,res)=>{
    //console.log(req) this is to find about the request.
    res.send("hello")
    // res.send("new number")
})
/*
/class/subject_name
this things are known as route=>   /class/id
*/
// app.get("/class/:id",(req, res)=>{
//     res.send("you are in class now")

// })
// app.get("/class/:id",(req, res)=>{
//     //console.log(req)
//     // console.log(req.params)
// /*
// point to remember in the line 29 is that use the text in between the  this `` quotes. very important .
//  */
//     res.send(`you are in ${req.params.id} class now`)
// })
/*
now if we want to write java script in line then we use
*/

/*
now if we want to know about the object :id in the terminal than we use console.log(req.params)
*/
    


// app.get("/class",(req, res)=>{
//     res.send("you are in class now")

// })
app.get("/result/:id",(req,res)=>{
    //console.log(req.query.MovieName)


    //this lines 74 and 75 are related to .env
    console.log(process.env.API_KEY)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){      
            const data=JSON.parse(body)
            console.log(data)
            res.send(data)
            //res.render("result",{moviedata : data}) wnjnwjnejvnwk

        }else{
            res.send("uh oh error")
        }
    })
})




app.get("/result",(req,res)=>{
    console.log(req.query.MovieName)
    const url=`http://www.omdbapi.com/?apikey=b22a3539&s=${req.query.MovieName}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){      
            const data=JSON.parse(body)
            console.log(data)
            //res.send(data)
            res.render("result",{moviedata : data})

        }else{
            res.send("uh oh error")
        }
    })
})

// app.get("/dog",(req, res)=>{
//     res.send("you are in class dog now")

// })
// // this is because we not want our data get public by using get request si we use post request instead of GET request.
// app.get("/result",(req, res)=>{
//     res.send("Data received")
//     console.log(req.query)
// })
app.get("*",(req , res)=>{
    res.send("Error")
})
app.listen(process.env.PORT, ()=>{
    console.log(`server is started at the PORT ${process.env.PORT}`)
})

