var express = require('express');
var router = express.Router();

var mydataServer = require("../lib/mysql");

/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('test post method!');

  mydataServer('SELECT * from test', function (err, results, fields) {
    if (err) throw err;

    if (results.length > 0) {
      var firstResult = results[0];
      // console.log('First Name: ' + firstResult['code']);
      // console.log('Last Name: ' + firstResult['name']);

      //res.send(JSON.stringify(results));
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
      res.write(JSON.stringify(results));
      res.end();
      //res.json(results);
    }

  })

});

router.get('/', function(req, res, next) {
  res.send('test get method!');
});

module.exports = router;
