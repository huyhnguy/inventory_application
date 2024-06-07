const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page")
})

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