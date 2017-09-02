class GuaAnimation {
    constructor(game, param) {
        const {name, cd, paramBase, frameConfig, color} = param
        Object.assign(this, {name, cd, paramBase, frameConfig})
        this.game = game
        this.texture = game.textureByName(name)
        this.w = this.texture.w
        this.h = this.texture.h
        this.count = 0
        this.cd = cd
        this.frameNum = this.frameConfig.length
        this.color = color
    }

    draw(x = 0, y = 0, deg = 0) {
        const {paramBase, frameConfig, color} = this
        const param = Object.assign({}, paramBase, frameConfig[this.index], {x, y, deg}, {color})
        this.game.drawFrame(this, param)
    }

    update() {
        this.count += 1 / this.cd
        this.index = Math.floor(this.count % this.frameNum)
        // console.log(this.index, this.frameNum, this.frameConfig);
    }
}
