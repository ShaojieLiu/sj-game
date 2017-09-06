/**
 * Created by liushaojie on 2017/9/2.
 */
class Scene{
    constructor() {
        this.size = 64
        this.offsetX = 0
        this.offsetY = 0
        this.eles = []
        this.mapUrl = `./sceneDownload/scene.json`
    }

    mapLoad() {
        const type = 'json'
        const url = this.mapUrl
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

        this.__defineSetter__('_offsetX', val => {
            val = Number(Number(val).toFixed(2))
            this.offsetX = val
            input.value = val
        })
    }

    regActionInit() {
        this.action = {}
        this.keydown = {}
        this.actionDone = {}
        window.addEventListener('keydown', ev => {
            const k = ev.key
            this.keydown[k] = true
        })

        window.addEventListener('keyup', ev => {
            const k = ev.key
            this.keydown[k] = false
            this.action[k] && this.action[k].cbUp()
        })
    }

    regAction(key, cbPress, cbUp = () => {}) {
        this.action[key] = {}
        this.action[key].cbPress = cbPress
        this.action[key].cbUp = cbUp
        log(this.action)
    }

    regActionOnce(key, cbPress, cbUp = () => {}) {
        this.action[key] = {}
        this.action[key].cbPress = () => {
            !this.actionDone[key] && cbPress()
            this.actionDone[key] = true
        }
        this.action[key].cbUp = () => {
            this.actionDone[key] && cbUp()
            this.actionDone[key] = false
        }
        log(this.action)
    }

    doAction() {
        map(this.action, (cb, k) => {
            this.keydown[k] && cb.cbPress()
        })
    }

    clear(canvas) {
        const c = canvas
        const ctx = c.getContext('2d')
        ctx.clearRect(-999, -999, 999, 999)
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
        const g = this.g
        const images = g.images

        const c = o.canvas || this.sCanvas
        const ctx = c.getContext('2d')

        const flipX = o.flipX || false
        const scaleX = flipX ? -1 : 1
        const size = this.size

        let w = o.w || 1
        let h = o.h || 1
        y = y - h + 1

        x *= size
        y *= size
        w *= size
        h *= size

        if (name !== 'del') {
            ctx.translate(x + w/2, y + h/2)
            ctx.scale(scaleX, 1)
            ctx.drawImage(images[name], - w/2, - h/2, w, h)
            ctx.setTransform(1, 0, 0, 1, 0, 0)
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
        this.regActionInit()
    }

    update() {
        this.count++
        this.eles.map(ele => ele.update())
        this.doAction()
    }

    draw() {
        this.drawSceneCanvas()
        this.eles.map(ele => ele.draw())
    }
}



