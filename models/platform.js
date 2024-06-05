const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlatformSchema = new Schema ({
    name: { 
        type: String,
        enum: ["Xbox", "Playstation", "PC", "Nintendo Switch"],
        required: true,
    },
    description: String,
});

PlatformSchema.virtual("url").get(function () {
    return `/catalog/platform/${this._id}`;
})

module.exports = mongoose.model("Platform", PlatformSchema);