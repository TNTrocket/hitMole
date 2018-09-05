define(function () {
    function getArrxy(game) {
        this.arrxy = [
            {'x': 10 * game.ratiox, 'y': 200 * game.ratiox}, {
                'x': 135 * game.ratiox,
                'y': 200 * game.ratiox
            }, {'x': 260 * game.ratiox, 'y': 200 * game.ratiox},

            {'x': 10 * game.ratiox, 'y': 340 * game.ratiox}, {
                'x': 135 * game.ratiox,
                'y': 340 * game.ratiox
            }, {'x': 260 * game.ratiox, 'y': 340 * game.ratiox},

            {'x': 10 * game.ratiox, 'y': 480 * game.ratiox}, {
                'x': 135 * game.ratiox,
                'y': 480 * game.ratiox
            }, {'x': 260 * game.ratiox, 'y': 480 * game.ratiox}];//老鼠在每个洞的位置
        return JSON.parse(JSON.stringify(this.arrxy))
    }
    return getArrxy;
});