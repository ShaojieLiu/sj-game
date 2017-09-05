/**
 * Created by liushaojie on 2017/9/5.
 */
class SceneTest extends Scene {
    constructor(game, sceneCanvas) {
        super(game)
        this.g = game
        this.sCanvas = sceneCanvas
        this.init()
    }

    init() {
        super.init()
        this.regScroll()
        this.eles.push(new Mario(this))
    }

    update() {
        super.update()
        // log(this.sceneMap)
    }

    draw() {
        super.draw()
    }
}