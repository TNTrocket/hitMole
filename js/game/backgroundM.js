define(function (require) {
    var dispatcher = require('./dispath')
    var $ = require('jquery')
    var gameOver = require('./gameOver')
    var apiCall = require('../xhr')
    var global = require('../global')

    var BackgroundM = function (game) {
        this.game = game
        this.page = 2;//初始页面

        //配乐
        this.music1 = document.getElementById("bg1");
        this.music2 = document.getElementById("bg2");
        // this.music3 = document.getElementById("bg3");
        this.musicList = [
            this.music1, this.music2
        ]
        this.currentMusic = null
        this.currentMusic = this.musicList[parseInt(Math.random() * 2)];
    }
    BackgroundM.prototype.render = function () {
        var self = this;
        switch (this.page) {
            case 2://游戏画面
                this.currentMusic.play();
                this.game.cls();
                if (!this.game.fistloadDesk) {
                    this.game.desk.render();
                }
                this.game.mice.render();//渲染老鼠
                this.game.ctx.font = "bold 16px 宋体";
                this.game.ctx.fillStyle = "gold";
                if (this.game.gameTime <= 0) {
                    clearInterval(this.game.countTime.countTimer)
                    self.page = 3;
                }
                break;
            case 3:
                this.currentMusic.pause()
                dispatcher.emit('stop')

                this.game.gameLife = parseInt(this.game.gameLife) - 1
                global.operate.set('life', this.game.gameLife)
                var isforwarded = global.operate.get('isforwarded')

                if(this.game.score >= 60){
                    gameOver.success(this.game)
                }else{
                    gameOver.failure(this.game)
                }
                break
        }
    }
    return BackgroundM
})