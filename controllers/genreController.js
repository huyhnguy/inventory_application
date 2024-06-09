const Genre = require("../models/genre");
const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");

exports.genre_list = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find({}, "name")
        .sort({ name: 1 })
        .exec();

    res.render("genre_list", { 
        title: "Genre List", 
        genre_list: allGenres })
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
    const [genre, gamesInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Videogame.find({ genre: req.params.id }, "name price").exec(),
    ])

    if (genre === null) {
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
    }

    res.render("genre_detail", {
        title: "Genre Detail",
        genre: genre,
        genre_games: gamesInGenre,
    });
});

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre create GET");
});

exports.genre_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre create POST");
});

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre delete GET");
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre delete POST");
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre update GET")
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre update POST")
})