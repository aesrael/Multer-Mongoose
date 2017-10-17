var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    }

});

var Image = module.exports = mongoose.model('Image', imageSchema);


module.exports.getImages = function (callback) {
    Image.find(callback);
}


module.exports.getImageById = function (id, callback) {

    Image.findById(id, callback);

}

module.exports.addImage = function (image, callback) {
    Image.create(image, callback);
}



