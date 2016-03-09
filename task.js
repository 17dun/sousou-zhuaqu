var system = require('system');
var fs = require("fs");
var webpage = require('webpage');

var url = system.args[1];

var page = webpage.create();

page.open(url, function(status){
    if(status !== 'success' && status !=='fail'){
        phantom.exit();
    }else{
        setTimeout(function(){
            if (page.injectJs('clientCore.js')) {
                var evalResult = page.evaluate(function(){
                    var rt = [];
                    var $foods = mobijs('.food-list .item');
                    for(var i=0;i<$foods.length;i++){
                        var $food = $($foods[i]);
                        var link = $food.find('.img-box a').attr('href');
                        var img = $food.find('.img-box img').attr('src');
                        var name = $food.find('.text-box a').html();
                        var hot = $food.find('.text-box p').html();
                        rt.push({
                            name:name,
                            link:link,
                            img:img,
                            hot:hot
                        })
                    }
                    return rt;
                });
                console.log(JSON.stringify(evalResult));
            }
            phantom.exit();
        },1000);
    }
})
