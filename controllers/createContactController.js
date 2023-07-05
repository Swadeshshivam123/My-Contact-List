console.log('Create-Contact Controller Loaded...');

module.exports.create = (req, res) => {
    console.log(req.body);
    res.redirect('/');
};