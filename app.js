const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


//Parsing Middleware
//Parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended:false}));

//Parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static('public'));

//Templating Engine
app.engine('hbs', exphbs.engine( {extname:'.hbs' }));
app.set('view engine','hbs');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit:100,
    host           :process.env.DB_HOST,
    user           :process.env.DB_USER,
    password       :process.env.DB_PASS,
    database       :process.env.DB_NAME
});

//Connection to Database
pool.getConnection((err,connection)=>{
    if(err) throw err;//If not connected properly
    console.log('Connected as ID'+connection.threadId);
});


const routes = require('./server/routes/user');
const facultyroute =require('./server/routes/faculty');

app.use('/faculty',facultyroute)
app.use('/',routes);

app.listen(port,()=>console.log(`Listening on port ${port}`));
