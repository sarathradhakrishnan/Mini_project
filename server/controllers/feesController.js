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
        connection.query('SELECT * FROM fees',(err,rows)=>{
            connection.release();

            if(!err){
                res.render('fees-home',{ rows });
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
        connection.query('SELECT * FROM fees WHERE rollno LIKE ?',[searchTerm + '%'],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('fees-home',{ rows });
            }else{
                console.log(err);
            }
            
        });
    });
    
}

exports.form = (req,res)=>{
    res.render('add-fees');
}

//Add new user
exports.create = (req,res)=>{
    const {rollno, feesdue} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('INSERT INTO fees SET rollno = ?, feesdue = ? ',[rollno, feesdue],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('add-fees',{ alert:'Fees added successfully.'});
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
        connection.query('SELECT * FROM fees WHERE rollno = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('edit-fees',{rows});
                console.log(rows);
            }else{
                console.log(err);
            }
            
        });
    });
}


//Update User
exports.update = (req,res)=>{
    const {rollno, feesdue} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('UPDATE fees SET feesdue = ? WHERE rollno = ?',[feesdue, req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;//If not connected properly
                    console.log('Connected as ID'+connection.threadId);
                    //let searchTerm = req.body.search;
                    
                    //Use the connection
                    connection.query('SELECT * FROM fees WHERE rollno = ?',[req.params.id],(err,rows)=>{
                        connection.release();
            
                        if(!err){
                            res.render('edit-fees',{rows, alert: `${rollno} has been updated`});
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
        connection.query('DELETE FROM fees WHERE rollno = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.redirect('/fees');
                console.log(rows);
            }else{
                console.log(err);
            }
            
        });
    });
}