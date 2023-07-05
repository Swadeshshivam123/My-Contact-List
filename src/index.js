const express = require('express');
const path = require('path');
const port = 8000;
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath));

const partialsPath = path.join(__dirname, '../partials');

const templatePath = path.join(__dirname, '../views');

const db = require('../config/mongoose');

const Contact = require('../models/Contact');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', templatePath);

// app.use('/', require('../routes/index'));

app.get('/', (req, res) => {
    Contact.find({})
    .then(contacts => {
        res.render('home', {
            title: 'My Contact List',
            contact_list: contacts
        })
    })
    .catch(err => {
        if(err){
            console.error('Error in fetching the contacts. ', err);
        }
    });
});

app.post('/create-contact', (req, res) => {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then(newContact => {
        console.log('The new contact created is: ', newContact);
        return res.redirect('back');
    })
    .catch(err => {
        if(err){
            console.error('Error creating the new contact. ', err);
        }
    });
});

app.get('/delete-contact', (req, res) => {
    let deleteContactId = req.query.id;
    Contact.findByIdAndDelete(deleteContactId)
    .then(deletedDocument => {
        if(deletedDocument){
            console.log('Document deleted: ', deletedDocument);
        }else{
            console.log('Document not found...');
        }
        return res.redirect('back');
    })
    .catch(err => {
        if(err){
            console.error('Error deleting contact. ', err);
        }
    });
    ;
})

app.listen(port, (err) => {
    if(err){
        console.log('Error connecting to the server...', err);
        return;
    }
    console.log(`Yup. My express server is up and running on port: ${port}`);
})