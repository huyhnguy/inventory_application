const Genre = require("../models/genre");
const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    res.render("genre_form", {
        title: "Create Genre",
        errors: undefined,
        genre: undefined,
    });
});

exports.genre_create_post = [
    body("name")
        .trim()
        .isLength({ min:1 })
        .escape()
        .withMessage("Name field is empty"),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const genre = new Genre({
            name: req.body.name,
        })

        if(!errors.isEmpty()) {
            res.render("genre_form", {
                title: "Create Genre",
                errors: errors.array(),
                genre: genre,
            });
            return;
        } else {
            const genreExists = await Genre.findOne({ name: req.body.name })
            .collation({ locale: "en", strength: 2 })
            .exec();
            if (genreExists) {
                res.redirect(genreExists.url);
            } else {
                await genre.save();
                res.redirect(genre.url);
            }
        }
    }),
];

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    const [genre, allGamesInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Videogame.find({ genre: req.params.id }, "name price").exec(),
    ]);

    if (genre === null) {
        res.redirect("/catalog/genres");
    }

    res.render("genre_delete", {
        title: "Delete genre",
        genre: genre,
        genre_games: allGamesInGenre,
    });});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    const [genre, allGamesInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Videogame.find({ genre: req.params.id }, "name price").exec(),
    ]);

    if (allGamesInGenre.length > 0) {
        res.render("genre_delete", {
            title: "Delete genre",
            genre: genre,
            genre_games: allGamesInGenre,
        });
        return;
    } else {
        await Genre.findByIdAndDelete(req.body.genreid);
        res.redirect("/catalog/genres");
    }});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre update GET")
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre update POST")
})