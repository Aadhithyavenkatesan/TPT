const express = require('express');
const exphbs = require('express-handlebars');
const hbs = require('hbs')
const bodyParser = require('body-parser');
//const {MongoClient} = require('mongodb');
const { default: mongoose } = require('mongoose');
//const engines = require('consolidate');
const dotenv = require('dotenv');

const app = express();


require('dotenv').config();


const uri = process.env.URI;
//console.log(uri)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 5000;

app.use(express.static("./Public"));



const handlbars = exphbs.create({extname: ".hbs"});

app.set("view engine","hbs");

const routes = require('./routes/home');

mongoose.connect(uri).then(() => {
    console.log("Connection Successful");
   // console.log(uri.res)
})
.catch((e)=>{
    console.log(e); 
})


app.use('/',routes);
// app.use('/iv',routes);
// app.use('/team',routes);




app.listen(port, "0.0.0.0",()=>{
  //  console.log('Listening port :',port , __dirname, location)
})