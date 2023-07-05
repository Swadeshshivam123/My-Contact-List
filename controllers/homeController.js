console.log('Home Controller Loaded...');

const Contact = require('../models/Contact');

module.exports.home = (req, res) => {
    res.render('home.ejs', {
        title: 'My Contact List',
        contacts: Contact
    });
};