const Videogame = require("../models/videogame");
const Genre = require('../models/genre');
const Platform = require('../models/platform');
const Esrb = require('../models/esrb');

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
    res.send("NOT IMPLEMENTED: videogame list");
});

exports.videogame_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: videogame detail: ${req.params.id}`);
});

exports.videogame_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: videogame create GET");
});

exports.videogame_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: videogame create POST");
});

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