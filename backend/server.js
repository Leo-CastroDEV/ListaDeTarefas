import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_tasks'
});

const app = express();
app.listen(3000, () => {
    console.log('Servidor iniciado.');
})

app.use(cors());
app.use(express.json());

// rotas
// ----------------------------------------
app.get("/", (_, res) => {
    connection.query("SELECT COUNT(*) AS users FROM users", (err) => {
        if (err) {
            return res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    })
});

// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            return res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

// ----------------------------------------
app.get("/user/:id/tasks/:status", (req, res) => {

    if(req.params.status !== "all"){
        connection.query("SELECT * FROM tasks WHERE id_user = ? AND task_status = ?", [req.params.id, req.params.status], (err, results) => {
            if (err) {
                return res.send('MySQL connection error.');
            }
            res.json(results);
        })
    } else {
        connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
            if (err) {
                return res.send('MySQL connection error.');
            }
            res.json(results);
        })
    }
});
//-----------------------------------------------
app.post("/user/tasks/update_status/", (req, res) => {

    connection.query("UPDATE tasks SET task_status = ?, updated_at = NOW() WHERE id = ?", [req.body.status, req.body.id_task], (err) => {
        if (err) {
            return res.send('MySQL connection error.');
        }
        res.json('ok');
    })
})
//-----------------------------------------------
app.post("/user/tasks/new_task/", (req, res) => {

    connection.query("INSERT INTO tasks VALUES(0, ?, ?, 'novo', NOW(), NOW())", [req.body.id_user, req.body.task_text], (err) => {
        if (err) {
            return res.send('MySQL connection error.');
        }
        res.json('ok');
    })
})
// ----------------------------------------
app.get("/user/tasks/get_task/:id_task", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id = ?", [req.params.id_task], (err, results) => {
        if (err) {
            return res.send('MySQL connection error.' + err.message);
        }
        res.json(results);
    })
});
//-----------------------------------------------
app.post("/user/tasks/update_task/", (req, res) => {

    connection.query("UPDATE tasks SET  task_text = ?, updated_at = NOW() WHERE id = ?", [req.body.task_text, req.body.id_task], (err) => {
        if (err) {
            return res.send('MySQL connection error.');
        }
        res.json('ok');
    })
})
// ----------------------------------------
app.get("/user/tasks/delete_task/:id_task", (req, res) => {
    connection.query("DELETE FROM tasks WHERE id = ?", [req.params.id_task], (err, results) => {
        if (err) {
            return res.send('MySQL connection error.' + err.message);
        }
        res.json(results);
    })
});