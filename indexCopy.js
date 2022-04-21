const express = require('express');
const Joi = require('joi');
const app = express();

//Return a pice
app.use(express.json());

const courses = [
{ id: 1, name: 'course1'},
{ id: 2, name: 'course2'},
{ id: 3, name: 'course3'},

];

//--> Get http
app.get('/', (req, res) => {
    res.send('Hello World!!!');

});
app.get('/api/courses', (req, res) => {
    res.send(courses);

});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length <3){
        // 400 Bad Request
        res.status(400).send('Name is require more than 3 character');
        return;
    }
    

    const course = { 
        id: courses.length +1, 
        name: req.body.name
    };
    console.log(course);
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(' Not found ID');// 404
    res.send(course);
});




//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
