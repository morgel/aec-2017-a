const DAO = require('../dao/mongo');

var project = require('../models/project');
var dao = new DAO(project);

module.exports = {
    //Project: Project,
    index: function (req, res) {
        dao.getAll()
            .then(function (projects) {
                res.send(projects);
            })
            .catch(function (error) {
                res.status(500);
                res.send(error.message);
            });
    },
    read: function (req, res) {
        dao.getById(req.params.id)
            .then(function (project) {
                if (project === null) {
                    res.status(404);
                }
                res.send(project);
            })
            .catch(function (error) {
                res.status(500);
                res.send(error.message);
            });
    },
    create: function (req, res) {
        dao.create(req.body)
            .then(function (project) {
                res.status(201);
                res.send(project);
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
            .then(function (project) {
                if (project === null) {
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
