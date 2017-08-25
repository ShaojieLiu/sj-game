class ScenePlaying extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.bg = new GuaImage(game, 'sky')

        this.eles = [new Hero(game)]
        this.init()
    }

    init() {

    }

    update() {

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
        if (this.y < 0) {
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
        this.x = 100
        this.y = 450
        this.img = new GuaImage(this.game, 'bird', this)
        this.speed = 7
        this.init()
        this.life = 1
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
