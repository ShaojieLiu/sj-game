/**
 * Created by liushaojie on 2017/9/2.
 */
class Scene{
    constructor() {
        this.size = 64
        this.offsetX = 0
        this.offsetY = 0
    }

    sceneLoad() {
        const type = 'json'
        const url = `./sceneDownload/scene.json`
        const cb = arr => this.b4scene = arr || []
        loadData(cb, url, type)
    }

    regScroll() {
        const input = e('#input-range')
        const show = e('#range-show')
        const val = () => Number(input.value)
        const setOffset = () => {
            show.innerHTML = val()
            this.offsetX = val()
        }
        input.addEventListener('input', setOffset)
        es('.range-btn').map(btn => btn.addEventListener('click', setOffset))
    }

    clear(canvas) {
        const c = canvas
        const ctx = c.getContext('2d')
        ctx.clearRect(0, 0, 999, 999)
    }

    drawBG(canvas) {
        const c = canvas
        const w = c.width
        const h = c.height
        const ctx = c.getContext('2d')
        ctx.fillStyle = 'lightskyblue'
        ctx.fillRect(0, 0, w, h)
    }

    drawBlock(canvas, name, x, y) {
        const size = this.size
        const g = this.g
        const images = g.images
        const c = canvas
        const ctx = c.getContext('2d')
        if (name !== 'del') {
            ctx.drawImage(images[name], x * size, y * size, size, size)
        }
    }

    drawSceneCanvas() {
        const ox = this.offsetX
        const oy = this.offsetY
        this.clear(this.sCanvas)
        this.drawBG(this.sCanvas)
        this.b4scene.map(b => this.drawBlock(this.sCanvas, b.name, b.x - ox, b.y - oy))
    }

    init() {
        this.b4scene = []
        this.sceneLoad()
    }

    update() {

    }

    draw() {
        this.drawSceneCanvas()
    }
}

class ScenePlay extends Scene {
    constructor(game, sceneCanvas) {
        super(game)
        this.g = game
        this.sCanvas = sceneCanvas
        this.init()
    }

    init() {
        super.init()
        this.regScroll()
    }

    update() {
        // log(this.b4scene)
    }
}

