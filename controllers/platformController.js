const Platform = require("../models/platform");
const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    res.render("platform_form", {
        title: "Create Platform",
        platform: undefined,
        errors: undefined,
    });
});

exports.platform_create_post = [
    body("name")
        .trim()
        .isLength({ min:1 })
        .escape(),
    body("description")
        .trim()
        .isLength({ min:1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const platform = new Platform({
            name: req.body.name,
            description: req.body.description,
        })

        if (!errors.isEmpty()) {
            res.render("platform_form", {
                name: "Create Platform",
                platform: platform,
                errors: errors.array(),
            });
            return;
        } else {
            const platformExists = await Platform.findOne({ name: req.body.name })
            .collation({ locale: "en", strength: 2 })
            .exec();
            if (platformExists) {
                res.redirect(platformExists.url);
            } else {
                await platform.save();
                res.redirect(platform.url);
            }
        }
    })
];

exports.platform_delete_get = asyncHandler(async (req, res, next) => {
    const [platform, allGamesOnPlatform] = await Promise.all([
        Platform.findById(req.params.id).exec(),
        Videogame.find({ platform: req.params.id }, "name price").exec(),
    ]);

    if (platform === null) {
        res.redirect("/catalog/platforms");
    }

    res.render("platform_delete", {
        title: "Delete Platform",
        platform: platform,
        platform_games: allGamesOnPlatform,
    });
});

exports.platform_delete_post = asyncHandler(async (req, res, next) => {
    const [platform, allGamesOnPlatform] = await Promise.all([
        Platform.findById(req.params.id).exec(),
        Videogame.find({ platform: req.params.id }, "name price").exec(),
    ]);

    if (allGamesOnPlatform.length > 0) {
        res.render("platform_delete", {
            title: "Delete Platform",
            platform: platform,
            platform_games: allGamesOnPlatform,
        });
        return;
    } else {
        await Platform.findByIdAndDelete(req.body.platformid)
        res.redirect("/catalog/platforms");
    }
});

