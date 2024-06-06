#! /usr/bin/env node

  const userArgs = process.argv.slice(2);
  
  const Esrb = require("./models/esrb");
  const Genre = require("./models/genre");
  const Platform = require("./models/platform");
  const Videogame = require("./models/videogame");
  
  const esrbs = [];
  const genres = [];
  const platforms = [];
  const videogames = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createGenres();
    await createEsrbs();
    await createPlatforms();
    await createVideogames();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function genreCreate(index, name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres[index] = genre;
    console.log(`Added genre: ${name}`);
  }

  async function platformCreate(index, name, description) {
    const platformdetail = {
        name: name,
        description: description,
    }
    const platform = new Platform(platformdetail);
    await platform.save();
    platforms[index] = platform;
    console.log(`added platform: ${name}`);
  }

  async function esrbCreate(index, name) {
    const esrb = new Esrb({ name: name });
    await esrb.save();
    esrbs[index] = esrb;
    console.log(`added esrb: ${name}`);
  };

  async function videogameCreate(index, name, platform, genre, esrb, price, quantity, release_date) {
    const videogamedetail = {
        name: name,
        platform: platform,
        genre: genre,
        esrb: esrb,
        price: price,
        quantity: quantity,
        release_date: release_date,
    }
    const videogame = new Videogame(videogamedetail);
    await videogame.save();
    videogames[index] = videogame;
    console.log(`added videogame: ${name}`);
  }
  
  async function createGenres() {
    console.log("Adding genres");
    await Promise.all([
      genreCreate(0, "Adventure"),
      genreCreate(1, "Shooter"),
      genreCreate(2, "Fighting"),
      genreCreate(3, "Survival"),
      genreCreate(4, "MMO"),
      genreCreate(5, "RPG"),
      genreCreate(6, "Battle Royale"),
      genreCreate(7, "Strategy"),
      genreCreate(8, "Sports"),
      genreCreate(9, "Puzzle"),
    ]);
  }

  async function createEsrbs() {
    console.log("Adding esrbs");
    await Promise.all([
        esrbCreate(0, "Everyone"),
        esrbCreate(1, "Everyone 10+"),
        esrbCreate(2, "Teen"),
        esrbCreate(3, "Mature 17+"),
        esrbCreate(4, "Adults Only 18+"),
        esrbCreate(5, "Rating Pending"),
    ]);
  }

  async function createPlatforms() {
    console.log("Adding platforms");
    await Promise.all([
        platformCreate(0, 
            "PC",
            "The PC is a versatile and powerful platform for video games, offering unparalleled customization, a vast library of titles, and cutting-edge graphics and performance capabilities."
        ), 
        platformCreate(1, 
            "Xbox",
            "The Xbox is a popular gaming console known for its robust online services, exclusive game titles, and seamless integration with Microsoft's gaming ecosystem."
        ), 
        platformCreate(2, 
            "Playstation",
            "The PlayStation is a leading gaming console renowned for its exclusive game titles, advanced graphics, and immersive entertainment experiences."
        ), 
        platformCreate(3, 
            "Nintendo Switch",
            "The Nintendo Switch is a versatile hybrid console offering unique gaming experiences both at home and on the go, with a focus on family-friendly and innovative titles."
        ),
    ]);
  }

  async function createVideogames() {
    console.log("Adding videogames");
    await Promise.all([
        videogameCreate(0, "Minecraft", platforms[0], genres[3], esrbs[1], 19.99, 4, "2011-11-18"),
        videogameCreate(1, "Grand Theft Auto V", [platforms[0], platforms[1], platforms[2]], genres[0], esrbs[4], 19.99, 2, "2013-09-17"),
        videogameCreate(2, "Red Dead Redemption 2", [platforms[0], platforms[1], platforms[2]], genres[0], esrbs[4], 14.99, 4, "2018-10-26"),
        videogameCreate(3, "Overwatch", [platforms[0], platforms[1], platforms[2], platforms[3]], genres[1], esrbs[2], 0, 10, "2016-05-24"),
        videogameCreate(4, "PlayerUnknown's Battlegrounds", [platforms[0], platforms[1], platforms[2]], genres[1], esrbs[3], 0, 10, "2017-12-20"),
        videogameCreate(5, "The Elder Scrolls V: Skyrim", [platforms[0], platforms[1], platforms[2], platforms[3]], genres[5], esrbs[3], 39.99, 8, "2011-11-11"),
        videogameCreate(6, "The Witcher 3: Wild Hunt", [platforms[0], platforms[1], platforms[2], platforms[3]], genres[5], esrbs[2], 39.99, 3, "2022-12-14"),
        videogameCreate(7, "Mario Kart 8", platforms[3], genres[8], esrbs[0], 47.99, 6, "2017-04-27"),
        videogameCreate(8, "Super Smash Bros. Ultimate", platforms[3], genres[2], esrbs[1], 57.99, 8, "2018-12-07"),
        videogameCreate(9, "Terraria", platforms[0], genres[0], esrbs[0], 9.99, 2, "2011-05-16"),
    ]);
  }