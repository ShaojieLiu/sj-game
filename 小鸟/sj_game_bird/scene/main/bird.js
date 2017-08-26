class Bird {
    constructor(game) {
        const paramBase = {sx: 0, sy: 0, swidth: 34, sheight: 24, w: 34, h: 24}
        const name = 'bird'
        const cd = 2
        const frameConfig = [
            {sy: 0},
            {sy: 24},
            {sy: 48},
            {sy: 72},
        ]
        this.g = game
        this.ani = new GuaAnimation(game, {name, cd, paramBase, frameConfig})
    }

    draw(x, y, deg) {
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
        console.log(frameConfig, game.w, game.h)
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
        for (let count = 0; count < 24; count += 2) {
            frameConfig.push({sx: count})
        }
        console.log(frameConfig, game.w, game.h)
        const name = 'land'
        const cd = 1
        this.paramBase = paramBase
        this.g = game
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
        this.speed = -1
        this.g = game
        this.cd = 200
        this.prev = 100
        this.count = 0
        this.index = 0
        this.eles = [new Finger(this.g, {y: this.prev, sp: 350})]
    }

    draw() {
        this.eles.forEach(ele => ele.draw())
    }

    update() {
        this.eles.forEach(ele => ele.update())
        if (this.count > this.cd) {
            const y = Math.random() * 100 - 50 + this.prev
            const sp = Math.random() * 200 + 150
            this.eles.push(new Finger(this.g, {y, sp}))
            this.count = 0
            this.index++
        }
        this.count++
    }
}

class Finger {
    constructor(game, param) {
        const {y, sp} = param
        this.g = game
        this.life = 1
        this.x = this.g.w
        this.y = y
        this.sp = sp
        this.speed = -1
        this.img = new GuaImage(game, 'finger', this)
    }
    draw() {
        this.g.drawImage(this.img, this.x, this.y + this.sp)
        this.g.drawImage(this.img, this.x, this.y - this.img.h, 180)
    }

    update() {
        if (this.x <  - this.img.w) {
            this.life--
        }
        this.x += this.speed
    }
}
