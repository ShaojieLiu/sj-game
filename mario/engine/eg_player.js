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
        //log('draw', series, c, param)
        return param
    }

    updateCount() {
        const c = this.scene.count
        const cd = this.cd
        const s = this.status.series
        const series = this.seriesDict[s]
        this.maxCount = series.length
        const mc = this.maxCount
        this.count = Math.floor(c / cd) % mc
    }

    updatePos() {
        const { ax, ay, mx, my, vx, vy, gy } = this
        // 横向加速与摩擦
        const mxf = vx * mx
        const myf = vy * my
        this.vx += ax + mxf
        // 重力加速度
        this.vy += ay + gy + myf
        // 位置与速度
        this.y += vy
        // 下面一个是直接移动角色, 另一个是移动场景
        //this.x += vx
        this.scene._offsetX = this.scene.offsetX + vx
    }

    initParam() {
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 0
    }

    init() {
        this.initParam()
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
        this.status = {
            series: 'standS',
            model: 'small',
        }
        this.baseDrawParam = {
            big: () => ['mario1', this.x, this.y, {w: 1, h: 2, flipX: this.flipX}],
            small: () => ['mario_s0', this.x, this.y, {w: 1, h: 1, flipX: this.flipX}]
        }
        this.seriesDict = {
            walkS: ['mario_s1', 'mario_s0', 'mario_s2'],
            standS: ['mario_s0'],
            walk: ['mario1', 'mario2', 'mario3'],
            acc : ['mario4'],
            jump: ['mario5', 'mario6'],
        }
        const s = this.status
        const series = this.seriesDict[s.series]
        this.maxCount = series.length
    }

    moveForward() {
        //log('right', this, this.status)
        this.vx += 0.04
        this.status.series = 'walkS'
        this.flipX = false
    }

    stop() {
        //log('stop', this, this.status)
        this.status.series = 'standS'
    }

    moveBack() {
        this.vx -= 0.04
        this.status.series = 'walkS'
        this.flipX = true
    }

    jump() {
        this.vy = - 0.75
    }

    actionInit() {
        const s = this.scene
        s.regAction('d', this.moveForward.bind(this), this.stop.bind(this))
        s.regAction('a', this.moveBack.bind(this), this.stop.bind(this))
        s.regActionOnce('w', this.jump.bind(this))
    }

    paramInit() {
        this.x = 4
        this.y = 7
        // 这是摩擦力系数, 摩擦力与速度有关
        this.mx = - 0.2
        this.my = - 0.05
        // 这是重力
        this.gy = 0.1
    }

    updateIntersect() {
        let { x, y, ax, ay, mx, my, vx, vy, gy } = this
        x += this.scene.offsetX

        //const upY = b => {return y + 1 + vy > b.y && y < b.y}
        const intersectY = (b, up, down = 0) => {return y + up + vy > b.y && y + down < b.y}
        const intersectX = (b, gap) => {return x + gap + vx > b.x && x + vx < b.x + gap}
        //if (this.y >= 7 && vy >= 0) {
        //    this.vy = 0
        //    this.y = 7
        //}
        const m = this.scene.sceneMap
        //log(m)
        const reset = {}
        m.map(b => {
            if (intersectX(b, 0.7) && intersectY(b, 1)) {
                if (vy > 0 && !reset.y) {
                    this.y = b.y - 1
                    //this.y = Math.floor(Number(this.y) + 0.1)
                    this.vy = 0
                    reset.y = true
                }
            }
            if (intersectX(b, 0.9) && intersectY(b, 0.7, -0.1)) {
                if (vx != 0 && !reset.x) {
                    this.vx = 0
                    reset.x = true
                }
            }

            //if (vy >= 0 && y >= 7) {
            //    this.vy = 0
            //    this.y = 7
            //}
        })
    }

    init() {
        super.init()
        this.paramInit()
        this.animationInit()
        this.actionInit()
    }

    update() {
        super.update()
        this.updateIntersect()
        this.updatePos()
    }
}