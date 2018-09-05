define(function () {
    function dispatch () {
        this.clientList = {}
    }

    dispatch.prototype.on=function(key,fn){
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
        return this
    }
    dispatch.prototype.remove=function(key){
        if(this.clientList[key]){
           delete this.clientList[key]
        }
        return this
    }
    dispatch.prototype.emit=function(){
        var key = [].shift.call(arguments);
        var fns = this.clientList[key];
        // 如果没有对应的绑定消息
        if (!fns || fns.length === 0) {
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            // arguments 是 trigger带上的参数
            fn.apply(this, arguments);
        }
        return this
    }
    return new dispatch()

})
