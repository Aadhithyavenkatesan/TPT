const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = require('hbs')
const bodyParser = require('body-parser');
//const {MongoClient} = require('mongodb');
const { default: mongoose } = require('mongoose');
const engines = require('consolidate');
const dotenv = require('dotenv');

const app = express();



dotenv.config({
    path : './.env'
});


const uri = process.env.URI;
//console.log(uri)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 5000;
const location = path.join(__dirname , "./Public");
app.use(express.static(location));
//console.log(location)

const view = path.join(__dirname, "./views");
const handlbars = exphbs.create({extname: ".hbs"});
//app.engine('html', handlbars.engine);
app.set("view engine","hbs");
// app.set('views', view);
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');
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
    console.log('Listening port :',port , __dirname, location)
})