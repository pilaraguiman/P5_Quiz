var express = require('express');
var router = express.Router();
var Sequelize= require("sequelize");
const{models}=require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});
// Author page
router.get('/author' , (req, res, next) => {
	res.render('author',{title: 'Author'});
});

//Credits page
router.get('/credits', (req, res, next) =>{
	res.render('credits',{title:'Credits'});
});

router.get('/quizzes', (req, res, next) =>{
	models.quiz.findAll()
	.then(quizzes=>{
		res.render('quizzes',{quizzes});
	})
	.catch(error=>next(error));
	
});

module.exports = router;