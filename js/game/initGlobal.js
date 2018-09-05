define(function (require) {
        var alertHtml = require('text!../../template/alert.html')
        var shareHtml = require('text!../../template/share.html')
        var $ = require('jquery')
        var handlebars = require('handlebars.min')
        var global = require('../global')
        var shareTitle = "我正在挑战面试官，求围观"
        var shareIcon = window.location.origin + '/ntce-c/hitMole/images/' + 'shareIcon.png'
        var shareContent = '打倒面试官，赢面试满分教案'

        function alertModal(dataObj, callback) {
            dataObj = dataObj || {}
            var alertDom = handlebars.compile(alertHtml)
            var alertModal = alertDom({
                content: dataObj.content,
                share: dataObj.share
            })
            $('body').append(alertModal);
            var modal = $('.modal')
            $('.sure').click(function () {
                modal.remove()
                if (callback) {
                    callback()
                }
            })

            $('.share').click(function () {
                modal.remove()
                var shareDom = handlebars.compile(shareHtml)
                var shareModal = shareDom({
                    isInWechat: isWechat()
                })
                $('body').append(shareModal);
                var shareContainer = $('.indexShareContainer')
                var cacheLife = 0
                shareContainer.click(function () {
                    shareContainer.remove()
                })

            })

        }

        function isWechat() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }

        function initWechat() {
            wx.onMenuShareQQ({
                title: shareTitle, // 分享标题
                desc: shareContent, // 分享描述
                link: window.location.href.split('#')[0], // 分享链接
                imgUrl: shareIcon, // 分享图标
                success: function () {
                    var cacheLife = global.operate.get('life') || 0
                    global.operate.set('isforwarded', 1)
                    global.operate.set('life', parseInt(cacheLife) + 3)
                    $('.indexShareContainer').remove()
                },
                cancel: function () {
                    $('.indexShareContainer').remove()
                }
            });
            wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                desc: shareContent, // 分享描述
                link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareIcon, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: function () {
                    var cacheLife = global.operate.get('life') || 0
                    global.operate.set('isforwarded', 1)
                    global.operate.set('life', parseInt(cacheLife) + 3)
                    $('.indexShareContainer').remove()
                },
                cancel: function () {
                    $('.indexShareContainer').remove()
                }
            })
            wx.onMenuShareTimeline({
                title: shareTitle,
                link: window.location.href.split('#')[0],
                imgUrl: shareIcon,
                desc: shareContent, // 分享描述
                success: function () {
                    var cacheLife = global.operate.get('life') || 0
                    global.operate.set('isforwarded', 1)
                    global.operate.set('life', parseInt(cacheLife) + 3)
                    $('.indexShareContainer').remove()
                },
                cancel: function () {
                    $('.indexShareContainer').remove()
                }
            });
        }

        return {
            alertModal: alertModal,
            initWechat :initWechat
        }
    }
)