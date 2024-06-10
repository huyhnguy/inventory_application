const Videogame = require("../models/videogame");
const Genre = require('../models/genre');
const Platform = require('../models/platform');
const Esrb = require('../models/esrb');
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numVideogames,
        numGenres,
        numPlatforms,
        numEsrbs,
        randomGame,
    ] = await Promise.all([
        Videogame.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
        Platform.countDocuments({}).exec(),
        Esrb.countDocuments({}).exec(),
        Videogame.findOne({}).exec(),
    ]);

    res.render("index", {
        title: "Home",
        game_count: numVideogames,
        genre_count: numGenres,
        platform_count: numPlatforms,
        esrb_count: numEsrbs,
        random_game: randomGame
    });
});

exports.videogame_list = asyncHandler(async(req, res, next) => {
    const allVideogames = await Videogame.find({}, "name platform")
        .sort({ name: 1 })
        .populate("platform")
        .exec();

    res.render("videogame_list", { 
        title: "List of Video Games", 
        videogame_list: allVideogames });
});

exports.videogame_detail = asyncHandler(async (req, res, next) => {
    const videogame = await Videogame.findById(req.params.id).populate("platform genre esrb").exec();

    if (videogame === null) {
        const err = new Error("Video game not found");
        err.status = 404;
        return next(err);
    }

    res.render("videogame_detail", {
        title: videogame.name,
        videogame: videogame,
    });
});

exports.videogame_create_get = asyncHandler(async (req, res, next) => {
    const [allEsrbs, allGenres, allPlatforms] = await Promise.all([
        Esrb.find().sort({ name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
        Platform.find().sort({ name: 1 }).exec(),
    ]);

    res.render("videogame_form", {
        title: "Create Video Game",
        videogame: undefined,
        esrbs: allEsrbs,
        genres: allGenres,
        platforms: allPlatforms,
        errors: undefined,
    });
});

exports.videogame_create_post = [
    (req, res, next) => {
        if (!Array.isArray(req.body.platform)) {
            req.body.platform = typeof req.body.platform === "undefined" ? [] : [req.body.genre];
        }
        next();
    },

    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("description")
        .optional({checkFalsy: true})
        .trim()
        .escape(),
    body("platform.*")
        .escape(),
    body("genre", "Genre must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("esrb", "Esrb must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "Price must not be empty.")
        .trim()
        .isDecimal()
        .withMessage('Price must contain only numbers. No special characters such as "$".')
        .escape(),
    body("quantity", "Quantity must not be empty.")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Quantity must be an integer.")
        .escape(),
    body("release_date", "Release date must not be empty.")
        .isISO8601()
        .isDate()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const videogame = new Videogame({
            name: req.body.name,
            description: req.body.description,
            platform: req.body.platform,
            genre: req.body.genre,
            esrb: req.body.esrb,
            price: req.body.price,
            quantity: req.body.quantity,
            release_date: req.body.release_date,
        });

        if (!errors.isEmpty()) {
            const [allPlatforms, allGenres, allEsrbs] = await Promise.all([
                Platform.find().sort({ name: 1 }).exec(),
                Genre.find().sort({ name: 1 }).exec(),
                Esrb.find().sort({ name: 1 }).exec(),
            ]);

            for (const platform of allPlatforms) {
                if (videogame.platform.includes(platform._id)) {
                    platform.checked = "true";
                }
            }

            res.render("videogame_form", {
                title: "Create Video Game",
                videogame: videogame,
                platforms: allPlatforms,
                genres: allGenres,
                esrbs: allEsrbs,
                errors: errors.array(),
            })
        } else {
            await videogame.save();
            res.redirect(videogame.url);
        }
    })
];

exports.videogame_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: videogame delete GET");
});

exports.videogame_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: videogame delete POST");
});

exports.videogame_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: videogame update GET")
});

exports.videogame_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: videogame update POST")
})