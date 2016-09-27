var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {


    // console.log(url);
    // soap.createClient(url,function(err,client){
    //     var args = {starttime:'2016-08-01', endtime:'2016-09-01'};
    //     client.getUseRanking(args, function(err,result){
    //         console.log("WS Name:" + client.GetUseRankingService.GetUseRankingPort);
    //         console.log('DFM Meeting Manage App Service2'+JSON.stringify(result));
    //         res.render('index', { title: ('DFM Meeting Manage App Service2\n'+JSON.stringify(result))});
    //     });
    // });
    getUseRanking(req, res);


});

function getUseRanking(req, res) {



    //var soap = require('soap');

    var soap = require('soap');
    var url = 'http://172.31.1.224:8080/meeting/sys/webservice/getUseRanking?wsdl';
    var args = {arg0: '2016-08-01', arg1: '2016-09-01'}

    soap.createClient(url, function (err, client) {

        var myFun = "getUseRanking";
        client[myFun](args, function (err, result) {
            console.log(result);

            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            //res.end(JSON.stringify(result));
            res.end(JSON.stringify(result));
        });
    });

    soap.createClient(url, function (err, client) {
        // client.getUseRanking(args, function (err, result) {
        //     console.log(result);
        //     res.writeHead(200, {'Content-Type': 'application/json'});
        //     res.end(JSON.stringify(result));
        // });


    });
}
module.exports = router;
