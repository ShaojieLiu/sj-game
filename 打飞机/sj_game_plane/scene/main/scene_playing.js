class ScenePlaying extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.bg = new GuaImage(game, 'background')
        this.enemyCD = 200
        this.cloudCD = 600
        this.loopCount = 0

        this.bulletHero = []
        this.bulletEnemy = []
        this.enemy = []
        this.hero = [new Hero(this.game)]
        this.label = new Label(game, this.hero[0])
        this.other = [this.label]

        this.eles = this.getEles()

        this.init()
    }

    init() {

    }

    getEles() {
        return [
            this.bulletHero,
            this.bulletEnemy,
            this.enemy,
            this.hero,
            this.other,
        ]
    }

    addEnemy(param) {
        const {enemy1, enemy2} = param
        const baseEnemy1 = {x: 100, y: 100, speed: 4, name: 'enemy1', life: 2}
        const baseEnemy2 = {x: 100, y: 100, speed: 2, name: 'enemy2', life: 4}
        const enemyDict1 = enemy1.map(d => Object.assign({}, baseEnemy1, d, {speed: 4 + Math.random()}))
        const enemyDict2 = enemy2.map(d => Object.assign({}, baseEnemy2, d, {speed: 2 + Math.random()}))
        const enemyDict = [].concat(enemyDict1, enemyDict2)
        enemyDict.forEach(p => this.enemy.push(new Enemy(this.game, p)))
    }

    addCloud(cloudDict) {
        cloudDict.forEach(p => this.other.push(new Cloud(this.game, p)))
    }

    // 初始化
    initEnemy() {
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

    damage(b, plane, addScore, particleName) {
        const h = plane
        b.life--
        h.life--
        this.label.score += addScore
        this.other.push(new ParticleSystem(this.game, {x: b.x, y: b.y + 30, life: 6, name: particleName}))
    }

    update() {
        // 英雄子弹撞敌机
        this.bulletHero.forEach(b => this.enemy.forEach(e => {
            if (isIntersect(b, e)) {
                this.damage(b, e, 1, 'bullet2')
            }
        }))

        // diji子弹撞
        this.bulletEnemy.forEach(b => this.hero.forEach(h => {
            if (isIntersect(b, h)) {
                this.damage(b, h, -20, 'bullet1')
            }
        }))

        // 敌机撞
        this.enemy.forEach(e => this.hero.forEach(h => {
            if (isIntersect(e, h)) {
                this.damage(e, h, -20, 'bullet1')
            }
        }))

        // kill
        const result = this.eles.map(arr => arr.filter(ele => ele.life > 0))
        const [bulletHero, bulletEnemy, enemy, hero, other] = result
        Object.assign(this, {bulletHero, bulletEnemy, enemy, hero, other})

        this.eles = this.getEles()

        // TODO, 暂时这么加敌机
        if (this.loopCount % this.enemyCD === 0) {
            this.initEnemy()
        }
        if (this.loopCount % this.cloudCD === 0) {
            this.loopCount = 0
            this.addCloud([{x: Math.random() * 200 - 100, y: -300}])
        }
        this.loopCount++

        // 放子弹
        const h = this.hero[0]
        // console.log(this)
        if (h && h.cd === 0) {
            const b = new Bullet(this.game, {x: h.x + h.img.w / 2 + 7 - Math.random() * 10, y: h.y})
            this.bulletHero.push(b)
        }

        // 敌机子弹
        this.enemy.forEach(e => {
            // console.log(e.cd)
            if (e.cd < 0) {
                const b = new Bullet(this.game, {
                    x: e.x + e.img.w / 2 + 10 - Math.random() * 20,
                    y: e.y + 30,
                    speed: 5,
                    name: 'bullet1',
                })
                this.bulletEnemy.push(b)
            }
        })

        // update
        console.log(this.eles)
        this.eles.forEach(arr =>
            arr.forEach(ele =>
                ele.update()
            )
        )

        console.log(this.eles)
    }
    draw() {
        this.game.drawImage(this.bg)
        this.eles.forEach(arr =>
            arr.forEach(ele =>
                ele.draw()
            )
        )
    }
}

class Label {
    constructor(game, hero, param = {x: 100, y: 100}) {
        Object.assign(this, param, {game, hero})
        this.life = 1
        this.score = 0
    }
    update() {

    }
    draw() {
        this.game.text({
            text: '生命: ' + this.hero.life + '  分数: ' + this.score,
            x: 230,
            y: 580,
        })
    }
}

class Particle {
    constructor(game, param) {
        this.game = game
        this.name = 'bullet2'
        Object.assign(this, param)
        this.img = new GuaImage(this.game, this.name, this)
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
    constructor(game, param) {
        this.game = game
        Object.assign(this, param)
        this.param = param
        this.life = 10
        this.eles = []
    }
    update() {
        let param = {
            life: 20,
            x: 200,
            y: 100,
            vx: Math.random() * 10 - 5,
            vy: Math.random() * 10 - 8,
            ax: 0,
            ay: 0.5,
        }
        Object.assign(param, this.param)
        this.eles.push(new Particle(this.game, param))
        this.eles.forEach(p => p.update())
        this.life--
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
        this.life = 1
    }
    update() {
        this.y += this.speed
        if (this.y > e('#id-canvas').height) this.life = 0
    }
    draw() {
        this.game.drawImage(this.img, this.x, this.y)
    }
}

class Bullet {
    constructor(game, param = {x: 100, y: 100}) {
        this.game = game
        this.speed = -11
        this.life = 1
        this.name = 'bullet2'
        Object.assign(this, param)
        this.img = new GuaImage(this.game, this.name, this)
    }
    update() {
        if (this.y < 0 || this.y > e('#id-canvas').height) {
            this.life = 0
        }
        this.y += this.speed
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
        this.cd = 0
        this.life = 5
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
        // this.eles.forEach(ele => ele.draw())
    }

    update() {
        this.cd++
        if (this.cd > 5) {
            // this.eles.push(new Bullet(this.game, {x: this.x + this.img.w / 2 - Math.random() * 5, y: this.y}))
            this.cd = 0
        }
        // this.eles.forEach(b => b.update())
    }
}

class Enemy {
    constructor(game, param = {x: 100, y: 100, speed: 4, name: 'enemy1', life: 1}) {
        this.game = game
        this.init()
        this.sec = -1
        this.coolDown = 90 - Math.random() * 30
        this.cd = this.coolDown
        Object.assign(this, param)
        this.img = new GuaImage(this.game, this.name, this)
    }
    init() {

    }
    update() {
        if (this.cd < 0) {
            this.cd = this.coolDown
        }
        this.y += this.speed
        if (this.y > e('#id-canvas').height) this.life = 0
        this.sec--
        this.cd--
    }
    draw() {
        this.game.drawImage(this.img, this.x, this.y)
    }
}

const getSpace = (instance) => {
    const a = instance
    return {
        x1: a.x,
        y1: a.y,
        x2: a.x + a.img.texture.w,
        y2: a.y + a.img.texture.h
    }
}

const isPointIn = function(point, space) {
    return (
        point[0] > space.x1 &&
        point[0] < space.x2 &&
        point[1] > space.y1 &&
        point[1] < space.y2
    )
}

const get4points = (space) => {
    const s = space
    return [
        [s.x1, s.y1],
        [s.x2, s.y1],
        [s.x1, s.y2],
        [s.x2, s.y2]
    ]
}

const isIntersect = (a, b) => {
    const aSpace = getSpace(a)
    const bSpace = getSpace(b)
    return get4points(aSpace).map(p => isPointIn(p, bSpace)).filter(is => is).length !== 0
}
