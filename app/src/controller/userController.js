const DAO = require('../dao/mongo');
var User = require('../models/user');
var dao = new DAO(User);

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
    },
    invest: function(req, res) {
      User.findOne({_id: req.params.id }).then(function(user) {

      user.investments.push({
        project_id: req.body.project_id,
        project_name: req.body.project_name,
        amount: req.body.funding_amount
      });

      return user.save();
    }).then(function() {
        var Project = require('../models/project');
        Project.findOne({_id: req.body.project_id }).then(function(project) {
        //console.log("backer_count:"+project.backer_count);
        project.backer_count += 1;

        //console.log("Funding Status:"+project.funding_status);
        //console.log("Funding Amount:"+req.body.funding_amount);
        project.funding_status += req.body.funding_amount;
        return project.save();
      });
    }).then(function() {
      res.status(200);
      res.send("investment successful");
    })
    .catch(function (error) {
        res.status(500);
        res.send(error.message);
    });
    }
};
