const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoGameSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    platform: { 
        type: Schema.Types.ObjectId,
        ref: "Platform",
        required: true,
    },
    genre: {
        type: String,
        enum: ["adventure", "shooter", "fighting", "survival", "sandbox", "MMO", "RPG", "battle royale", "strategy", "sports", "puzzle", "racing", "simulation", "horror", "MOBA", "cards"]
    },
    mode: {
        type: String,
        enum: ["singleplayer", "multiplayer"]
    },
    price: {
        type: Number,
        min: [0, "Price can't be negative"],
        required: [true, "Price required"]
    },
    quantity: {
        type: Number,
        min: [0, "Quantity can't be negative"],
        required: [true, "Quantity required"]
    },
    release_date: { type: Date },
});

VideoGameSchema.virtual("url").get(function() {
    return `catalog/videogames/${this._id}`;
});

mondule.exports = mongoose.model("Video Game", VideoGameSchema);