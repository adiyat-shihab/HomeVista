const { default: mongoose } = require("mongoose");

const favouriteProperty = new mongoose.Schema({
    propertyId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const favModel = mongoose.models.favproperty || mongoose.model("favproperty", favouriteProperty);

export default favModel;