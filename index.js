
const connection = require('./connection')

const express = require('express');
const bodyParser=require('body-parser');
const { body, validationResult } = require('express-validator');
var app = express();

app.use(bodyParser.json())
//get all relationship

app.get('/relations', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM familytree', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get any one relationship with id

app.get('/relations/:id', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM familytree WHERE id=?', [req.params.id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error:  can not fetch' });
    }
});


//Insert any relationship

app.post('/relations', [
    body('person1')
        .notEmpty().withMessage('person1 is required')
        .isString().withMessage('person1 must be a string')
        .isLength({ min: 3 }).withMessage('person1 must have a minimum length of 3 characters'),

    body('person2')
        .notEmpty().withMessage('person2 is required')
        .isString().withMessage('person2 must be a string')
        .isLength({ min: 3 }).withMessage('person2 must have a minimum length of 3 characters'),

    body('person1_isof_person2')
        .notEmpty().withMessage('person1_isof_person2 is required')
        .isLength({ min: 3 }).withMessage('person2 must have a minimum length of 3 characters'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const rel = req.body;
        const rdata = [rel.person1, rel.person2, rel.person1_isof_person2];

        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO familytree(person1, person2, person1_isof_person2) VALUES(?)', [rdata], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error: can not insert' });
    }
});


//update any field of record

app.patch('/relations', [
    body('id')
        .notEmpty().withMessage('ID is required')
        .isNumeric().withMessage('ID must be a number'),

    body('person1')
        .notEmpty().withMessage('person1 is required')
        .isString().withMessage('person1 must be a string')
        .isLength({ min: 3 }).withMessage('person1 must have a minimum length of 3 characters'),

    body('person2')
        .notEmpty().withMessage('person2 is required')
        .isString().withMessage('person2 must be a string')
        .isLength({ min: 3 }).withMessage('person2 must have a minimum length of 3 characters'),

    body('person1_isof_person2')
        .notEmpty().withMessage('person1_isof_person2 is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const rel = req.body;

        const rows = await new Promise((resolve, reject) => {
            connection.query('UPDATE familytree SET ? WHERE id=' + rel.id, [rel], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error: can not update' });
    }
});


//update the whole record

app.put('/relations', [
    body('id')
        .notEmpty().withMessage('ID is required')
        .isNumeric().withMessage('ID must be a number'),

    body('person1')
        .notEmpty().withMessage('person1 is required')
        .isString().withMessage('person1 must be a string')
        .isLength({ min: 3 }).withMessage('person1 must have a minimum length of 3 characters'),

    body('person2')
        .notEmpty().withMessage('person2 is required')
        .isString().withMessage('person2 must be a string')
        .isLength({ min: 3 }).withMessage('person2 must have a minimum length of 3 characters'),

    body('person1_isof_person2')
        .notEmpty().withMessage('person1_isof_person2 is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const rel = req.body;

        const rows = await new Promise((resolve, reject) => {
            connection.query('UPDATE familytree SET ? WHERE id=' + rel.id, [rel], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.affectedRows === 0) {
            const rdata = [rel.person1, rel.person2, rel.person1_isof_person2];
            const insertRows = await new Promise((resolve, reject) => {
                connection.query('INSERT INTO familytree(person1, person2, person1_isof_person2) VALUES(?)', [rdata], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            console.log(insertRows);
            res.send(insertRows);
        } else {
            console.log(rows);
            res.send(rows);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error: can not update' });
    }
});



//delete any relationship

app.delete('/relations/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const rows = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM familytree WHERE id=?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error: can not delete' });
    }
});


app.listen(3000,()=>console.log('Express server is runnning on 3000 port'))
