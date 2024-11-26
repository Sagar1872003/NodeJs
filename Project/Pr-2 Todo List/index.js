import express from 'express';

const app = express();
const port = 8080;
let tasks = [];
let editTask = null;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { tasks, editTask });
});

app.post('/addtask', (req, res) => {
    const { task, status, deadline } = req.body;
    tasks.push({
        id: Date.now(),
        task,
        status,
        deadline,
    });
    res.redirect('/');
});

app.get('/deletetask', (req, res) => {
    const id = req.query.id;
    tasks = tasks.filter((task) => task.id != id);
    res.redirect('/');
});

app.get('/edittask', (req, res) => {
    const id = req.query.id;
    editTask = tasks.find((task) => task.id == id);
    res.redirect('/');
});

app.post('/updatetask', (req, res) => {
    const { id, task, status, deadline } = req.body;
    tasks = tasks.map((t) =>
        t.id == id
            ? { ...t, task, status, deadline }
            : t
    );
    editTask = null; 
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
