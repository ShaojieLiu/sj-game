class ScenePlaying extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.bg = new GuaImage(game, 'background')
        this.loopCD = 200
        this.loopCount = 0
        this.eles = [
            new Hero(game),
            new ParticleSystem(game)
        ]
        this.init()
    }

    addEnemy(param) {
        const {enemy1, enemy2} = param
        const baseEnemy1 = {x: 100, y: 100, speed: 4, name: 'enemy1'}
        const baseEnemy2 = {x: 100, y: 100, speed: 2, name: 'enemy2'}
        const enemyDict1 = enemy1.map(d => Object.assign({}, baseEnemy1, d))
        const enemyDict2 = enemy2.map(d => Object.assign({}, baseEnemy2, d))
        const enemyDict = [].concat(enemyDict1, enemyDict2)
        enemyDict.forEach(p => this.eles.push(new Enemy(this.game, p)))
    }

    addCloud(cloudDict) {
        cloudDict.forEach(p => this.eles.push(new Cloud(this.game, p)))
    }

    // 初始化
    init() {
        const enemy1 = [
            {x: 50 , y: -70},
            {x: 100, y: -70},
            {x: 200, y: -70},
            {x: 250, y: -70},
        ]
        const enemy2 = [
            {x: 20,  y: -200},
            {x: 100, y: -200},
            {x: 200, y: -200},
            {x: 280, y: -200},
        ]
        this.addEnemy({enemy1, enemy2})
        // this.addCloud([{x: 0, y: -200}])
    }
    draw() {
        this.game.drawImage(this.bg)
        this.eles.forEach(ele => ele.draw())
    }
    update() {
        // TODO, 暂时这么加东西
        this.loopCount += 1
        if (this.loopCD === this.loopCount) {
            this.loopCount = 0
            this.init()
        }
        this.eles.forEach(ele => ele.update())
    }
}

class Particle {
    constructor(game, param) {
        this.game = game
        Object.assign(this, param)
        this.img = new GuaImage(this.game, 'bullet2', this)
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        this.vx += this.ax
        this.vy += this.ay
    }
    draw() {
        if (this.life > 0) {this.game.drawImage(this.img, this.x, this.y)}
    }
}

class ParticleSystem {
    constructor(game) {
        this.game = game
        this.eles = []
    }
    update() {
        const param = {
            life: 20,
            x: 200,
            y: 100,
            vx: Math.random() * 10 - 5,
            vy: Math.random() * 10 - 8,
            ax: 0,
            ay: 0.5,
        }
        this.eles.push(new Particle(this.game, param))
        this.eles.forEach(p => p.update())
    }
    draw() {
        this.eles.forEach(p => p.draw())
    }
}

class Cloud {
    constructor(game, param = {x: 100, y: 100}) {
        this.game = game
        Object.assign(this, param)
        this.img = new GuaImage(this.game, 'cloud1', this)
        this.speed = 1
    }
    update() {
        this.y += this.speed
    }
    draw() {
        this.game.drawImage(this.img, this.x, this.y)
    }
}

class Bullet {
    constructor(game, param = {x: 100, y: 100}) {
        this.game = game
        Object.assign(this, param)
        this.img = new GuaImage(this.game, 'bullet2', this)
        this.speed = 11
    }
    update() {
        this.y -= this.speed
    }
    draw() {
        this.game.drawImage(this.img, this.x, this.y)
    }
}

class Hero {
    constructor(game) {
        this.game = game
        this.img = new GuaImage(this.game, 'hero1', this)
        this.x = 100
        this.y = 450
        this.speed = 7
        this.init()
        this.eles = []
        this.cd = 0
    }

    registerMove() {
        const g = this.game
        const s = this.speed

        const actionDict = [
            {a: () => {this.x -= s}},
            {d: () => {this.x += s}},
            {w: () => {this.y -= s}},
            {s: () => {this.y += s}},
        ]

        const keyOf = obj => Object.keys(obj)[0]
        const valOf = obj => obj[keyOf(obj)]

        actionDict.forEach(act => g.registerAction(keyOf(act), valOf(act)))
    }

    init() {
        this.registerMove()
    }

    draw() {
        this.game.drawImage(this.img, this.x, this.y)
        this.eles.forEach(ele => ele.draw())
    }

    update() {
        this.cd += 1
        if (this.cd > 5) {
            this.eles.push(new Bullet(this.game, {x: this.x + this.img.w / 2 - Math.random() * 5, y: this.y}))
            this.cd = 0
        }
        this.eles.forEach(b => b.update())
    }
}

class Enemy {
    constructor(game, param = {x: 100, y: 100, speed: 4, name: 'enemy1'}) {
        this.game = game
        Object.assign(this, param)
        this.img = new GuaImage(this.game, this.name, this)
        this.init()
    }
    init() {

    }
    update() {

        this.y += this.speed
    }
    draw() {
        this.game.drawImage(this.img, this.x, this.y)
    }
}
// class
