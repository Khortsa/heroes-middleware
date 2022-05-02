const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const morgan = require('morgan');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/hero');

// app.use(function(req, res, next){
//     console.log('Hello');
// })

// app.use(morgan());
app.use(cors());
app.use(express.json());

const heroSchema = new mongoose.Schema({
    slug: String,
	name: String,
	power: [String],
	color: String,
	isAlive: Boolean,
	age: Number,
	image: String
});
const HeroModel = mongoose.model('Hero', heroSchema);



// HeroModel.insertMany([
//     {
// 		   slug: "iron-man",
//         name: "Iron Man",
//         power: ["money"],
//         color: "red",
//         isAlive: true,
//         age: 46,
//         image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
//     },
//     {
// 		   slug: "thor",
//         name: "Thor",
//         power: ["electricty", "worthy"],
//         color: "blue",
//         isAlive: true,
//         age: 300,
//         image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
//     },
//     {
// 		   slug: "dardevil",
//         name: "Daredevil",
//         power: ["blind"],
//         color: "red",
//         isAlive: false,
//         age: 30,
//         image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
//     }

// ])



app.get('/heroes', function (req, res, next){
    HeroModel.find()
      .exec()
        .then(function (heroesList) {
            console.log('heroesList', heroesList)
            res.json(heroesList);
    })
   
})
app.get('/heroes/:slug', function (req, res, next){
    let slug = req.params.slug
   
    HeroModel.find({
      slug: slug
    }) 
    .exec()
        .then(function (heroSlug) {
            console.log('heroSlug', heroSlug)
            res.json(heroSlug)
        })
});

app.get('/heroes/:slug/powers', function (req, res, next) {
    const slug = req.params.slug
    HeroModel.findOne({
        slug: slug
    })
    .exec()
        .then(function (heroPower) {
            console.log('heroPower', heroPower.power)
            res.json(heroPower.power)
        })
})
app.post('/heroes', function (req, res, next){
    HeroModel.create(req.body)
    .then((hero) => res.json(hero))
    
})

app.listen(3000, function(){
    console.log('server on 3000')
})