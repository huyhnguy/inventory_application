const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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
        type: Schema.Types.Decimal128,
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
    return `/catalog/videogame/${this._id}`;
});

VideoGameSchema.virtual("release_date_formatted").get(function() {
    return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
});

VideoGameSchema.virtual("release_date_yyyy_mm_dd").get(function() {
    return DateTime.fromJSDate(this.release_date).toISODate();
});



module.exports = mongoose.model("Video Game", VideoGameSchema);