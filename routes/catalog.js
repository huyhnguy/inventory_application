const express = require("express");
const router = express.Router();

const esrb_controller = require("../controllers/esrbController");
const genre_controller = require("../controllers/genreController");
const platform_controller = require("../controllers/platformController");
const videogame_controller = require("../controllers/videogameController");

/// VIDEO GAME ROUTES ///

router.get("/", videogame_controller.index);
router.get("/videogame/create", videogame_controller.videogame_create_get);
router.post("/videogame/create", videogame_controller.videogame_create_post);
router.get("/videogame/:id/delete", videogame_controller.videogame_delete_get);
router.post("/videogame/:id/delete", videogame_controller.videogame_delete_post);
router.get("/videogame/:id/update", videogame_controller.videogame_update_get);
router.post("/videogame/:id/update", videogame_controller.videogame_update_post);
router.get("/videogame/:id", videogame_controller.videogame_detail);
router.get("/videogames", videogame_controller.videogame_list);

/// ESRB ROUTES ///

router.get("/esrb/create", esrb_controller.esrb_create_get);
router.post("/esrb/create", esrb_controller.esrb_create_post);
router.get("/esrb/:id/delete", esrb_controller.esrb_delete_get);
router.post("/esrb/:id/delete", esrb_controller.esrb_delete_post);
router.get("/esrb/:id", esrb_controller.esrb_detail);
router.get("/esrbs", esrb_controller.esrb_list);

/// GENRE ROUTES /// 

router.get("/genre/create", genre_controller.genre_create_get);
router.post("/genre/create", genre_controller.genre_create_post);
router.get("/genre/:id/delete", genre_controller.genre_delete_get);
router.post("/genre/:id/delete", genre_controller.genre_delete_post);
router.get("/genre/:id", genre_controller.genre_detail);
router.get("/genres", genre_controller.genre_list);

/// PLATFORM ROUTES /// 

router.get("/platform/create", platform_controller.platform_create_get);
router.post("/platform/create", platform_controller.platform_create_post);
router.get("/platform/:id/delete", platform_controller.platform_delete_get);
router.post("/platform/:id/delete", platform_controller.platform_delete_post);
router.get("/platform/:id", platform_controller.platform_detail);
router.get("/platforms", platform_controller.platform_list);

module.exports = router;