const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EsrbSchema = new Schema({
    name: {
        type: String,
        enum: ["Everyone", "Everyone 10+", "Teen", "Mature 17+", "Adults Only 18+", "Rating Pending"]
    }
});

EsrbSchema.virtual("url").get(function () {
    return `/catalog/esrb/${this._id}`;
})

module.exports = mongoose.model("Esrb", EsrbSchema);