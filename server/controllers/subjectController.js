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
        connection.query('SELECT * FROM subject',(err,rows)=>{
            connection.release();

            if(!err){
                res.render('subject-home',{ rows });
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
        connection.query('SELECT * FROM subject WHERE subject_name LIKE ?',[searchTerm + '%'],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('home',{ rows });
            }else{
                console.log(err);
            }
            
        });
    });
    
}

exports.form = (req,res)=>{
    res.render('add-subject');
}

//Add new user
exports.create = (req,res)=>{
    const {subject_id, subject_name , department} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('INSERT INTO subject SET subject_id = ?, subject_name = ?, department = ? ',[subject_id, subject_name ,department],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('add-subject',{ alert:'Subject added successfully.'});
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
        connection.query('SELECT * FROM subject WHERE subject_id = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('edit-subject',{rows});
                console.log(rows);
            }else{
                console.log(err);
            }
            
        });
    });
}


//Update User
exports.update = (req,res)=>{
    const {subject_id, subject_name , department} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('UPDATE subject SET subject_name = ?, department = ? WHERE subject_id = ?',[subject_name, department , req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;//If not connected properly
                    console.log('Connected as ID'+connection.threadId);
                    //let searchTerm = req.body.search;
                    
                    //Use the connection
                    connection.query('SELECT * FROM subject WHERE subject_id = ?',[req.params.id],(err,rows)=>{
                        connection.release();
            
                        if(!err){
                            res.render('edit-subject',{rows, alert: `${subject_name} has been updated`});
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
        connection.query('DELETE FROM subject WHERE subject_id = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.redirect('/subject');
                console.log(rows);
            }else{
                console.log(err);
            }
            
        });
    });
}