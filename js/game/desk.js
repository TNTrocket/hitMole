define(function(require) {
    var coord = require('./coord');
    var desk = function(game) {
        this.scale = 0.5
        this.w = 220
        this.h = 138
        this.game = game
    }
    desk.prototype.render = function () {
        this.arrxy = coord(this.game)
        var self = this
        this.game.ctxDesk.clearRect(0, 0, this.game.canvasDesk.width, this.game.canvasDesk.height);
        this.arrxy.forEach(function (item) {
            self.game.ctxDesk.drawImage(self.game.R["desk"], 0, 0, self.w, self.h, item.x, item.y, self.w* self.game.ratiox * self.scale, self.h* self.game.ratiox * self.scale);
        })
    }
    return desk
})