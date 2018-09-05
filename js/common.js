define(function (require) {
    var $ = require('jquery')
    var gameTemplate = require('text!../template/game.html')
    var loadingHtml = require('text!../template/loading.html')
    var game = require('./game/game')
    var apiCall = require('./xhr')
    var global = require('./global')
    var initGlobal = require('./game/initGlobal')

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    function isWechat() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    init()


    function init() {
        // if(isInitWechat){
        //     initGlobal.initWechat()
        //     $('.spinLoading').remove()
        // }
        $('.start').click(function () {
            var cacheLife = global.operate.get('life');

            global.operate.set('life', 3)
            // if(parseInt(cacheLife) <= 0){
            //     alert('当日游戏次数已用完')
            //     return
            // }

            $('.contentContainer').html(gameTemplate)
            new game()
        })
        $('.showRule').click(function () {
            $('.ruleTxt').show()
        })
        $('.closeRuleBtn').click(function () {
            $('.ruleTxt').hide()
        })
    }


});