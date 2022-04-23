/***** First RESTful API 
 * git init
 * git add .
 * git commit -m "RESTFul API first project"
 * git remote add origin https://github.com/JoyTech555/express-demo.git
 * git push origin master
 * git config --list
 * git pull origin master
 */

const express = require('express');
const logger = require('./logger');
const Joi = require('joi');
const app = express();

// req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public'));

app.use(logger);

app.use(function(req, res, next){
    console.log('Authenticating...');
    next();
});

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

    //Validate
    const {error} = validateCourse(req.body);
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = { 
        id: courses.length +1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(' Not found ID');// 404
    res.send(course);
});




app.put('/api/courses/:id', (req,res) =>{
    //const course = courses.find(c => c.id === parseInt(req.params.id));
    //if (!course) return res.status(404).send(' Not found ID');// 404
    //Validate
    const {error} = validateCourse(req.body);
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    //update courses
    course.name = req.body.name;
    console.log(course);
    res.send(course);

});
app.delete('/api/courses/:id', (req, res) => {
    const course2 = courses.find(c => c.id === parseInt(req.params.id));
    if (!course2) res.status(404).send(' Not found ID');// 404

    //Delete
    const index = courses.indexOf(course2);
    courses.splice(index, 1);

    res.send(course2);
    
    });

function validateCourse(course){
    const course3 = courses.find(c => c.id === parseInt(req.params.id));
    if (!course3) res.status(404).send(' Not found ID');// 404

    // Create Schema
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    //Return Validate
    return schema.validate(course3);

}




//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


