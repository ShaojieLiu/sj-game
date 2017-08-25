class ScenePlaying extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.bg = new GuaImage(game, 'sky')

        this.eles = [new Bullet(game), new Sky(game), new Hero(game)]
        this.init()
    }

    init() {

    }

    update() {
        this.eles.forEach(ele => ele.update())

    }
    draw() {
        this.eles.forEach(ele => ele.draw())
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

class Sky {
    constructor(game) {
        this.game = game
        this.img = new GuaImage(game, 'sky', this)
        this.x = 0
        this.y = 0
    }
    update() {

    }
    draw() {
        this.game.drawImage(this.img, this.x, this.y)
        // console.log('sky draw')
    }
}

class Bullet {
    constructor(game, param = {x: 100, y: 100}) {
        this.game = game
        this.speed = -11
        this.life = 1
        this.name = 'bullet1'
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
        this.x = 150
        this.y = 300
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 1.5
        // this.ay = 0
        this.angleFactor = 1.5
        // this.zl = 0
        this.speed = 5
        this.bird = new Bird(this.game, 'bird', 2)
        this.init()
        this.life = 1
    }

    registerMove() {
        const g = this.game
        const s = this.speed

        const actionDict = [
            {a: () => {this.vx -= s}},
            {d: () => {this.vx += s}},
            {w: () => {this.vy -= s}},
            {s: () => {this.vy += s}},
        ]

        const keyOf = obj => Object.keys(obj)[0]
        const valOf = obj => obj[keyOf(obj)]

        actionDict.forEach(act => g.registerAction(keyOf(act), valOf(act)))
    }

    init() {
        this.registerMove()
    }

    update() {
        this.bird.update()
        this.x += this.vx
        this.y += this.vy
        this.vx += this.ax
        this.vy += this.ay
        this.angle = this.vy * this.angleFactor
    }

    draw() {
        this.bird.draw(this.x, this.y, this.angle)
        // this.eles.forEach(ele => ele.draw())
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
