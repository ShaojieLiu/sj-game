/**
 * Created by liushaojie on 2017/9/1.
 */

class Score {
    constructor(game, scene) {
        this.g = game
        this.s = scene
        // this.img = new GuaImage(game, '0', {x: 200, y: 80})
    }
    update() {
        const numString = this.s.score.toString().split('')
        const l = numString.length
        this.eles = numString.map((num, i) => {
            return new GuaImage(this.g, num, {x: 200 + 30 * i - (30 * l / 2), y: 80})
        })
    }
    draw() {
        this.eles.forEach(e => this.g.drawImage(e))
        // this.g.drawImage(this.img)
    }
}

class Text {
    constructor(game, text, param) {
        this.g = game
        this.text = text
        Object.assign(this, param)
    }
    update() {
    }
    draw() {
        this.g.text(this)
    }
}

class Title {
    constructor(game, name, param) {
        this.img = new GuaImage(game, name, param)
        this.g = game
        Object.assign(this, param)
    }
    update() {
    }
    draw() {
        this.g.drawImage(this.img, this.x, this.y)
    }
}
