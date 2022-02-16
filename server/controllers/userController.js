const mysql = require('mysql');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit:100,
    host           :process.env.DB_HOST,
    user           :process.env.DB_USER,
    password       :process.env.DB_PASS,
    database       :process.env.DB_NAME
});


//view users
exports.view = (req,res)=>{

    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);

        //Use the connection
        connection.query('SELECT * FROM students',(err,rows)=>{
            connection.release();

            if(!err){
                res.render('home',{ rows });
            }else{
                console.log(err);
            }
            console.log('The data from student table :\n',rows);
        });
});
}
//Find user by search
exports.find = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('SELECT * FROM students WHERE First_Name LIKE ?',[searchTerm + '%'],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('home',{ rows });
            }else{
                console.log(err);
            }
            console.log('The data from student table :\n',rows);
        });
});
    
}