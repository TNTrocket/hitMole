define(function (require) {
    // var game = require('./game')
    var Hammer = function (game) {
        //锤子的宽高
        var miceScale = 0.5
        this.w = 98 * game.ratiox * miceScale;
        this.h = 77 * game.ratiox * miceScale;

        //锤子的起始位置在屏幕外
        this.x = game.width;
        this.y = game.height;
        this.game = game
    }
    Hammer.prototype.render = function () {
        // this.game.ctx.drawImage(this.game.R["hammer"], this.x * this.game.ratiox, this.y * this.game.ratiox, this.w, this.h);
    }
    Hammer.prototype.update = function (x, y) {//鼠标点击时改变锤子的位置
        //中心点在锤子头中间
        this.x = x - 20;
        this.y = y;
    }
    return Hammer
})