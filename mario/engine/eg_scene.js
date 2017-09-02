/**
 * Created by liushaojie on 2017/9/2.
 */
class Scene{
    constructor() {

    }
    update() {

    }
    draw() {

    }
}

class SceneEditor extends Scene {
    constructor(game, itemCanvas, sceneCanvas) {
        super()
        this.g = game
        this.iCanvas = itemCanvas
        this.sCanvas = sceneCanvas
        this.init()
    }

    init() {
        this.blocks = [
            'brick1',
            'brick2',
            'brick3',
            'brick4',
        ]
    }

    drawBlock(name, index) {
        const size = 64
        const g = this.g
        const images = g.images
        const c = this.iCanvas
        const ctx = c.getContext('2d')
        ctx.drawImage(images[name], index * size, 0, size, size)
    }

    draw() {
        this.blocks.map((b, i) => this.drawBlock(b, i))
    }
}