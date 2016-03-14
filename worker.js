/**
 * @file user.js
 * @desc 用户模型
 * @author xiaoguang01
 * @date 2015/9/27
 */
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/owl';
var ObjectId =  require('mongodb').ObjectID;
var fs = require('fs');
var spawn = require('child_process').spawn;

    var run = function(option){
        var baseurl = 'http://www.boohee.com/food/group/'
        var urls = [];
        for(var i=1;i<11;i++){
            for(var j=0;j<11;j++){
                var url = baseurl+i+'?page='+j;
                urls.push(url);
            }
        }

        for(var i=0; i<5; i++){
            startNew();
        }
        function startNew(){
            if(urls.length){
                var url = urls.shift();
                var worker = spawn('phantomjs', [__dirname+'/task.js', url]);
                worker.stdout.on('data', function (data) {
                    console.log(data.toString());
                });
                worker.on('close', function (code) {
                    console.log(urls.length);
                    startNew();
                });
            }else{
                console.log('执行完毕');
            }
        }
    }

run();

