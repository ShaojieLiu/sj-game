class GuaImage {
    constructor(game, name, pos = {x: 0, y: 0}) {
        // console.log(pos)
        this.texture = game.textureByName(name)
        this.x = pos.x
        this.y = pos.y
        this.w = this.texture.w
        this.h = this.texture.h
    }
    draw() {

    }
    update() {

    }
}
