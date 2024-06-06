const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoGameSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    platform: [{ 
        type: Schema.Types.ObjectId,
        ref: "Platform",
        required: true,
    }],
    genre: {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
    },
    esrb: {
        type: Schema.Types.ObjectId,
        ref: "Esrb",
        required: true,
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

module.exports = mongoose.model("Video Game", VideoGameSchema);