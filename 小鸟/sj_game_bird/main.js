
var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bullet1: 'img/bullet1.png',
        bird: 'img/bird.png',
        sky: 'img/sky.png',
        clouds: 'img/clouds.png',
        finger: 'img/finger.png',
        land: 'img/land.png',
        ceiling: 'img/ceiling.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = new ScenePlaying(g)
        // s.init()
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
