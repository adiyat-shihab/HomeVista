const { default: mongoose } = require("mongoose");

const likeProperty = new mongoose.Schema({
    propertyId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const likeModel = mongoose.models.likeproperty || mongoose.model("likeproperty", likeProperty);

export default likeModel;