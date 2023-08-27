
const connection = require('./connection')

const express = require('express');
const bodyParser=require('body-parser');
var app = express();

app.use(bodyParser.json())
//get all relationship
app.get('/relations',(req,res)=>{
    connection.query('SELECT * FROM familytree',(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.send(rows);
        }
    })
})
//get any one relationship with id
app.get('/relations/:id',(req,res)=>{
    connection.query('SELECT * FROM familytree WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.send(rows);
        }
    })
})

//Insert any relationship
app.post('/relations',(req,res)=>{
    var rel = req.body
    var rdata = [rel.person1,rel.person2,rel.person1_isof_person2];
    connection.query('INSERT INTO familytree(person1,person2,person1_isof_person2) values(?)',[rdata],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.send(rows);
        }
    })
})

//update any field of record
app.patch('/relations',(req,res)=>{
    var rel = req.body
    connection.query('UPDATE familytree SET ? WHERE id='+rel.id,[rel],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{ 
            console.log(rows);
            res.send(rows);
        }
    })
})

//update the whole record
app.put('/relations',(req,res)=>{
    var rel = req.body
    connection.query('UPDATE familytree SET ? WHERE id='+rel.id,[rel],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{ 
            if(rows.affectedRows==0){
                var rdata = [rel.person1,rel.person2,rel.person1_isof_person2];
                connection.query('INSERT INTO familytree(person1,person2,person1_isof_person2) values(?)',[rdata],(err,rows)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(rows);
                        res.send(rows);
                    }})
            }else{
                console.log(rows);
                res.send(rows);
            }
            
        }
    })
})



//delete any relationship
app.delete('/relations/:id',(req,res)=>{    
    connection.query('DELETE FROM familytree WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.send(rows);
        }
    })
})

app.listen(3000,()=>console.log('Express server is runnning on 3000 port'))
