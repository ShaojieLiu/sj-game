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
        this.g.registerAction('w', () => {
            this.g.replaceScene(new ScenePlaying(this.g))
            this.g.registerAction('w', () => {})
            this.g.registerAction('i', () => {})
        })
        this.g.registerAction('i', () => {
            this.g.replaceScene(new Scene2player(this.g))
            this.g.registerAction('w', () => {})
            this.g.registerAction('i', () => {})
        })
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
        this.ay = 1
        this.angleFactor = 2
        this.speed = 20
        this.bird = new Bird(game, {color: param.color})
        this.life = 1
        this.keyup = {}
        Object.assign(this, param)
        this.init()
    }

    registerMove() {
        const s = this.speed

        const actionDict = {
            [this.btn]: () => {
                if(this.life > 0) {
                    this.vy -= s
                }
            },
        }

        actionDict.map((fun, k) => this.keyup[k] = true)

        window.addEventListener('keydown', ev => {
            actionDict.map((fun, k) => {
                if(this.keyup[k] && ev.key === k) {
                    this.keyup[k] = false
                    fun()
                }
            })
        })

        window.addEventListener('keyup', ev => {
            actionDict.map((fun, k) => {
                if(ev.key === k) {
                    this.keyup[k] = true
                }
            })
        })
    }


    init() {
        this.registerMove()
    }

    update() {
        console.log(this.y, this.vy, this.ay)
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
        this.angle = this.vy * this.angleFactor
        this.bird.update()
    }

    draw() {
        this.bird.draw(this.x, this.y, this.angle)
        // this.eles.forEach(ele => ele.draw())
    }
}

