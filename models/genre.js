const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String,
        enum: ["adventure", "shooter", "fighting", "survival", "sandbox", "MMO", "RPG", "battle royale", "strategy", "sports", "puzzle", "racing", "simulation", "horror", "MOBA", "cards"]
    }
});

GenreSchema.virtual("url").get(function () {
    return `/catalog/genre/${this._id}`;
})

module.exports = mongoose.model("Genre", GenreSchema);