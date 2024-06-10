const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EsrbSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Rating Pending",
    }
});

EsrbSchema.virtual("url").get(function () {
    return `/catalog/esrb/${this._id}`;
})

module.exports = mongoose.model("Esrb", EsrbSchema);