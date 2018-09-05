require.config({
    paths: {
        'jquery': './jquery.min',
        'handlebars': './handlebars.min',
        'text': './text'
    }
    // shim: {
    //     'jSignature': ['jquery'],
    //     'jSignature.UndoButton': ['jquery','jSignature']
    // }
});

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();


require(['common']);