const Platform = require("../models/platform");
const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");

exports.platform_list = asyncHandler(async(req, res, next) => {
    const allPlatforms = await Platform.find({}, "name description")
        .sort({ name: 1 })
        .exec();

    res.render("platform_list", { 
        title: "Platform List",
        platform_list: allPlatforms,
    })
});

exports.platform_detail = asyncHandler(async (req, res, next) => {
    const [platform, gamesInPlatform] = await Promise.all([
        Platform.findById(req.params.id).exec(),
        Videogame.find({ platform: req.params.id }, "name price").exec(),
    ]);

    if(platform === null) {
        const err = new Error("Platform not found");
        err.status = 404;
        return next(err);
    }

    res.render("platform_detail", {
        title: "Platform Detail",
        platform: platform,
        platform_games: gamesInPlatform,
    });
});

exports.platform_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: platform create GET");
});

exports.platform_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: platform create POST");
});

exports.platform_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: platform delete GET");
});

exports.platform_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: platform delete POST");
});

exports.platform_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: platform update GET")
});

exports.platform_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: platform update POST")
})