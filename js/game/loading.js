define(function () {
    var loadingComplete = false;
    var dateCount = null;

    function init(canvas, callback) {
        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.r = 80;
        this.elew = 10;
        this.angle = 0;
        // this.percent = 0;
        this.writePercent = 0;
        this.callback = callback;
    }

    init.prototype = {
        paint: function () {
            var ctx = this.canvas.getContext("2d");
            ctx.fillStyle = "rgba(0,0,0,0.01)"
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.fillStyle = "#FFF";

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillRect(-this.elew / 2, -this.r + this.elew / 2, this.elew, this.elew);
            ctx.fillRect(-this.elew / 2, this.r - this.elew / 2, this.elew, this.elew);
            ctx.restore();


            ctx.font = "18px 微软雅黑";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("加载中" + Math.floor(this.writePercent) + "%", this.x, this.y);

            this.angle = this.angle > 2 * Math.PI ? 0 : this.angle + 0.05;
            if(this.writePercent === 100){
                this.callback()
                return false
            }
            var self = this
            requestAnimFrame(function () {
                self.paint()
            })
        },
        process:function (writePercent) {
            this.writePercent = writePercent;
        },
        render: function (writePercent) {
            var self = this
            this.paint()
        }
    }

    return init;
})