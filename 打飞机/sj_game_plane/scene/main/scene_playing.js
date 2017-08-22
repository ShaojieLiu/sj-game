class ScenePlaying extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.bg = new GuaImage(game, 'background')
        this.eles = [
            new hero(game)
        ]
    }
    // 初始化
    draw() {
        this.game.drawImage(this.bg)
        this.eles.forEach(ele => ele.draw())
    }
}

class hero {
    constructor(game) {
        this.game = game
        this.img = new GuaImage(this.game, 'hero1', this)
        this.x = 100
        this.y = 450
        this.speed = 7
        this.init()
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
    }

    // update() {
    //
    // }
}
// class
