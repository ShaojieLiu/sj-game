class Bird {
    constructor(game, name, cd) {
        this.game = game
        this.texture = game.textureByName(name)
        this.w = this.texture.w
        this.h = this.texture.h
        this.i = 0
        this.cd = cd
    }

    draw(x, y, deg) {
        const paramBase = {sx: 0, sy: 0, swidth: 34, sheight: 24, x, y, deg: 20}
        const paramDiyArr = [
            {sy: 0},
            {sy: 24},
            {sy: 48},
            {sy: 72},
        ]
        const param = Object.assign({}, paramBase, paramDiyArr[this.index], {deg})
        // console.log(param)
        this.game.drawFrame(this, param)
    }
    update() {
        this.i += 1 / this.cd
        this.index = Math.floor(this.i % 4)
        // console.log(this.index)
    }
}
