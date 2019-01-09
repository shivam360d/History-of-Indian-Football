var express = require('express');
var fs = require('fs');
var app=express();

var port = process.env.PORT || 3000;
var hbs= require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
    });
app.set('view engine', 'hbs');
//*****************************/middle ware********************************************************************
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n' ,(err) => {
        if(err){
            console.log('unable to append to server log');
        }
    });
next();
});

app.get("/",(req,res)=>{
    res.render('home.hbs', {
        pageTitle: "Doors of history of Indian Football knocked again",
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/bad',(req,res)=>{
 res.send({
    message: 'this is a different route',
    NowWhat: 'remove the route from url'
 });
});

app.get('/about',(req, res)=> {
res.render('about.hbs', {
    pageTitle: ""
});
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.listen(port, () => {
    console.log(`server is on port: ${port}`);
});