/**
 * Created by liushaojie on 2017/9/5.
 */

class Player{
    constructor(scene) {
        this.scene = scene
        this.init()
    }

    getDrawParam() {
        const c = this.count
        const s = this.status.series
        const m = this.status.model
        const b = this.baseDrawParam[m]()
        const series = this.seriesDict[s]
        this.maxCount = series.length
        const param = b.slice(0)
        param[0] = series[c]
        return param
    }

    updateCount() {
        const c = this.scene.count
        const cd = this.cd
        const mc = this.maxCount
        this.count = Math.floor(c / cd) % mc
    }

    init() {

    }

    update() {
        this.updateCount()
    }

    draw() {
        const s = this.scene
        s.drawBlock(...this.getDrawParam())
    }
}

class Mario extends Player{
    constructor(scene) {
        super(scene)
        this.init()
    }

    animationInit() {
        this.cd = 4
        this.baseDrawParam = {
            big: () => ['mario1', this.x, this.y, {w: 1, h: 2}],
            small: () => ['mario_s0', this.x, this.y, {w: 1, h: 1}]
        }
        this.seriesDict = {
            walkS: ['mario_s1', 'mario_s0', 'mario_s2'],
            walk: ['mario1', 'mario2', 'mario3'],
            acc : ['mario4'],
            jump: ['mario5', 'mario6'],
        }
        this.status = {
            series: 'walkS',
            model: 'small',
        }
        const s = this.status
        const series = this.seriesDict[s.series]
        this.maxCount = series.length
    }

    jump() {
        if (!this.jumping) {
            this.vy += - 1
        }
        this.jumping = true
    }

    actionInit() {
        const s = this.scene
        s.regAction('d', () => this.vx += 0.04)
        s.regAction('a', () => this.vx += - 0.04)
        s.regAction('w', () => this.jump(), () => this.jumping = false)
    }

    paramInit() {
        this.x = 2
        this.y = 7
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 0
        // 这是摩擦力系数, 摩擦力与速度有关
        this.mx = - 0.2
        this.my = - 0.05
        // 这是重力
        this.gy = 0.15
    }

    posUpdate() {
        const { ax, ay, mx, my, vx, vy, gy } = this
        // 横向加速与摩擦
        const mxf = vx * mx
        this.vx += ax + mxf
        // 重力加速度
        this.vy += ay + gy
        // 位置与速度
        this.x += vx
        this.y += vy
        // 缸体
        log(vy)
        if (this.y >= 7 && vy >= 0) {
            this.vy = 0
            this.y = 7
        }
    }

    init() {
        super.init()
        this.paramInit()
        this.animationInit()
        this.actionInit()
    }

    update() {
        super.update()
        this.posUpdate()
    }
}