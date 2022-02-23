desktop.ducklife = {};
desktop.ducklife.label = "Ducklife";
desktop.ducklife.player = { x: 640/2, y: 480/2 }
desktop.ducklife.players = []
desktop.ducklife.canvas = null
desktop.ducklife.ctx = null
desktop.ducklife.assets = {}

desktop.ducklife.load = function loadDesktop (params, next) {
  desktop.loadRemoteAssets([
    'ducklife'
  ], function (err) {
    desktop.ducklife.initGame();
    next();
  });
};

desktop.ducklife.addImageAsset = function (name, file) {
    desktop.ducklife[name] = new Image();
    desktop.ducklife[name].src = 'desktop/apps/desktop.ducklife/assets/'+file
}

desktop.ducklife.initGame = function () {
    desktop.ducklife.addImageAsset('grass', 'grass.png')
    desktop.ducklife.addImageAsset('duck', 'duck64.png')
    desktop.ducklife.canvas = document.getElementById("ducklife_canvas");
    desktop.ducklife.ctx = desktop.ducklife.canvas.getContext("2d");
    $(window).keydown(function (e) {
        switch (e.key) {
            case 'ArrowUp':
                desktop.ducklife.player.y -= 10
                break;
            case 'ArrowDown':
                desktop.ducklife.player.y += 10
                break;
            case 'ArrowLeft':
                desktop.ducklife.player.x -= 10
                break;
            case 'ArrowRight':
                desktop.ducklife.player.x += 10
                break;
            default:
                break;
        }
    })
    window.requestAnimationFrame(desktop.ducklife.renderLoop);
}

desktop.ducklife.renderLoop = function () {
    desktop.ducklife.ctx.fillStyle = "#0000ff";
    desktop.ducklife.ctx.fillRect(0, 0, desktop.ducklife.canvas.width, desktop.ducklife.canvas.height);
    var x = 0
    while (x < 640/32) {
        var y = 0
        while (y < 480/32) {
            desktop.ducklife.ctx.drawImage(desktop.ducklife["grass"], x*32, y*32)
            y++
        }
        x++
    }
    desktop.ducklife.ctx.drawImage(desktop.ducklife["duck"], desktop.ducklife.player.x, desktop.ducklife.player.y)
    window.requestAnimationFrame(desktop.ducklife.renderLoop);
}