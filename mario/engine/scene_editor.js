/**
 * Created by liushaojie on 2017/9/4.
 */
class SceneEditor extends Scene {
    constructor(game, itemCanvas, sceneCanvas) {
        super(game)
        this.g = game
        this.iCanvas = itemCanvas
        this.sCanvas = sceneCanvas
        this.currentIndex = 0
        this.init()
    }

    initItems() {
        this.blocks = [
            'del',
            'brick1',
            'brick2',
            'brick3',
            'brick4',
        ]
    }

    init() {
        super.init()
        this.initItems()
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
        const ox = this.offsetX
        const oy = this.offsetY
        const s = this.size
        const i = this.currentIndex
        const x = Math.floor(ev.offsetX / s) + ox
        const y = Math.floor(ev.offsetY / s) + oy
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

        this.regScroll()

        iC.addEventListener('click', ev => this.currentIndex = Math.floor(ev.offsetX / s))

        sC.addEventListener('click', this.addBlock.bind(self))

        sC.addEventListener('mousedown', ev => this.dragging = true)

        sC.addEventListener('mousemove', ev => this.dragging && this.addBlock.call(self, ev))

        sC.addEventListener('mouseup', ev => this.dragging = false)
    }

    drawItemCanvas() {
        const iC = this.iCanvas
        this.clear(iC)
        this.blocks.map((b, i) => this.drawBlock(iC, b, i, 0))
    }

    draw() {
        super.draw()
        this.drawItemCanvas()
    }
}