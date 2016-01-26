var express = require('express');
var router = express.Router();
var appdata = require('../data.json');


/* GET home page. */
router.get('/', function(req, res) {
    var mywork = [];
    var myArtists = [];

    myArtists = appdata.developers;
    appdata.developers.forEach(function(item){
        myWork = mywork.concat(item.work);
    });

    res.render('index', {
        title: 'Home',
        work: mywork,
        artists: myArtists,
        page: 'home'
  });
});



/* GET developers page. */
router.get('/developers', function(req, res) {
    var mywork = [];
    var myArtists = [];

    myArtists = appdata.developers;
    appdata.developers.forEach(function(item){
        mywork = mywork.concat(item.work);
    });

    res.render('developers', {
        title: 'developers',
        work: mywork,
        artists: myArtists,
        page: 'artistList'
    });
});


/* GET speaker id */
router.get('/developers/:speakerid', function(req, res) {
    var mywork = [];
    var myArtists = [];

    appdata.developers.forEach(function(item){
        if(item.shortname == req.params.speakerid){
            mywork = mywork.concat(item.work);
            myArtists.push(item);
        }
    });

    res.render('developers', {
        title: 'developers',
        work: mywork,
        artists: myArtists,
        page: 'artistDetail'
    });
});



module.exports = router;
