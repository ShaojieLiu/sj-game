class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.g = game
        this.player = new Player(this.g, {ay: 0})
        this.eles = [
            new Sky(this.g),
            this.player,
            new Land(this.g),
            new Title(game, 'title', {x: 110, y: 100}),
            new Title(game, 'btn_play', {x: 140, y: 200}),
            new Text(game, '按下 "W" 来开始游戏 !', {x: 100, y: 290}),
            new Text(game, '按下 " I " 来加入 2 P !', {x: 100, y: 320}),
        ]
        this.g.registerAction('w', () => this.g.replaceScene(new ScenePlaying(this.g)))
        this.g.registerAction('i', () => this.g.replaceScene(new Scene2player(this.g)))
    }
    update() {
        this.eles.forEach(ele => ele.update())
    }
    draw() {
        this.eles.forEach(ele => ele.draw())
    }
}

class ScenePlaying extends GuaScene {
    constructor(game) {
        console.log('start playing')
        super(game)
        this.g = game
        this.g.hardness = 0
        this.player = new Player(this.g, {btn: 'w'})
        this.score = 0
        this.gameover = false
        this.eles = [
            new Sky(this.g),
            this.player,
            new Land(this.g),
            new Score(this.g, this)
        ]
        this.init()
    }

    init() {
        this.fingers = new FingerSystem(this.g)
        this.eles.splice(1, 0, this.fingers)
    }

    del(ele) {
        this.eles = this.eles.filter(e => e === ele )
    }

    crashDetect(fingers, player) {
        const b = player.bird
        const isCrash = fingers.eles.some(f => f.eles.some(e => isPointIn([b.x, b.y], getSpace(e))))

        if (isCrash && player.life > 0) {
            player.life--
            log('GAME OVER !')
        }
    }

    gameOverUpdate() {
        this.eles.filter(ele => ele.constructor.name === 'Player').forEach(ele => ele.update())
        // console.log(this.eles, this.eles.map(ele => ele.constructor.name))
        this.g.registerAction('r', () => this.g.replaceScene(new SceneTitle(this.g)))
        if (!this.gameover) {
            this.eles.push(new Text(this.g, '按下 "R" 来重新开始 !', {x: 100, y: 305}))
            this.eles.push(new Title(this.g, 'text_game_over', {x: 100, y: 200}))
        }
        this.gameover = true
    }

    gamingUpdate() {
        this.eles.forEach(ele => ele.update())
        const fs = this.fingers
        if (fs.count === fs.cd) {
            this.score++
        }
    }

    update() {
        //console.log(this.player.life, this.player2.life)
        if (this.player.life > 0) {
            this.crashDetect(this.fingers, this.player)
            this.gamingUpdate()
        } else {
            this.gameOverUpdate()
        }
    }

    draw() {
        this.eles.forEach(ele => ele.draw())
    }
}


class Scene2player extends ScenePlaying {
    constructor(game) {
        super(game)
        this.g = game
        this.player2 = new Player(this.g, {btn: 'i', initX: 150, color: 290})
        this.eles.splice(2, 0, this.player2)
    }
    update() {
        const isContinue = this.player.life > 0 || this.player2.life > 0

        this.player.life > 0 && this.crashDetect(this.fingers, this.player)
        this.player2.life > 0 && this.crashDetect(this.fingers, this.player2)

        if (isContinue) {
            this.gamingUpdate()
        } else {
            this.gameOverUpdate()
        }
    }

}

class Player {
    constructor(game, param) {
        this.g = game
        this.initX = param.initX || 200
        this.x = this.initX
        this.y = 350
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 1.5
        this.angleFactor = 2
        this.speed = 5
        this.bird = new Bird(game, {color: param.color})
        this.life = 1
        Object.assign(this, param)
        this.init()
    }

    registerMove() {
        const g = this.g
        const s = this.speed

        console.log(this.btn)

        const actionDict = [
            //{a: () => {this.x -= s}},
            //{d: () => {this.x += s}},
            {[this.btn]: () => {this.vy -= this.life > 0 ? s : 0}},
            //{s: () => {this.vy += this.life > 0 ? s : 0}},
        ]

        const keyOf = obj => Object.keys(obj)[0]
        const valOf = obj => obj[keyOf(obj)]

        actionDict.forEach(act => g.registerAction(keyOf(act), valOf(act)))
    }

    init() {
        this.registerMove()
    }

    update() {
        if (this.y < 0) {
            this.life--
        }
        if (this.y < this.g.h - 80) {
            this.y += this.vy
            this.vy += this.ay
        }
        if (this.life > 0) {
            this.x += ( this.initX - this.x ) * 0.05
            this.vx += this.ax
        } else {
            // this.vx = -5
        }
        this.x += this.vx

        this.angle = this.vy * this.angleFactor
        this.bird.update()
    }

    draw() {
        this.bird.draw(this.x, this.y, this.angle)
        // this.eles.forEach(ele => ele.draw())
    }
}

const isIntersect = (a, b) => {
    // debugger
    // log(a, b)
    const aSpace = getSpace(a)
    const bSpace = getSpace(b)
    return get4points(aSpace).some(p => isPointIn(p, bSpace)) ||
        get4points(bSpace).some(p => isPointIn(p, aSpace))
}

const isPointIn = function(point, space) {
    return (
        point[0] > space.x1 &&
        point[0] < space.x2 &&
        point[1] > space.y1 &&
        point[1] < space.y2
    )
}

const getSpace = (instance) => {
    const a = instance
    return {
        x1: a.x,
        y1: a.y,
        x2: a.x + a.w,
        y2: a.y + a.h,
    }
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

log(isIntersect(
    {
        x: 120, y: 319,
        w: 73, h:483
    },
    {
        x: 150, y: 529,
        w: 51, h: 36
    }
))
