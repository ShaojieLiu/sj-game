/**
 * Created by liushaojie on 2017/9/2.
 */
class EgGame {
    constructor(fps, images, runCallback) {
        window.config.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = new Scene()

        this.init()
    }
    update() {

    }
    draw() {

    }
    drawImage() {

    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start() {
        this.runCallback()
        this.runloop()
    }

    runloop() {
        const fps = window.config.fps
        setTimeout(() => {
            //log('running', fps)
            this.scene.update()
            this.scene.draw()
            this.runloop()
        }, 1000 / fps)
    }

    loadImages() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    log('load images', g.images)
                    g.__start()
                }
            }
        }
    }

    init() {
        this.loadImages()
    }
}