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
        this.size = 64
        this.currentIndex = 0
        this.init()
    }

    sceneLoad() {
        const type = 'json'
        const url = `./sceneDownload/scene.json`
        const cb = arr => this.b4scene = arr || []
        loadData(cb, url, type)
    }

    init() {
        this.blocks = [
            'del',
            'brick1',
            'brick2',
            'brick3',
            'brick4',
        ]
        this.b4scene = []
        this.sceneLoad()
        this.register()
        this.regDownload()
    }

    b4sceneDel(x, y) {
        this.b4scene = this.b4scene.filter(b => {
            return !(b.x === x && b.y ===y)
        })
    }

    regDownload() {
        const btn = e('#btn-finish')
        btn.addEventListener('click', () => {
            const input = e('#input-name')
            const name = input.value
            const storageObj = this.b4scene
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj))
            btn.setAttribute("href", dataStr)
            btn.setAttribute("download", name)
        })
    }

    addBlock(ev) {
        const s = this.size
        const i = this.currentIndex
        const x = Math.floor(ev.offsetX / s)
        const y = Math.floor(ev.offsetY / s)
        const name = this.blocks[i]
        this.b4sceneDel(x, y)
        this.b4scene.push({x, y, name})
        name === 'del' && this.b4sceneDel(x, y)
        log('b4scene', this.b4scene)
    }

    register() {
        const s = this.size
        const iC = this.iCanvas
        const sC = this.sCanvas
        const self = this

        iC.addEventListener('click', ev => this.currentIndex = Math.floor(ev.offsetX / s))

        sC.addEventListener('click', this.addBlock.bind(self))

        sC.addEventListener('mousedown', ev => this.dragging = true)

        sC.addEventListener('mousemove', ev => this.dragging && this.addBlock.call(self, ev))

        sC.addEventListener('mouseup', ev => this.dragging = false)
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

    draw() {
        this.clear(this.iCanvas)
        this.blocks.map((b, i) => this.drawBlock(this.iCanvas, b, i, 0))
        this.clear(this.sCanvas)
        this.drawBG(this.sCanvas)
        this.b4scene.map(b => this.drawBlock(this.sCanvas, b.name, b.x, b.y))
    }
}