var express = require('express');
var router = express.Router();
var mydataServer = require("../lib/mysql");


/* GET users listing. */
router.get('/', function (req, res, next) {

    // client.connect(function(error, results) {
    //     if(error) {
    //         console.log('Connection Error: ' + error.message);
    //         return;
    //     }
    //     console.log('Connected to MySQL');
    //     ClientConnectionReady(res,client);
    // });
    // connection.query('SELECT * from test', function(err, rows, fields) {
    //   if (err) throw err;
    //   console.log('The solution is: ', rows[0].name);
    // });
    mydataServer.query('SELECT * from test', function (err, results, fields) {
        if (err) throw err;

        if (results.length > 0) {
            var firstResult = results[0];
            // console.log('First Name: ' + firstResult['code']);
            // console.log('Last Name: ' + firstResult['name']);

            //res.send(JSON.stringify(results));
            res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            res.write(JSON.stringify(results));
            res.write("123");
            res.end();
            //res.json(results);
        }

    })
});

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



module.exports = router;
// var client = mysql.createConnection({
//     host:'localhost',
//     user: 'root',
//     password: 'root',
// });
//
// ClientConnectionReady = function( res,client)
// {
//     client.query('USE test', function(error, results) {
//         if(error) {
//             console.log('ClientConnectionReady Error: ' + error.message);
//             client.end();
//             return;
//         }
//
//         client.query(
//             'SELECT * FROM test',
//             function selectCb(error, results, fields) {
//                 if (error) {
//                     console.log('GetData Error: ' + error.message);
//                     client.end();
//                     return;
//                 }
//                 // Uncomment these if you want lots of feedback
//                 //console.log('Results:');
//                 //console.log(results);
//                 //console.log('Field metadata:');
//                 //console.log(fields);
//                 //console.log(sys.inspect(results));
//
//                 if(results.length > 0)
//                 {
//                     var firstResult = results[0];
//                     console.log('First Name: ' + firstResult['code']);
//                     console.log('Last Name: ' + firstResult['name']);
//
//                     res.writeHead(200, {'Content-Type': 'application/json'});
//                     res.end(JSON.stringify(results));
//
//                 }
//             });
//
//         client.end();
//         console.log('Connection closed');
//
//     });
// };
//
// ClientReady = function(client)
// {
//     // var values = ['Chad', 'Hello World'];
//     // client.query('INSERT INTO test SET code = ?, name = ?', values,
//     //     function(error, results) {
//     //         if(error) {
//     //             console.log("ClientReady Error: " + error.message);
//     //             client.end();
//     //             return;
//     //         }
//     //         console.log('Inserted: ' + results.affectedRows + ' row.');
//     //         console.log('Id inserted: ' + results.insertId);
//     //     }
//     // );
//     GetData(client);
// }
//
// GetData = function(client)
// {
//
// };


