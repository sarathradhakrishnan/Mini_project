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
        connection.query('SELECT * FROM attendance',(err,rows)=>{
            connection.release();

            if(!err){
                res.render('attendance-home',{ rows });
            }else{
                console.log(err);
            }
            
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
        connection.query('SELECT * FROM attendance WHERE rollno LIKE ?',[searchTerm + '%'],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('attendance-home',{ rows });
            }else{
                console.log(err);
            }
            
        });
    });
    
}

exports.form = (req,res)=>{
    res.render('add-attendance');
}

//Add new user
exports.create = (req,res)=>{
    const {rollno, att} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('INSERT INTO attendance SET rollno = ?, att = ? ',[rollno, att],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('add-attendance',{ alert:'Attendance added successfully.'});
            }else{
                console.log(err);
            }
            
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
        connection.query('SELECT * FROM attendance WHERE rollno = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('edit-attendance',{rows});
                console.log(rows);
            }else{
                console.log(err);
            }
            
        });
    });
}


//Update User
exports.update = (req,res)=>{
    const {rollno, att} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('UPDATE attendance SET att = ? WHERE rollno = ?',[att, req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;//If not connected properly
                    console.log('Connected as ID'+connection.threadId);
                    //let searchTerm = req.body.search;
                    
                    //Use the connection
                    connection.query('SELECT * FROM attendance WHERE rollno = ?',[req.params.id],(err,rows)=>{
                        connection.release();
            
                        if(!err){
                            res.render('edit-attendance',{rows, alert: `${rollno} has been updated`});
                            console.log(rows);
                        }else{
                            console.log(err);
                        }
                        
                    });
                });
            }else{
                console.log(err);
            }
            
        });
    });
}

//Delete user
exports.delete = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        //let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('DELETE FROM attendance WHERE rollno = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.redirect('/attendance');
                console.log(rows);
            }else{
                console.log(err);
            }
            
        });
    });
}