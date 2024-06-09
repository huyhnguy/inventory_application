const Esrb = require("../models/esrb");
const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");

exports.esrb_list = asyncHandler(async (req, res, next) => {
    const allEsrbs = await Esrb.find({}, "name")
        .sort({ title: 1 })
        .exec();

    res.render("esrb_list", { 
        title: "ESRB List", 
        esrb_list: allEsrbs
    });
});

exports.esrb_detail = asyncHandler(async (req, res, next) => {
    const [esrb, gamessInEsrb] = await Promise.all([
        Esrb.findById(req.params.id).exec(),
        Videogame.find({ esrb: req.params.id }, "name price").exec(),
    ]);

    if (esrb === null) {
        const err = new Error("Esrb not found");
        err.status = 404;
        return next(err);
    }

    res.render("esrb_detail", {
        title: "Esrb Detail",
        esrb: esrb,
        esrb_games: gamessInEsrb,
    });
});

exports.esrb_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb create GET");
});

exports.esrb_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb create POST");
});

exports.esrb_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb delete GET");
});

exports.esrb_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb delete POST");
});

exports.esrb_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb update GET")
});

exports.esrb_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb update POST")
})