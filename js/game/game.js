define(function (require) {
    var desk = require('./desk')
    var Hammer = require('./hammer')
    var Mice = require('./mice')
    var BackgroundM = require('./backgroundM')
    var dispather = require('./dispath')
    var $ = require('jquery')
    var gameLoading = require('./loading')
    var gameTemplate = require('text!../../template/game.html')
    var global = require('../global')
    var CountTime = require('./countTime')
    var initGlobal = require('./initGlobal')
    var apiCall = require('../xhr')

    var Game = function () {
        this.canvas = document.getElementById("canvas");
        if(!this.canvas.getContext){
            initGlobal.alertModal({
                content:'该浏览器不支持本活动',
                share: false
            },function () {
                window.location.reload()
            })
            return
        }
        this.ctx = this.canvas.getContext('2d');//画布上下文
        this.canvasDesk = document.getElementById("canvasDesk");
        this.ctxDesk = this.canvasDesk.getContext('2d');//画布上下文
        var clientWidth = document.documentElement.clientWidth; //根据设计图中的canvas画布的占比进行设置
        var clientHeight = document.documentElement.clientHeight
        this.ratiox = clientWidth / 375;
        var canvasWidth = clientWidth;
        var canvasHeight = clientHeight;
        this.canvas.setAttribute('width', canvasWidth + 'px');
        this.canvas.setAttribute('height', canvasHeight + 'px');
        this.canvasDesk.setAttribute('width', canvasWidth + 'px');
        this.canvasDesk.setAttribute('height', canvasHeight + 'px');
        this.load();//图片加载
        this.score = 0;//分数
        this.scoreDom = $('.gameScoreBox')
        this.timer = null;//定时器
        this.gameTime = 15;
        this.gameStartTime = new Date().Format("yyyy-MM-dd HH:mm:ss");

        this.playDate = new Date().Format("yyyy-MM-dd");
        var cachePlayDate = global.operate.get('playDate') || this.playDate
        if(this.playDate !== cachePlayDate){
            global.operate.remove('life')
        }

        global.operate.set('playDate',this.playDate)
        // global.operate.set('isforwarded', 0)
        var isforwarded = global.operate.get('isforwarded') || 0
        this.isforwarded = parseInt(isforwarded)
        var cacheLife = global.operate.get('life');
        this.gameLife = cacheLife || 3;//生命

        global.operate.set('life', this.gameLife)
        this.ctx.globalCompositeOperation = "source-over";
        this.isLoadSuccess = false
        this.clickStart = false
        this.hited = false
        var gameStartTips = $('.gameStartTips')
        var self = this
        gameStartTips.show()
        $('.Iknow').click(function () {
            gameStartTips.hide()
            self.clickStart = true
            // gameOver.success(self)
            dispather.emit('game:start')
        })
    }
    Game.prototype.load = function () {//图片管理器
        this.R = {
            "land": "images/gameBg.png",
            "mice": "images/character.png",
            "desk": 'images/desk.png'
        }
        var a = 0;//用来存图片加载完成个数
        var b = Object.keys(this.R).length;//对象K的个数
        var self = this;
        var loading = new gameLoading(self.canvas, function () {
            self.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
        loading.render()
        for (var k in this.R) {
            var src = this.R[k];
            this.R[k] = new Image();
            this.R[k].src = src;
            this.R[k].onload = function () {
                a++;
                loading.process(a / b * 100)
                if (a === b) {
                    self.isLoadSuccess = true
                    dispather.emit('game:start')
                } else {
                    self.isLoadSuccess = false
                }
                self.loadSuccess()
            }
        }
    }
    Game.prototype.loadSuccess = function () {
        var self = this
        dispather.remove('game:start').on('game:start', function () {
            if (self.isLoadSuccess && self.clickStart) {
                self.start();//游戏启动
            }
        })
    }
    Game.prototype.cls = function () {//清屏
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    Game.prototype.start = function () {//图片加载完的异步语句

        var self = this;
        self.backgroundM = new BackgroundM(self);//背景管理
        self.desk = new desk(self);
        self.mice = new Mice(self);//老鼠
        self.hammer = new Hammer(self);
        if(self.countTime){
            clearInterval(self.countTime.countTimer)
        }
        self.countTime = new CountTime(self);
        this.gameInterval()
        dispather.remove('stop').on('stop', function () {
            clearInterval(self.timer)
        })
        dispather.remove('start').on('start', function () {
            self.gameInterval()
        })
    }
    Game.prototype.bindEvent = function () {
        var self = this;
        this.canvas.onclick = function (e) {
            if (!self.hited) {
                // self.hited = true;
                self.hammer.update(e.offsetX, e.offsetY);//锤子位置更新方法调用
                self.mice.goDie();//调用老鼠死的方法
            }
        }
    }
    Game.prototype.gameInterval = function () {
        var self = this
        this.desk.render();
        this.fistloadDesk = true
        this.bindEvent()
        var gameLife = global.operate.get('life') || this.gameLife
        $('.lifeNumber').text(gameLife);
        this.timer = setInterval(function () {
            self.fistloadDesk = false
            self.hited = false
            self.backgroundM.render();
        }, 700)
    }
    Game.prototype.restart = function () {
        $('.contentContainer').html(gameTemplate)
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');//画布上下文
        this.canvasDesk = document.getElementById("canvasDesk");
        this.ctxDesk = this.canvasDesk.getContext('2d');//画布上下文
        var clientWidth = document.documentElement.clientWidth; //根据设计图中的canvas画布的占比进行设置
        var clientHeight = document.documentElement.clientHeight
        this.ratiox = clientWidth / 375;
        var canvasWidth = clientWidth;
        var canvasHeight = clientHeight;
        this.canvas.setAttribute('width', canvasWidth + 'px');
        this.canvas.setAttribute('height', canvasHeight + 'px');
        this.canvasDesk.setAttribute('width', canvasWidth + 'px');
        this.canvasDesk.setAttribute('height', canvasHeight + 'px');
        this.score = 0;//分数
        this.scoreDom = $('.gameScoreBox')
        this.timer = null;//定时器
        this.gameTime = 15;
        this.ctx.globalCompositeOperation = "source-over";
        this.isLoadSuccess = false
        this.clickStart = false
        this.hited = false
        this.start();
    }
    return Game
})