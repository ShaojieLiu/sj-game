// 瓜
class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.w = this.canvas.width
        this.h = this.canvas.height
        // events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            self.keydowns[event.key] = false
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img, x, y, deg = 0) {
        x = x === undefined ? img.x : x
        y = y === undefined ? img.y : y
        const ctx = this.context
        const rad = deg * 3.14 / 180
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.translate(img.w / 2 + x, img.h / 2 + y)
        ctx.rotate(rad)
        ctx.drawImage(img.texture.image, - img.w / 2, - img.h / 2)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
    drawFrame(img, param) {
        const {sx, sy, swidth, sheight, x, y, deg, w, h} = param
        const ctx = this.context
        const rad = deg * 3.14 / 180
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.translate(x, y)
        ctx.rotate(rad)
        ctx.drawImage(img.texture.image, sx, sy, swidth, sheight, - w / 2, - h / 2, w, h)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        // console.log(x, y, w, h)
    }
    text(text) {
        const t = text
        const ctx = this.context
        ctx.font = "20px Comic Sans MS"
        ctx.strokeStyle = "gray"
        ctx.fillStyle = "royalblue"
        ctx.fillText(t.text, t.x, t.y)
        ctx.strokeText(t.text, t.x, t.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        // log(window.fps)
        // events
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        const w = g.canvas.width
        const h = g.canvas.height
        g.context.clearRect(-w, -h, 2 * w, 2 * h)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    textureByName(name) {
        var g = this
        var img = g.images[name]
        // log('image by name', img, g.images, name)
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // scene.init()
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
        // scene.init()
    }
    __start(scene) {
        this.runCallback(this)
    }

    init() {
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
}
