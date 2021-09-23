const mysql = require('mysql');


let pool = mysql.createPool({
    connectionLimit: 100,
    host: 'sql3.freesqldatabase.com',
    user: 'sql3436006',
    password: 'IvH8AQEy4l',
    database: 'sql3436006',
    debug: false
  });

function listUsers(req, res){
    console.log('controller.users.list', req.params)
    //select all users from Worker 
    pool.query('SELECT FIRST_NAME, DEPARTMENT FROM Worker', function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
  })
}

let showUser = function(req, res){
    console.log('controller.users.show', req.params)
    //code to return single user by id
    //id is path param
    let sql = "SELECT * FROM Worker WHERE WORKER_ID = ?";
    //const replacements = []
    sql = mysql.format(sql, [req.params.id]);
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
}


//create user, assign it an id, add it to users array
//content of user will be inside request body

function createUser(req, res){
    console.log('controller.users.create', req.body)
    //SQL to create a new user using req.body
    let sql = "INSERT INTO Worker (FIRST_NAME, LAST_NAME, SALARY, JOINING_DATE, DEPARTMENT)  VALUES (?, ?, ?, ?, ?)";
    //const replacements = []
    sql = mysql.format(sql, [req.body.FIRST_NAME, req.body.LAST_NAME, req.body.SALARY, req.body.JOINING_DATE, req.body.DEPARTMENT]);
    //in the table i had uploaded and been using for practice, joining date had a weird format so that will start as 00:00:00, but everything else will work correctly
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
}

let updateUser = function(req, res){
    console.log('controller.users.update', req.body)
    //code to update a user
    //this will set a new salary for a specific worker
    let sql = "UPDATE Worker SET SALARY = ? WHERE WORKER_ID = ?";
    //const replacements = []
    sql = mysql.format(sql, [req.body.SALARY, req.params.id]);
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
 
}

let deleteUser = function(req, res){
    console.log('controller.users.delete', req.body)
     //code to delete a user from the database
     let sql = "DELETE from Worker where WORKER_ID = ?";
     //const replacements = []
     sql = mysql.format(sql, [req.body.WORKER_ID]);
     pool.query(sql, function(err, rows){
         if(err){
             return res.json({
                 'error': true, 
                 'message': 'error occured:' + err
         })
     } else{
         res.json(rows);
     }
     })

 
}

module.exports = {
    listUsers,
    showUser,
    createUser,
    updateUser,
    deleteUser
}