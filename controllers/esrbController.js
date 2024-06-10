const Esrb = require("../models/esrb");
const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.esrb_create_get = (req, res, next) => {
    res.render("esrb_form", { 
        title: "Create Esrb",
        esrb: undefined,
        errors: undefined,
    });
};

exports.esrb_create_post = [
    body("name", "name is empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const esrb = new Esrb({ name: req.body.name });

        if(!errors.isEmpty()) {
            res.render("esrb_form", {
                title: "Create Esrb",
                esrb: esrb,
                errors: errors.array(),
            });
            return;
        } else {
            const esrbExists = await Esrb.findOne({ name: req.body.name })
                .collation({ locale: "en", strength: 2 })
                .exec();
            if (esrbExists) {
                res.redirect(esrbExists.url);
            } else {
                await esrb.save();
                res.redirect(esrb.url);
            }
        }
    })
];

exports.esrb_delete_get = asyncHandler(async (req, res, next) => {
    const [esrb, allGamesInEsrb] = await Promise.all([
        Esrb.findById(req.params.id).exec(),
        Videogame.find({ esrb: req.params.id }, "name price").exec(),
    ]);

    if (esrb === null) {
        res.redirect("/catalog/esrbs");
    }

    res.render("esrb_delete", {
        title: "Delete esrb",
        esrb: esrb,
        esrb_games: allGamesInEsrb,
    });
});

exports.esrb_delete_post = asyncHandler(async (req, res, next) => {
    const [esrb, allGamesInEsrb] = await Promise.all([
        Esrb.findById(req.params.id).exec(),
        Videogame.find({ esrb: req.params.id }, "name price").exec(),
    ]);

    if (allGamesInEsrb.length > 0) {
        res.render("esrb_delete", {
            title: "Delete Esrb",
            esrb: esrb,
            esrb_games: allGamesInEsrb,
        });
        return;
    } else {
        await Esrb.findByIdAndDelete(req.body.esrbid);
        res.redirect("/catalog/esrbs");
    }
});

exports.esrb_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb update GET")
});

exports.esrb_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Esrb update POST")
})