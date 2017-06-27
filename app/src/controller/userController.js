const DAO = require('../dao/mongo');
var user = require('../models/user');
var dao = new DAO(user);

module.exports = {
    // Backer: Backer,
    index: function (req, res) {
        dao.getAll()
            .then(function (users) {
                res.send(users);
            })
            .catch(function (error) {
                res.status(500);
                res.send(error.message);
            });
    },
    read: function (req, res) {
        dao.getById(req.params.id)
            .then(function (user) {
                if (user === null) {
                    res.status(404);
                }
                res.send(user);
            })
            .catch(function (error) {
                res.status(500);
                res.send(error.message);
            });
    },
    create: function (req, res) {
        dao.create(req.body)
            .then(function (user) {
                res.status(201);
                res.send(user);
            })
            .catch(function (error) {
                res.status(500);
                res.send(error.message);
            });
    },
    update: function (req, res) {
        dao.update(req.body.id, req.body)
            .then(function (result) {
                if (result === null) {
                    res.status(404);
                    res.send("Not found");
                }
                res.status(200);
                res.send("updated");
            })
            .catch(function (error) {
                res.status(500);
                res.send(error.message);
            });
    },
    delete: function (req, res) {
        dao.getById(req.body.id)
            .then(function (user) {
                if (user === null) {
                    res.status(404);
                    res.send();
                }
                return dao.removeById(req.body.id);
            })
            .then(function () {
                res.send("deleted");
            })
            .catch(function (error) {
                res.status(500);
                res.send(error.message);
            });
    }
};
