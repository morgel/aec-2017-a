module.exports = class DAO {
    constructor(Model) {
        this.Model = Model;
    }

    create(body) {
        var instance = new this.Model(body);
        return instance.save();
    }

    get(query) {
        return this.Model.findOne(query);
    }

    getById(id) {
        return this.get({_id: id});
    }

    getAll() {
        return this.Model.find();
    }

    update(id, body) {
        return this.Model.findByIdAndUpdate(id, {$set: body});
    }

    increment(id, body) {
        return this.Model.findByIdAndUpdate(id, {$inc: body});
    }

    remove(query) {
        return this.Model.remove(query);
    }

    removeById(id){
        return this.remove({_id:id});
    }
}
