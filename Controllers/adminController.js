const Employees = require('../models/Users');

const getEmp = (req, res) => {
    Employees.find()
        .then(result => {
            res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error fetching employees');
        });
}

const addEmp = (req, res) => {
    const { UserName, Password, Type } = req.body;

    const emp = new Employees({
        UserName,
        Password, // You should hash this password before saving to database
        Image: 'default.jpg', // You might want to handle image upload separately
        Type
    });

    emp.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error adding employee');
        });
}

const findEmp = (req, res) => {
    const { id } = req.params;

    Employees.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).send('Employee not found');
            }
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error finding employee');
        });
}

module.exports = { getEmp, addEmp, findEmp };
