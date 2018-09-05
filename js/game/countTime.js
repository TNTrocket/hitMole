define(function (require) {
    var $ = require('jquery')
    function CountTime(game) {
       this.countTimer= setInterval(function () {
           game.gameTime = game.gameTime-1
            var gameTime = game.gameTime
            if (gameTime < 10) {
                gameTime = '0' + gameTime
            }
            $('.timeBox .time').text(gameTime)
        },1000)
    }
    return CountTime
})