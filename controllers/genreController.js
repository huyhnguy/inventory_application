const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");

exports.genre_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre list");
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: genre detail: ${req.params.id}`);
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