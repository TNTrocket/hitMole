define(function (require) {
    var dispatcher = require('./dispath')
    var coord = require('./coord')
    var Mice = function (game) {
        this.game = game
        this.w = 220;
        this.h = 220;
        this.arrxy = coord(game) || []
        this.arrxy = this.arrxy.map(function (item) {
            item.y = item.y- 100 * game.ratiox
            return item
        })
        //配乐
        this.hit1 = document.getElementById("hit1");
        this.hit2 = document.getElementById("hit2");
        // this.hit3 = document.getElementById("hit3");
        this.musicList = [
            this.hit1, this.hit2
        ]
        this.currentMusic = null
        this.currentMusic = this.musicList[parseInt(Math.random() * 2)];
    }
    var miceItem = [0, 1];
    var micePercent = [40, 60];
    function goodluck(obj, luck) {
        var sum = 0,
            factor = 0,
            random = Math.random();

        for(var i = luck.length - 1; i >= 0; i--) {
            sum += luck[i]; // 统计概率总和
        };
        random *= sum; // 生成概率随机数
        for(var i = luck.length - 1; i >= 0; i--) {
            factor += luck[i];
            if(random <= factor) return obj[i];
        };
        return null;
    };
    Mice.prototype.render = function () {
        this.miceList = []
        var self = this
        function randomMiceList() {
            var idx = parseInt(Math.random() * this.arrxy.length);
            var tempObj = {}
            //随机出现在一个洞
            tempObj.x = this.arrxy[idx].x;
            tempObj.y = this.arrxy[idx].y;

            tempObj.bx = parseInt(Math.random());//老鼠没死就是这个
            // tempObj.by = parseInt(Math.random() * 2);//随机背景图出一个老鼠
            tempObj.by = goodluck(miceItem,micePercent);
            return tempObj
        }


        var getRandomMiceList = randomMiceList.bind(this)
        var miceNumber = 6
        var whileNumber = 0

        while (whileNumber <= miceNumber) {
            var randomMiceList = getRandomMiceList()
            if (this.miceList.length > 0) {
                this.miceList.forEach(function (item, index) {
                    if (item.x === randomMiceList.x && item.y === randomMiceList.y) {

                    } else {
                        self.miceList.push(randomMiceList)
                        whileNumber++
                    }
                })
            } else {
                self.miceList.push(randomMiceList)
                whileNumber++
            }
        }
        function obj2key(obj, keys){
            var n = keys.length,
                key = [];
            while(n--){
                key.push(obj[keys[n]]);
            }
            return key.join('|');
        }
        function uniqeByKeys(array,keys){
            var arr = [];
            var hash = {};
            for (var i = 0, j = array.length; i < j; i++) {
                var k = obj2key(array[i], keys);
                if (!(k in hash)) {
                    hash[k] = true;
                    arr .push(array[i]);
                }
            }
            return arr ;
        }

        this.miceList = uniqeByKeys(this.miceList,['x','y'])
        var end = 0

        function renderTranslate() {
            if (end > 6) {
                return
            }
            var miceScale = 0.5
            self.miceList.forEach(function (item) {
                // alert(JSON.stringify(item))
                self.game.ctx.clearRect(item.x, item.y, self.w* miceScale, self.h*miceScale);
                item.y = item.y - 1
                self.game.ctx.drawImage(self.game.R["mice"], item.bx * self.w, item.by * self.h, self.w, self.h, item.x, item.y, self.w * self.game.ratiox * miceScale, self.h * self.game.ratiox * miceScale);
            })
            end++
            requestAnimationFrame(renderTranslate);
        }

        renderTranslate()

    }
    Mice.prototype.goDie = function () {//老鼠死的时候
        var self = this
        var miceScale = 0.5
        this.miceList.forEach(function (item) {
            if(item.hited){
                return
            }
            if (item.x <= self.game.hammer.x && self.game.hammer.x <= item.x + self.w*miceScale && item.y <= self.game.hammer.y && self.game.hammer.y <= item.y + self.h*miceScale) {
                self.game.ctx.clearRect(item.x, item.y, self.w * self.game.ratiox * miceScale, self.h * self.game.ratiox * miceScale);
                // dispatcher.emit('stop')
                item.hited = true
                self.currentMusic.play()
                self.game.ctx.drawImage(self.game.R["mice"],  self.w, item.by * self.h, self.w, self.h, item.x, item.y, self.w * self.game.ratiox * miceScale, self.h * self.game.ratiox * miceScale);//死的时候换哭的图片
                setTimeout(function () {
                    // self.game.ctx.clearRect(item.x, item.y, self.w * self.game.ratiox * miceScale, self.h * self.game.ratiox * miceScale);
                    // self.game.ctx.drawImage(self.game.R["mice"],  2*self.w, item.by * self.h, self.w, self.h, item.x, item.y, self.w * self.game.ratiox * miceScale, self.h * self.game.ratiox * miceScale);//死的时候换哭的图片
                    self.game.ctx.clearRect(item.x, item.y, self.w * self.game.ratiox * miceScale, self.h * self.game.ratiox * miceScale);
                    // dispatcher.emit('start')
                    switch (item.by) {//判断是图片中哪个老鼠，对应分数
                        case 0:
                            self.game.score = self.game.score + 10;
                            self.game.scoreDom.html(self.game.score)
                            self.game.ctxDesk.fillStyle = "#F7691B";
                            self.game.ctxDesk.font = "bold 22px 宋体";
                            self.game.ctxDesk.fillText("+10", item.x + 40, item.y + 150);
                            break;
                        case 1:
                            self.game.score = self.game.score - 10;
                            self.game.scoreDom.html(self.game.score);
                            self.game.ctxDesk.fillStyle = "#404040";
                            self.game.ctxDesk.font = "bold 22px 宋体";
                            self.game.ctxDesk.fillText("-10", item.x + 40, item.y + 150);
                            break;
                    }
                }, 100)

            } else {

            }

        })
    }
    return Mice
})