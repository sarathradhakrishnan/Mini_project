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
        connection.query('SELECT * FROM faculty',(err,rows)=>{
            connection.release();

            if(!err){
                res.render('faculty-home',{ rows });
            }else{
                console.log(err);
            }
            console.log('The data from faculty table :\n',rows);
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
        connection.query('SELECT * FROM faculty WHERE name LIKE ?',[searchTerm + '%'],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('home',{ rows });
            }else{
                console.log(err);
            }
            console.log('The data from faculty table :\n',rows);
        });
    });
    
}

exports.form = (req,res)=>{
    res.render('add-faculty');
}

//Add new user
exports.create = (req,res)=>{
    const {fid, name , subject ,email} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('INSERT INTO faculty SET fid = ?, name = ?, subject = ?, email = ? ',[fid, name, subject ,email],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('add-faculty',{ alert:'User added successfully.'});
            }else{
                console.log(err);
            }
            console.log('The data from faculty table :\n',rows);
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
        connection.query('SELECT * FROM faculty WHERE fid = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('edit-faculty',{rows});
                console.log(rows);
            }else{
                console.log(err);
            }
            console.log('The data from faculty table :\n',rows);
        });
    });
}


//Update User
exports.update = (req,res)=>{
    const {fid, name , subject ,email} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;//If not connected properly
        console.log('Connected as ID'+connection.threadId);
        let searchTerm = req.body.search;
        
        //Use the connection
        connection.query('UPDATE faculty SET name = ?, subject = ?, email = ? WHERE fid = ?',[first_name, last_name, email, phone, class1, roll_no, req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;//If not connected properly
                    console.log('Connected as ID'+connection.threadId);
                    //let searchTerm = req.body.search;
                    
                    //Use the connection
                    connection.query('SELECT * FROM faculty WHERE fid = ?',[req.params.id],(err,rows)=>{
                        connection.release();
            
                        if(!err){
                            res.render('edit-faculty',{rows, alert: `${name} has been updated`});
                            console.log(rows);
                        }else{
                            console.log(err);
                        }
                        console.log('The data from faculty table :\n',rows);
                    });
                });
            }else{
                console.log(err);
            }
            console.log('The data from faculty table :\n',rows);
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
        connection.query('DELETE FROM faculty WHERE fid = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.redirect('/faculty');
                console.log(rows);
            }else{
                console.log(err);
            }
            console.log('The data from faculty table :\n',rows);
        });
    });
}