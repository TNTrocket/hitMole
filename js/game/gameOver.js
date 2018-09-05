define(function (require) {
    var $ = require('jquery')
    var failure = require('text!../../template/failure.html')
    var success = require('text!../../template/success.html')
    var handlebars = require('handlebars.min')
    var prizeHtml = require('text!../../template/prize.html')
    var apiCall = require('../xhr')
    var shareHtml = require('text!../../template/share.html')
    var global = require('../global')

    var contentContainer = $('.contentContainer')

    function gameOver() {
        this.examid = ''
        this.examname = ''
        this.subjectid = ''
        this.subjectname = ''
        this.shareContent = ''
    }

    gameOver.prototype = {
        constructor: gameOver,
        success: function (game) {
            var self = this
            var subjectData = {
                examInfos: data.examInfos,
                score: game.score
            };
            var successDom = handlebars.compile(success)
            var successHtml = successDom(subjectData)
            contentContainer.html(successHtml)
        },
        failure: function (game) {
            if (game.score >= 60) {
                this.shareContent = '我在15秒内打倒了面试官，你也来试试~'
            } else {
                this.shareContent = '帮帮我！这个面试官太厉害了，快来帮我打倒他'
            }
            var self = this
            var failureDom = handlebars.compile(failure)
            var failureHtml = failureDom({
                life: game.gameLife,
                score: game.score,
                isInWechat: isInWechat
            })
            contentContainer.html(failureHtml)

            $('.playAgain').click(function () {
                if (game.gameLife > 0) {
                    game.restart()
                }
            })
        }
    }
    return new gameOver()
})