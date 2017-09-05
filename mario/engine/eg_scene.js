/**
 * Created by liushaojie on 2017/9/2.
 */
class Scene{
    constructor() {
        this.size = 64
        this.offsetX = 0
        this.offsetY = 0
        this.eles = []
    }

    mapLoad() {
        const type = 'json'
        const url = `./sceneDownload/scene.json`
        const cb = arr => this.sceneMap = arr || []
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

    drawBlock(name, x, y, option) {
        const o = option || {}
        const canvas = o.canvas || this.sCanvas
        const w = o.w || 1
        const h = o.h || 1
        y = y - h + 1
        const size = this.size
        const g = this.g
        const images = g.images
        const c = canvas
        const ctx = c.getContext('2d')
        if (name !== 'del') {
            ctx.drawImage(images[name], x * size, y * size, w * size, h * size)
        }
    }

    drawSceneCanvas() {
        const ox = this.offsetX
        const oy = this.offsetY
        this.clear(this.sCanvas)
        this.drawBG(this.sCanvas)
        this.sceneMap.map(b => this.drawBlock(b.name, b.x - ox, b.y - oy, {canvas: this.sCanvas}))
    }

    init() {
        this.count = -1
        this.sceneMap = []
        this.mapLoad()
    }

    update() {
        this.count++
        this.eles.map(ele => ele.update())
    }

    draw() {
        this.drawSceneCanvas()
        this.eles.map(ele => ele.draw())
    }
}



