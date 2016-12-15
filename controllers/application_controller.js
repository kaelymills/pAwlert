var models  = require('../models');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var database = JSON.parse(fs.readFileSync('database.json'));

router.get('/', function(req, res) {
  res.render('crimes/index', {
        user_id: req.session.user_id,
        username: req.session.username,
        email: req.session.user_email,
        logged_in: req.session.logged_in,
        crimes: database.data
  });
});

router.get('/api', function (req, res) {
res.json(database.data);  
});

router.post('/api/new', function (req, res) {
  if(!req.body) return res.end();
          var dataFile = "database.json";
      var newcrime = req.body;
      console.log('newcrime::', newcrime);
      var crimeData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));  
      
      newcrime.id = crimeData.data.length+1;

      crimeData.data.push(newcrime);

      fs.writeFile(dataFile, JSON.stringify(crimeData, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
      });
      res.redirect("/");
      res.json(newcrime);


});

router.get('/crimeapi', function (req, res) {
  res.render('api/index');
});

router.get('/pawpost', function(req,res) {
  res.render('postPaw/pawpost');
});

// router.post('/addnote', function (req, res) {
//   models.Note.create({
//     name: req.body.name,
//     crime_id: req.body.cid,
//     user_id: req.session.user_id
//   })
//   .then(function() {
//     res.redirect('back');
//   })
// });

router.get('/readmore/:name', function (req, res) {
  var name = req.params.name;
  var user_id = req.session.user_id;
  var crime = database.data.filter(function(crime) {  
  return crime.name === name;
  })[0];
  var crime_id = crime.id;
  console.log(crime_id);
  models.Fave.findOne({
    where: {user_id: user_id, fave_name: name},
  }).then(function(favorite) {
    var favorite = favorite;
      models.Note.findAll({ where: { crime_id: crime_id }, include: [ models.User ] 
      }).then(function(note){
        if(note) {
          res.render('cases/index', {
            user_id: user_id,
            username: req.session.username,
            email: req.session.user_email,
            logged_in: req.session.logged_in,
            crime: crime,
            favorite: favorite,
            note: note
          }); 
        } else {
          res.render('cases/index', {
            user_id: user_id,
            username: req.session.username,
            email: req.session.user_email,
            logged_in: req.session.logged_in,
            crime: crime,
            favorite: favorite
            });          
        }
      }); 
})
});

// router.post('/favorite', function(req,res) {
//   models.Fave.create({
//     fave_name: req.body.favorite,
//     crime_id: req.body.favoriteid,
//     user_id: req.session.user_id
//     }).then(function() {
//       res.redirect('back');
// });
// });

router.get('/profile', function (req, res) {
var user_id = req.session.user_id;  
models.Fave.findAll({
  where: { user_id: user_id }
}).then(function(favorite){
    var name = favorite[0].dataValues.fave_name;
    res.render('users/index', {
      user_id: req.session.user_id,
      username: req.session.username,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      favorite: favorite,
      name: name
  });
});
});

module.exports = router;