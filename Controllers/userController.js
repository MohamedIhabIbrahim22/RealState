const Employees = require('../models/Users');
const path = require('path');

const userSignup = (req, res) => {
    const { un: UserName, pw: Password, type: Type } = req.body;
    let imgFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    imgFile = req.files.img;
    uploadPath = path.join(__dirname, '../public/images/' + UserName + '.png');

    imgFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        const emp = new Employees({
            UserName,
            Password, // You should hash this password before saving to database
            Image: UserName + '.png',
            Type
        });

        emp.save()
            .then(result => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Error saving employee');
            });
    });
}

module.exports = { userSignup };
