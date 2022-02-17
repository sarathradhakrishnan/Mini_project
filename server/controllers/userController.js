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
        connection.query('SELECT * FROM students WHERE First_Name LIKE ? OR Last_Name LIKE ?',[searchTerm + '%',searchTerm + '%'],(err,rows)=>{
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

exports.form = (req,res)=>{
    res.render('add-user');
}

//Add new user
exports.create = (req,res)=>{
    const {roll_no , class1 , first_name , last_name , email ,phone } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('INSERT INTO students SET Rollno = ?,first_name = ?, last_name = ?,email = ? , phone = ? , class = ? ',[roll_no, first_name, last_name, email, phone, class1 ],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('add-user',{ alert:'User added successfully.'});
            }else{
                console.log(err);
            }
            console.log('The data from student table :\n',rows);
        });
    });
    
}

//Edit user
exports.edit = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        //let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('SELECT * FROM students WHERE Rollno = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('edit-user',{rows});
                console.log(rows);
            }else{
                console.log(err);
            }
            console.log('The data from student table :\n',rows);
        });
    });
}


//Update User
exports.update = (req,res)=>{
    const {roll_no , class1 , first_name , last_name , email ,phone } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('UPDATE students SET first_name = ?, last_name = ? WHERE Rollno = ?',[first_name, last_name, req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;//If not connected properly
                    console.log('Connected as ID'+connection.threadId);
                    //let searchTerm = req.body.search;
                    
                    //Use the connection
                    connection.query('SELECT * FROM students WHERE Rollno = ?',[req.params.id],(err,rows)=>{
                        connection.release();
            
                        if(!err){
                            res.render('edit-user',{rows});
                            console.log(rows);
                        }else{
                            console.log(err);
                        }
                        console.log('The data from student table :\n',rows);
                    });
                });
            }else{
                console.log(err);
            }
            console.log('The data from student table :\n',rows);
        });
    });
}
