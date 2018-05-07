const path = require('path');
//const quiz = require('quiz');
// Load ORM
const Sequelize = require('sequelize');
const sequelize = new Sequelize("sqlite:quizzes.sqlite",{logging:false});

// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database

//const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

sequelize.define('quiz',{
	question:{
		type:Sequelize.STRING,
		unique:{msg:"Ya existe esta pregunta"},
		validate:{notEmpty:{msg:"La pregunta no puede estar vacía"}}
	},
	answer:{
		type:Sequelize.STRING,
		validate:{notEmpty:{msg:"La pregunta no puede estar vacía"}}
	
	}
});

//creamos la base de datos quiz
//quiz.function(sequelize, Sequelize);

sequelize.sync()
.then(()=>sequelize.models.quiz.count())
.then(count=>{
	if(!count){
		return sequelize.models.quiz.bulkCreate([
			{question:"¿Tú novi@ te pone los cuernos",answer:"Si"},
			{question:"¿Tú novi@ te quiere solo por el interés?",answer:"Si"},
			{question:"¿Ser Teleco ayuda a ligar?",answer:"No"},
			{question:"¿Crees que morirás sol@?",answer:"Si"},
			{question:"¿Crees que algún día conseguirás a tu amor platónico?",answer:"No"},
			])
	}
})
.catch(error=>{
	console.log(error);
});
/*
quizzes.bulkCreate([
	{question: "En verano hace calor?", answer: "si"},
	{question: "En invierno hace calor?", answer: "no"}
])


// Import the definition of the Quiz Table from quiz.js
sequelize.import(path.join(__dirname, 'quiz'));

// Import the definition of the Tips Table from tip.js
sequelize.import(path.join(__dirname,'tip'));

// Import the definition of the Users Table from user.js
sequelize.import(path.join(__dirname,'user'));

// Import the definition of the Attachments Table from attachment.js
sequelize.import(path.join(__dirname,'attachment'));

// Session
sequelize.import(path.join(__dirname,'session'));


// Relation between models

//const {quiz, tip, attachment, user} = sequelize.models;

tip.belongsTo(quiz);
quiz.hasMany(tip);

// Relation 1-to-N between User and Quiz:
user.hasMany(quiz, {foreignKey: 'authorId'});
quiz.belongsTo(user, {as: 'author', foreignKey: 'authorId'});

// Relation 1-to-1 between Quiz and Attachment
attachment.belongsTo(quiz);
quiz.hasOne(attachment);

// Relation 1-to-1 between Quiz and User:
//    A User has many favourite quizzes.
//    A quiz has many fans (the users who have marked it as favorite)
quiz.belongsToMany(user, {
    as: 'fans',
    through: 'favourites',
    foreignKey: 'quizId',
    otherKey: 'userId'
});

user.belongsToMany(quiz, {
    as: 'favouriteQuizzes',
    through: 'favourites',
    foreignKey: 'userId',
    otherKey: 'quizId'
});


*/
module.exports = sequelize;
