class Bird {
    constructor(game, param) {
        this.w = 51
        this.h = 36
        this.x = 150
        this.y = 300
        const paramBase = {sx: 0, sy: 0, swidth: 34, sheight: 24, w: this.w, h: this.h}
        const name = 'bird'
        const cd = 2
        const frameConfig = [
            {sy: 0},
            {sy: 24},
            {sy: 48},
            {sy: 72},
        ]
        const color = param.color
        this.g = game
        this.ani = new GuaAnimation(game, {name, cd, paramBase, frameConfig, color})
    }

    draw(x, y, deg) {
        this.x = x
        this.y = y
        this.ani.draw(x, y, deg)
    }

    update() {
        this.ani.update()
    }
}

class Sky {
    constructor(game) {
        const paramBase = {sx: 0, sy: 0, swidth: 100, sheight: 109, w: game.w, h: game.h - 40}
        const frameConfig = []
        for (let count = 0; count < 276; count += 0.1) {
            frameConfig.push({sx: count})
        }
        // console.log(frameConfig, game.w, game.h)
        const name = 'sky'
        const cd = 1
        this.paramBase = paramBase
        this.g = game
        this.ani = new GuaAnimation(game, {name, cd, paramBase, frameConfig})
    }
    draw() {
        const {w, h} = this.paramBase
        this.ani.draw(w / 2, h / 2)
    }

    update() {
        this.ani.update()
    }
}

class Land {
    constructor(game) {
        const paramBase = {sx: 0, sy: 0, swidth: 300, sheight: 112, w: game.w, h: 100}
        const frameConfig = []
        const name = 'land'
        const cd = 1
        this.paramBase = paramBase
        this.g = game
        for (let count = 0; count < 24; count += 3) {
            frameConfig.push({sx: count})
        }
        // console.log(frameConfig, game.w, game.h)
        this.ani = new GuaAnimation(game, {name, cd, paramBase, frameConfig})
    }
    draw() {
        const {w, h} = this.paramBase
        this.ani.draw(w / 2, this.g.h - h / 2 + 40)
    }
    update() {
        this.ani.update()
    }
}

class FingerSystem {
    constructor(game) {
        this.g = game
        this.cd = 30
        this.prev = 100
        this.count = 0
        this.index = 0
        this.eles = []
        //this.eles = [new Finger(this.g, {y: this.prev, sp: 350, v: -15})]
    }

    draw() {
        this.eles.forEach(ele => ele.draw())
    }

    update() {
        this.eles.forEach(ele => ele.update())
        if (this.count > this.cd) {
            const y = Math.random() * 100 - 50 + this.prev
            const sp = Math.random() * 150 + 150
            const v = -12
            this.eles.push(new Finger(this.g, {y, sp, v}))
            this.count = 0
            this.index++
        }
        this.eles = this.eles.filter(ele => ele.life)
        this.count++
    }
}

class Finger {
    constructor(game, param) {
        const {y, sp, v} = param
        this.g = game
        this.life = 1
        this.x = this.g.w
        this.y = y
        this.sp = sp
        this.v = v
        this.img = new GuaImage(game, 'finger', this)
        this.w = this.img.w
        this.h = this.img.h
        this.eles = [
            {x: this.x, y: this.y + this.sp, w: this.img.w, h: this.img.h, deg: 0},
            {x: this.x, y: this.y - this.img.h, w: this.img.w, h: this.img.h, deg: 180},
        ]
    }

    update() {
        if (this.x <  - this.img.w) {
            this.life--
        }
        this.x += this.v
        this.eles.forEach(e => e.x = this.x)
        // log(this.eles[0])
    }

    draw() {
        this.eles.forEach(e => {
            this.g.drawImage(this.img, e.x, e.y, e.deg)
        })
        // this.g.drawImage(this.img, this.x, this.y + this.sp)
        // this.g.drawImage(this.img, this.x, this.y - this.img.h, 180)
    }
}
