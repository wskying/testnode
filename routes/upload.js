var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var fs = require("fs");

var mydataServer = require("../lib/mysql");
var count=0;
router.post('/', function (req, res) {

    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public/upload/'	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.multiples = true;
    count+=1;
    console.log("开始上传"+count);

    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        var fileM=fields["key"];
        if(fields["key"]==undefined)
        {
            fileM="fileUpload";
        }
        fileM="fileUpload";
        console.log(files[fileM].name);
        var Title = files[fileM].name;
        if (err) {
            res.locals.error = err;
            res.render('index', {title: Title});
            return;
        }

        var extName = '';  //后缀名
        switch (files[fileM].type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            default:
                extName = 'zip';
                break;
        }

        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            //res.render('index', { title: res.locals.error });
            res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            res.write(JSON.stringify('只支持png和jpg格式图片'));
            res.end();
            return;
        }
        var fileName = files[fileM].name;
        var filePath = files[fileM].path;
        var fileSize = files[fileM].size;
        var fileType = extName;
        var createdate = Date.parse(new Date());
        createdate = "CURRENT_TIMESTAMP";
        // var avatarName = Math.random() + '.' + extName;
        // var newPath = form.uploadDir + avatarName;
        //
        // console.log(newPath);
        // fs.renameSync(files.fileUpload.path, newPath);  //重命名

        var sqlStr = 'INSERT INTO uploadFile (filename,path,size,type,createdate)' +
            'VALUES ("' + fileName + '","' + filePath + '",' + fileSize + ',"' + fileType + '",' + createdate + ')';

        mydataServer.query(sqlStr, function (err, rows) {
            if (err) throw err;
            var insertId = rows.insertId;//获取自动生成的id
            console.log(insertId);
        });

        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        var result = {};
        result.code = 0;
        result.msg = "上传成功";
        result.body = [];
        res.write(JSON.stringify(result));
        res.end();

    });

    //res.locals.success = '开始上传';
    //res.render('index', { title: "开始上传" });
    //res.write("开始上传");
});

module.exports = router;
